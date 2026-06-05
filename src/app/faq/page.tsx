import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about MMR Accountants — pricing, switching accountants, cloud software, dedicated accountants and our chartered, insured practice.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        title="Frequently asked questions"
        subtitle="Everything you might want to know before getting in touch. Can't find your answer? We're only a message away."
      />
      <FAQ />
    </>
  );
}
