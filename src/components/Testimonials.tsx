"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

function Stars() {
  return (
    <div className="flex items-center gap-1 text-bronze" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28"
      aria-label="Client testimonials"
    >
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Trusted by business owners across the UK"
          subtitle="We measure our success by yours. Here is what a few of the businesses we look after have to say about working with MMR."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3"
        >
          {testimonials.map((t) => (
            <motion.li
              key={t.name}
              variants={staggerItem}
              className="group mb-6 break-inside-avoid border border-line bg-white p-8 transition-colors duration-300 hover:border-ink"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl leading-none text-bronze" aria-hidden>
                  &ldquo;
                </span>
                <Stars />
              </div>

              <blockquote className="mt-2 text-[0.975rem] leading-relaxed text-ink/85">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center bg-ink font-display text-sm text-white"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">{t.name}</span>
                  <span className="text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
