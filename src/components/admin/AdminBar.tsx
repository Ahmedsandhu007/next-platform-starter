"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

/** Top bar for the CMS: brand + (when signed in) view-site + log-out. */
export function AdminBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const onLogin = pathname === "/admin/login";

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link
          href={onLogin ? "/admin/login" : "/admin"}
          className="font-display text-lg font-extrabold tracking-tight text-ink"
        >
          MMR <span className="text-bronze">CMS</span>
        </Link>
        {!onLogin && (
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="font-medium text-muted hover:text-ink">
              View site ↗
            </a>
            <button
              type="button"
              onClick={logout}
              disabled={busy}
              className="border border-line px-3 py-1.5 font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze disabled:opacity-60"
            >
              {busy ? "Signing out…" : "Log out"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
