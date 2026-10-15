import type { Metadata } from "next";
import { loadContact } from "@/lib/tina/load";
import { ContactView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadContact();
  const page = result.data.contact as { title: string; description: string };
  return { title: page.title, description: page.description };
}

export default function ContactPage() {
  return <ContactView />;
}
