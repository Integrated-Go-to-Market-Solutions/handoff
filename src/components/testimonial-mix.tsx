"use client";

import { useEffect, useRef, useState } from "react";
import { clientQuotes } from "@/lib/content";

/* Same accents as the live ClientQuotes cards. */
const cardAccents = [
  { card: "bg-gradient-to-br from-cyan to-cyan-dim text-ink", mark: "text-ink/25", meta: "text-ink/70", avatar: "bg-ink text-cyan" },
  { card: "bg-gradient-to-br from-royal to-azure text-bone", mark: "text-bone/30", meta: "text-bone/70", avatar: "bg-bone text-royal" },
  { card: "bg-gradient-to-br from-ink-300 to-ink text-bone", mark: "text-cyan/50", meta: "text-bone/65", avatar: "bg-cyan text-ink" },
] as const;

const VIDEO = { src: "/video/testimonial-placeholder.mp4", poster: "/video/testimonial-placeholder.jpg" };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

type Cell = { kind: "video"; id: string; mobile: string } | { kind: "quote"; index: number; mobile: string };

/* Desktop (4 columns): V Q Q V / Q Q V Q. Mobile: two thumbnails side by
   side up top, the quotes, then the last thumbnail centred. */
const cells: Cell[] = [
  { kind: "video", id: "v1", mobile: "order-1" },
  { kind: "quote", index: 0, mobile: "order-3" },
  { kind: "quote", index: 1, mobile: "order-4" },
  { kind: "video", id: "v2", mobile: "order-2" },
  { kind: "quote", index: 2, mobile: "order-5" },
  { kind: "quote", index: 3, mobile: "order-6" },
  { kind: "video", id: "v3", mobile: "order-8 col-span-2 mx-auto w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto" },
  { kind: "quote", index: 4, mobile: "order-7" },
];

export function TestimonialMix() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {cells.map((cell) => {
          if (cell.kind === "video") {
            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Play client video testimonial"
                className={`group relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] border-2 border-cyan bg-ink shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] transition-all duration-500 hover:-translate-y-1.5 lg:order-none lg:aspect-auto lg:min-h-[420px] ${cell.mobile}`}
              >
                <img
                  src={VIDEO.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <span className="block text-sm font-bold text-bone">Client story</span>
                  <span className="block text-xs text-bone/70">Watch the video</span>
                </span>
              </button>
            );
          }
          const slot = clientQuotes.slots[cell.index];
          // Quotes can be withdrawn from content.ts; skip a cell whose quote is gone.
          if (!slot) return null;
          const accent = cardAccents[cell.index % cardAccents.length];
          const byline = [slot.title, slot.company].filter(Boolean).join(", ");
          return (
            <figure
              key={slot.id}
              className={`col-span-2 flex flex-col justify-between rounded-[var(--radius-card)] border-2 border-cyan p-7 shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] lg:order-none lg:col-span-1 ${accent.card} ${cell.mobile}`}
            >
              <div>
                <span className={`display block text-6xl leading-none ${accent.mark}`} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 text-base font-semibold leading-relaxed">{slot.quote}</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${accent.avatar}`}
                  aria-hidden="true"
                >
                  {initials(slot.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{slot.name}</p>
                  {byline && <p className={`mt-0.5 text-xs ${accent.meta}`}>{byline}</p>}
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client video testimonial"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <div className="relative">
            <video
              src={VIDEO.src}
              poster={VIDEO.poster}
              controls
              autoPlay
              playsInline
              className="block max-h-[85vh] w-auto max-w-[90vw] rounded-[var(--radius-card)] border-2 border-cyan bg-ink"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-cyan text-ink shadow-lg transition-transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
