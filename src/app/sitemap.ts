import type { MetadataRoute } from "next";
import { legalPages, siteConfig } from "@/lib/content";

const routes = ["", "/services", "/why-mmr", "/industries", "/how-we-work", "/faq", "/contact"];
const legalRoutes = legalPages.map((p) => `/${p.slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...legalRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : legalRoutes.includes(route) ? 0.3 : 0.8,
  }));
}
