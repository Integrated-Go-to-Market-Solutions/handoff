import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Models } from "@/components/sections/models";
import { Faq } from "@/components/sections/faq";
import { Finale } from "@/components/sections/finale";
import { loadPricing } from "@/lib/tina/load";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadPricing();
  const page = result.data.pricing as { title: string; intro: { subhead: string }; seoDescription?: string };
  return pageMetadata("/pricing", page.title, page.seoDescription || page.intro.subhead);
}

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
