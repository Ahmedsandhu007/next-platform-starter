/**
 * Minimal GitHub Contents API client used by the CMS to read and commit the
 * `src/content/*.json` files.
 *
 * DRAFT WORKFLOW: CMS reads/writes target the DRAFT branch (default "cms-draft"),
 * NOT the published branch — so a save does NOT trigger a Netlify build (Netlify
 * only builds the production branch). Draft commits are also tagged "[skip ci]" as
 * a backstop. `publishDraft()` merges draft → published in one commit, which is the
 * only thing that triggers a build. `draftStatus()`/`discardDraft()` drive the
 * dashboard's pending-changes UI.
 *
 * Uses plain `fetch` (no SDK) so there are no extra dependencies.
 * Required env vars: GITHUB_TOKEN, GITHUB_REPO ("owner/name").
 * Optional: GITHUB_BRANCH (published, default "main"), GITHUB_DRAFT_BRANCH (default "cms-draft").
 */

const API_BASE = "https://api.github.com";

type GitHubConfig = { token: string; repo: string; branch: string; draftBranch: string };

function getConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return {
    token,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    draftBranch: process.env.GITHUB_DRAFT_BRANCH || "cms-draft",
  };
}

/** Whether commits can be made (token + repo present). */
export function githubConfigured(): boolean {
  return getConfig() !== null;
}

/** Encode a repo-relative path without escaping the slashes. */
function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function decodeBase64(b64: string): string {
  const clean = b64.replace(/\s/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured (set GITHUB_TOKEN and GITHUB_REPO).");
  return fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "mmr-cms",
      ...(init?.headers ?? {}),
    },
  });
}

/** Fetch and JSON-parse a file from the repo (DRAFT branch). Returns the parsed data + blob sha. */
export async function getJsonFile<T = unknown>(filePath: string): Promise<{ data: T; sha: string }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  await ensureDraftBranch();
  const res = await request(
    `/repos/${config.repo}/contents/${encodePath(filePath)}?ref=${encodeURIComponent(config.draftBranch)}`,
  );
  if (!res.ok) {
    throw new Error(`GitHub GET ${filePath} failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { content?: string; sha?: string };
  if (typeof json.content !== "string" || typeof json.sha !== "string") {
    throw new Error(`GitHub GET ${filePath} returned no file content (is it a directory?).`);
  }
  return { data: JSON.parse(decodeBase64(json.content)) as T, sha: json.sha };
}

/**
 * Commit `data` (pretty-printed JSON) to `filePath` on the configured branch.
 * `sha` must be the current blob sha (from getJsonFile) to update in place.
 */
export async function putJsonFile(
  filePath: string,
  data: unknown,
  sha: string | null | undefined,
  message: string,
): Promise<{ blobSha: string | undefined; commitSha: string | undefined }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const body: Record<string, unknown> = {
    message: `${message} [skip ci]`,
    content: encodeBase64(JSON.stringify(data, null, 2) + "\n"),
    branch: config.draftBranch,
  };
  if (sha) body.sha = sha; // omit on create
  const res = await request(`/repos/${config.repo}/contents/${encodePath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GitHub PUT ${filePath} failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { content?: { sha?: string }; commit?: { sha?: string } };
  return { blobSha: json.content?.sha, commitSha: json.commit?.sha };
}

/** Current blob sha for a path (DRAFT branch), or null if the file doesn't exist yet. */
export async function getFileSha(filePath: string): Promise<string | null> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  await ensureDraftBranch();
  const res = await request(
    `/repos/${config.repo}/contents/${encodePath(filePath)}?ref=${encodeURIComponent(config.draftBranch)}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET sha ${filePath} failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { sha?: string };
  return typeof json.sha === "string" ? json.sha : null;
}

/** Commit a file from already-base64-encoded content (text or binary, e.g. an upload). */
export async function putRawFile(
  filePath: string,
  base64Content: string,
  message: string,
  sha?: string | null,
): Promise<{ commitSha: string | undefined; path: string }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  await ensureDraftBranch();
  const body: Record<string, unknown> = { message: `${message} [skip ci]`, content: base64Content, branch: config.draftBranch };
  if (sha) body.sha = sha;
  const res = await request(`/repos/${config.repo}/contents/${encodePath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${filePath} failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { commit?: { sha?: string } };
  return { commitSha: json.commit?.sha, path: filePath };
}

/* ───────────────────────── draft / publish branch ops ───────────────────────── */

/** Head commit sha of a branch, or null if the branch doesn't exist. */
async function getBranchSha(branch: string): Promise<string | null> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const res = await request(`/repos/${config.repo}/git/ref/heads/${encodeURIComponent(branch)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub get ref ${branch} failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { object?: { sha?: string } };
  return json.object?.sha ?? null;
}

/** Point a branch at `sha` (force) — used to reset the draft branch to published. */
async function resetBranchTo(branch: string, sha: string): Promise<void> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const res = await request(`/repos/${config.repo}/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: "PATCH",
    body: JSON.stringify({ sha, force: true }),
  });
  if (!res.ok) throw new Error(`GitHub reset ${branch} failed (${res.status}): ${await res.text()}`);
}

/** Ensure the draft branch exists, branching it from the published branch if missing. */
export async function ensureDraftBranch(): Promise<void> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  if (await getBranchSha(config.draftBranch)) return;
  const baseSha = await getBranchSha(config.branch);
  if (!baseSha) throw new Error(`Published branch "${config.branch}" not found.`);
  const res = await request(`/repos/${config.repo}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${config.draftBranch}`, sha: baseSha }),
  });
  // 422 = ref already exists (a concurrent request created it) — fine.
  if (!res.ok && res.status !== 422) {
    throw new Error(`GitHub create branch ${config.draftBranch} failed (${res.status}): ${await res.text()}`);
  }
}

