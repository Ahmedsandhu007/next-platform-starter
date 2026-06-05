import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Specialist accountants for contractors, e-commerce, startups, landlords, hospitality, healthcare, construction (CIS) and creative agencies across the UK.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumb="Industries"
        title="Specialist accountants for your industry"
        subtitle="We speak your sector's language — from IR35 for contractors to CIS for construction — with advice shaped around how your business actually works."
      />
      <Industries />
      <Testimonials />
      <CtaBand />
    </>
  );
}
