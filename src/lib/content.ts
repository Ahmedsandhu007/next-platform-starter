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

export type Service = {
  slug: string;
  icon: string; // lucide icon name (resolved in the component)
  title: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "bookkeeping",
    icon: "BookOpen",
    title: "Bookkeeping & Annual Accounts",
    description:
      "Real-time books kept tidy every week, with year-end accounts filed accurately and well ahead of deadline.",
    points: ["Cloud bookkeeping", "Year-end accounts", "Companies House filing"],
  },
  {
    slug: "tax-planning",
    icon: "Receipt",
    title: "Tax Planning & Returns",
    description:
      "Forward-looking corporation and personal tax planning that keeps more of your profit where it belongs — with you.",
    points: ["Corporation tax", "Self assessment", "Dividend strategy"],
  },
  {
    slug: "vat",
    icon: "Percent",
    title: "VAT & Making Tax Digital",
    description:
      "MTD-compliant VAT handled end to end — the right scheme, accurate returns and never a missed submission.",
    points: ["VAT registration", "Quarterly returns", "Scheme reviews"],
  },
  {
    slug: "payroll",
    icon: "Users",
    title: "Payroll & Pensions",
    description:
      "Fully managed RTI payroll and auto-enrolment so your team is paid correctly and on time, every single month.",
    points: ["RTI payroll", "Auto-enrolment", "Payslips & P60s"],
  },
  {
    slug: "company-formation",
    icon: "Building2",
    title: "Company Formation & Secretarial",
    description:
      "Start right with fast company set-up, registered office and confirmation statements handled on your behalf.",
    points: ["Company set-up", "Registered office", "Confirmation statements"],
  },
  {
    slug: "advisory",
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
    icon: "BadgePoundSterling",
    title: "Fixed monthly fees",
    description:
      "One transparent price covering everything we agreed — no hourly billing and no surprise invoices.",
  },
  {
    icon: "UserRound",
    title: "Your own accountant",
    description:
      "A named, qualified accountant who knows your business by name, not a different voice every call.",
  },
  {
    icon: "Cloud",
    title: "Cloud-first & real-time",
    description:
      "See your numbers the moment they happen with leading software set up and managed for you.",
  },
  {
    icon: "Lightbulb",
    title: "Proactive, not reactive",
    description:
      "We flag savings and risks before deadlines arrive, so you are never caught out by your tax bill.",
  },
  {
    icon: "MessagesSquare",
    title: "Unlimited support",
    description:
      "Ask as many questions as you like across the year — calls and emails are always included.",
  },
  {
    icon: "ShieldCheck",
    title: "Chartered & insured",
    description:
      "Regulated, fully insured and held to the standards of a chartered accountancy practice.",
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

/** Cloud platforms / bodies MMR works with — rendered as a partner strip */
export const partners = ["Xero", "QuickBooks", "FreeAgent", "Sage", "Dext", "ICAEW"] as const;

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
