"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, AlertCircle, X } from "lucide-react";
import { GlobalSearch } from "@/components/admin/GlobalSearch";
import { useAdminStatus } from "@/components/admin/AdminStatusProvider";

/** CMS top bar: menu toggle (mobile), brand, global search, view-site + log out.
 *  Shows a pending-changes badge, and intercepts log out when changes are unpublished. */
export function AdminTopBar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const { pending } = useAdminStatus();
  const [busy, setBusy] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [working, setWorking] = useState<"" | "publish" | "discard" | "logout">("");
  const [error, setError] = useState("");

  async function doLogout() {
    setWorking("logout");
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  async function onLogoutClick() {
    setBusy(true);
    setError("");
    // Always check FRESH status — the badge can be stale right after a save.
    let count = pending;
    try {
      const res = await fetch("/api/admin/status", { cache: "no-store" });
      if (res.ok) count = ((await res.json()) as { pending?: number }).pending ?? 0;
    } catch {
      /* fall back to the cached count */
    }
    setBusy(false);
    if (count > 0) setDialog(true);
    else await doLogout();
  }

  async function publishAndLogout() {
    setWorking("publish");
    setError("");
    try {
      const res = await fetch("/api/admin/publish", { method: "POST" });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { message?: string };
        setError(d.message ?? "Publish failed.");
        setWorking("");
        return;
      }
    } catch {
      setError("Network error while publishing.");
      setWorking("");
      return;
    }
    await doLogout();
  }

  async function discardAndLogout() {
    setWorking("discard");
    setError("");
    try {
      await fetch("/api/admin/discard", { method: "POST" });
    } catch {
      /* discard is best-effort; log out regardless */
    }
    await doLogout();
  }

  const dialogBusy = working !== "";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink hover:border-bronze lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <Link href="/admin" className="shrink-0 font-display text-lg font-extrabold tracking-tight text-ink">
          MMR <span className="text-bronze">CMS</span>
        </Link>
        <div className="ml-2 hidden flex-1 sm:block">
          <GlobalSearch />
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm">
          {pending > 0 && (
            <Link
              href="/admin"
              title="You have unpublished changes — go to the Dashboard to publish"
              className="inline-flex items-center gap-1.5 rounded-full bg-bronze/10 px-2.5 py-1 text-xs font-semibold text-bronze ring-1 ring-bronze/30 transition-colors hover:bg-bronze/20"
            >
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {pending} unpublished
            </Link>
          )}
          <a href="/" target="_blank" rel="noreferrer" className="hidden font-medium text-muted hover:text-ink sm:inline">
            View site ↗
          </a>
          <button
            type="button"
            onClick={onLogoutClick}
            disabled={busy}
            className="border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-bronze hover:text-bronze disabled:opacity-60"
          >
            {busy ? "Checking…" : "Log out"}
          </button>
        </div>
      </div>
      {/* Mobile search row */}
      <div className="border-t border-line px-4 pb-3 pt-2 sm:hidden">
        <GlobalSearch />
      </div>

      {/* Logout-with-unpublished-changes dialog */}
      {dialog && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <button
            type="button"
            aria-label="Cancel"
            className="absolute inset-0 bg-ink/50"
            onClick={() => !dialogBusy && setDialog(false)}
          />
          <div role="dialog" aria-modal="true" aria-label="Unpublished changes" className="relative w-full max-w-md rounded-xl border border-line bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bronze/10 text-bronze">
                <AlertCircle className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-ink">You have unpublished changes</h2>
                <p className="mt-1 text-sm text-muted">
                  {pending} change{pending === 1 ? "" : "s"} {pending === 1 ? "is" : "are"} saved as a draft and not yet live.
                  What would you like to do?
                </p>
              </div>
              <button
                type="button"
                onClick={() => !dialogBusy && setDialog(false)}
                aria-label="Close"
                className="ml-auto text-muted hover:text-ink disabled:opacity-50"
                disabled={dialogBusy}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <p className="mt-4 rounded border border-red-300 bg-red-50 p-2.5 text-xs text-red-800">{error}</p>}

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={publishAndLogout}
                disabled={dialogBusy}
                className="w-full rounded-md bg-bronze px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600 disabled:opacity-60"
              >
                {working === "publish" ? "Publishing…" : "Publish changes & log out"}
              </button>
              <button
                type="button"
                onClick={doLogout}
                disabled={dialogBusy}
                className="w-full rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze disabled:opacity-60"
              >
                {working === "logout" ? "Logging out…" : "Keep as draft & log out"}
              </button>
              <button
                type="button"
                onClick={discardAndLogout}
                disabled={dialogBusy}
                className="w-full rounded-md px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                {working === "discard" ? "Discarding…" : "Discard changes & log out"}
              </button>
              <button
                type="button"
                onClick={() => setDialog(false)}
                disabled={dialogBusy}
                className="w-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
