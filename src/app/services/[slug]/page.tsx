import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/DetailPageView";
import { servicePages, findDetailPage } from "@/lib/detailContent";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findDetailPage("service", slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findDetailPage("service", slug);
  if (!page) notFound();
  return <DetailPageView page={page} />;
}
