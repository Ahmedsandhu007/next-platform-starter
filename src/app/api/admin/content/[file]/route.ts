import { NextResponse } from "next/server";
import { getCollection } from "@/lib/cms/registry";
import { getFileSha, getJsonFile, githubConfigured, putJsonFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fileName = (path: string) => path.split("/").pop() ?? path;

/** GET — load a collection's JSON (fresh from GitHub) for editing. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const col = getCollection(file);
  if (!col) return NextResponse.json({ error: "unknown_collection" }, { status: 404 });
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Loading/saving needs GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }
  try {
    const { data, sha } = await getJsonFile(col.file);
    return NextResponse.json({ id: col.id, mode: col.mode, data, sha });
  } catch (error) {
    return NextResponse.json(
      { error: "github_error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}

/** PUT — object mode: replace the whole file; list mode: replace one entry by slug. Validated, then committed. */
export async function PUT(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const col = getCollection(file);
  if (!col) return NextResponse.json({ error: "unknown_collection" }, { status: 404 });
  if (!githubConfigured()) {
    return NextResponse.json({ error: "not_configured", message: "Saving needs GITHUB_TOKEN and GITHUB_REPO." }, { status: 503 });
  }

  let body: { data?: unknown; page?: ({ slug?: unknown; title?: unknown } & Record<string, unknown>) | null };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    if (col.mode === "object") {
      const result = col.validate(body.data);
      if (!result.ok) return NextResponse.json({ error: "invalid", errors: result.errors }, { status: 422 });
      const sha = await getFileSha(col.file);
      const commit = await putJsonFile(col.file, body.data, sha, `CMS: update ${fileName(col.file)}`);
      return NextResponse.json({ ok: true, commitSha: commit.commitSha });
    }

    // list mode — replace the one entry matched by slug
    const page = body.page;
    if (!page || typeof page !== "object" || typeof page.slug !== "string" || page.slug.trim() === "") {
      return NextResponse.json({ error: "bad_request", message: "Expected a { page } with a slug." }, { status: 400 });
    }
    const { data, sha } = await getJsonFile<Array<{ slug: string }>>(col.file);
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "github_error", message: "Collection file is not a list." }, { status: 502 });
    }
    const index = data.findIndex((p) => p.slug === page.slug);
    if (index === -1) {
      return NextResponse.json({ error: "not_found", message: `No entry with slug "${String(page.slug)}".` }, { status: 404 });
    }
    const next = data.slice();
    next[index] = page as (typeof next)[number];
    const result = col.validate(next);
    if (!result.ok) return NextResponse.json({ error: "invalid", errors: result.errors }, { status: 422 });
    const title = typeof page.title === "string" ? page.title : page.slug;
    const commit = await putJsonFile(col.file, next, sha, `CMS: update ${fileName(col.file)} (${title})`);
    return NextResponse.json({ ok: true, commitSha: commit.commitSha });
  } catch (error) {
    return NextResponse.json(
      { error: "github_error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}
