/**
 * Flight paths leaving the city in the Corporate Relocation hero (Anthony,
 * 10/15: a map or flight-path overlay so the page reads as relocation, not
 * housing). Drawn in the photo's own 16:9 units and sliced the same way the
 * photo is cropped, so the origin stays on downtown at every screen size.
 * Kept thin and faint because the photo is already busy. The paths sit in the
 * sky, clear of the headline.
 */
// The base of the Transamerica Pyramid: inside the part of the photo that
// isn't faded out on wide screens.
const ORIGIN = { x: 1136, y: 470 };

const PATHS = [
  `M ${ORIGIN.x} ${ORIGIN.y} Q 760 40 180 110`,
  `M ${ORIGIN.x} ${ORIGIN.y} Q 1330 20 1660 50`,
  `M ${ORIGIN.x} ${ORIGIN.y} Q 1440 240 1660 270`,
];

export function FlightPaths({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#3CDCC2" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {PATHS.map((d) => (
          <path key={d} d={d} strokeWidth={1.75} strokeDasharray="1 8" opacity={0.7} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={14} fill="none" stroke="#3CDCC2" strokeWidth={1.5} opacity={0.5} vectorEffect="non-scaling-stroke" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={5} fill="#3CDCC2" />
    </svg>
  );
}
