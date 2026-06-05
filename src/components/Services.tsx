"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Full-service accountancy, quietly handled"
          subtitle="From everyday bookkeeping to board-level advice, MMR covers every number your business needs — so nothing slips and no deadline is missed."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <motion.li id={service.slug} key={service.title} variants={staggerItem} className="scroll-mt-28 border-r border-b border-line bg-white">
              <article className="group relative flex h-full flex-col bg-white p-8">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-bronze transition-transform duration-300 group-hover:scale-x-100" aria-hidden />

                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    name={service.icon as IconName}
                    className="h-7 w-7 text-ink transition-colors duration-300 group-hover:text-bronze"
                    strokeWidth={1.4}
                    aria-hidden
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-ink/80">
                      <span className="h-1 w-1 shrink-0 bg-bronze" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 text-bronze" aria-hidden />
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
