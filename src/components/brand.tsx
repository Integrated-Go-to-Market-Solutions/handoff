import Link from "next/link";
import { hero } from "@/lib/content";

/**
 * The real lockup from "Handoff Logo 2025" (Nico flagged the old hand-drawn
 * placeholder mark as "a little off" on the 9/4 call). Always the navy-on-
 * cyan version, per direct instruction, regardless of surface. A plain
 * `img` rather than next/image: it's a small static vector, and Next's
 * image optimizer refuses local SVGs without extra config for no benefit
 * here.
 */
export function LogoLock({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Handoff home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-light.svg" alt="Handoff" className="h-8 w-auto" />
    </Link>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /**
   * `cyan` is the CTA color. Per the 9/4 call: carbon and teal are the two
   * main colors the site should move between, blue only sometimes, and no
   * yellow at all — that was wrongly invented from a stale brand PDF
   * footnote. `ghost` sits on light surfaces, `ghostDark` on ink ones.
   */
  variant?: "cyan" | "ink" | "ghost" | "ghostDark";
  /** `sm` is the header button, `lg` the block button in the pricing cards. */
  size?: "sm" | "default" | "lg";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "cyan",
  size = "default",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform hover:-translate-y-0.5";
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    default: "px-7 py-3.5 text-[0.95rem]",
    lg: "px-9 py-5 text-[1rem]",
  };
  const variants = {
    cyan: "bg-cyan text-ink ring-2 ring-inset ring-cyan hover:bg-ink hover:text-cyan",
    ink: "bg-ink text-bone hover:bg-royal hover:text-white",
    ghost: "border-2 border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone",
    ghostDark:
      "border-2 border-white/25 text-bone hover:border-cyan hover:text-cyan",
  };
  // External links (e.g. a Calendly booking page) open in a new tab.
  const external = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

/**
 * The label above a page's H1. Deliberately NOT a pill: a filled bubble reads
 * as a button and competes with the actual CTAs. Plain type, brand colour,
 * open tracking.
 *
 * Page-top only. The standing rule is no section eyebrows, so this never
 * opens a section in the middle of a page.
 */
export function Eyebrow({
  children,
  tone = "onDark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "royal" | "muted" | "onDark";
  className?: string;
}) {
  const tones = {
    royal: "text-royal",
    muted: "text-bone/55",
    onDark: "text-cyan",
  };
  return (
    <p
      className={`eyebrow text-[0.8125rem] tracking-[0.22em] md:text-sm ${tones[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

export function Pill({
  children,
  tone = "cyan",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "cyan" | "outline";
  className?: string;
}) {
  const tones = {
    cyan: "bg-cyan text-ink",
    outline: "border border-ink-300 text-smoke",
  };
  return (
    <span
      className={`eyebrow inline-flex items-center rounded-full px-3.5 py-1.5 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The site's existing line under a CTA button (`hero.note`), used under every
 * primary CTA in the page body. Not in the header.
 */
export function CtaNote({ tone = "onDark", className = "" }: { tone?: "onDark" | "onLight"; className?: string }) {
  return (
    <p className={`text-sm ${tone === "onDark" ? "text-bone/60" : "text-ink/55"} ${className}`}>{hero.note}</p>
  );
}
