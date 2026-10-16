import type { Metadata } from "next";
import { loadTalentTelescope } from "@/lib/tina/load";
import { TalentTelescopeView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadTalentTelescope();
  const page = result.data.talentTelescope as { title: string; description: string };
  return { title: page.title, description: page.description };
}

export default function TalentTelescopePage() {
  return <TalentTelescopeView />;
}
