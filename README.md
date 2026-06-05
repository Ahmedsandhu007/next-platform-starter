# MMR Accountants — Marketing Website

A premium, fully responsive marketing site for a UK chartered accountancy firm,
built with the modern Next.js App Router. Direction 4 — "Contemporary Private
Equity": a pure-white background with charcoal black (`#1A1A1A`) and rich bronze
(`#8B6A3D`) accents, an editorial Bodoni Moda (Didone) display face, hairline
rules, smooth scroll animations and a strong SEO/accessibility baseline.

## Tech stack

- **Next.js 16** (App Router, TypeScript, static prerendering)
- **Tailwind CSS v4** (CSS-first theme tokens)
- **Framer Motion** (scroll reveals, staggered cards, animated counters, accordion)
- **Lucide Icons**

## Pages

Seven routes share one layout (header, footer, side rails, contact dock):

- `/` — home: photographic hero with an inline **Get-a-Quote form**, then trusted-by,
  services, why MMR, industries, cloud, process, testimonials, FAQ and a closing CTA.
- `/services`, `/why-mmr`, `/industries`, `/how-we-work`, `/faq`, `/contact` — each a
  focused page with a breadcrumb banner (`PageHero`) and the relevant sections.

The navbar uses **dropdown mega-menus** (desktop hover panels / mobile accordion);
dropdown items deep-link to anchored sections (e.g. `/services#payroll`).

**Floating chrome:** a left social rail, a right "Get a Quote" tab, a back-to-top
button, and a bottom-right **contact speed-dial** that fans out *Call us* + *Live chat*
(the scripted assistant) on hover/tap. Decorative bronze "seal" sticker on the hero.

## Getting started

> **Note for this machine:** Node 22 is installed at `C:\Program Files\nodejs`
> but is not on the system `PATH`, and the network does SSL inspection. The
> commands below prepend Node to `PATH` and tell Node to trust the Windows
> certificate store (`--use-system-ca`), which is only needed when installing
> packages or downloading fonts.

```powershell
$env:Path = "C:\Program Files\nodejs;$env:Path"
$env:NODE_OPTIONS = "--use-system-ca"

npm install        # install dependencies
npm run dev        # start the dev server  -> http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
```

If Node is already on your `PATH` and you are on a normal network, the plain
`npm run dev` / `npm run build` commands work without the two `$env:` lines.

A helper script, `preview-start.cmd`, launches the already-built production server
on port 3100 (used by the editor preview).

## Project structure

```
src/
  app/
    layout.tsx            Shared chrome (Header, Footer, rails, ContactDock) + SEO + JSON-LD
    page.tsx              Home
    services/, why-mmr/, industries/, how-we-work/, faq/, contact/   page routes
    globals.css           Tailwind v4 theme (charcoal/bronze palette, fonts, keyframes)
    sitemap.ts · robots.ts · opengraph-image.tsx
  components/
    Header (mega-menu), HeroPhoto + QuoteFormMini, PageHero, CtaBand,
    TrustedBy, Services, WhyChoose, Industries, CloudAccounting, HowWeWork,
    Testimonials, FAQ, Contact + ContactForm, Footer,
    ContactDock + ChatPanel, SocialRail, QuoteTab, ScrollTop
    ui/                   Reveal, AnimatedCounter, Container, Button,
                          SectionHeading, Icon, Logo, Seal
  lib/
    content.ts            All copy + nav config (single source of truth)
    motion.ts             Shared Framer Motion variants
```

## Customising

- **Copy, services, FAQs, contact details** -> `src/lib/content.ts`
- **Brand colours, fonts, animations** -> the `@theme` block in `src/app/globals.css`
- **Domain / SEO** -> `siteConfig.url` in `content.ts` (drives metadata, sitemap, OG, JSON-LD)

## Notes

- **Hero variants.** The page uses `HeroPhoto` (a framed client-meeting photograph).
  Swap it for `Hero` in `src/app/page.tsx` to use the monochrome "statement card"
  version instead — both components are kept.
- **Hero image.** `public/hero.jpg` (sourced from Pexels — free licence, no
  attribution required). An architectural alternate is at `public/hero-architecture.jpg`;
  point the `<Image src>` in `HeroPhoto.tsx` at it to switch. Served and optimised
  via `next/image` (`sharp`).
- The contact form validates on the client and shows a success state. It is **not**
  wired to a backend — connect `handleSubmit` in `src/components/ContactForm.tsx`
  to a route handler or service (e.g. Resend, Formspree) to actually deliver mail.
- All animations respect `prefers-reduced-motion`.
- The page is fully static-prerendered for fast loading and strong Lighthouse scores.
