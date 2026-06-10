/**
 * Central content + configuration for the MMR Accountants site.
 * Keeping copy here keeps components clean and lets JSON-LD / nav reuse the same source.
 * All copy below is original.
 */
import reviewsData from "@/content/reviews.json";
import settingsData from "@/content/settings.json";
import copyData from "@/content/copy.json";
import type { Review } from "@/lib/cms/schemas";
import type { SiteSettings, SiteCopy } from "@/lib/cms/siteSchema";

/** Site identity, contact details, both offices, social + hero image.
 *  CMS-editable in src/content/settings.json. */
export const siteConfig: SiteSettings = settingsData as SiteSettings;

export type ServiceArt = "tax" | "cloud" | "advisory" | "bookkeeping" | "vat" | "payroll" | "formation";

export type Service = {
  slug: string;
  art: ServiceArt;
  icon: string; // lucide icon name (resolved in the component)
  title: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "bookkeeping",
    art: "bookkeeping",
    icon: "BookOpen",
    title: "Bookkeeping & Annual Accounts",
    description:
      "Real-time books kept tidy every week, with year-end accounts filed accurately and well ahead of deadline.",
    points: ["Cloud bookkeeping", "Year-end accounts", "Companies House filing"],
  },
  {
    slug: "tax-planning",
    art: "tax",
    icon: "Receipt",
    title: "Tax Planning & Returns",
    description:
      "Forward-looking corporation and personal tax planning that keeps more of your profit where it belongs — with you.",
    points: ["Corporation tax", "Self assessment", "Dividend strategy"],
  },
  {
    slug: "vat",
    art: "vat",
    icon: "Percent",
    title: "VAT & Making Tax Digital",
    description:
      "MTD-compliant VAT handled end to end — the right scheme, accurate returns and never a missed submission.",
    points: ["VAT registration", "Quarterly returns", "Scheme reviews"],
  },
  {
    slug: "payroll",
    art: "payroll",
    icon: "Users",
    title: "Payroll & Pensions",
    description:
      "Fully managed RTI payroll and auto-enrolment so your team is paid correctly and on time, every single month.",
    points: ["RTI payroll", "Auto-enrolment", "Payslips & P60s"],
  },
  {
    slug: "company-formation",
    art: "formation",
    icon: "Building2",
    title: "Company Formation & Secretarial",
    description:
      "Start right with fast company set-up, registered office and confirmation statements handled on your behalf.",
    points: ["Company set-up", "Registered office", "Confirmation statements"],
  },
  {
    slug: "advisory",
    art: "advisory",
    icon: "TrendingUp",
    title: "Business Advisory & Growth",
    description:
      "Management accounts, cash-flow forecasting and a dedicated adviser who helps you make confident decisions.",
    points: ["Management accounts", "Cash-flow forecasts", "Growth strategy"],
  },
];

export type WhyPoint = {
  icon: string;
  title: string;
  description: string;
};

export const whyPoints: WhyPoint[] = [
  {
    icon: "Award",
    title: "ACCA Qualified",
    description:
      "Chartered-standard, ACCA-qualified accountants held to the highest professional and ethical standards.",
  },
  {
    icon: "BadgePoundSterling",
    title: "Transparent Pricing",
    description:
      "Fixed monthly fees agreed up front — no hourly billing, no hidden charges and no surprise invoices.",
  },
  {
    icon: "UserRound",
    title: "Dedicated Accountant",
    description:
      "A named accountant who knows your business by name and is only ever a phone call away.",
  },
  {
    icon: "Zap",
    title: "Fast Turnaround",
    description:
      "Accounts and returns delivered ahead of deadline, with a reply to every question within one business day.",
  },
  {
    icon: "Cloud",
    title: "Cloud Accounting Experts",
    description:
      "Certified partners in Xero, QuickBooks and Sage — your numbers kept live and reconciled in real time.",
  },
  {
    icon: "MapPin",
    title: "UK Business Specialists",
    description:
      "Deep expertise in UK tax, IR35, VAT and CIS, supporting established businesses the length of the country.",
  },
];

