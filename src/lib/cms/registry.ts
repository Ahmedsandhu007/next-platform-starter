/**
 * Registry of CMS-editable collections. Drives both the admin dashboard and the
 * generalised content API (`/api/admin/content/[file]`).
 *
 * - mode "list":   the JSON file is an array of slugged entries; edited per-entry
 *                  (merge-by-slug) via /admin/edit/[file]/[slug].
 * - mode "object": the JSON file is a single object; edited whole via `editPath`.
 */
import { validateFile } from "@/lib/detailSchema";
import { validateReviews } from "@/lib/cms/schemas";
import { validateSettings, validateCopy } from "@/lib/cms/siteSchema";
import { validateSections } from "@/lib/cms/itemsSchema";

export type CollectionMode = "list" | "object";

export type Collection = {
  id: string;
  label: string;
  group: string;
  file: string; // repo-relative path
  mode: CollectionMode;
  validate: (data: unknown) => { ok: true } | { ok: false; errors: string[] };
  editPath?: string; // admin route for object collections
};

export const collections: Collection[] = [
  { id: "settings", label: "Site & contact details", group: "Site-wide", file: "src/content/settings.json", mode: "object", validate: validateSettings, editPath: "/admin/settings" },
  { id: "copy", label: "Section text & headings", group: "Site-wide", file: "src/content/copy.json", mode: "object", validate: validateCopy, editPath: "/admin/copy" },
  { id: "sections", label: "Section items (services, industries, FAQs…)", group: "Site-wide", file: "src/content/sections.json", mode: "object", validate: validateSections, editPath: "/admin/sections" },
  { id: "reviews", label: "Google reviews", group: "Home page", file: "src/content/reviews.json", mode: "object", validate: validateReviews, editPath: "/admin/reviews" },
  { id: "services", label: "Services", group: "Detail pages", file: "src/content/services.json", mode: "list", validate: validateFile },
  { id: "industries-1", label: "Industries — set A", group: "Detail pages", file: "src/content/industries-1.json", mode: "list", validate: validateFile },
  { id: "industries-2", label: "Industries — set B", group: "Detail pages", file: "src/content/industries-2.json", mode: "list", validate: validateFile },
  { id: "approach", label: "How we help", group: "Detail pages", file: "src/content/approach.json", mode: "list", validate: validateFile },
];

const byId: Record<string, Collection> = Object.fromEntries(collections.map((c) => [c.id, c]));

export function getCollection(id: string): Collection | undefined {
  return byId[id];
}

/** Object-mode collections (single-editor), for the dashboard. */
export const objectCollections = collections.filter((c) => c.mode === "object");
