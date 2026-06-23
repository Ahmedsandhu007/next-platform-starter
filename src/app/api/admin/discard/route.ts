import { NextResponse } from "next/server";
import { discardDraft, githubConfigured } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Discard all unpublished draft changes (reset the draft branch to published). */
export async function POST() {
  if (!githubConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Discarding needs GITHUB_TOKEN and GITHUB_REPO." },
      { status: 503 },
    );
  }
  try {
    await discardDraft();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "discard_error", message }, { status: 502 });
  }
}
