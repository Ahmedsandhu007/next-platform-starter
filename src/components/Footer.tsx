import { type SVGProps } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks, services, siteConfig } from "@/lib/content";

/* Brand marks — lucide no longer ships logo icons, so these are inline SVGs. */
function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26L23 21.75h-6.66l-5.21-6.82-5.96 6.82H1.86l7.73-8.84L1 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.04z" />
    </svg>
  );
}
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.07 24 18.1 24 12.07z" />
    </svg>
  );
}

const socials = [
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: siteConfig.social.twitter, label: "X (Twitter)" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo tone="dark" size="md" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Chartered accountants helping ambitious UK businesses keep more of what they
              earn — with proactive advice and transparent fixed fees.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Book a Consultation
              </ButtonLink>
            </div>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors duration-300 hover:border-bronze hover:text-bronze"
                >
                  <s.icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="eyebrow text-bronze">Services</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="/services" className="text-muted transition-colors hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="eyebrow text-bronze">Company</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/contact" className="text-muted transition-colors hover:text-ink">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-bronze">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze" strokeWidth={1.5} aria-hidden />
                <a href={phoneHref} className="text-ink transition-colors hover:text-bronze">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze" strokeWidth={1.5} aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all text-ink transition-colors hover:text-bronze"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-bronze" strokeWidth={1.5} aria-hidden />
                <span className="text-ink">
                  {siteConfig.contact.addressLine}, {siteConfig.contact.city}, {siteConfig.contact.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-xs text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.name} Ltd. Registered in England &amp; Wales. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-bronze">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-bronze">Terms</a>
            <a href="#" className="transition-colors hover:text-bronze">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
