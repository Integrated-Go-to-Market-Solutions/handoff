import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HiringTimeline } from "@/components/sections/hiring-timeline";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { loadHiring } from "@/lib/tina/load";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadHiring();
  const page = result.data.hiring as { pageTitle: string; pageDescription: string };
  return pageMetadata("/how-it-works", page.pageTitle, page.pageDescription);
}

export default function HowItWorksPage() {
  return (
    <>
      {/* 10/22 live review: the horizontal system up top (W-61), the step
          detail below, and the closing section only, no video section (W-63). */}
      <HiringHighway hero />
      <HiringTimeline withIntro={false} />
      <Finale />
    </>
  );
}
