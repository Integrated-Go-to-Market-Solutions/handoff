"use client";

import { useEffect, useRef } from "react";

/** Full-screen video pop-up. Closes on the X, Escape, or a click on the backdrop. */
export function VideoModal({
  src,
  label,
  onClose,
  vertical = false,
}: {
  src: string;
  label: string;
  onClose: () => void;
  vertical?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
    >
      <div className={`relative w-full ${vertical ? "max-w-[min(90vw,480px)]" : "max-w-4xl"}`}>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="block max-h-[85vh] w-full rounded-[var(--radius-card)] border-2 border-cyan bg-ink"
        />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-cyan text-ink shadow-lg transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
