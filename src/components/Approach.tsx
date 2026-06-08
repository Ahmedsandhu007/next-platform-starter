"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotArt } from "@/components/ui/SpotArt";
import { DotCluster } from "@/components/ui/Decorations";
import { copy, valueProps } from "@/lib/content";

export function Approach() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white py-20 sm:py-28">
      <DotCluster className="absolute right-8 top-16 hidden h-16 w-16 opacity-60 lg:block" />
      <DotCluster className="absolute bottom-16 left-6 hidden h-14 w-14 opacity-40 lg:block" />

      <Container className="relative">
        <SectionHeading {...copy.approach.heading} />

        <div data-reveal-stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {valueProps.map((v) => (
            <article
              key={v.title}
              className="group relative flex flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-bronze/30 hover:shadow-xl hover:shadow-ink/5"
            >
              <div className="rounded-xl bg-cream p-5 transition-colors duration-300 group-hover:bg-bronze-50">
                <SpotArt name={v.art} className="mx-auto max-w-[230px]" />
              </div>
              <h3 className="mt-7 text-xl text-ink">{v.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{v.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-bronze opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
