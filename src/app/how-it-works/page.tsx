import type { Metadata } from "next";
import { HiringTimeline } from "@/components/sections/hiring-timeline";
import { PromoVideo } from "@/components/sections/promo-video";
import { Finale } from "@/components/sections/finale";
import { howItWorksPage } from "@/lib/content";

export const metadata: Metadata = {
  title: howItWorksPage.title,
  description: howItWorksPage.description,
};

export default function HowItWorksPage() {
  return (
    <>
      <HiringTimeline />
      <PromoVideo />
      <Finale />
    </>
  );
}
