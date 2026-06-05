"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, FileCheck2, Gauge, RefreshCcw, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

const features = [
  { icon: Gauge, title: "Real-time dashboards", desc: "See cash flow, profit and tax the moment money moves." },
  { icon: FileCheck2, title: "Making Tax Digital ready", desc: "Fully MTD-compliant filing for VAT and beyond." },
  { icon: Smartphone, title: "Snap receipts on mobile", desc: "Photograph a receipt and we file it automatically." },
  { icon: RefreshCcw, title: "Automatic bank feeds", desc: "Transactions reconciled daily — no manual entry." },
];

const ledger = [
  { label: "Sales invoice · Acme Ltd", value: "+ £4,200" },
  { label: "Subscription · Xero", value: "− £32" },
  { label: "VAT set aside", value: "£3,120" },
  { label: "Payroll · June", value: "− £18,400" },
];

export function CloudAccounting() {
  return (
    <section id="cloud" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal className="order-2 lg:order-1">
            <LedgerCard />
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="flex items-center gap-3 text-bronze">
                <span className="h-px w-8 bg-bronze" aria-hidden />
                <span className="eyebrow">Cloud accounting</span>
              </span>
              <h2 className="mt-5 text-3xl text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                Your finances, live and in the cloud
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                We set up and run market-leading cloud software for you, so your numbers are
                always up to date, always backed up, and available wherever you are — on any
                device, at any time.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={i * 0.08} className="flex items-start gap-4">
                  <f.icon className="mt-0.5 h-6 w-6 shrink-0 text-bronze" strokeWidth={1.4} aria-hidden />
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-ink">{f.title}</h3>
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

function LedgerCard() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-full max-w-md border border-ink bg-white p-7 sm:p-8 lg:mx-0">
      <div className="flex items-center justify-between">
        <LogoMark className="text-xl" />
        <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
          <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden /> Updated now
        </span>
      </div>

      <div className="mt-5 h-px w-full bg-bronze" />
      <p className="eyebrow mt-5 text-muted">Cloud ledger · Reconciled</p>

      <ul className="mt-4 divide-y divide-line border-y border-line">
        {ledger.map((row, i) => (
          <motion.li
            key={row.label}
            className="flex items-center justify-between py-3.5"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
          >
            <span className="flex items-center gap-3 text-sm text-ink/80">
              <span className="grid h-5 w-5 place-items-center border border-bronze text-bronze">
                <Check className="h-3 w-3" strokeWidth={2} aria-hidden />
              </span>
              {row.label}
            </span>
            <span className="font-display text-base text-ink">{row.value}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between">
        <span className="eyebrow text-muted">Cash at bank</span>
        <span className="font-display text-3xl text-ink">£86,250</span>
      </div>
    </div>
  );
}
