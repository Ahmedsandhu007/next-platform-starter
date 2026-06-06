import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DotCluster, RingAccent } from "@/components/ui/Decorations";
import { siteConfig } from "@/lib/content";

/** High-contrast conversion band — a dark panel with bronze glow + decorations. */
export function CtaBand() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 lg:py-20">
          {/* glow + decorations */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-bronze/25 blur-3xl" />
            <div className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-bronze/15 blur-3xl" />
          </div>
          <DotCluster className="absolute right-8 top-8 hidden h-16 w-16 opacity-50 sm:block" />
          <RingAccent className="absolute -bottom-6 left-8 hidden h-28 w-28 sm:block" />

          <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="flex items-center gap-3 text-bronze-400">
              <span className="h-px w-8 bg-bronze-400" aria-hidden />
              <span className="eyebrow">Get started</span>
              <span className="h-px w-8 bg-bronze-400" aria-hidden />
            </span>
            <h2 className="mt-5 text-3xl text-white sm:text-4xl lg:text-[2.9rem] lg:leading-[1.1]">
              Ready to work with an accountant who&apos;s genuinely on your side?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Book a free, no-obligation consultation and we&apos;ll show you exactly how MMR can
              help — with a clear fixed-fee quote and no pressure.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="bronze" size="lg" withArrow>
                Book a Free Consultation
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="light" size="lg">
                Call {siteConfig.contact.phoneDisplay}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
