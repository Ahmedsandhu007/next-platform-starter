"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import { easeOut } from "@/lib/motion";
import { copy } from "@/lib/content";

const avatars = ["from-ink to-ink-soft", "from-bronze-500 to-bronze-700", "from-bronze-400 to-bronze-600", "from-ink-soft to-ink"];

export function HeroPremium({ cutoutSrc = null }: { cutoutSrc?: string | null }) {
  const reduce = useReducedMotion();
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } } };
  const item = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy pt-32 pb-28 text-white sm:pt-36 lg:pt-44 lg:pb-36"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.5rem))" }}
    >
      {/* Navy → blue gradient + soft glows + faint dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(85% 120% at 12% 0%, #2f86d8 0%, #1d66ba 46%, #134d92 100%)" }}
        />
        <div className="absolute -right-32 -top-28 h-[34rem] w-[34rem] rounded-full bg-blue/25 blur-3xl motion-safe:animate-[floatY_15s_ease-in-out_infinite]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-bronze/15 blur-3xl" />
        <div className="absolute inset-0 bg-dots opacity-[0.06]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.h1
              variants={item}
              className="text-[2.7rem] leading-[1.02] text-white sm:text-[3.3rem] lg:text-[4rem] xl:text-[4.7rem]"
            >
              {copy.hero.headlineLead}{" "}
              <span className="text-bronze-400">{copy.hero.headlineAccent}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {copy.hero.paragraph}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="bronze" size="lg" withArrow>
                {copy.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="/services" variant="light" size="lg">
                {copy.hero.secondaryCta}
              </ButtonLink>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/15 pt-7">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden>
                  {avatars.map((g, i) => (
                    <span key={i} className={`h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br ${g}`} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-bronze-400" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-sm text-white/70">
                    Rated <span className="font-bold text-white">{copy.hero.ratingScore}</span> {copy.hero.ratingLabel}
                  </p>
                </div>
              </div>
              <span className="hidden h-10 w-px bg-white/20 sm:block" aria-hidden />
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="h-5 w-5 text-bronze-400" strokeWidth={1.75} aria-hidden />
                {copy.hero.badge}
              </span>
            </motion.div>
          </motion.div>

          {/* Right visual: a transparent cut-out (frameless on the navy, like the
              reference) when public/hero.png exists; otherwise the photo, framed. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reduce ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            {cutoutSrc ? (
              <div className="relative">
                {/* soft glow so the cut-out sits naturally on the navy */}
                <div aria-hidden className="absolute inset-x-6 bottom-2 top-8 rounded-[45%] bg-blue/25 blur-3xl" />
                <Image
                  src={cutoutSrc}
                  alt="MMR chartered accountant at work"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  className="relative h-auto w-full drop-shadow-2xl"
                />
              </div>
            ) : (
              <>
                {/* offset accent frame for depth + a bronze tie-in */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl border border-bronze/40 sm:block"
                />
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-700/50 ring-1 ring-white/10">
                  <Image
                    src="/hero.jpg"
                    alt="An accountant reviewing financial dashboards at their desk"
                    width={1536}
                    height={1024}
                    priority
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
