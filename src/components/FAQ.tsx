"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything you might want to know before getting in touch. Can't find your answer? We're only a message away."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <ul className="border-t border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <Reveal as="li" key={faq.question} delay={i * 0.03} className="border-b border-line">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-base font-semibold transition-colors sm:text-lg ${
                          isOpen ? "text-bronze" : "text-ink"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-bronze transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>

          <div className="mt-12 flex flex-col items-center gap-5 border border-line p-8 text-center">
            <p className="font-display text-xl text-ink">Still have a question?</p>
            <p className="max-w-md text-sm text-muted">
              Book a free, no-obligation call and we&apos;ll talk through exactly how MMR can help your business.
            </p>
            <ButtonLink href="/contact" variant="primary" withArrow>
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
