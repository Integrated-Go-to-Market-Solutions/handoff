import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadIndustriesPage } from "@/lib/tina/load";
import { IndustriesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadIndustriesPage();
  const page = result.data.industriesPage as { title: string; body: string; seoDescription?: string };
  return pageMetadata("/industries", page.title, page.seoDescription || page.body);
}

export default function IndustriesPage() {
  return <IndustriesView />;
}
