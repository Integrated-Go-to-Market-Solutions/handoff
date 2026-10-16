import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadCareers } from "@/lib/tina/load";
import { OpenPositionsView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadCareers();
  const open = (result.data.careers as { openPositions: { title: string; seoDescription?: string } }).openPositions;
  return pageMetadata("/careers/open-positions", open.title, open.seoDescription);
}

export default function OpenPositionsPage() {
  return <OpenPositionsView />;
}
