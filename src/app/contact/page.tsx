import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadContact } from "@/lib/tina/load";
import { ContactView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadContact();
  const page = result.data.contact as { title: string; description: string };
  return pageMetadata("/contact", page.title, page.description);
}

export default function ContactPage() {
  return <ContactView />;
}
