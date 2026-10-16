import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { loadRolesPage } from "@/lib/tina/load";
import { RolesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadRolesPage();
  const page = result.data.rolesPage as { title: string; subhead: string };
  return pageMetadata("/roles", page.title, page.subhead);
}

export default function RolesPage() {
  return <RolesView />;
}
