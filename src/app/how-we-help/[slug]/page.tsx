import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/DetailPageView";
import { approachPages, findDetailPage } from "@/lib/detailContent";

export function generateStaticParams() {
  return approachPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findDetailPage("approach", slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/how-we-help/${slug}` },
  };
}

export default async function HowWeHelpDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findDetailPage("approach", slug);
  if (!page) notFound();
  return <DetailPageView page={page} />;
}
