import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { listDocs } from "@/lib/tina/files";
import { loadDepartment } from "@/lib/tina/load";
import { DepartmentView } from "./view";

export function generateStaticParams() {
  return listDocs("departments").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const payload = await loadDepartment(slug);
  const department = payload?.data.department as { name?: string; roles?: string[]; intro?: string } | undefined;
  if (!department) return {};
  // The department's intro, already on the page, as the search summary; a
  // short intro gets the page's own "roles we place most" line added so it
  // reaches the 120 to 160 characters Google shows (10/16 site audit).
  const intro = department.intro ?? "";
  const description = intro.length >= 120 ? intro : `${intro} See the ${department.name} roles we place most.`.trim();
  return pageMetadata(`/roles/${slug}`, `${department.name} roles we place | Handoff`, description);
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await loadDepartment((await params).slug);
  if (!payload) notFound();
  return <DepartmentView payload={payload} />;
}
