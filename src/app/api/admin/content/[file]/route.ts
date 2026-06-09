import { NextResponse } from "next/server";
import { getJsonFile, githubConfigured, putJsonFile } from "@/lib/github";
import { type RawDetail, validateFile } from "@/lib/detailSchema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Editable content files (allowlist — also guards against path traversal). */
const FILES = ["services", "industries-1", "industries-2", "approach"] as const;
type ContentFile = (typeof FILES)[number];

const isContentFile = (value: string): value is ContentFile => (FILES as readonly string[]).includes(value);
const pathFor = (file: ContentFile) => `src/content/${file}.json`;

/** GET — return the current pages array (read fresh from GitHub) for editing. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!isContentFile(file)) {
    return NextResponse.json({ error: "unknown_file" }, { status: 404 });
  }
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Saving/loading needs GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }
  try {
    const { data, sha } = await getJsonFile<RawDetail[]>(pathFor(file));
    return NextResponse.json({ file, pages: data, sha });
  } catch (error) {
    return NextResponse.json(
      { error: "github_error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}

/** PUT — replace ONE page (matched by slug) in the file, validate the whole
 *  file, then commit. Slugs cannot be created or changed here. */
export async function PUT(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!isContentFile(file)) {
    return NextResponse.json({ error: "unknown_file" }, { status: 404 });
  }
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Saving needs GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }

  let page: RawDetail;
  try {
    const body = (await request.json()) as { page?: RawDetail };
    if (!body.page || typeof body.page !== "object") throw new Error("missing page");
    page = body.page;
  } catch {
    return NextResponse.json({ error: "bad_request", message: "Expected a { page } body." }, { status: 400 });
  }

  if (typeof page.slug !== "string" || page.slug.trim() === "") {
    return NextResponse.json({ error: "bad_request", message: "Page is missing a slug." }, { status: 400 });
  }

  try {
    const { data: pages, sha } = await getJsonFile<RawDetail[]>(pathFor(file));
    const index = pages.findIndex((p) => p.slug === page.slug);
    if (index === -1) {
      return NextResponse.json(
        { error: "not_found", message: `No page with slug "${page.slug}" in ${file}.json.` },
        { status: 404 },
      );
    }

    const next = pages.slice();
    next[index] = page;

    const result = validateFile(next);
    if (!result.ok) {
      return NextResponse.json({ error: "invalid", errors: result.errors }, { status: 422 });
    }

    const commit = await putJsonFile(
      pathFor(file),
      next,
      sha,
      `CMS: update ${file}.json (${page.title})`,
    );
    return NextResponse.json({ ok: true, commitSha: commit.commitSha });
  } catch (error) {
    return NextResponse.json(
      { error: "github_error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}
