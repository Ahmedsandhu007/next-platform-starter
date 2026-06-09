import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/AdminBar";

export const metadata: Metadata = {
  title: { absolute: "MMR CMS" },
  // The admin area must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream/40 text-ink">
      <AdminBar />
      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">{children}</div>
    </div>
  );
}
