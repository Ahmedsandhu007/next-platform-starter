import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";
import { legalPages } from "@/lib/content";

const page = legalPages.find((p) => p.slug === "terms")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPageView page={page} />;
}