export type ValueProp = {
  slug: string;
  art: "tax" | "cloud" | "advisory" | "bookkeeping";
  title: string;
  description: string;
};

/** Illustrated value props (replaces the numeric stats band on the home page) */
export const valueProps: ValueProp[] = [
  {
    slug: "proactive-tax-planning",
    art: "tax",
    title: "Proactive tax planning",
    description:
      "We don't simply file your taxes — we plan ahead all year to legally lower your bill and keep more profit where it belongs.",
  },
  {
    slug: "cloud-accounting",
    art: "cloud",
    title: "Cloud-first, always current",
    description:
      "Your books live in the cloud and reconcile daily, so you always know exactly where your business stands.",
  },
  {
    slug: "advisory-partnership",
    art: "advisory",
    title: "Advice that compounds",
    description:
      "A dedicated adviser who turns your numbers into confident decisions on pricing, cash flow and growth.",
  },
];

export type Industry = {
  slug: string;
  icon: string;
  title: string;
  description: string;
};

export const industries: Industry[] = [
  { slug: "contractors", icon: "Laptop", title: "Contractors & Freelancers", description: "IR35-aware advice and take-home that works." },
  { slug: "ecommerce", icon: "ShoppingCart", title: "E-commerce & Retail", description: "Multi-channel sales, stock and VAT, simplified." },
  { slug: "startups", icon: "Rocket", title: "Startups & Tech", description: "Investor-ready accounts and R&D tax relief." },
  { slug: "landlords", icon: "Home", title: "Landlords & Property", description: "Portfolio structuring and property tax planning." },
  { slug: "hospitality", icon: "UtensilsCrossed", title: "Hospitality", description: "Tight margins managed with clear weekly numbers." },
  { slug: "healthcare", icon: "Stethoscope", title: "Healthcare & Locums", description: "Specialist support for medical professionals." },
  { slug: "construction", icon: "HardHat", title: "Construction & CIS", description: "CIS deductions and subcontractor returns handled." },
  { slug: "creative", icon: "Palette", title: "Creative & Agencies", description: "Project profitability and cash flow you can see." },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Free discovery call",
    description:
      "We learn about your business, your goals and your numbers — then give you a clear, no-obligation quote.",
    icon: "PhoneCall",
  },
  {
    step: "02",
    title: "Seamless onboarding",
    description:
      "We handle the switch from your old accountant, set up your cloud software and get everything in order.",
    icon: "Settings2",
  },
  {
    step: "03",
    title: "We manage the numbers",
    description:
      "Bookkeeping, tax, payroll and deadlines run quietly in the background while you focus on the business.",
    icon: "LineChart",
  },
  {
    step: "04",
    title: "You grow with insight",
    description:
      "Regular reviews and proactive advice keep you ahead — so every decision is backed by real data.",
    icon: "Sparkles",
  },
];

