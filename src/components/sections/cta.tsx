import { Button } from "../brand";
import { Reveal } from "../reveal";
import { cta } from "@/lib/content";

/**
 * A line-drawn bottle, cyan outline, sitting large and faint behind the
 * closing copy. The pun is "bottleneck"; the neck is the whole point of
 * the drawing. Drifts very slowly so the section feels alive without
 * pulling attention off the buttons.
 */
function Bottle({ id, className = "" }: { id: string; className?: string }) {
  const fillId = `bottle-fill-${id}`;
  return (
    <svg viewBox="0 0 200 600" className={className} aria-hidden="true" fill="none">
      <defs>
        {/* Cyan into royal, top to bottom: the brand's two colours meeting
            inside the glass. Fades out toward the neck so the outline reads. */}
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3dd6bd" stopOpacity="0.05" />
          <stop offset="30%" stopColor="#3dd6bd" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2d42b9" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="76" y="8" width="48" height="26" rx="7" stroke="currentColor" strokeWidth="3" />
      <path
        d="M86 34 V120 C86 152 44 172 44 218 V548 a20 20 0 0 0 20 20 H136 a20 20 0 0 0 20 -20 V218 C156 172 114 152 114 120 V34 Z"
        fill={`url(#${fillId})`}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Closing section, on carbon with the brand guide's wave texture so it
 * matches the rest of the site instead of switching to a flat cyan field.
 * Shared by every page.
 */
export function Cta() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      {/* Texture on its own layer: `.tex-waves > *` forces direct children
          to position: relative, which would collapse the bottle wrapper. */}
      <div className="tex-waves absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Bottle id="right" className="drift absolute -right-6 top-1/2 h-[150%] w-auto -translate-y-1/2 rotate-14 text-cyan opacity-40 md:right-[6%] lg:right-[10%]" />
        <Bottle id="left" className="drift-slow absolute -left-16 top-1/2 hidden h-[120%] w-auto -translate-y-1/2 -rotate-[18deg] text-cyan opacity-20 lg:block" />
        <div className="absolute inset-0 bg-linear-to-r from-ink/60 via-transparent to-ink/30" />
      </div>

      <div className="shell relative z-10 py-20 text-center md:py-28">
        <Reveal>
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-bone">
            {cta.headlineParts.before}{" "}
            <span className="text-cyan">{cta.headlineParts.accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-bone/75">
            {cta.body}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="ghostDark" size="lg">
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
