import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonials } from "@/components/Testimonials";
import { TrustedBy } from "@/components/TrustedBy";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Why MMR",
  description:
    "Fixed monthly fees, your own named accountant, proactive advice and a chartered, fully-insured practice. See why 1,200+ UK businesses trust MMR Accountants.",
  alternates: { canonical: "/why-mmr" },
};

export default function WhyMmrPage() {
  return (
    <>
      <PageHero
        crumb="Why MMR"
        title="Why businesses choose MMR"
        subtitle="Chartered expertise with genuinely human service — no jargon, no surprise bills, and an adviser who actually picks up the phone."
      />
      <WhyChoose />
      <Testimonials />
      <TrustedBy />
      <CtaBand />
    </>
  );
}
