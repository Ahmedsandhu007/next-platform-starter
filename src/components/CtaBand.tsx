import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

/** Closing call-to-action band, reused at the foot of every page. */
export function CtaBand() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-bronze">
            <span className="h-px w-8 bg-bronze" aria-hidden />
            <span className="eyebrow">Get started</span>
            <span className="h-px w-8 bg-bronze" aria-hidden />
          </span>
          <h2 className="mt-5 max-w-2xl text-3xl text-ink sm:text-4xl lg:text-[2.7rem] lg:leading-[1.12]">
            Ready to work with an accountant who&apos;s genuinely on your side?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Book a free, no-obligation consultation and we&apos;ll show you exactly how MMR can
            help — with a clear fixed-fee quote and no pressure.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
              Get a Quote
            </ButtonLink>
            <ButtonLink href={phoneHref} variant="ghost" size="lg">
              Call {siteConfig.contact.phoneDisplay}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
