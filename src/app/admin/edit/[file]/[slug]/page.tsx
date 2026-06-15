import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/PageEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";

export const dynamic = "force-dynamic";

const FILES = ["services", "industries-1", "industries-2", "approach", "blog"];

export default async function EditDetailPage({
  params,
}: {
  params: Promise<{ file: string; slug: string }>;
}) {
  const { file, slug } = await params;
  if (!FILES.includes(file)) notFound();
  if (file === "blog") return <BlogEditor slug={slug} />;
  return <PageEditor file={file} slug={slug} />;
}
