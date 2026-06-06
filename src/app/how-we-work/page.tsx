import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { HowWeWork } from "@/components/HowWeWork";
import { CloudAccounting } from "@/components/CloudAccounting";
import { CtaBand } from "@/components/CtaBand";
import { copy } from "@/lib/content";

const page = copy.pages.howWeWork;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.subtitle} />
      <HowWeWork />
      <CloudAccounting />
      <CtaBand />
    </>
  );
}