/** Google reviews + rating summary — CMS-editable in src/content/reviews.json */
export type { Review } from "@/lib/cms/schemas";
export const reviews: Review[] = reviewsData.reviews as Review[];
export const reviewsMeta = {
  eyebrow: reviewsData.eyebrow,
  title: reviewsData.title,
  intro: reviewsData.intro,
  rating: reviewsData.rating,
};

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How much do your accountancy services cost?",
    answer:
      "Every business is different, so we build a fixed monthly package around exactly what you need — accounts, tax, payroll, VAT and advice. You will always know the price before you commit, with no hidden hourly charges. Most limited company packages start from a clear, affordable monthly fee.",
  },
  {
    question: "Is it difficult to switch from my current accountant?",
    answer:
      "Not at all. We handle the entire move for you. With your permission we contact your previous accountant, request your records under standard professional clearance, and transfer everything across. The process is paperless and usually takes just a few days.",
  },
  {
    question: "Which cloud accounting software do you use?",
    answer:
      "We are partners with the leading platforms including Xero, QuickBooks, FreeAgent and Sage. We will recommend the best fit for your business, set it up, migrate your data and train you on the parts you want to use yourself.",
  },
  {
    question: "Do you work with businesses outside London?",
    answer:
      "Yes. We support clients right across the UK. Because everything runs in the cloud, you get the same proactive service whether you are around the corner or in another city — by video call, phone and email.",
  },
  {
    question: "Will I have a dedicated accountant?",
    answer:
      "Always. You are introduced to a named, qualified accountant who looks after your account year-round and gets to know your business. You will not be passed between a call centre or a different person each time you get in touch.",
  },
  {
    question: "Are you regulated and insured?",
    answer:
      "Yes. MMR Accountants is a chartered practice held to strict professional standards, and we carry full professional indemnity insurance for your complete peace of mind.",
  },
];

export const businessTypes = [
  "Limited company",
  "Sole trader",
  "Contractor / freelancer",
  "Partnership / LLP",
  "Startup",
  "Landlord",
  "Other",
] as const;

/** Animated counters in the “Trusted by UK Businesses” band */
export const trustStats = [
  { value: 1200, suffix: "+", label: "UK businesses supported" },
  { value: 4.6, suffix: "M", prefix: "£", label: "In tax legally saved for clients", decimals: 1 },
  { value: 15, suffix: "+", label: "Years of chartered experience" },
  { value: 98, suffix: "%", label: "Client retention, year on year" },
] as const;

/** Regulators & software platforms — trust badges under the hero. (Professional-
 *  body accreditations ICAEW / ACCA / AAT are shown in the Testimonials section
 *  instead, so ACCA is not duplicated here.) */
export const partners = ["Companies House", "HMRC", "Xero", "QuickBooks", "FreeAgent", "Sage"] as const;

/** Headline statistics — animated with react-countup on scroll */
export const stats = [
  { end: 5000, suffix: "+", label: "Tax returns filed" },
  { end: 98, suffix: "%", label: "Client retention" },
  { end: 15, suffix: "+", label: "Years of experience" },
  { end: 1000, suffix: "+", label: "Businesses supported" },
] as const;

/* ============================================================
   Navigation — routes with dropdown children (anchor into pages)
   ============================================================ */
export type NavChild = { label: string; href: string };
export type MegaItem = { title: string; description: string; icon: string; href: string };
export type MegaCategory = { label: string; icon: string; items: MegaItem[] };
export type NavLink = { label: string; href: string; children?: NavChild[]; mega?: MegaCategory[] };

/** Two-pane "Services" mega-menu: left categories, right cards (reference-style layout). */
export const serviceMenu: MegaCategory[] = [
  {
    label: "Accounts & Compliance",
    icon: "BookOpen",
    items: [
      { title: "Bookkeeping & Annual Accounts", description: "Tidy cloud books and year-end accounts, filed early.", icon: "BookOpen", href: "/services/bookkeeping" },
      { title: "VAT & Making Tax Digital", description: "The right scheme, accurate returns, no missed deadlines.", icon: "Percent", href: "/services/vat" },
      { title: "Payroll & Pensions", description: "Fully managed RTI payroll and auto-enrolment.", icon: "Users", href: "/services/payroll" },
    ],
  },
  {
    label: "Tax & Advisory",
    icon: "TrendingUp",
    items: [
      { title: "Tax Planning & Returns", description: "Forward-looking planning that protects your profit.", icon: "Receipt", href: "/services/tax-planning" },
      { title: "Business Advisory & Growth", description: "Management accounts, forecasts and a dedicated adviser.", icon: "LineChart", href: "/services/advisory" },
      { title: "Company Formation", description: "Fast set-up, registered office and secretarial.", icon: "Building2", href: "/services/company-formation" },
    ],
  },
  {
    label: "Industries We Serve",
    icon: "Building2",
    items: [
      { title: "Contractors & Freelancers", description: "IR35-aware advice and take-home that works.", icon: "Laptop", href: "/industries/contractors" },
      { title: "Startups & Tech", description: "Investor-ready accounts and R&D tax relief.", icon: "Rocket", href: "/industries/startups" },
      { title: "Construction & CIS", description: "CIS deductions and subcontractor returns handled.", icon: "HardHat", href: "/industries/construction" },
      { title: "Landlords & Property", description: "Portfolio structuring and property tax planning.", icon: "Home", href: "/industries/landlords" },
    ],
  },
];

