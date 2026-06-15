/**
 * Case studies — client success stories. Editable in src/content/case-studies.json
 * (a list collection, like the blog). Body is Markdown. Re-exported from
 * @/lib/content.
 */
import raw from "@/content/case-studies.json";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  image?: string;
  imageAlt?: string;
  summary: string;
  /** Headline outcomes shown as a checklist. */
  results: string[];
  /** Markdown paragraphs/sections. */
  body: string[];
  metaTitle: string;
  metaDescription: string;
};

export const caseStudyHref = (slug: string) => `/case-studies/${slug}`;

export const caseStudies: CaseStudy[] = raw as unknown as CaseStudy[];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
