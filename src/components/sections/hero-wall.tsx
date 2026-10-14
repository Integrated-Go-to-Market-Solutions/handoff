import Image from "next/image";
import { Button } from "../brand";
import { Counter } from "../counter";
import { VideoLoop } from "../video-loop";
import { hero, team } from "@/lib/content";

/**
 * Alternate hero: the team is the page, not an illustration beside it.
 *
 * The argument on every call was that competitors talk about talent and never
 * show it, because their talent is a bench rather than a company. This puts
 * seven real faces and a video in the first screen, which is the one thing
 * nobody in this category can copy.
 */

// Ordered for the wall, not the grid: faces that read well at small size and
// look outward go in the corners.
const WALL = [
  { kind: "photo", slug: "jazmin-esparza", name: "Jazmin", role: "Chief of Staff" },
  { kind: "video", slug: "vibes", name: "Medellín", role: "A day at Handoff" },
  { kind: "photo", slug: "catalina-saldarriaga", name: "Catalina", role: "Operations Manager" },
  { kind: "photo", slug: "jake-castro", name: "Jake", role: "VP of Automation" },
  { kind: "photo", slug: "leidy-quintero", name: "Leidy", role: "Project Manager" },
  { kind: "photo", slug: "karla-patron", name: "Karla", role: "Marketing Specialist" },
  { kind: "photo", slug: "simon-quintero", name: "Simon", role: "Executive Assistant" },
  { kind: "photo", slug: "shaori-velueta", name: "Shaori", role: "Digital Marketer" },
] as const;

export function HeroWall() {
  return (
    <section className="relative isolate min-h-170 overflow-hidden bg-ink lg:h-[94vh]">
      {/* The wall itself, edge to edge. */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 sm:grid-cols-4 sm:grid-rows-2">
        {WALL.map((cell, i) => (
          <div
            key={cell.slug}
            className={`group relative overflow-hidden ${
              i >= 4 ? "hidden sm:block" : ""
            }`}
          >
            {cell.kind === "video" ? (
              <VideoLoop
                src="/video/vibes.mp4"
                poster="/video/vibes.jpg"
                name=""
                caption=""
                bare
              />
            ) : (
              <Image
                src={`/images/team/${cell.slug}.webp`}
                alt={`${cell.name}, ${cell.role} at Handoff`}
                fill
                priority={i < 4}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.05]"
              />
            )}

            {/* Name appears on hover, so the wall reads as people not pattern. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-ink/90 to-transparent p-4 pt-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="display text-sm text-bone">{cell.name}</p>
              <p className="text-[0.72rem] text-cyan">{cell.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scrim. Heavy enough to carry the headline, light enough that the faces
          still read as the subject. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,31,31,0.55) 0%, rgba(31,31,31,0.30) 30%, rgba(31,31,31,0.72) 62%, rgba(31,31,31,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative flex h-full min-h-170 flex-col justify-end pb-16 pt-28 lg:min-h-0">
        <h1 className="display max-w-[16ch] text-[clamp(3rem,8.5vw,7rem)] text-bone">
          {hero.headline.map((part) => (
            <span
              key={part.text}
              className={
                part.tone === "royal"
                  ? "text-azure"
                  : part.tone === "cyan"
                    ? "text-cyan"
                    : undefined
              }
            >
              {part.text}{" "}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-bone/80">
          Every face above works at Handoff. Not a stock library, not a bench of
          avatars. We place the top 1% of Latin American talent inside US
          companies, and we hired ourselves the same way.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="ghostDark">
            {hero.secondary.label}
          </Button>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5">
          <div>
            <dt className="display text-2xl text-cyan">
              <Counter to={300} prefix="~" />
            </dt>
            <dd className="mt-1 text-[0.78rem] text-bone/60">
              candidates reviewed per role
            </dd>
          </div>
          <div>
            <dt className="display text-2xl text-cyan">
              <Counter to={90} suffix="-day" />
            </dt>
            <dd className="mt-1 text-[0.78rem] text-bone/60">
              guarantee on direct hires
            </dd>
          </div>
          <div>
            <dt className="display text-2xl text-cyan">{team.length}</dt>
            <dd className="mt-1 text-[0.78rem] text-bone/60">
              {hero.teamStatLabel}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