export const whyMenu: MegaCategory[] = [
  {
    label: "Our promise",
    icon: "Award",
    items: [
      { title: "ACCA & ICAEW qualified", description: "Chartered-standard, regulated and fully insured.", icon: "Award", href: "/why-mmr#why" },
      { title: "Transparent fixed fees", description: "Agreed up front — no hidden charges.", icon: "BadgePoundSterling", href: "/why-mmr#why" },
      { title: "Your own accountant", description: "A named adviser who knows your business.", icon: "UserRound", href: "/why-mmr#why" },
    ],
  },
  {
    label: "What you get",
    icon: "Sparkles",
    items: [
      { title: "Fast turnaround", description: "A reply to every query within one business day.", icon: "Zap", href: "/why-mmr#why" },
      { title: "Cloud experts", description: "Certified in Xero, QuickBooks and Sage.", icon: "Cloud", href: "/why-mmr#why" },
      { title: "Client stories", description: "See what UK businesses say about us.", icon: "MessagesSquare", href: "/why-mmr#testimonials" },
    ],
  },
];

export const industryMenu: MegaCategory[] = [
  {
    label: "Professional & digital",
    icon: "Laptop",
    items: [
      { title: "Contractors & Freelancers", description: "IR35-aware advice and take-home that works.", icon: "Laptop", href: "/industries/contractors" },
      { title: "Startups & Tech", description: "Investor-ready accounts and R&D tax relief.", icon: "Rocket", href: "/industries/startups" },
      { title: "Creative & Agencies", description: "Project profitability and cash flow you can see.", icon: "Palette", href: "/industries/creative" },
      { title: "Healthcare & Locums", description: "Specialist support for medical professionals.", icon: "Stethoscope", href: "/industries/healthcare" },
    ],
  },
  {
    label: "Trade & property",
    icon: "Building2",
    items: [
      { title: "E-commerce & Retail", description: "Multi-channel sales, stock and VAT, simplified.", icon: "ShoppingCart", href: "/industries/ecommerce" },
      { title: "Hospitality", description: "Tight margins managed with clear weekly numbers.", icon: "UtensilsCrossed", href: "/industries/hospitality" },
      { title: "Construction & CIS", description: "CIS deductions and subcontractor returns handled.", icon: "HardHat", href: "/industries/construction" },
      { title: "Landlords & Property", description: "Portfolio structuring and property tax planning.", icon: "Home", href: "/industries/landlords" },
    ],
  },
];

