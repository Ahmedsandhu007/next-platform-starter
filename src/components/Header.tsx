"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, Plus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop nav with dropdowns */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              if (!link.children) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-ink ${
                      active ? "text-bronze" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-ink ${
                      active ? "text-bronze" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 text-bronze transition-transform duration-300 group-hover:rotate-180" aria-hidden />
                  </Link>
                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="w-72 border border-line bg-white p-2 shadow-xl shadow-ink/5">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-white hover:text-bronze"
                          >
                            <span className="h-1 w-1 shrink-0 bg-bronze" aria-hidden />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={phoneHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-bronze"
            >
              <Phone className="h-4 w-4 text-bronze" aria-hidden />
              {siteConfig.contact.phoneDisplay}
            </a>
            <ButtonLink href="/contact" variant="primary" withArrow>
              Get a Quote
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <Container className="py-4">
              <nav className="flex flex-col divide-y divide-line" aria-label="Mobile">
                {navLinks.map((link) => (
                  <div key={link.href} className="py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="py-3 font-sans text-sm font-medium uppercase tracking-[0.12em] text-ink"
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <button
                          type="button"
                          aria-label={`Toggle ${link.label} submenu`}
                          aria-expanded={openSub === link.href}
                          onClick={() => setOpenSub(openSub === link.href ? null : link.href)}
                          className="grid h-9 w-9 place-items-center text-bronze"
                        >
                          <Plus
                            className={`h-4 w-4 transition-transform duration-300 ${
                              openSub === link.href ? "rotate-45" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {link.children && openSub === link.href && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pb-2 pl-3"
                        >
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 py-2.5 text-sm text-ink/75"
                              >
                                <span className="h-1 w-1 shrink-0 bg-bronze" aria-hidden />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="flex flex-col gap-4 pt-5">
                  <a href={phoneHref} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    <Phone className="h-4 w-4 text-bronze" aria-hidden />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <ButtonLink href="/contact" variant="primary" withArrow onClick={() => setOpen(false)} className="w-full">
                    Get a Quote
                  </ButtonLink>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
