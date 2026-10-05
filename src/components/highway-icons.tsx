/**
 * The six Hiring Highway step icons, in the brand guide's own treatment:
 * a halftone dot screen for the fill and a clean cyan outline on top. Each
 * icon carries its own pattern id so two of them on one page never collide.
 *
 * `cut` is the colour used to punch holes in the halftone (the eye's iris,
 * the chat bubble's inset) so the cutout matches whatever card it sits on.
 */
const DOT = "#c8cacd";
const STROKE = "#3dd6bd";

function Halftone({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.15" fill={DOT} />
      </pattern>
    </defs>
  );
}

type IconProps = { className?: string; cut?: string };

/** 01: a target. Scope the role, hit the outcome. */
export function ScopeIcon({ className = "", cut = "#282828" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p1" />
      <circle cx="32" cy="32" r="24" fill="url(#hw-p1)" />
      <circle cx="32" cy="32" r="24" fill="none" stroke={STROKE} strokeWidth="2.2" />
      <circle cx="32" cy="32" r="14" fill={cut} stroke={STROKE} strokeWidth="2.2" />
      <circle cx="32" cy="32" r="5" fill={STROKE} />
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8" stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** 02: a magnifying glass. Hunting, not posting. */
export function HuntIcon({ className = "", cut = "#282828" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p2" />
      <circle cx="27" cy="27" r="18" fill="url(#hw-p2)" />
      <circle cx="27" cy="27" r="18" fill="none" stroke={STROKE} strokeWidth="2.2" />
      <circle cx="27" cy="27" r="9" fill={cut} stroke={STROKE} strokeWidth="2.2" />
      <path d="M40 40l16 16" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** 03: a play button in a screen. The video skills assessment. */
export function SkillsIcon({ className = "", cut = "#282828" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p3" />
      <rect x="6" y="12" width="52" height="36" rx="8" fill="url(#hw-p3)" />
      <rect x="6" y="12" width="52" height="36" rx="8" fill="none" stroke={STROKE} strokeWidth="2.2" />
      <path d="M27 22l14 8-14 8z" fill={cut} stroke={STROKE} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M22 56h20" stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** 04: a lightbulb. Judgment, not a checklist. */
export function JudgmentIcon({ className = "", cut = "#282828" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p4" />
      <path d="M32 6c-11 0-19 8-19 18 0 7 4 11 8 15 2 2 3 4 3 7h16c0-3 1-5 3-7 4-4 8-8 8-15 0-10-8-18-19-18z" fill="url(#hw-p4)" />
      <path d="M32 6c-11 0-19 8-19 18 0 7 4 11 8 15 2 2 3 4 3 7h16c0-3 1-5 3-7 4-4 8-8 8-15 0-10-8-18-19-18z" fill="none" stroke={STROKE} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="32" cy="25" r="6" fill={cut} stroke={STROKE} strokeWidth="2.2" />
      <path d="M25 52h14M27 58h10" stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** 05: two people. The shortlist you actually meet. */
export function ShortlistIcon({ className = "", cut = "#282828" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p5" />
      <circle cx="23" cy="20" r="9" fill="url(#hw-p5)" stroke={STROKE} strokeWidth="2.2" />
      <path d="M6 52c0-10 8-16 17-16s17 6 17 16z" fill="url(#hw-p5)" stroke={STROKE} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="44" cy="22" r="7" fill={cut} stroke={STROKE} strokeWidth="2.2" />
      <path d="M44 34c8 0 14 5 14 14H43" fill={cut} stroke={STROKE} strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

/** 06: a handshake mark. Employed, onboarded, and we stay on. */
/**
 * The check mark from the Handoff logo (public/brand/logo-*.svg): the lower
 * white shape left visible under the cyan one, traced as a single polygon
 * from the logo's own coordinates. STAND-IN until Handoff sends its
 * official check icon. Drawn solid in `cut` so it reads on the cyan disc.
 */
export function HandoffCheckIcon({ className = "", cut = "#1f1f1f" }: IconProps) {
  return (
    <svg viewBox="-11 110 300 300" className={className} aria-hidden="true">
      <path d="M0 250.941L111.907 364L278.305 203.321L234.35 157.63L111.907 275.959L44.47 207.77Z" fill={cut} />
    </svg>
  );
}

export function StayIcon({ className = "", cut = "#1f1f1f" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Halftone id="hw-p6" />
      <circle cx="32" cy="32" r="26" fill="url(#hw-p6)" />
      <circle cx="32" cy="32" r="26" fill="none" stroke={cut} strokeWidth="2.2" />
      <path d="M18 34l10 10 18-20" fill="none" stroke={cut} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const highwayIcons = [
  ScopeIcon,
  HuntIcon,
  SkillsIcon,
  JudgmentIcon,
  ShortlistIcon,
  StayIcon,
] as const;
