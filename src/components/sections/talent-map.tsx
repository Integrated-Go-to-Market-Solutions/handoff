"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Button, CtaNote } from "../brand";
import { Reveal } from "../reveal";
import { cta, departments, site, talentMap } from "@/lib/content";

/*
 * Rebuilt from design-refs/HANDOFFMAP.png (the Figma export in
 * design-refs/CODE IMAGE.txt is a fixed 7000px canvas). Everything sits in
 * the 1014x1293 space of /brand/latam-outline.svg, so pins, curves and the
 * land mask (/brand/latam-land.svg) line up at any width.
 *
 * Each pin opens a small profile card: on hover with a mouse, on tap with
 * touch (tapping elsewhere closes it), and on keyboard focus.
 *
 * Each pin also leads to its department page (10/5 call): a mouse click or
 * Enter goes straight there; on touch, the first tap opens the card and the
 * card's link (or a second tap on the pin) goes there.
 *
 * PLACEHOLDERS: names, cities, salaries and photos come from
 * `talentMap.profiles` in content.ts and are all stand-ins for now.
 */
const VB_W = 1014;
const VB_H = 1293;

/* Pin N shows `talentMap.profiles[N]`. `side` is where its label (and, when
   there's room, its card) goes; `lgSide` overrides it on desktop, where the
   map is sized off the screen height and can get narrow enough for that
   label to run into the next pin. */
type Side = "left" | "right";
const pins: { x: number; y: number; side: Side; lgSide?: Side }[] = [
  { x: 185, y: 205, side: "right" },
  { x: 365, y: 345, side: "right", lgSide: "left" },
  { x: 610, y: 415, side: "right" },
  { x: 450, y: 565, side: "left" },
  { x: 905, y: 605, side: "left" },
  { x: 762, y: 850, side: "right" },
  { x: 615, y: 905, side: "left" },
  { x: 630, y: 1135, side: "left" },
];

const talent = pins.map((pin, i) => {
  const profile = talentMap.profiles[i];
  const department = departments.find((d) => d.slug === profile.department);
  return {
    ...pin,
    ...profile,
    href: `/roles/${profile.department}`,
    departmentName: department?.name ?? "all",
  };
});

const pulses = [
  { x: 490, y: 455 },
  { x: 495, y: 665 },
  { x: 865, y: 745 },
];

type Pt = { x: number; y: number };
const P = (i: number): Pt => pins[i];
const Q = (i: number): Pt => pulses[i];

/* Dashed routes between pins, drawn as gentle arcs. */
const routes: [Pt, Pt, number][] = [
  [P(0), P(1), -40],
  [P(1), Q(0), 30],
  [P(1), P(3), 25],
  [Q(0), P(2), -20],
  [P(2), P(4), -70],
  [P(2), P(6), 10],
  [Q(0), P(5), 60],
  [P(3), Q(1), 0],
  [P(4), P(6), 50],
  [P(4), Q(2), 0],
  [Q(2), P(5), -20],
  [P(6), P(7), -15],
  [P(5), P(7), 40],
];

function arc(a: Pt, b: Pt, bend: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
}

const pct = (p: Pt) => ({ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` });

/** Gap between a pin and its card, and between a card and the section edge. */
const GAP = 10;
const EDGE = 12;

/**
 * Puts the card beside its pin, on the preferred side if it fits, else the
 * other side, else above or below. Then clamps it inside the section so it is
 * never cut off. Writes straight to the element: it's pure layout, so there's
 * nothing to re-render.
 */
function placeCard(card: HTMLElement, pin: HTMLElement, wrap: HTMLElement, section: HTMLElement, prefer: Side) {
  const p = pin.getBoundingClientRect();
  const w = wrap.getBoundingClientRect();
  const s = section.getBoundingClientRect();
  const cw = card.offsetWidth;
  const ch = card.offsetHeight;
  const minX = s.left + EDGE;
  const maxX = s.right - EDGE - cw;
  const minY = s.top + EDGE;
  const maxY = s.bottom - EDGE - ch;

  let x: number | null = null;
  let y = p.top + p.height / 2 - ch / 2;
  for (const side of prefer === "right" ? ["right", "left"] : ["left", "right"]) {
    const cx = side === "right" ? p.right + GAP : p.left - GAP - cw;
    if (cx >= minX && cx <= maxX) {
      x = cx;
      break;
    }
  }
  if (x === null) {
    x = p.left + p.width / 2 - cw / 2;
    y = p.bottom + GAP + ch <= s.bottom - EDGE ? p.bottom + GAP : p.top - GAP - ch;
  }
  x = Math.min(Math.max(x, minX), maxX);
  y = Math.min(Math.max(y, minY), maxY);

  card.style.left = `${x - w.left}px`;
  card.style.top = `${y - w.top}px`;
  card.style.visibility = "visible";
}

/** Same circular treatment everywhere: pins, the mobile list and the cards. */
function Avatar({ photo, className }: { photo: string | null; className: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full border-2 border-white bg-gradient-to-b from-cyan to-[#2fae98] ${className}`}
    >
      {photo ? (
        <Image src={photo} alt="" fill sizes="64px" className="object-cover object-[50%_22%]" />
      ) : (
        /* Neutral stand-in until real talent photos are supplied. */
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="24" r="11" fill="#1f1f1f" opacity="0.85" />
          <path d="M11 58c2.5-12 11-18 21-18s18.5 6 21 18" fill="#1f1f1f" opacity="0.85" />
        </svg>
      )}
    </span>
  );
}

