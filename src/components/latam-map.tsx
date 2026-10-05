export function LatamMap({
  className = "",
  baseClassName = "",
  glowClassName = "",
  align = "center",
  tone = "cyan",
}: {
  className?: string;
  baseClassName?: string;
  glowClassName?: string;
  align?: "center" | "top";
  /** Colour of the tracing line and its glow. */
  tone?: "cyan" | "royal";
}) {
  const shapeClass = align === "top" ? "latam-map-shape-top" : "";

  return (
    <div
      className={`latam-map is-tracing pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <span
        className={`latam-map-shape absolute inset-0 ${shapeClass} ${baseClassName}`}
      />
      <span
        className={`latam-map-shape latam-map-glow absolute inset-0 ${
          tone === "royal" ? "latam-map-glow-royal bg-royal" : "bg-cyan"
        } ${shapeClass} ${glowClassName}`}
      />
    </div>
  );
}
