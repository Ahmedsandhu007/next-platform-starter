import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { HowWeWork } from "@/components/HowWeWork";
import { CloudAccounting } from "@/components/CloudAccounting";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "From a free discovery call to seamless onboarding and proactive, cloud-first support — see how MMR Accountants works with you in four simple steps.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumb="How We Work"
        title="How we work with you"
        subtitle="Switching to MMR is refreshingly simple. Four straightforward steps take you from first hello to a finance function that just runs."
      />
      <HowWeWork />
      <CloudAccounting />
      <CtaBand />
    </>
  );
}
