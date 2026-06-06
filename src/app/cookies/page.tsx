import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";
import { legalPages } from "@/lib/content";

const page = legalPages.find((p) => p.slug === "cookies")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LegalPageView page={page} />;
}
