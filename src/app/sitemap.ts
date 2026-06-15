import type { MetadataRoute } from "next";
import { legalPages, siteConfig, allDetailPages, detailHref, blogPosts, blogHref } from "@/lib/content";

const routes = [
  "",
  "/services",
  "/why-mmr",
  "/industries",
  "/how-we-work",
  "/how-we-help",
  "/blog",
  "/faq",
  "/contact",
];
const legalRoutes = legalPages.map((p) => `/${p.slug}`);
const detailRoutes = allDetailPages.map((p) => detailHref(p.kind, p.slug));
const blogRoutes = blogPosts.map((p) => blogHref(p.slug));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (route: string, priority: number) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    ...routes.map((r) => entry(r, r === "" ? 1 : 0.8)),
    ...detailRoutes.map((r) => entry(r, 0.7)),
    ...blogRoutes.map((r) => entry(r, 0.6)),
    ...legalRoutes.map((r) => entry(r, 0.3)),
  ];
}
