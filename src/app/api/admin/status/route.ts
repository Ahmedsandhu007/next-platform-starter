import { NextResponse } from "next/server";
import { draftStatus, githubConfigured } from "@/lib/github";
import { collections } from "@/lib/cms/registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Friendly label for a changed repo path — the CMS collection name, or a fallback. */
function labelFor(path: string): string {
  const col = collections.find((c) => c.file === path);
  if (col) return col.label;
  if (path.startsWith("public/")) return "Image / asset";
  return path.split("/").pop() ?? path;
}

/** Pending draft changes: how many content areas are edited but not yet published. */
export async function GET() {
  if (!githubConfigured()) {
    return NextResponse.json({ configured: false, pending: 0, commits: 0, items: [] });
  }
  try {
    const { aheadBy, files } = await draftStatus();
    const items = files.map((f) => ({ file: f, label: labelFor(f) }));
    return NextResponse.json({ configured: true, pending: items.length, commits: aheadBy, items });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "status_error", message }, { status: 502 });
  }
}
