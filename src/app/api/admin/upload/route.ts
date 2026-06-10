import { NextResponse } from "next/server";
import { getFileSha, githubConfigured, putRawFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Raster image types only (no SVG, to avoid script-in-SVG concerns on a committed asset).
const ALLOWED: Record<string, string> = { jpg: "jpg", jpeg: "jpg", png: "png", webp: "webp", gif: "gif" };
const MAX_BYTES = 2_500_000; // ~2.5 MB

function slug(s: string, fallback: string): string {
  const out = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return out || fallback;
}

/** POST { filename, contentBase64, dir } → commit the image to public/<dir>/ and return its public path. */
export async function POST(request: Request) {
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Uploads need GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }

  let body: { filename?: unknown; contentBase64?: unknown; dir?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const filename = typeof body.filename === "string" ? body.filename : "";
  const base64 = typeof body.contentBase64 === "string" ? body.contentBase64 : "";
  const dir = slug(typeof body.dir === "string" ? body.dir : "uploads", "uploads");
  if (!filename || !base64) {
    return NextResponse.json({ error: "bad_request", message: "filename + contentBase64 required." }, { status: 400 });
  }

  const ext = (filename.split(".").pop() ?? "").toLowerCase();
  if (!(ext in ALLOWED)) {
    return NextResponse.json({ error: "bad_type", message: "Only JPG, PNG, WEBP or GIF images are allowed." }, { status: 415 });
  }
  if (Math.floor((base64.length * 3) / 4) > MAX_BYTES) {
    return NextResponse.json({ error: "too_large", message: "Image must be under ~2.5 MB." }, { status: 413 });
  }

  const base = slug(filename.replace(/\.[^.]+$/, ""), "image");
  const repoPath = `public/${dir}/${base}-${Date.now().toString(36)}.${ALLOWED[ext]}`;
  const publicPath = repoPath.replace(/^public/, "");

  try {
    const sha = await getFileSha(repoPath); // normally null (unique name)
    await putRawFile(repoPath, base64, `CMS: upload ${dir}/${base}.${ALLOWED[ext]}`, sha);
    return NextResponse.json({ ok: true, path: publicPath });
  } catch (error) {
    return NextResponse.json(
      { error: "github_error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}
