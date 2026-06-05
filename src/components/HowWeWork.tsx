"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { processSteps } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function HowWeWork() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="Getting started is refreshingly simple"
          subtitle="Four straightforward steps take you from first hello to a finance function that just runs — with no admin headache and no downtime."
        />

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px lg:block" aria-hidden>
            <div className="h-full w-full bg-line" />
            <motion.div
              className="absolute inset-0 h-px origin-left bg-bronze"
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
            className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {processSteps.map((step) => (
              <motion.li key={step.step} variants={staggerItem} className="relative text-center lg:px-3">
                <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center border border-ink bg-white">
                  <span className="font-display text-2xl text-bronze">{step.step}</span>
                </div>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <Icon name={step.icon as IconName} className="h-4 w-4 text-bronze" strokeWidth={1.5} aria-hidden />
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                </div>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
