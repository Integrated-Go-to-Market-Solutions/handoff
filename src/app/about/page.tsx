import type { Metadata } from "next";
import { loadAbout } from "@/lib/tina/load";
import { AboutView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadAbout();
  const page = result.data.about as { title: string; lead: string };
  return { title: page.title, description: page.lead };
}

export default function AboutPage() {
  return <AboutView />;
}
