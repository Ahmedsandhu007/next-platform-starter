import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/content";

export function Contact() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  const details = [
    { icon: Phone, label: "Call us", value: siteConfig.contact.phoneDisplay, href: phoneHref },
    { icon: Mail, label: "Email us", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    {
      icon: MapPin,
      label: "Visit us",
      value: `${siteConfig.contact.addressLine}, ${siteConfig.contact.city}, ${siteConfig.contact.postcode}`,
    },
    { icon: Clock, label: "Opening hours", value: siteConfig.contact.hours },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Info */}
          <div>
            <Reveal>
              <span className="flex items-center gap-3 text-bronze">
                <span className="h-px w-8 bg-bronze" aria-hidden />
                <span className="eyebrow">Get in touch</span>
              </span>
              <h2 className="mt-5 text-3xl text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                Let&apos;s talk numbers
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                Tell us a little about your business and we&apos;ll come back with a clear,
                fixed-fee quote — usually within one business day. No pressure, no jargon.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-9 divide-y divide-line border-y border-line">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4 py-5">
                    <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-bronze" strokeWidth={1.4} aria-hidden />
                    <div>
                      <p className="eyebrow text-muted">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1 block text-base font-semibold text-ink transition-colors hover:text-bronze"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base font-semibold text-ink">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 inline-flex items-center gap-2.5 border border-bronze px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-bronze opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
                </span>
                <span className="eyebrow text-bronze">Accepting new clients this quarter</span>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.06} y={28}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
