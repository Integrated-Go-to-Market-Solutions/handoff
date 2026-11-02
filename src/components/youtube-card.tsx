"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A 16:9 YouTube video that shows its still and a play button until it's
 * tapped, then swaps in the player in place. Nothing from YouTube loads
 * before the tap except the still, so it costs the page one image.
 */
export function YouTubeCard({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`relative aspect-video overflow-hidden rounded-(--radius-card) border-2 border-cyan/40 bg-ink-100 ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 block h-full w-full">
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1280px) 1240px, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-ink/25 transition-colors duration-300 group-hover:bg-ink/10" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-18 w-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan shadow-[0_0_0_10px_rgba(61,214,189,0.18)] transition-transform duration-300 group-hover:scale-110 md:h-22 md:w-22"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-ink md:h-8 md:w-8">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
