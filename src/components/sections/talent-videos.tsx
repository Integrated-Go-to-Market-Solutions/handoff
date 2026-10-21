"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { VideoModal } from "../video-modal";

type TalentVideo = { name: string; role: string; department: string; salary: string; youtubeId: string };

/**
 * The talent videos in the All Roles hero (Handoff, 10/20): a swipe row of
 * vertical cards, grouped by department. Each card is YouTube's own still
 * (it already shows the name, role, city and salary), so nothing from
 * YouTube loads until someone taps a card and the player opens in the
 * pop-up. Arrows page the row on wider screens.
 */
export function TalentVideos({
  videos,
  departments,
  hint,
}: {
  videos: TalentVideo[];
  departments: { slug?: string; name?: string }[];
  hint?: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<TalentVideo | null>(null);
  const deptName = (slug: string) => departments.find((d) => d.slug === slug)?.name ?? "";
  const order = (slug: string) => {
    const i = departments.findIndex((d) => d.slug === slug);
    return i < 0 ? departments.length : i;
  };
  const sorted = [...videos].sort((a, b) => order(a.department) - order(b.department));
  const page = (dir: number) => {
    const el = row.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" });
  };
  if (!sorted.length) return null;

  return (
    <div className="mt-10">
      <div className="shell hidden justify-end gap-3 md:flex">
        {[
          { dir: -1, label: "Previous videos", arrow: "←" },
          { dir: 1, label: "Next videos", arrow: "→" },
        ].map((b) => (
          <button
            key={b.dir}
            type="button"
            onClick={() => page(b.dir)}
            aria-label={b.label}
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/20 text-xl text-bone transition-colors hover:border-cyan focus-visible:border-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/30"
          >
            <span aria-hidden="true">{b.arrow}</span>
          </button>
        ))}
      </div>

      <div
        ref={row}
        // Lines the first card up with the page content; the row itself runs
        // to the screen edge so the next card peeks in.
        style={{
          paddingInline: "max(1.25rem, calc((100% - 1240px) / 2))",
          scrollPaddingInline: "max(1.25rem, calc((100% - 1240px) / 2))",
        }}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sorted.map((v) => (
          <div key={v.youtubeId} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[24%] lg:w-[18%]">
            <button
              type="button"
              onClick={() => setPlaying(v)}
              aria-label={`Play ${v.name}, ${v.role}, ${v.salary}`}
              className="group relative block aspect-9/16 w-full overflow-hidden rounded-(--radius-card) border-2 border-white/10 bg-ink transition-colors hover:border-cyan focus-visible:border-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/30"
            >
              <Image
                src={`https://i.ytimg.com/vi/${v.youtubeId}/oardefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 768px) 24vw, (min-width: 640px) 38vw, 62vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan text-ink shadow-lg transition-transform group-hover:scale-110 motion-reduce:transition-none">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden="true">
                  <path d="M7 5v14l12-7z" fill="currentColor" />
                </svg>
              </span>
            </button>
            {deptName(v.department) && (
              <Link
                href={`/roles/${v.department}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
              >
                {deptName(v.department)}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        ))}
      </div>
      {hint && <p className="shell mt-3 text-sm text-bone/50 md:hidden">{hint}</p>}

      {playing && (
        <VideoModal youtubeId={playing.youtubeId} label={`${playing.name}, ${playing.role}`} vertical onClose={() => setPlaying(null)} />
      )}
    </div>
  );
}
