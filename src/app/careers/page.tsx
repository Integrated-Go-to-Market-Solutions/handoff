import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadCareers } from "@/lib/tina/load";
import { CareersView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadCareers();
  const page = result.data.careers as { title: string; subhead: string; seoDescription?: string };
  return pageMetadata("/careers", page.title, page.seoDescription || page.subhead);
}

export default function CareersPage() {
  return <CareersView />;
}
