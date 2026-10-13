import { KpiRibbon } from "../kpi-ribbon";

/**
 * The three KPIs as their own ribbon under the homepage industries section,
 * not inside the industries panel (Handoff, 10/13). Light gray between the
 * two dark sections so it reads as a separate band. Static, no motion.
 */
export function KpiBand() {
  return (
    <section className="bg-bone py-8 md:py-10" aria-label="Handoff by the numbers">
      <div className="shell">
        <KpiRibbon tone="light" />
      </div>
    </section>
  );
}
