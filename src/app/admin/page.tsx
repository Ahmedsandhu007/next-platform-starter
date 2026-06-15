import Link from "next/link";
import { githubConfigured } from "@/lib/github";
import servicesRaw from "@/content/services.json";
import industries1Raw from "@/content/industries-1.json";
import industries2Raw from "@/content/industries-2.json";
import approachRaw from "@/content/approach.json";
import blogRaw from "@/content/blog.json";
import { objectCollections } from "@/lib/cms/registry";

export const dynamic = "force-dynamic";

type ListItem = { slug: string; title: string };

const COLLECTIONS: { file: string; label: string; pages: ListItem[] }[] = [
  { file: "services", label: "Services", pages: servicesRaw as unknown as ListItem[] },
  { file: "industries-1", label: "Industries — set A", pages: industries1Raw as unknown as ListItem[] },
  { file: "industries-2", label: "Industries — set B", pages: industries2Raw as unknown as ListItem[] },
  { file: "approach", label: "How we help", pages: approachRaw as unknown as ListItem[] },
  { file: "blog", label: "Blog posts", pages: blogRaw as unknown as ListItem[] },
];

export default function AdminDashboard() {
  const canSave = githubConfigured();

  // Object-mode collections grouped by their registry `group`, in first-seen order.
  const objectGroups: { group: string; items: typeof objectCollections }[] = [];
  for (const c of objectCollections) {
    const existing = objectGroups.find((g) => g.group === c.group);
    if (existing) existing.items.push(c);
    else objectGroups.push({ group: c.group, items: [c] });
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-ink">Content</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Edit your site-wide details and text, the home-page reviews, and your service, industry and
        “how we help” pages. Saving commits to the site’s repository and publishes automatically in
        about 1–2 minutes, once the site rebuilds.
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

      <div className="mt-8 space-y-8">
        {objectGroups.map((grp) => (
          <section key={grp.group}>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-muted">{grp.group}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {grp.items.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.editPath ?? "#"}
                    className="flex items-center justify-between gap-3 border border-line bg-white px-4 py-3 text-sm transition-colors hover:border-bronze"
                  >
                    <span className="font-semibold text-ink">{c.label}</span>
                    <span className="shrink-0 font-mono text-xs text-muted">edit →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {COLLECTIONS.map((collection) => (
          <section key={collection.file}>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {collection.label}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {collection.pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/admin/edit/${collection.file}/${page.slug}`}
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
