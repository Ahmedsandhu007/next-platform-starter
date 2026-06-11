import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";
import { copy } from "@/lib/content";

const page = copy.pages.faq;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.subtitle} icon="MessagesSquare" />
      <FAQ />
    </>
  );
}
