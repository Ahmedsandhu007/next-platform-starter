import Link from "next/link";
import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Banner header for sub-pages: breadcrumb + Didone title + subtitle. */
export function PageHero({
  title,
  subtitle,
  crumb,
  parent,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  crumb: string;
  /** Optional middle breadcrumb (e.g. Home / Services / This page). */
  parent?: { label: string; href: string };
}) {
  return (
    <section className="relative border-b border-line bg-white pt-32 pb-14 sm:pt-36 sm:pb-16">
      <Container>
        <Reveal>
          <nav className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em]" aria-label="Breadcrumb">
            <Link href="/" className="text-muted transition-colors hover:text-bronze">
              Home
            </Link>
            <span className="text-bronze" aria-hidden>
              /
            </span>
            {parent ? (
              <>
                <Link href={parent.href} className="text-muted transition-colors hover:text-bronze">
                  {parent.label}
                </Link>
                <span className="text-bronze" aria-hidden>
                  /
                </span>
              </>
            ) : null}
            <span className="text-ink">{crumb}</span>
          </nav>

          <h1 className="mt-7 max-w-3xl text-4xl text-ink sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
