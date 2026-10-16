import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadResults } from "@/lib/tina/load";
import { ResultsView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadResults();
  const page = result.data.results as { title: string; description: string };
  return pageMetadata("/results", page.title, page.description);
}

export default function ResultsPage() {
  return <ResultsView />;
}
