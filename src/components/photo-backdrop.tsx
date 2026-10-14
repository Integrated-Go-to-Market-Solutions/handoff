import Image from "next/image";

/**
 * A real photo, desaturated and faint, sitting behind a section's content
 * instead of a flat colour fill. Karla, on the call: "if we were to use a
 * picture, maybe we use it with... grayscale... it's still very plain, it
 * doesn't steal the show, but it gives texture on the background." Nico:
 * "it's with opacity or an effect of duotone... it doesn't steal the show."
 *
 * Sits absolutely inside a `position: relative` section as the first child;
 * content after it needs `relative` to stay above it.
 */
export function PhotoBackdrop({
  src,
  tone = "dark",
}: {
  src: string;
  /** Matches the overlay tint to the section it sits in. */
  tone?: "dark" | "light";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14] grayscale"
      />
      <div
        className={`absolute inset-0 ${
          tone === "dark"
            ? "bg-linear-to-b from-ink via-ink/85 to-ink"
            : "bg-linear-to-b from-bone via-bone/85 to-bone"
        }`}
      />
    </div>
  );
}
