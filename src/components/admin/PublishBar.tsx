"use client";

import { useState } from "react";
import { Rocket, AlertCircle, Check } from "lucide-react";
import { useAdminStatus } from "@/components/admin/AdminStatusProvider";

/**
 * Dashboard publish control. Shows a highlighted "Publish N changes" bar whenever
 * the draft branch is ahead of published; publishing is the ONLY action that
 * triggers a Netlify build. Hidden (replaced by an "all published" note) at 0.
 */
export function PublishBar() {
  const { configured, pending, items, refresh } = useAdminStatus();
  const [working, setWorking] = useState<"" | "publish" | "discard">("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!configured) return null;

  async function publish() {
    setWorking("publish");
    setError("");
    setMsg("");
    try {
      const res = await fetch("/api/admin/publish", { method: "POST" });
      const d = (await res.json().catch(() => ({}))) as { message?: string; published?: boolean; count?: number };
      if (!res.ok) {
        setError(d.message ?? "Publish failed.");
      } else {
        setMsg(
          d.published
            ? `Publishing ${d.count} change${d.count === 1 ? "" : "s"} — your site will be live in about 1–2 minutes.`
            : "Nothing to publish.",
        );
      }
    } catch {
      setError("Network error while publishing.");
    }
    setWorking("");
    await refresh();
  }

  async function discard() {
    if (!window.confirm("Discard ALL unpublished changes? This permanently removes the saved drafts and cannot be undone.")) {
      return;
    }
    setWorking("discard");
    setError("");
    setMsg("");
    try {
      const res = await fetch("/api/admin/discard", { method: "POST" });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { message?: string };
        setError(d.message ?? "Discard failed.");
      } else {
        setMsg("Draft changes discarded — back to the published version.");
      }
    } catch {
      setError("Network error while discarding.");
    }
    setWorking("");
    await refresh();
  }

  if (pending === 0) {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
        <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
        {msg || "All changes are published — the live site is up to date."}
      </div>
    );
  }

  const disabled = working !== "";

  return (
    <div className="mt-6 rounded-xl border-2 border-bronze/40 bg-bronze/[0.06] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-bronze/15 text-bronze">
            <AlertCircle className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-ink">
              {pending} unpublished change{pending === 1 ? "" : "s"}
            </h2>
            <p className="mt-0.5 text-sm text-muted">Saved as a draft and not live yet — publish when you&apos;re ready.</p>
            {items.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {items.map((it) => (
                  <span key={it.file} className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-ink ring-1 ring-line">
                    {it.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={discard}
            disabled={disabled}
            className="px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:underline disabled:opacity-60"
          >
            {working === "discard" ? "Discarding…" : "Discard"}
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-md bg-bronze px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-bronze-600 disabled:opacity-60"
          >
            <Rocket className="h-4 w-4" aria-hidden />
            {working === "publish" ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </div>
      {error && <p className="mt-3 rounded border border-red-300 bg-red-50 p-2.5 text-xs text-red-800">{error}</p>}
      {msg && <p className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-2.5 text-xs text-emerald-800">{msg}</p>}
    </div>
  );
}
