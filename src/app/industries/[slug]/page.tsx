import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listDocs } from "@/lib/tina/files";
import { loadIndustry } from "@/lib/tina/load";
import { IndustryView } from "./view";

export function generateStaticParams() {
  return listDocs("industries").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const payload = await loadIndustry((await params).slug);
  const industry = payload?.data.industry as { name?: string; subhead?: string } | undefined;
  if (!industry) return {};
  return { title: `${industry.name} | Handoff`, description: industry.subhead };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await loadIndustry((await params).slug);
  if (!payload) notFound();
  return <IndustryView payload={payload} />;
}
