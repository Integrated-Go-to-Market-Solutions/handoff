/**
 * Brand promo under the Handoff Hiring System on /how-it-works. Grayscale
 * like the site's other footage; plays only when the visitor presses play,
 * starting muted.
 */
export function PromoVideo() {
  return (
    <section className="hw-dots relative bg-ink pb-14 text-bone md:pb-20">
      <div className="shell relative">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-(--radius-brand) border-2 border-cyan/50 bg-ink shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)]">
          <video
            className="block aspect-video w-full bg-ink grayscale"
            src="/videos/handoff-promo.mp4"
            poster="/videos/handoff-promo.jpg"
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Handoff: the team behind the hiring"
          />
        </div>
      </div>
    </section>
  );
}
