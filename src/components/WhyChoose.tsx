"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { whyPoints } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function WhyChoose() {
  return (
    <section id="why" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="flex items-center gap-3 text-bronze">
                <span className="h-px w-8 bg-bronze" aria-hidden />
                <span className="eyebrow">Why MMR</span>
              </span>
              <h2 className="mt-5 text-3xl text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                The accountant ambitious businesses actually enjoy
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                We pair chartered expertise with genuinely human service. No jargon, no
                surprise bills — just clear numbers and an adviser who picks up the phone.
              </p>

              <div className="mt-8 flex items-start gap-4 border border-line border-l-2 border-l-bronze p-6">
                <ShieldCheck className="h-6 w-6 shrink-0 text-bronze" strokeWidth={1.4} aria-hidden />
                <p className="text-sm leading-relaxed text-ink/80">
                  <span className="font-semibold text-ink">Our promise:</span> a fixed monthly
                  fee agreed up front, work delivered ahead of deadline, and a response to
                  every question within one business day.
                </p>
              </div>

              <div className="mt-8">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Talk to an Accountant
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Feature grid */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid border-t border-l border-line sm:grid-cols-2"
          >
            {whyPoints.map((point) => (
              <motion.li
                key={point.title}
                variants={staggerItem}
                className="group border-r border-b border-line bg-white p-7"
              >
                <Icon
                  name={point.icon as IconName}
                  className="h-7 w-7 text-bronze"
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{point.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{point.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
