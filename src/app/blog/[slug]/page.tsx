import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/BlogPostView";
import { blogPosts, findBlogPost } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