export type DraftStatus = { aheadBy: number; files: string[] };

/** How far the draft branch is ahead of published: commit count + changed files. */
export async function draftStatus(): Promise<DraftStatus> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  if (!(await getBranchSha(config.draftBranch))) return { aheadBy: 0, files: [] };
  const res = await request(
    `/repos/${config.repo}/compare/${encodeURIComponent(config.branch)}...${encodeURIComponent(config.draftBranch)}`,
  );
  if (!res.ok) throw new Error(`GitHub compare failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { ahead_by?: number; files?: { filename: string }[] };
  return { aheadBy: json.ahead_by ?? 0, files: (json.files ?? []).map((f) => f.filename) };
}

/**
 * Merge the draft branch into the published branch in a single commit (the ONLY
 * action that triggers a Netlify build), then re-sync draft to the new published
 * tip so pending resets to 0. Returns false if there was nothing to publish.
 */
export async function publishDraft(): Promise<{ published: boolean; files: string[] }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const status = await draftStatus();
  if (status.aheadBy === 0) return { published: false, files: [] };
  const res = await request(`/repos/${config.repo}/merges`, {
    method: "POST",
    body: JSON.stringify({
      base: config.branch,
      head: config.draftBranch,
      commit_message: `CMS: publish ${status.files.length} change(s)`,
    }),
  });
  if (res.status === 409) {
    throw new Error("merge conflict: the published branch has changes the draft doesn't — discard the draft or reconcile manually.");
  }
  if (!res.ok && res.status !== 201 && res.status !== 204) {
    throw new Error(`GitHub merge failed (${res.status}): ${await res.text()}`);
  }
  const newMainSha = await getBranchSha(config.branch);
  if (newMainSha) await resetBranchTo(config.draftBranch, newMainSha);
  return { published: true, files: status.files };
}

/** Discard all draft changes by resetting the draft branch back to published. */
export async function discardDraft(): Promise<void> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  if (!(await getBranchSha(config.draftBranch))) return;
  const baseSha = await getBranchSha(config.branch);
  if (!baseSha) throw new Error(`Published branch "${config.branch}" not found.`);
  await resetBranchTo(config.draftBranch, baseSha);
}
