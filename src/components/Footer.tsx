import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { socialLinks } from "@/components/ui/social";
import { navLinks, services, siteConfig } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <footer className="relative overflow-hidden bg-ink text-white/65">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-bronze/10 blur-3xl" aria-hidden />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" size="md" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Chartered-standard accountants helping ambitious UK businesses keep more of what
              they earn — with proactive advice and transparent fixed fees.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact" variant="bronze" withArrow>
                Book a Consultation
              </ButtonLink>
            </div>
            <div className="mt-7 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-white/60 ring-1 ring-white/10 transition-all duration-300 hover:bg-bronze hover:text-white hover:ring-bronze"
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="eyebrow text-bronze-400">Services</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {services.map((s) => (
                <li key={s.title}>
                  <Link href={`/services#${s.slug}`} className="text-white/60 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className="eyebrow text-bronze-400">Quick Links</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-white/60 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-bronze-400">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze-400" strokeWidth={1.75} aria-hidden />
                <a href={phoneHref} className="text-white/80 transition-colors hover:text-white">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze-400" strokeWidth={1.75} aria-hidden />
                <a href={`mailto:${siteConfig.contact.email}`} className="break-all text-white/80 transition-colors hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze-400" strokeWidth={1.75} aria-hidden />
                <span className="text-white/80">
                  {siteConfig.contact.addressLine}, {siteConfig.contact.city}, {siteConfig.contact.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/40">
          <p className="max-w-4xl">
            {siteConfig.name}{" "}Ltd is registered in England &amp; Wales (Company No. 12345678).
            Registered office: {siteConfig.contact.addressLine}, {siteConfig.contact.city},{" "}
            {siteConfig.contact.postcode}. A firm of accountants regulated for a range of investment
            business activities; ACCA-registered. Content on this website is for general guidance
            only and does not constitute professional advice.
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p>© {year} {siteConfig.name} Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-white">Terms</a>
              <a href="#" className="transition-colors hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
