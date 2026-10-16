import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadAbout } from "@/lib/tina/load";
import { AboutView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadAbout();
  const page = result.data.about as { title: string; lead: string; seoDescription?: string };
  return pageMetadata("/about", page.title, page.seoDescription || page.lead);
}

export default function AboutPage() {
  return <AboutView />;
}
