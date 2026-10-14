import type { Metadata } from "next";
import { loadIndustriesPage } from "@/lib/tina/load";
import { IndustriesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadIndustriesPage();
  const page = result.data.industriesPage as { title: string; body: string };
  return { title: page.title, description: page.body };
}

export default function IndustriesPage() {
  return <IndustriesView />;
}
