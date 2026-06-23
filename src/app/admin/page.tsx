import Link from "next/link";
import { Search, Type, LayoutGrid, Menu as MenuIcon, Newspaper, Briefcase, Users, Star, FileText, Settings } from "lucide-react";
import { getJsonFile, githubConfigured } from "@/lib/github";
import { getCollection } from "@/lib/cms/registry";
import servicesRaw from "@/content/services.json";
import industries1Raw from "@/content/industries-1.json";
import industries2Raw from "@/content/industries-2.json";
import approachRaw from "@/content/approach.json";
import blogRaw from "@/content/blog.json";
import caseStudiesRaw from "@/content/case-studies.json";
import { NewEntryButton } from "@/components/admin/NewBlogButton";
import { PublishBar } from "@/components/admin/PublishBar";

export const dynamic = "force-dynamic";

type ListItem = { slug: string; title: string };

/**
 * List collections shown on the dashboard. The imported JSON is the PUBLISHED
 * (build-time) version, kept as a fallback; at request time we load the DRAFT
 * version so unpublished creates / edits / deletes show here immediately.
 */
const LIST_COLLECTIONS: { id: string; label: string; anchor?: string; fallback: ListItem[] }[] = [
  { id: "services", label: "Services", fallback: servicesRaw as unknown as ListItem[] },
  { id: "industries-1", label: "Industries — set A", fallback: industries1Raw as unknown as ListItem[] },
  { id: "industries-2", label: "Industries — set B", fallback: industries2Raw as unknown as ListItem[] },
  { id: "approach", label: "How we help", fallback: approachRaw as unknown as ListItem[] },
  { id: "blog", label: "Blog", anchor: "blog", fallback: blogRaw as unknown as ListItem[] },
  { id: "case-studies", label: "Case studies", anchor: "case-studies", fallback: caseStudiesRaw as unknown as ListItem[] },
];

/** Load a list collection from the draft branch; fall back to the published JSON
 *  if GitHub isn't configured or the read fails. */
async function loadDraftList(id: string, fallback: ListItem[]): Promise<ListItem[]> {
  if (!githubConfigured()) return fallback;
  const col = getCollection(id);
  if (!col) return fallback;
  try {
    const { data } = await getJsonFile<ListItem[]>(col.file);
    if (!Array.isArray(data)) return fallback;
    return data.map((p) => ({ slug: p.slug, title: p.title }));
  } catch {
    return fallback;
  }
}

export default async function AdminDashboard() {
  const canSave = githubConfigured();

  const lists = await Promise.all(LIST_COLLECTIONS.map((c) => loadDraftList(c.id, c.fallback)));
  const collections = LIST_COLLECTIONS.map((c, i) => ({ ...c, pages: lists[i] }));
  const countOf = (id: string) => collections.find((c) => c.id === id)?.pages.length ?? 0;
  const blogCount = countOf("blog");
  const csCount = countOf("case-studies");

  const CARDS = [
    { label: "SEO & search", href: "/admin/seo", icon: Search, sub: "Titles, descriptions, indexing, social" },
    { label: "Page text", href: "/admin/copy", icon: Type, sub: "Headings & copy on every page" },
    { label: "Sections", href: "/admin/sections", icon: LayoutGrid, sub: "Services, industries, FAQs…" },
    { label: "Navigation", href: "/admin/nav", icon: MenuIcon, sub: "Menus & mega-menus" },
    { label: "Blog", href: "#blog", icon: Newspaper, sub: `${blogCount} post${blogCount === 1 ? "" : "s"}` },
    { label: "Case studies", href: "#case-studies", icon: Briefcase, sub: `${csCount} case stud${csCount === 1 ? "y" : "ies"}` },
    { label: "Team", href: "/admin/team", icon: Users, sub: "People page" },
    { label: "Reviews", href: "/admin/reviews", icon: Star, sub: "Google reviews" },
    { label: "Legal", href: "/admin/legal", icon: FileText, sub: "Privacy, terms, cookies" },
    { label: "Site settings", href: "/admin/settings", icon: Settings, sub: "Contact, logos, social" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-ink">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Edit your site content, SEO and blog. <strong className="font-semibold text-ink">Saving stores a draft</strong> — it
        does not change the live site. When you&apos;re ready, click <strong className="font-semibold text-ink">Publish
        changes</strong> below to push everything live in one go (about 1–2 minutes).
      </p>

      {!canSave && (
        <div className="mt-6 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Saving is currently disabled</p>
          <p className="mt-1">
            Set <code className="font-mono">GITHUB_TOKEN</code> and <code className="font-mono">GITHUB_REPO</code>{" "}
            in the environment to load and publish content. See <code className="font-mono">ADMIN.md</code>.
          </p>
        </div>
      )}

      <PublishBar />

      {/* Quick cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group flex items-start gap-4 rounded-xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze hover:shadow-md"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue text-accent transition-colors group-hover:bg-ink group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-ink">{c.label}</span>
                <span className="mt-0.5 block text-xs text-muted">{c.sub}</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Per-entry lists (detail pages + blog + case studies) — draft-aware */}
      <div className="mt-12 space-y-8">
        {collections.map((collection) => (
          <section key={collection.id} id={collection.anchor} className="scroll-mt-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-muted">{collection.label}</h2>
              {collection.id === "blog" && <NewEntryButton file="blog" noun="post" />}
              {collection.id === "case-studies" && <NewEntryButton file="case-studies" noun="case study" />}
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {collection.pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/admin/edit/${collection.id}/${page.slug}`}
                    className="flex items-center justify-between gap-3 border border-line bg-white px-4 py-3 text-sm transition-colors hover:border-bronze"
                  >
                    <span className="font-semibold text-ink">{page.title}</span>
                    <span className="shrink-0 font-mono text-xs text-muted">/{page.slug} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
