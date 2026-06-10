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
  { id: "services", label: "Services", group: "Detail pages", file: "src/content/services.json", mode: "list", validate: validateFile },
  { id: "industries-1", label: "Industries — set A", group: "Detail pages", file: "src/content/industries-1.json", mode: "list", validate: validateFile },
  { id: "industries-2", label: "Industries — set B", group: "Detail pages", file: "src/content/industries-2.json", mode: "list", validate: validateFile },
  { id: "approach", label: "How we help", group: "Detail pages", file: "src/content/approach.json", mode: "list", validate: validateFile },
  { id: "reviews", label: "Google reviews", group: "Home page", file: "src/content/reviews.json", mode: "object", validate: validateReviews, editPath: "/admin/reviews" },
];

const byId: Record<string, Collection> = Object.fromEntries(collections.map((c) => [c.id, c]));

export function getCollection(id: string): Collection | undefined {
  return byId[id];
}

/** Object-mode collections (single-editor), for the dashboard. */
export const objectCollections = collections.filter((c) => c.mode === "object");
