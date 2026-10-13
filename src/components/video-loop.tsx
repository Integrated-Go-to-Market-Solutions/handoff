"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * 9:16 loop that plays while on screen. Starts muted because every browser
 * blocks autoplay with sound; the speaker button turns the audio on.
 *
 * Only one clip can be audible at a time. Unmuting one mutes the others via a
 * window event, so a row of three does not turn into a wall of noise.
 */
const UNMUTE_EVENT = "handoff:video-unmuted";

export function VideoLoop({
  src,
  poster,
  caption,
  name,
  bare = false,
}: {
  src: string;
  poster: string;
  caption: string;
  name: string;
  /** Strip the caption and chrome so it can sit inside a photo wall. */
  bare?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const id = useId();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void el.play().catch(() => {});
          } else {
            el.pause();
            // Scrolling away should also drop the sound.
            if (!el.muted) {
              el.muted = true;
              setMuted(true);
            }
          }
        }
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mute this clip when a different one is unmuted.
  useEffect(() => {
    const onOther = (event: Event) => {
      const which = (event as CustomEvent<string>).detail;
      if (which === id) return;
      const el = ref.current;
      if (el && !el.muted) {
        el.muted = true;
        setMuted(true);
      }
    };

    window.addEventListener(UNMUTE_EVENT, onOther);
    return () => window.removeEventListener(UNMUTE_EVENT, onOther);
  }, [id]);

  function toggleSound() {
    const el = ref.current;
    if (!el) return;

    const next = !el.muted;
    el.muted = next;
    setMuted(next);

    if (!next) {
      el.volume = 1;
      void el.play().catch(() => {});
      window.dispatchEvent(
        new CustomEvent(UNMUTE_EVENT, { detail: id }),
      );
    }
  }

  return (
    <figure
      className={
        bare
          ? "absolute inset-0 bg-ink"
          : "group relative overflow-hidden rounded-[var(--radius-brand)] border-2 border-cyan/50 bg-ink"
      }
    >
      <video
        ref={ref}
        className={
          bare
            ? "h-full w-full object-cover"
            : "aspect-[9/16] w-full object-cover"
        }
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${name}: ${caption}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!bare && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? `Unmute ${name}` : `Mute ${name}`}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink/65 text-bone backdrop-blur-sm transition-all duration-300 hover:bg-cyan hover:text-ink"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M11 5L6 9H3v6h3l5 4V5z"
                fill="currentColor"
              />
              <path
                d="M16 9l5 6M21 9l-5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
              <path
                d="M15.5 8.5a5 5 0 010 7M18.5 6a8 8 0 010 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      )}

      {!bare && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-14">
          <p className="display text-lg text-bone">{name}</p>
          <p className="mt-1 text-[0.85rem] leading-snug text-bone/70">
            {caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
}
