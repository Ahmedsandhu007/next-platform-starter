"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { copy, processSteps } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function HowWeWork() {
  return (
    <section id="process" className="relative scroll-mt-24 border-b border-line bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading {...copy.process.heading} />

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-0.5 lg:block" aria-hidden>
            <div className="h-full w-full rounded-full bg-line" />
            <motion.div
              className="absolute inset-0 h-full origin-left rounded-full bg-gradient-to-r from-bronze to-ink"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {processSteps.map((step) => (
              <motion.li key={step.step} variants={staggerItem} className="group relative flex flex-col items-center text-center lg:px-3">
                <div className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl bg-gradient-to-br from-bronze to-bronze-700 text-white shadow-lg shadow-bronze/25 ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="font-display text-2xl font-extrabold">{step.step}</span>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Icon name={step.icon as IconName} className="h-4 w-4 text-bronze" strokeWidth={2} aria-hidden />
                  <h3 className="text-lg text-ink">{step.title}</h3>
                </div>
                <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
