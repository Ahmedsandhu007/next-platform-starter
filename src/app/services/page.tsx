import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { CloudAccounting } from "@/components/CloudAccounting";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Accountancy Services",
  description:
    "Bookkeeping, tax planning, VAT & Making Tax Digital, payroll, company formation and business advisory — full-service accountancy for UK businesses on fixed monthly fees.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        title="Accountancy services for ambitious businesses"
        subtitle="Everything your business needs to stay compliant and grow — from everyday bookkeeping to board-level advice, all under one transparent monthly fee."
      />
      <Services />
      <CloudAccounting />
      <CtaBand />
    </>
  );
}