export function TalentMap() {
  const router = useRouter();
  const [active, setActive] = useState<number | null>(null);
  const cardId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /* Set on pointerdown so the click that follows knows mouse from touch. */
  const pointerType = useRef<string | null>(null);

  // Position the open card before paint, and keep it placed on resize.
  useLayoutEffect(() => {
    if (active === null) return;
    const card = cardRef.current;
    const pin = pinRefs.current[active];
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    if (!card || !pin || !wrap || !section) return;
    const place = () => {
      const { side, lgSide } = pins[active];
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      placeCard(card, pin, wrap, section, (lg && lgSide) || side);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // While a card is open: a tap or click anywhere but a pin closes it, and so
  // does Escape.
  useEffect(() => {
    if (active === null) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-talent-pin]")) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const toggle = (i: number) => setActive((a) => (a === i ? null : i));

  const pinHandlers = (i: number) => ({
    onPointerDown: (e: React.PointerEvent) => {
      pointerType.current = e.pointerType;
    },
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(i);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive((a) => (a === i ? null : a));
    },
    onClick: () => {
      // Mouse and keyboard go straight to the department page (a mouse has
      // already seen the card on hover; keyboard focus opened it). Touch
      // opens the card first, and a second tap on the same pin follows it.
      const type = pointerType.current;
      pointerType.current = null;
      if (type === "touch" || type === "pen") {
        if (active === i) router.push(talent[i].href);
        else setActive(i);
        return;
      }
      router.push(talent[i].href);
    },
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setActive(i);
    },
    onBlur: () => setActive((a) => (a === i ? null : a)),
  });

  /* Mobile list rows open the same card on the map and bring the pin into view. */
  const openFromList = (i: number) => {
    toggle(i);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    pinRefs.current[i]?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
  };

  const open = active === null ? null : talent[active];

  return (
    <section
      ref={sectionRef}
      id="meet-your-talent"
      className="relative scroll-mt-24 overflow-hidden bg-[#141414] py-24 text-bone md:py-[8.5rem] lg:py-5"
    >
      <div className="shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
        <Reveal className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">
            {talentMap.heading.before}{" "}
            <Link
              href="/roles"
              className="text-cyan underline decoration-cyan/35 decoration-[0.08em] underline-offset-[0.12em] transition-colors hover:decoration-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              {talentMap.heading.link}
            </Link>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-bone/70 lg:mx-0">
            {talentMap.intro}
          </p>
          {/* The main CTA, repeated here beside the map. */}
          <div className="mt-8">
            <Button href={site.bookingUrl}>{cta.book}</Button>
            <CtaNote className="mt-3" />
          </div>
        </Reveal>

        <div>
          {/* On desktop the map is sized off the screen height, so the whole
              section fits in one screen. It never goes below 650px tall
              (510px wide), where the pin labels would start to collide, so
              on screens under about 770px tall it runs slightly over. Below
              1280px wide it sits left in its column and stops at 720px tall, so
              the right-hand labels stay on screen. */}
          <div
            ref={wrapRef}
            className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] md:max-w-[560px] lg:ml-0 lg:h-[clamp(650px,calc(100svh-72px-2.5rem),720px)] lg:w-auto lg:max-w-full xl:mx-auto xl:h-[clamp(650px,calc(100svh-72px-2.5rem),52rem)]"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#3d3d3d] to-[#2a2a2a]"
              style={{
                WebkitMaskImage: "url(/brand/latam-land.svg)",
                maskImage: "url(/brand/latam-land.svg)",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
              aria-hidden="true"
            />

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {routes.map(([a, b, bend], i) => (
                <path
                  key={i}
                  d={arc(a, b, bend)}
                  fill="none"
                  stroke="#3dd6bd"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {pulses.map((p, i) => (
              <span
                key={i}
                className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-8 md:w-8"
                style={pct(p)}
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full border-2 border-[#238272] motion-safe:animate-ping" />
                <span className="absolute inset-[22%] rounded-full border-2 border-[#238272]" />
                <span className="absolute inset-[40%] rounded-full bg-[#2fae98]" />
              </span>
            ))}

            {talent.map((t, i) => {
              const isOpen = active === i;
              const lgSide = t.lgSide ?? t.side;
              return (
                <button
                  key={t.role}
                  ref={(el) => {
                    pinRefs.current[i] = el;
                  }}
                  type="button"
                  data-talent-pin=""
                  {...pinHandlers(i)}
                  aria-label={`${t.name}, ${t.role}, ${t.city}. See ${t.departmentName} roles`}
                  aria-describedby={isOpen ? cardId : undefined}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 outline-none ${isOpen ? "z-20" : "z-10"}`}
                  style={pct(t)}
                >
                  <Avatar
                    photo={t.photo}
                    className={`h-9 w-9 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(61,214,189,0.35)] group-focus-visible:ring-2 group-focus-visible:ring-cyan md:h-11 md:w-11 lg:h-12 lg:w-12 ${
                      isOpen
                        ? "scale-110 border-cyan shadow-[0_0_0_7px_rgba(61,214,189,0.35)]"
                        : "shadow-[0_0_0_4px_rgba(61,214,189,0.18)]"
                    }`}
                  />
                  {/* The card covers this side while open, so the label steps
                      aside. Labels stay at the tablet size below 1280px wide, and
                      on desktop screens too short for the map to reach 574px
                      wide, so they never collide or run off the edge. */}
                  <span
                    className={`absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-white bg-[#252525] px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.04em] text-white transition-[color,border-color,opacity] duration-300 group-hover:border-cyan group-hover:text-cyan md:block xl:px-4 xl:text-[0.72rem] xl:[@media(max-height:851px)]:px-3 xl:[@media(max-height:851px)]:text-[0.62rem] ${
                      t.side === "right" ? "left-full ml-2" : "right-full mr-2"
                    } ${
                      lgSide === "right"
                        ? "lg:left-full lg:right-auto lg:ml-2 lg:mr-0"
                        : "lg:right-full lg:left-auto lg:mr-2 lg:ml-0"
                    } ${isOpen ? "opacity-0" : ""}`}
                  >
                    {t.role}
                  </span>
                </button>
              );
            })}

            {open && (
              <div
                key={active}
                ref={cardRef}
                id={cardId}
                data-talent-pin=""
                className="talent-card-in invisible absolute z-30 w-[15rem] rounded-2xl border border-white/15 bg-[#1c1c1c]/95 p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar photo={open.photo} className="h-14 w-14" />
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight text-white">{open.name}</p>
                    <p className="mt-0.5 text-xs text-bone/60">
                      {open.city}, {open.country}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.06em] text-cyan">
                  {open.role}
                </p>
                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-bone/50">
                    {talentMap.salaryLabel}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{open.salary}</p>
                </div>
                <Link
                  href={open.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cyan hover:underline"
                >
                  See {open.departmentName} roles
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: labels would collide on a phone-width map, so the roles
              are listed underneath. Each row opens that pin's card. */}
          <ul className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 md:hidden">
            {talent.map((t, i) => (
              <li key={t.role}>
                <button
                  type="button"
                  data-talent-pin=""
                  onClick={() => openFromList(i)}
                  aria-pressed={active === i}
                  className={`flex w-full items-center gap-3 rounded-full border-2 bg-[#252525] py-1.5 pl-1.5 pr-4 text-left text-[0.72rem] font-medium uppercase tracking-[0.04em] transition-colors hover:border-cyan hover:text-cyan ${
                    active === i ? "border-cyan text-cyan" : "border-white/80 text-white"
                  }`}
                >
                  <Avatar photo={t.photo} className="h-8 w-8" />
                  {t.role}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
