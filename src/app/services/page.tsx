import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesDetailed } from "@/components/ServicesDetailed";
import { CloudAccounting } from "@/components/CloudAccounting";
import { CtaBand } from "@/components/CtaBand";
import { copy } from "@/lib/content";

const page = copy.pages.services;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.subtitle} art="advisory" />
      <ServicesDetailed />
      <CloudAccounting />
      <CtaBand />
    </>
  );
}
