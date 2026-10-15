import type { Metadata } from "next";
import { loadCareers } from "@/lib/tina/load";
import { CareersView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadCareers();
  const page = result.data.careers as { title: string; subhead: string };
  return { title: page.title, description: page.subhead };
}

export default function CareersPage() {
  return <CareersView />;
}
