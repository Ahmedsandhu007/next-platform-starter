"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { partners, trustStats } from "@/lib/content";

export function TrustedBy() {
  return (
    <section id="trusted" className="relative scroll-mt-24 border-t border-line bg-white py-16 sm:py-20" aria-label="Trusted by UK businesses">
      <Container>
        <Reveal className="text-center">
          <p className="eyebrow text-muted">Trusted by UK businesses · Partnered with leading platforms</p>
        </Reveal>

        {/* Partner wordmarks */}
        <Reveal delay={0.05}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {partners.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 border border-line px-4 py-2.5 transition-colors duration-300 hover:border-bronze"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-bronze" aria-hidden />
                <span className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-ink/70 sm:text-[0.95rem]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Counters */}
        <Reveal delay={0.1}>
          <dl className="mt-14 grid grid-cols-2 gap-y-10 border-y border-line py-10 lg:grid-cols-4">
            {trustStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
              >
                <dd className="font-display text-4xl text-ink sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                </dd>
                <dt className="eyebrow mx-auto mt-3 max-w-[12rem] text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
