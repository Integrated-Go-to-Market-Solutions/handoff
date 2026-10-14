import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listDocs } from "@/lib/tina/files";
import { loadService } from "@/lib/tina/load";
import { ServiceView } from "./view";

export function generateStaticParams() {
  return listDocs("services").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const payload = await loadService((await params).slug);
  const service = payload?.data.service as { name?: string; subhead?: string } | undefined;
  if (!service) return {};
  return { title: `${service.name} | Handoff`, description: service.subhead };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await loadService((await params).slug);
  if (!payload) notFound();
  return <ServiceView payload={payload} />;
}
