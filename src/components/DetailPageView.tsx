import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { CtaBand } from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { type Name as SpotArtName } from "@/components/ui/SpotArt";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { siteConfig } from "@/lib/content";
import { detailHref, type DetailKind, type DetailPage } from "@/lib/detailContent";

const SECTION_META: Record<DetailKind, { label: string; href: string }> = {
  service: { label: "Services", href: "/services" },
  industry: { label: "Industries", href: "/industries" },
  approach: { label: "How we help", href: "/how-we-help" },
};

/** Map detail-page slugs to a fitting spot illustration; industries fall back
 *  to the page's own icon (there's no sector-specific illustration). */
const ART_BY_SLUG: Record<string, SpotArtName> = {
  bookkeeping: "bookkeeping",
  "tax-planning": "tax",
  vat: "vat",
  payroll: "payroll",
  "company-formation": "formation",
  advisory: "advisory",
  "proactive-tax-planning": "tax",
  "cloud-accounting": "cloud",
  "advisory-partnership": "advisory",
};

/** Pick a relevant icon for a content card from its heading keywords, so the
 *  grid reads like the reference (a distinct icon per card) rather than a wall
 *  of prose. Falls back to the page's own icon. */
const ICON_RULES: [RegExp, IconName][] = [
  [/cloud|software|digital|mtd|online|app|dashboard/, "Cloud"],
  [/deadline|companies house|hmrc|file|filing|penalt|complian|submit|register/, "ShieldCheck"],
  [/vat|making tax digital/, "Percent"],
  [/payroll|employee|staff|pension|paye|wage|auto.?enrol/, "Users"],
  [/director|self.?assessment|self assessment|personal tax/, "UserRound"],
  [/tax|return|relief|allowance|deduct|cis|ir35/, "Receipt"],
  [/advis|grow|plan|strateg|decision|forecast|scal|profit|kpi/, "TrendingUp"],
  [/report|standard|statement|ledger|record|bookkeep|reconcil|account/, "BookOpen"],
  [/form|incorporat|company|setup|set up|start|structure/, "Building2"],
  [/cash|fund|invoice|payment|money|fee|price|cost|budget/, "BadgePoundSterling"],
  [/support|help|advice|partner|relationship|contact|talk/, "MessagesSquare"],
];

function sectionIcon(heading: string, fallback: IconName): IconName {
  const h = heading.toLowerCase();
  for (const [re, name] of ICON_RULES) if (re.test(h)) return name;
  return fallback;
}

/** Shared renderer for every Service / Industry / "How we help" detail page. */
export function DetailPageView({ page }: { page: DetailPage }) {
  const parent = SECTION_META[page.kind];
  const art = ART_BY_SLUG[page.slug];
  const pageIcon = page.icon as IconName;
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
      <PageHero
        crumb={page.crumb}
        parent={parent}
        title={page.title}
        subtitle={page.intro}
        art={art}
        icon={art ? undefined : pageIcon}
      />

      {/* Content as an icon-card grid (not a wall of prose) */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <BackgroundFX variant="subtle" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-bronze">{page.eyebrow}</p>
            <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">What&apos;s involved</h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              Here&apos;s exactly what&apos;s involved — and how your own named accountant handles each part for you.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7" data-reveal-stagger>
            {page.sections.map((s) => (
              <article
                key={s.heading}
                className="group flex flex-col items-center rounded-2xl border border-line bg-white p-7 text-center shadow-sm shadow-ink/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-bronze/30 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-blue text-bronze transition-all duration-300 group-hover:bg-ink group-hover:text-white group-hover:shadow-lg group-hover:shadow-ink/15">
                  <Icon name={sectionIcon(s.heading, pageIcon)} className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg text-ink">{s.heading}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.body[0]}</p>
              </article>
            ))}
          </div>

          {/* What's included — quick checklist + CTA */}
          {page.highlights.length ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-cream/50 p-8 sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                <div className="lg:max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white">
                      <Icon name={pageIcon} className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <h2 className="font-display text-xl text-ink sm:text-2xl">What&apos;s included</h2>
                  </div>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {page.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={3} aria-hidden />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink href="/contact" variant="primary" size="lg" withArrow className="shrink-0">
                  Book a Consultation
                </ButtonLink>
              </div>
            </div>
          ) : null}

          {/* Related internal links */}
          {page.related.length ? (
            <div className="mt-14">
              <h2 className="font-display text-lg text-ink">Related</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {page.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/30 hover:shadow-lg hover:shadow-ink/5"
                  >
                    <span>{r.label}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-bronze transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted/80">
            {page.updated}. This page is general guidance, not advice — figures relate to the 2025/26 UK tax year
            and may change. Please get in touch for advice tailored to your circumstances.
          </p>
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
