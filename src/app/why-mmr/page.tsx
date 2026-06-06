import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonials } from "@/components/Testimonials";
import { TrustedBy } from "@/components/TrustedBy";
import { CtaBand } from "@/components/CtaBand";
import { copy } from "@/lib/content";

const page = copy.pages.whyMmr;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/why-mmr" },
};

export default function WhyMmrPage() {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.subtitle} />
      <WhyChoose />
      <Testimonials />
      <TrustedBy />
      <CtaBand />
    </>
  );
}
