"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, FileCheck2, Gauge, RefreshCcw, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpotArt } from "@/components/ui/SpotArt";

const features = [
  { icon: Gauge, title: "Real-time dashboards", desc: "See cash flow, profit and tax the moment money moves." },
  { icon: FileCheck2, title: "Making Tax Digital ready", desc: "Fully MTD-compliant filing for VAT and beyond." },
  { icon: Smartphone, title: "Snap receipts on mobile", desc: "Photograph a receipt and we file it automatically." },
  { icon: RefreshCcw, title: "Automatic bank feeds", desc: "Transactions reconciled daily — no manual entry." },
];

export function CloudAccounting() {
  const reduce = useReducedMotion();
  return (
    <section id="cloud" className="relative scroll-mt-24 overflow-hidden border-b border-line bg-cream/40 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:mx-0">
              <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-bronze/10 blur-2xl" aria-hidden />
              <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-ink/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-ink">Cloud dashboard</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-bronze">
                    <span className="h-1.5 w-1.5 rounded-full bg-bronze" /> Live
                  </span>
                </div>
                <div className="mt-4 rounded-2xl bg-cream p-4">
                  <SpotArt name="cloud" className="mx-auto max-w-[240px]" />
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Bank feed reconciled", value: "Today" },
                    { label: "VAT return filed", value: "On time" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
                      <span className="flex items-center gap-2.5 text-sm text-ink/80">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-bronze-50 text-bronze">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        </span>
                        {row.label}
                      </span>
                      <span className="text-sm font-bold text-ink">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute -right-4 -top-4 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lg sm:block"
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-bronze" aria-hidden />
                  <span className="text-xs font-bold text-ink">Receipt captured</span>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="flex items-center gap-3 text-bronze">
                <span className="h-px w-8 bg-bronze" aria-hidden />
                <span className="eyebrow">Cloud accounting</span>
              </span>
              <h2 className="mt-5 text-3xl text-ink sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
                Your finances, live and in the cloud
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                We set up and run market-leading cloud software for you, so your numbers are always
                up to date, always backed up, and available wherever you are — on any device.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={i * 0.08} className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-bronze">
                    <f.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1} className="mt-9">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Move to the Cloud
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
