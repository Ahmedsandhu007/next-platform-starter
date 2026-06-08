"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { RingAccent } from "@/components/ui/Decorations";
import { copy, whyPoints } from "@/lib/content";

export function WhyChoose() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden border-b border-line bg-white py-20 sm:py-28">
      <RingAccent className="absolute -right-10 top-24 hidden h-40 w-40 lg:block" />

      <Container className="relative">
        <SectionHeading {...copy.why.heading} />

        <ul data-reveal-stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <li
              key={point.title}
              className="group rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-bronze/30 hover:shadow-xl hover:shadow-ink/5"
            >
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-cream text-bronze transition-all duration-300 group-hover:scale-105 group-hover:bg-ink group-hover:text-white">
                <Icon name={point.icon as IconName} className="h-6 w-6" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg text-ink">{point.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{point.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-muted">{copy.why.ctaText}</p>
          <ButtonLink href="/contact" variant="primary" withArrow>
            {copy.why.ctaButton}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
