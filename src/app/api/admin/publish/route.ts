import { NextResponse } from "next/server";
import { githubConfigured, publishDraft } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Publish: merge the draft branch into the published branch in one commit — the
 * ONLY action that triggers a Netlify build. Saves alone never deploy.
 */
export async function POST() {
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Publishing needs GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }
  try {
    const result = await publishDraft();
    if (!result.published) {
      return NextResponse.json({ ok: true, published: false, count: 0, message: "Nothing to publish." });
    }
    return NextResponse.json({ ok: true, published: true, count: result.files.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const conflict = /conflict/i.test(message);
    return NextResponse.json(
      { error: conflict ? "conflict" : "publish_error", message },
      { status: conflict ? 409 : 502 },
    );
  }
}
