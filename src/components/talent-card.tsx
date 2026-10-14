import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * The cyan pill talent card from the Templates page of the brand guidelines.
 * Full colour at rest, dropping to black and white on hover. Shared by the
 * homepage and /talent.
 */
export function TalentCard({
  slug,
  name,
  role,
  index = 0,
}: {
  slug: string;
  name: string;
  role: string;
  index?: number;
}) {
  return (
    <Reveal delay={index * 70} className="w-67 shrink-0 snap-start sm:w-auto">
      <article className="group h-full overflow-hidden rounded-(--radius-brand) bg-cyan transition-transform duration-500 hover:-translate-y-2">
        <div className="px-5 pb-4 pt-5 text-center">
          <p className="text-[0.82rem] font-medium text-ink/70">{name}</p>
          <p className="text-[1.02rem] font-bold leading-tight text-ink">{role}</p>
        </div>

        <div className="relative aspect-3/4 overflow-hidden">
          <Image
            src={`/images/team/${slug}.webp`}
            alt={`${name}, ${role} at Handoff`}
            fill
            sizes="(max-width: 640px) 268px, (max-width: 1024px) 33vw, 22vw"
            // The first row is above the fold and often the largest image on
            // screen, so it loads straight away.
            loading={index < 4 ? "eager" : undefined}
            className="object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale"
          />
        </div>
      </article>
    </Reveal>
  );
}