export const howMenu: MegaCategory[] = [
  {
    label: "Our process",
    icon: "Settings2",
    items: [
      { title: "Free discovery call", description: "We learn your business and give a clear quote.", icon: "PhoneCall", href: "/how-we-work#process" },
      { title: "Seamless onboarding", description: "We handle the switch and set up your software.", icon: "Settings2", href: "/how-we-work#process" },
      { title: "We manage the numbers", description: "Bookkeeping, tax and payroll, quietly handled.", icon: "LineChart", href: "/how-we-work#process" },
      { title: "You grow with insight", description: "Proactive advice keeps you ahead all year.", icon: "Sparkles", href: "/how-we-work#process" },
    ],
  },
  {
    label: "Cloud & support",
    icon: "Cloud",
    items: [
      { title: "Cloud accounting", description: "Live numbers in Xero, QuickBooks or Sage.", icon: "Cloud", href: "/how-we-help/cloud-accounting" },
      { title: "Switch to MMR", description: "We move you from your old accountant, paperless.", icon: "Zap", href: "/how-we-work#process" },
      { title: "Year-round support", description: "A dedicated accountant, only a call away.", icon: "MessagesSquare", href: "/why-mmr#why" },
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services", mega: serviceMenu },
  {
    label: "How we help",
    href: "/how-we-help",
    children: [
      { label: "Proactive Tax Planning", href: "/how-we-help/proactive-tax-planning" },
      { label: "Cloud-First Accounting", href: "/how-we-help/cloud-accounting" },
      { label: "Advisory & Growth", href: "/how-we-help/advisory-partnership" },
    ],
  },
  { label: "Why MMR", href: "/why-mmr", mega: whyMenu },
  { label: "Industries", href: "/industries", mega: industryMenu },
  { label: "How We Work", href: "/how-we-work", mega: howMenu },
  { label: "FAQ", href: "/faq" },
];

/* ============================================================
   Section copy — every eyebrow, heading, subtitle, paragraph and
   button label, CMS-editable in src/content/copy.json. (Icons,
   illustrations and the data arrays above stay typed in this file.)
   ============================================================ */
export const copy: SiteCopy = copyData as SiteCopy;

/* ============================================================
   Legal / policy pages — editable content for Privacy, Terms & Cookies.
   NOTE: standard professional wording for a UK accountancy practice;
   have it reviewed by the firm's solicitor before going live.
   ============================================================ */
export type LegalSection = { heading: string; body: string[]; bullets?: string[] };
export type LegalPage = {
  slug: string;
  crumb: string;
  title: string;
  intro: string;
  updated: string;
  metaTitle: string;
  metaDescription: string;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    crumb: "Privacy Policy",
    title: "Privacy Policy",
    intro:
      "How MMR Accountants collects, uses and protects your personal information, and the rights you have over it.",
    updated: "Last reviewed: June 2026",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How MMR Accountants collects, uses, shares and protects your personal data under UK data-protection law — and how to exercise your rights.",
    sections: [
      {
        heading: "Who we are",
        body: [
          "MMR Accountants operates from offices in Manchester and Glasgow and is the data controller responsible for the personal information collected through this website and in the course of providing our services. If you have any questions about this policy or how we handle your data, email us at info@mmraccountants.co.uk.",
        ],
      },
      {
        heading: "Information we collect",
        body: ["We collect personal information in two ways:"],
        bullets: [
          "Information you give us — your name, email address, telephone number, business details and anything else you include when you contact us, request a quote, or become a client.",
          "Information we collect automatically — your IP address, browser type, the pages you visit and similar technical data, gathered through cookies and website analytics.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "We use your personal information to respond to your enquiries and prepare a quote; to deliver our accountancy, tax, payroll and advisory services; to meet our legal and regulatory obligations, including anti-money-laundering checks and filings with HMRC and Companies House; and to operate, secure and improve our website.",
          "Our lawful bases for processing are your consent, the performance of a contract with you, compliance with a legal obligation, and our legitimate interest in running and promoting our practice.",
        ],
      },
      {
        heading: "Sharing your information",
        body: [
          "We never sell your personal information. We share it only where necessary — with HMRC, Companies House and our professional regulators; with the cloud accounting software providers we use to deliver your service; and with professional advisers where required. Anyone who processes data on our behalf is bound by strict confidentiality and data-protection obligations.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep personal information only for as long as necessary for the purposes set out above. Client and tax records are retained for the periods required by law and by our professional bodies — generally at least six years.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under UK data-protection law you have the right to access, correct, erase, restrict or object to our use of your personal information, and the right to data portability. To exercise any of these rights, email info@mmraccountants.co.uk.",
          "You also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk if you are unhappy with how we have handled your data.",
        ],
      },
      {
        heading: "Cookies, security and changes",
        body: [
          "Our website uses cookies — please see our Cookie Policy for details. We use appropriate technical and organisational measures to keep your information secure. We may update this policy from time to time; the date above shows when it was last reviewed.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    crumb: "Terms",
    title: "Terms of Use",
    intro:
      "The terms on which you may use the MMR Accountants website. Our services to clients are governed separately by our engagement letter.",
    updated: "Last reviewed: June 2026",
    metaTitle: "Terms of Use",
    metaDescription:
      "The terms governing your use of the MMR Accountants website, including intellectual property, disclaimers and limitation of liability.",
    sections: [
      {
        heading: "About these terms",
        body: [
          "These terms govern your use of the MMR Accountants website. By using the site you accept them in full. The professional services we provide to clients are governed separately by our engagement letter, not by these website terms.",
        ],
      },
      {
        heading: "Using our website",
        body: [
          "You may use this website for lawful purposes only. You must not misuse it, attempt to gain unauthorised access to it, or use it in any way that could damage or impair the site or another user's enjoyment of it.",
        ],
      },
      {
        heading: "Information, not advice",
        body: [
          "The content on this website is provided for general information only and does not constitute professional, financial, tax or legal advice. You should not act on it without taking specific advice for your own circumstances. We accept no liability for any loss arising from reliance on the website's content.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this website — including text, graphics, logos and design — belongs to MMR Accountants or its licensors and is protected by copyright. You may not reproduce, distribute or republish it without our written permission.",
        ],
      },
      {
        heading: "Links and third parties",
        body: [
          "Where we link to third-party websites we do so for convenience only; we are not responsible for their content, availability or privacy practices.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          'This website is provided "as is" and "as available". To the fullest extent permitted by law, we exclude all liability for any loss or damage arising from your use of, or inability to use, the site. Nothing in these terms limits our liability where it would be unlawful to do so.',
        ],
      },
      {
        heading: "Governing law and changes",
        body: [
          "These terms are governed by the laws of England and Wales, and any disputes are subject to the exclusive jurisdiction of the English courts. We may update these terms from time to time. If you have any questions, contact us at info@mmraccountants.co.uk.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    crumb: "Cookies",
    title: "Cookie Policy",
    intro: "What cookies are, how MMR Accountants uses them, and how you can manage them.",
    updated: "Last reviewed: June 2026",
    metaTitle: "Cookie Policy",
    metaDescription:
      "How the MMR Accountants website uses cookies — the types we use, why we use them, and how to manage or disable them.",
    sections: [
      {
        heading: "What are cookies?",
        body: [
          "Cookies are small text files placed on your device when you visit a website. They help the site work, remember your preferences, and tell us how the site is being used so we can improve it.",
        ],
      },
      {
        heading: "How we use cookies",
        body: ["We use cookies to:"],
        bullets: [
          "Make the website function correctly (strictly necessary cookies that cannot be switched off).",
          "Understand how visitors use the site — for example which pages are most popular — through analytics cookies, so we can improve it.",
          "Remember choices you make to give you a better browsing experience.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can control and delete cookies through your browser settings. Please note that blocking some cookies may affect how this website works. For more information on managing cookies, see aboutcookies.org or your browser's help pages.",
        ],
      },
      {
        heading: "Third-party cookies and changes",
        body: [
          "Some cookies may be set by third-party services we use, such as website analytics providers, which have their own privacy and cookie policies. We may update this policy as our use of cookies changes. Questions? Email info@mmraccountants.co.uk.",
        ],
      },
    ],
  },
];

/* ============================================================
   Detail pages (Services / Industries / How we help)
   SEO-rich, CMS-editable content lives in src/content/*.json,
   is assembled in detailContent.ts, and re-exported here so
   @/lib/content remains the single import surface.
   ============================================================ */
export * from "./detailContent";
