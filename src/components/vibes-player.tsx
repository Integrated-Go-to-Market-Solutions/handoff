"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type Clip = { slug: string; name: string; caption: string; video?: string; poster?: string };

/**
 * Three reels where only one ever plays. Desktop: the middle slot is the
 * main video (muted loop); hovering a side reel pauses it and plays that
 * reel as a silent preview; clicking a side reel slides it into the middle
 * and plays it with sound. Phones: a swipe row where the centred reel plays.
 */
export function VibesPlayer({ clips }: { clips: Clip[] }) {
  const [active, setActive] = useState(Math.min(1, clips.length - 1));
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phones: whichever reel is centred in the swipe row becomes the main one.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mobile = window.matchMedia("(max-width: 767px)");
    const io = new IntersectionObserver(
      (entries) => {
        if (!mobile.matches) return;
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = cards.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { root: scroller, threshold: 0.7 },
    );
    for (const c of cards.current) if (c) io.observe(c);
    return () => io.disconnect();
  }, []);

  // One source of truth for who is playing.
  useEffect(() => {
    const playing = preview ?? active;
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === playing && inView && (!reduced.current || (i === active && !muted))) {
        v.muted = i === active ? muted : true;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, preview, muted, inView]);

  const choose = useCallback(
    (i: number) => {
      setPreview(null);
      if (i === active) {
        setMuted((m) => !m);
        return;
      }
      const v = videos.current[i];
      if (v) v.currentTime = 0;
      if (window.matchMedia("(max-width: 767px)").matches) {
        cards.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      setActive(i);
      setMuted(false);
    },
    [active],
  );

  // Desktop slot order keeps the main reel in the middle.
  const n = clips.length;
  const slotOf = (i: number) => (n === 3 ? ((i - active + 1 + n) % n) : i);

  return (
    <div ref={rootRef} className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-[90px] md:w-[45%]"
        aria-hidden="true"
      />
      <div
        ref={scrollerRef}
        className="vibes-row relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] py-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-[auto_auto_auto] md:items-center md:justify-center md:gap-6 md:overflow-visible md:px-0 md:py-0 [&::-webkit-scrollbar]:hidden"
      >
        {clips.map((clip, i) => {
          const isMain = i === active;
          // "Live" is whichever reel is actually playing: the main one, or a hover preview.
          const isLive = i === (preview ?? active);
          return (
            <figure
              key={clip.slug}
              ref={(el) => {
                cards.current[i] = el;
              }}
              style={{ "--slot": slotOf(i), "--card-h": slotOf(i) === 1 ? "var(--h-main)" : "var(--h-side)" } as CSSProperties}
              onMouseEnter={() => !isMain && window.matchMedia("(min-width: 768px)").matches && setPreview(i)}
              onMouseLeave={() => preview === i && setPreview(null)}
              className={`group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded-(--radius-brand) border-2 bg-ink transition-[border-color,box-shadow,transform,width] duration-700 ease-out motion-reduce:transition-none md:w-[calc(var(--card-h)*9/16)] md:order-(--slot) ${
                isLive
                  ? "border-cyan shadow-[0_0_0_4px_rgba(61,214,189,0.12),0_0_48px_-6px_rgba(61,214,189,0.75)]"
                  : "border-white/10 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)] md:scale-[0.96]"
              }`}
            >
              <button
                type="button"
                onClick={() => choose(i)}
                aria-label={
                  isMain
                    ? `${muted ? "Unmute" : "Mute"} ${clip.name}`
                    : `Play ${clip.name} with sound`
                }
                className="block w-full cursor-pointer text-left"
              >
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  className={`aspect-9/16 w-full object-cover transition-[filter] duration-700 ease-out motion-reduce:transition-none ${
                    isLive ? "brightness-100 saturate-100" : "brightness-[0.55] saturate-[0.55]"
                  }`}
                  poster={clip.poster || `/videos/${clip.slug}.jpg`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${clip.name}: ${clip.caption}`}
                >
                  <source src={clip.video || `/videos/${clip.slug}.mp4`} type="video/mp4" />
                </video>

                <span
                  className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full backdrop-blur-sm transition-colors ${
                    isMain ? "bg-ink/65 text-bone group-hover:bg-cyan group-hover:text-ink" : "bg-cyan text-ink"
                  }`}
                  aria-hidden="true"
                >
                  {isMain ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
                      {muted ? (
                        <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                      ) : (
                        <path d="M15.5 8.5a5 5 0 010 7M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                      )}
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  )}
                </span>

                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan backdrop-blur-sm transition-opacity duration-500 motion-reduce:transition-none ${
                    isLive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan motion-safe:animate-pulse" />
                  {isMain ? "Now playing" : "Preview"}
                </span>

                <figcaption
                  className={`pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/95 via-ink/60 to-transparent p-5 pt-16 transition-opacity duration-700 motion-reduce:transition-none ${
                    isLive ? "opacity-100" : "opacity-80"
                  }`}
                >
                  <p className="display text-lg text-bone">{clip.name}</p>
                  <p className="mt-1 text-[0.85rem] leading-snug text-bone/75">{clip.caption}</p>
                </figcaption>
              </button>
            </figure>
          );
        })}
      </div>

      {/* Phones: where you are in the swipe row. */}
      {/* Each dot sits in a 44px tap area; only the dot itself shows (UX QA,
          10/6: the bare 8px dots were too small to tap). */}
      <div className="relative mt-3 flex justify-center md:hidden">
        {clips.map((clip, i) => (
          <button
            key={clip.slug}
            type="button"
            aria-label={`Show ${clip.name}`}
            aria-current={i === active}
            onClick={() => cards.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })}
            className="grid h-11 min-w-11 place-items-center px-1"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all duration-500 motion-reduce:transition-none ${
                i === active ? "w-7 bg-cyan" : "w-2 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
