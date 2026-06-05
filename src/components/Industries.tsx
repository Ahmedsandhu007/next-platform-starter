"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { industries } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
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
          className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <motion.li id={industry.slug} key={industry.title} variants={staggerItem} className="scroll-mt-28 border-r border-b border-line bg-white">
              <article className="group relative h-full bg-white p-7">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-bronze transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                <Icon
                  name={industry.icon as IconName}
                  className="h-7 w-7 text-bronze"
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{industry.description}</p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
