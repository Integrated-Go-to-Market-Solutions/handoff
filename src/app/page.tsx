import { HeroBright } from "@/components/sections/hero-bright";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { KpiBand } from "@/components/sections/kpi-band";
import { TalentMap } from "@/components/sections/talent-map";
import { WhyLatam } from "@/components/sections/why-latam";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Vibes } from "@/components/sections/vibes";
import { Soul } from "@/components/sections/soul";
import { AiTrained } from "@/components/sections/ai-trained";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { Models } from "@/components/sections/models";
import { Faq } from "@/components/sections/faq";
import { Finale } from "@/components/sections/finale";
import { CtaBand } from "@/components/sections/cta-band";

/**
 * The industry links live in the credibility strip under the hero; the
 * standalone "Built for your industry" section was folded into it. The
 * compact Hiring Highway sits high on the page per the 9/4 follow-up call
 * ("that section should be on the top.").
 *
 * The Day in the Life row was removed 2026-09-08 per direct instruction; it
 * was four empty "coming soon" placeholders with no footage behind them.
 * The component and its content stay in the repo for when the role videos
 * exist.
 *
 * The "You are the bottleneck" Problem section was removed 2026-10-05 per
 * direct instruction. Its component and copy stay in the repo, unused.
 */
export default function Home() {
  return (
    <>
      <HeroBright />
      <CredibilityStrip />
      <KpiBand />
      <TalentMap />
      <AiTrained />
      <HiringHighway compact />
      <WhyLatam />
      <CtaBand tone="onLight" className="bg-bone pb-20 md:pb-32" />
      <Vibes order={[1, 0, 2]} slider />
      <Soul variant="dictionary" />
      <ClientQuotes />
      <Models detailed />
      <Faq />
      <Finale />
    </>
  );
}
