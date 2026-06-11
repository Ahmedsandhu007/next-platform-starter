import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { type LegalPage } from "@/lib/content";

/** Shared renderer for the Privacy / Terms / Cookies pages. */
export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} subtitle={page.intro} />
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <BackgroundFX variant="subtle" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{page.updated}</p>

            <div className="mt-10 flex flex-col gap-10">
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
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
