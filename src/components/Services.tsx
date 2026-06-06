"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-b border-line bg-cream/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Full-service accountancy, expertly handled"
          subtitle="From everyday bookkeeping to board-level advice, MMR covers every number your business needs — so nothing slips and no deadline is missed."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.li id={service.slug} key={service.title} variants={staggerItem} className="scroll-mt-28">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-bronze/30 hover:shadow-[0_28px_60px_-24px_rgba(139,106,61,0.3)]">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-cream text-bronze transition-all duration-300 group-hover:scale-105 group-hover:bg-ink group-hover:text-white">
                  <Icon name={service.icon as IconName} className="h-7 w-7" strokeWidth={1.8} aria-hidden />
                </span>

                <h3 className="mt-6 text-xl text-ink">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>

                <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bronze-50 text-bronze">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-bronze">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 text-bronze transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-muted">Not sure which services you need? We&apos;ll help you decide.</p>
          <ButtonLink href="/contact" variant="primary" withArrow>
            Book a Consultation
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
