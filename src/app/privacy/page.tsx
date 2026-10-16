import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadPrivacy } from "@/lib/tina/load";
import { PrivacyView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadPrivacy();
  const page = result.data.privacy as { title: string; seoDescription?: string; draft?: boolean };
  return {
    ...pageMetadata("/privacy", page.title, page.seoDescription),
    // Kept out of search until the policy is approved and the draft notice is off.
    ...(page.draft ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PrivacyPage() {
  const payload = await loadPrivacy();
  return <PrivacyView payload={payload} />;
}
