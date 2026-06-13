import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { copy } from "@/lib/content";

const page = copy.pages.industries;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.subtitle} illus="industries" />
      <Industries />
      <Testimonials />
      <CtaBand />
    </>
  );
}
