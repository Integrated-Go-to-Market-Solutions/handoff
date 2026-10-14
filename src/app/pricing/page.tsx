import type { Metadata } from "next";
import { Models } from "@/components/sections/models";
import { Faq } from "@/components/sections/faq";
import { Finale } from "@/components/sections/finale";
import { modelsIntro, pricingPage } from "@/lib/content";

export const metadata: Metadata = {
  title: pricingPage.title,
  description: modelsIntro.subhead,
};

/**
 * /pricing, the address the content doc gives the Pricing page (10/5). The
 * menu's Pricing link used to jump to the homepage section, which sent
 * visitors back to the homepage. Same comparison as the homepage (doc
 * copy), then the FAQ, which answers cost and the guarantee, and the CTA.
 */
export default function PricingPage() {
  return (
    <>
      <Models detailed asPage />
      <Faq />
      <Finale />
    </>
  );
}
