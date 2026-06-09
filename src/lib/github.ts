/**
 * Minimal GitHub Contents API client used by the CMS to read and commit the
 * `src/content/*.json` files. A commit to the configured branch triggers a
 * Netlify rebuild, which is how CMS edits go live.
 *
 * Uses plain `fetch` (no SDK) so there are no extra dependencies.
 * Required env vars: GITHUB_TOKEN, GITHUB_REPO ("owner/name"). Optional: GITHUB_BRANCH (default "main").
 */

const API_BASE = "https://api.github.com";

type GitHubConfig = { token: string; repo: string; branch: string };

function getConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return { token, repo, branch: process.env.GITHUB_BRANCH || "main" };
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

/** Fetch and JSON-parse a file from the repo. Returns the parsed data + blob sha. */
export async function getJsonFile<T = unknown>(filePath: string): Promise<{ data: T; sha: string }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const res = await request(
    `/repos/${config.repo}/contents/${encodePath(filePath)}?ref=${encodeURIComponent(config.branch)}`,
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
  sha: string,
  message: string,
): Promise<{ blobSha: string | undefined; commitSha: string | undefined }> {
  const config = getConfig();
  if (!config) throw new Error("GitHub is not configured.");
  const res = await request(`/repos/${config.repo}/contents/${encodePath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: encodeBase64(JSON.stringify(data, null, 2) + "\n"),
      sha,
      branch: config.branch,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub PUT ${filePath} failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { content?: { sha?: string }; commit?: { sha?: string } };
  return { blobSha: json.content?.sha, commitSha: json.commit?.sha };
}
