"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { HeroIllustration } from "@/components/HeroIllustration";
import { easeOut } from "@/lib/motion";
import { copy } from "@/lib/content";

const avatars = ["from-ink to-ink-soft", "from-bronze-500 to-bronze-700", "from-bronze-400 to-bronze-600", "from-ink-soft to-ink"];

export function HeroPremium() {
  const reduce = useReducedMotion();
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } } };
  const item = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      <BackgroundFX variant="hero" />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.h1
              variants={item}
              className="text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
            >
              {copy.hero.headlineLead}{" "}
              <span className="text-bronze">{copy.hero.headlineAccent}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {copy.hero.paragraph}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
                {copy.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" size="lg">
                {copy.hero.secondaryCta}
              </ButtonLink>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-7">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden>
                  {avatars.map((g, i) => (
                    <span key={i} className={`h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br ${g}`} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-bronze" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    Rated <span className="font-bold text-ink">{copy.hero.ratingScore}</span> {copy.hero.ratingLabel}
                  </p>
                </div>
              </div>
              <span className="hidden h-10 w-px bg-line sm:block" aria-hidden />
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <ShieldCheck className="h-5 w-5 text-bronze" strokeWidth={1.75} aria-hidden />
                {copy.hero.badge}
              </span>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reduce ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
