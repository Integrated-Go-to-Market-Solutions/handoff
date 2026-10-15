import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listDocs } from "@/lib/tina/files";
import { loadDepartment } from "@/lib/tina/load";
import { DepartmentView } from "./view";

export function generateStaticParams() {
  return listDocs("departments").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const payload = await loadDepartment((await params).slug);
  const department = payload?.data.department as { name?: string; roles?: string[] } | undefined;
  if (!department) return {};
  return {
    title: `${department.name} roles | Handoff`,
    description: `${department.name} roles Handoff places: ${(department.roles || []).join(", ")}.`,
  };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await loadDepartment((await params).slug);
  if (!payload) notFound();
  return <DepartmentView payload={payload} />;
}
