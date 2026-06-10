import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { siteConfig } from "@/lib/content";
import { detailHref, type DetailKind, type DetailPage } from "@/lib/detailContent";

const SECTION_META: Record<DetailKind, { label: string; href: string }> = {
  service: { label: "Services", href: "/services" },
  industry: { label: "Industries", href: "/industries" },
  approach: { label: "How we help", href: "/how-we-help" },
};

/** Shared renderer for every Service / Industry / "How we help" detail page. */
export function DetailPageView({ page }: { page: DetailPage }) {
  const parent = SECTION_META[page.kind];
  const url = `${siteConfig.url}${detailHref(page.kind, page.slug)}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: parent.label, item: `${siteConfig.url}${parent.href}` },
      { "@type": "ListItem", position: 3, name: page.crumb, item: url },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    serviceType: page.crumb,
    areaServed: "GB",
    url,
    provider: {
      "@type": "AccountingService",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.contact.phone,
    },
  };

  const faqSchema = page.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const schemas = [breadcrumbSchema, serviceSchema, faqSchema].filter(Boolean);

  return (
    <>
      <PageHero crumb={page.crumb} parent={parent} title={page.title} subtitle={page.intro} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Main content */}
            <div className="flex flex-col gap-10 lg:col-span-2">
              {page.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display text-xl text-ink sm:text-2xl">{s.heading}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {s.bullets ? (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <p className="border-t border-line pt-6 text-xs leading-relaxed text-muted/80">
                {page.updated}. This page is general guidance, not advice — figures relate to the 2025/26 UK tax year
                and may change. Please get in touch for advice tailored to your circumstances.
              </p>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-cream/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white">
                    <Icon name={page.icon as IconName} className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <p className="font-display text-lg text-ink">What&apos;s included</p>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {page.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={3} aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/contact" variant="primary" withArrow className="mt-6 w-full">
                  Book a Consultation
                </ButtonLink>
              </div>

              {page.related.length ? (
                <div className="rounded-2xl border border-line bg-white p-6">
                  <p className="font-display text-lg text-ink">Related</p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {page.related.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cream"
                        >
                          <span>{r.label}</span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-bronze transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      {page.faqs.length ? (
        <section className="border-y border-line bg-blue py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-bronze">FAQ</p>
              <h2 className="mt-3 text-center font-display text-2xl text-ink sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-10">
                <FaqAccordion faqs={page.faqs} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
