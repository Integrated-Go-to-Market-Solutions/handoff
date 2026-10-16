import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadIndustriesPage } from "@/lib/tina/load";
import { IndustriesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadIndustriesPage();
  const page = result.data.industriesPage as { title: string; body: string };
  return pageMetadata("/industries", page.title, page.body);
}

export default function IndustriesPage() {
  return <IndustriesView />;
}
