/**
 * Small line-icon set, cyan stroke on a dark card, in the spirit of the
 * brand guidelines' "Elements Usage" page (background-removed objects with a
 * teal stroke outline). The guidelines' actual icons are photographed
 * objects run through a halftone filter — real photography, not something to
 * fake credibly without the source images — so these are redrawn as simple
 * line marks instead, using the same category concepts the guide lists
 * (notifications, growth, direction, global reach, search, goals, feedback,
 * launch). Swap for the licensed photo-icon set if the source files show up.
 */
const paths = {
  bell: (
    <path d="M12 4.5c-2.6 0-4.4 2-4.4 4.6v2.8c0 .8-.3 1.6-.9 2.2l-.9.9h12.4l-.9-.9a3.1 3.1 0 0 1-.9-2.2V9.1c0-2.6-1.8-4.6-4.4-4.6ZM10.2 17.5a1.9 1.9 0 0 0 3.6 0" />
  ),
  trendingUp: (
    <path d="M4 16.5 9.5 11l3.5 3.5L20 7M20 7h-4.5M20 7v4.5" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="m14.6 9.4-1.7 4.2a1 1 0 0 1-.5.5l-4.2 1.7 1.7-4.2a1 1 0 0 1 .5-.5Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M4.5 12h15M12 4.5c2 2 3 4.7 3 7.5s-1 5.5-3 7.5c-2-2-3-4.7-3-7.5s1-5.5 3-7.5Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.1" />
      <path d="m19.5 19.5-4.2-4.2" />
    </>
  ),
  chat: (
    <>
      <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3.5V15.5h-1a2 2 0 0 1-2-2Z" />
      <path d="M8.7 10h6.6M8.7 12.7h4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.5c2.6 1.3 4.2 4 4.2 7.6 0 2.6-1 5.3-2.4 7l-1.8 1.9-1.8-1.9c-1.4-1.7-2.4-4.4-2.4-7 0-3.6 1.6-6.3 4.2-7.6Z" />
      <circle cx="12" cy="10.6" r="1.7" />
      <path d="m8.3 15.5-2.6 1.3.7-3M15.7 15.5l2.6 1.3-.7-3" />
    </>
  ),
  clipboard: (
    <>
      <path d="M7 5.5h-1a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 18 5.5h-1" />
      <rect x="8.5" y="3.5" width="7" height="3.5" rx="1" />
      <path d="m8.2 12.5 2 2 4-4.3" />
    </>
  ),
  envelope: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 17.5h6M9.8 20.5h4.4" />
      <path d="M12 3.5a5.8 5.8 0 0 0-3.2 10.6c.6.4 1 1.1 1 1.9v.5h4.4v-.5c0-.8.4-1.5 1-1.9A5.8 5.8 0 0 0 12 3.5Z" />
    </>
  ),
  /* Industry tile set (10/5): simpler, lighter line icons drawn for a thin
     1.25 stroke, replacing the heavier building/rocket/megaphone/cart/globe
     on the industry tiles only. */
  home: (
    <>
      <path d="M4 10.2 12 4l8 6.2V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1Z" />
    </>
  ),
  trend: (
    <>
      <path d="M3.5 16.5 9 11l4 4 7.5-7.5" />
      <path d="M15 7.5h5.5V13" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4 3.5 8.5 12 13l8.5-4.5Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  bag: (
    <>
      <path d="M5.5 8h13l-.9 11.1a1 1 0 0 1-1 .9H7.4a1 1 0 0 1-1-.9Z" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.5s-6.5-5.4-6.5-10.8a6.5 6.5 0 0 1 13 0c0 5.4-6.5 10.8-6.5 10.8Z" />
      <circle cx="12" cy="9.7" r="2.3" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.6 13.3-1.1 7.2 4.5-2.4 4.5 2.4-1.1-7.2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4" />
      <path d="M17 14.3a5.5 5.5 0 0 1 3.5 5.2" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="16.5" rx="1" />
      <path d="M8.5 8h1.5M14 8h1.5M8.5 12h1.5M14 12h1.5M8.5 16h1.5M14 16h1.5" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 4.5h2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.3h7.6a1.5 1.5 0 0 0 1.5-1.2l1.4-6.8H6.4" />
      <circle cx="10" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10.5v3a1 1 0 0 0 1 1h1.2l1.1 4.3a1 1 0 0 0 1 .7h.9l-.8-5h1.1L18 17.5V6.5l-8.7 3H5a1 1 0 0 0-1 1Z" />
      <path d="M18 8.8a2.6 2.6 0 0 1 0 4.4" />
    </>
  ),
  car: (
    <>
      <path d="M1.5 16.3c.3-2 1-3.5 2.2-4.4 1.6-1.2 3-1.4 4.4-2.6 1.3-1.1 2.2-1.8 4.4-1.8 2.6 0 3.6.7 5.3 2.1 1 .8 1.6.9 2.8 1.1 1.4.2 2.2.9 2.4 2.4" />
      <path d="M1.4 16.3h20.2a.8.8 0 0 1 .8.9l-.2 1.6a1 1 0 0 1-1 .9h-1a1 1 0 0 1-1-1v-.4H5.5v.4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1l-.2-1.6a.8.8 0 0 1 .1-.8Z" />
      <path d="M7.5 11.5V16M14 10.3V16" />
      <path d="M18.2 12.6c1 .1 1.6.2 2 .4" />
      <circle cx="6.3" cy="18.6" r="1.6" />
      <circle cx="17.2" cy="18.6" r="1.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.6 5.4 5.9.7-4.4 4.1 1.2 5.9-5.3-2.9-5.3 2.9 1.2-5.9-4.4-4.1 5.9-.7Z" />
  ),
  handshake: (
    <>
      <path d="M2.5 12.5 6 9.3a1.7 1.7 0 0 1 2.3 0l1 .9" />
      <path d="m9.3 10.2 3 2.9a1.3 1.3 0 0 1-1.8 1.9l-1.8-1.7" />
      <path d="m10.5 13 1.3 1.3a1.3 1.3 0 0 0 1.9-1.8l-.3-.3" />
      <path d="M21.5 12.5 18 9.3a1.7 1.7 0 0 0-2.3 0l-3.9 3.6a1.4 1.4 0 0 0 1.9 2l.6-.5" />
      <path d="M2.5 12.5 5 15l1.3 1.2a1.6 1.6 0 0 0 2.2-.1" />
      <path d="M21.5 12.5 19 15l-1.2 1.1" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  /** Heavier strokes for the large, standalone icon elements. */
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** The cyan-stroke badge these icons sit in on card layouts. */
/**
 * Why LATAM's icon. Matches the homepage industry tiles (10/5): a bare,
 * thin-stroke line icon with no ring around it, in the section's royal blue.
 */
export function IconBadge({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return <Icon name={name} strokeWidth={1.25} className={`h-10 w-10 text-royal md:h-12 md:w-12 ${className}`} />;
}
