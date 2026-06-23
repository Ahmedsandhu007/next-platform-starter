"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export type StatusItem = { file: string; label: string };
export type DraftStatusData = {
  configured: boolean;
  /** Number of content areas edited but not yet published. */
  pending: number;
  /** Number of unpublished commits (save actions). */
  commits: number;
  items: StatusItem[];
};

type Ctx = DraftStatusData & { loading: boolean; refresh: () => Promise<DraftStatusData> };

const AdminStatusContext = createContext<Ctx | null>(null);

const EMPTY: DraftStatusData = { configured: true, pending: 0, commits: 0, items: [] };

/**
 * Shares the draft "pending changes" status across the CMS chrome (top-bar badge,
 * dashboard publish bar, logout dialog). Refetches on mount, on every route change,
 * on window focus, and when a `cms:changed` event fires after a save.
 */
export function AdminStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<DraftStatusData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const refresh = useCallback(async (): Promise<DraftStatusData> => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as DraftStatusData;
        setStatus(data);
        return data;
      }
    } catch {
      /* network hiccup — keep the last known status */
    } finally {
      setLoading(false);
    }
    return status;
  }, [status]);

  // Refetch on mount + each route change (so navigating to the dashboard always
  // shows fresh pending state).
  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Refetch on focus + after a save (editors dispatch `cms:changed`).
  useEffect(() => {
    const onPing = () => void refresh();
    window.addEventListener("focus", onPing);
    window.addEventListener("cms:changed", onPing);
    return () => {
      window.removeEventListener("focus", onPing);
      window.removeEventListener("cms:changed", onPing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AdminStatusContext.Provider value={{ ...status, loading, refresh }}>{children}</AdminStatusContext.Provider>;
}

export function useAdminStatus(): Ctx {
  const ctx = useContext(AdminStatusContext);
  if (!ctx) throw new Error("useAdminStatus must be used within AdminStatusProvider");
  return ctx;
}

/** Editors call this after a successful save so the badge updates immediately. */
export function notifyCmsChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("cms:changed"));
}
