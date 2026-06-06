"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { copy, partners } from "@/lib/content";

export function TrustedBy() {
  return (
    <section
      id="trusted"
      className="relative scroll-mt-24 border-y border-line bg-cream/50 py-14 sm:py-16"
      aria-label="Accreditations and integrations"
    >
      <Container>
        <Reveal className="text-center">
          <p className="eyebrow text-muted">{copy.trustedBy.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {partners.map((p) => (
              <li
                key={p}
                className="group flex items-center justify-center gap-2.5 border border-line bg-white px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/40 hover:shadow-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-bronze transition-transform duration-300 group-hover:scale-150" aria-hidden />
                <span className="font-display text-lg font-extrabold tracking-tight text-ink/75 transition-colors duration-300 group-hover:text-ink">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
