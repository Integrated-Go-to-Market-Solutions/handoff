import type { Metadata } from "next";
import { HiringTimeline } from "@/components/sections/hiring-timeline";
import { PromoVideo } from "@/components/sections/promo-video";
import { Finale } from "@/components/sections/finale";

export const metadata: Metadata = {
  title: "How it works | Handoff",
  description:
    "The Hands-off Hiring System: the four steps every Handoff hire goes through, from discovery to the guarantee.",
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
