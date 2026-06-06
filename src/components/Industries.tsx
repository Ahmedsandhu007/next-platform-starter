"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { industries } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 border-b border-line bg-cream/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Industries we serve"
          title="Specialist knowledge for your sector"
          subtitle="We speak your industry's language. From IR35 for contractors to CIS for construction, you get advice shaped around how your business actually works."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <motion.li id={industry.slug} key={industry.title} variants={staggerItem} className="scroll-mt-28">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-bronze/30 hover:shadow-xl hover:shadow-ink/5">
                <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-line transition-colors duration-300 group-hover:text-bronze" aria-hidden />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cream text-bronze transition-all duration-300 group-hover:scale-105 group-hover:bg-ink group-hover:text-white">
                  <Icon name={industry.icon as IconName} className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-base text-ink">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{industry.description}</p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
