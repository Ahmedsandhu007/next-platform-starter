/**
 * Central content + configuration for the MMR Accountants site.
 * Keeping copy here keeps components clean and lets JSON-LD / nav reuse the same source.
 * All copy below is original.
 */

export const siteConfig = {
  name: "MMR Accountants",
  shortName: "MMR",
  pillars: ["Tax", "Advisory", "Payroll"],
  url: "https://www.mmraccountants.co.uk",
  description:
    "MMR Accountants are chartered accountants helping UK limited companies, contractors and growing businesses with cloud bookkeeping, proactive tax planning, payroll and year-round advice — all on transparent fixed monthly fees.",
  contact: {
    phone: "+44 20 3475 8210",
    phoneDisplay: "020 3475 8210",
    email: "hello@mmraccountants.co.uk",
    addressLine: "84 Kingsway",
    city: "London",
    postcode: "WC2B 6AA",
    hours: "Mon–Fri, 9:00am – 5:30pm",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/mmr-accountants",
    twitter: "https://twitter.com/mmraccountants",
    facebook: "https://www.facebook.com/mmraccountants",
  },
} as const;

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
  art: "tax" | "cloud" | "advisory" | "bookkeeping";
  title: string;
  description: string;
};

/** Illustrated value props (replaces the numeric stats band on the home page) */
export const valueProps: ValueProp[] = [
  {
    art: "tax",
    title: "Proactive tax planning",
    description:
      "We don't simply file your taxes — we plan ahead all year to legally lower your bill and keep more profit where it belongs.",
  },
  {
    art: "cloud",
    title: "Cloud-first, always current",
    description:
      "Your books live in the cloud and reconcile daily, so you always know exactly where your business stands.",
  },
  {
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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Switching to MMR was the easiest business decision we made. Our books are finally clear, and they spotted reliefs our old accountant never mentioned.",
    name: "Sarah Whitfield",
    role: "Director, Northgate Interiors Ltd",
    initials: "SW",
  },
  {
    quote:
      "As a contractor I just want to be paid correctly and pay the right tax. MMR handle all of it and reply within the hour — I genuinely never worry about it.",
    name: "Daniel Osei",
    role: "IT Consultant",
    initials: "DO",
  },
  {
    quote:
      "Their cash-flow forecasts helped us raise our first round with confidence. It feels like having a finance director without the full-time cost.",
    name: "Priya Nair",
    role: "Co-founder, Loophapp",
    initials: "PN",
  },
  {
    quote:
      "Fixed fees mean no nasty surprises, and the year-end was done weeks early for the first time ever. Highly recommended for any small limited company.",
    name: "Mark Ellison",
    role: "Owner, Ellison Plumbing & Heating",
    initials: "ME",
  },
  {
    quote:
      "MMR restructured how we pay ourselves and saved us more in the first year than two years of their fees combined. Genuinely proactive advisers.",
    name: "James Carter",
    role: "Founder, Carter & Reeve Architects",
    initials: "JC",
  },
  {
    quote:
      "Moving our payroll and VAT to MMR took the stress out of month-end completely. Everything is in the cloud and I can see exactly where we stand.",
    name: "Aisha Khan",
    role: "Director, Brightway Recruitment",
    initials: "AK",
  },
];

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

/** Accreditations / integrations — rendered as trust badges under the hero */
export const partners = ["ACCA", "HMRC", "Xero", "QuickBooks", "FreeAgent", "Sage"] as const;

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
export type NavLink = { label: string; href: string; children?: NavChild[] };

export const navLinks: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
  },
  {
    label: "Why MMR",
    href: "/why-mmr",
    children: [
      { label: "Why Choose Us", href: "/why-mmr#why" },
      { label: "Client Stories", href: "/why-mmr#testimonials" },
      { label: "Accreditations", href: "/why-mmr#trusted" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({ label: i.title, href: `/industries#${i.slug}` })),
  },
  {
    label: "How We Work",
    href: "/how-we-work",
    children: [
      { label: "Our Process", href: "/how-we-work#process" },
      { label: "Cloud Accounting", href: "/how-we-work#cloud" },
    ],
  },
  { label: "FAQ", href: "/faq" },
];
