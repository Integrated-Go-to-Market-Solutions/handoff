import type { Metadata } from "next";
import { HiringTimeline } from "@/components/sections/hiring-timeline";
import { PromoVideo } from "@/components/sections/promo-video";
import { Finale } from "@/components/sections/finale";
import { loadHiring } from "@/lib/tina/load";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadHiring();
  const page = result.data.hiring as { pageTitle: string; pageDescription: string };
  return { title: page.pageTitle, description: page.pageDescription };
}

export default function HowItWorksPage() {
  return (
    <>
      <HiringTimeline />
      <PromoVideo />
      <Finale />
    </>
  );
}
