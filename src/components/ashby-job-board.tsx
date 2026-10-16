"use client";

import { useEffect, useRef } from "react";

/**
 * Handoff's open positions, from their Ashby job board (10/16). Ashby's
 * script looks for #ashby_embed and draws the board inside it. The script is
 * added on every visit, not once per session, so the board also appears when
 * someone reaches this page from inside the site.
 */
export function AshbyJobBoard({ boardUrl }: { boardUrl: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !boardUrl) return;
    host.innerHTML = '<div id="ashby_embed"></div>';
    const script = document.createElement("script");
    script.src = `${boardUrl.replace(/\/$/, "")}/embed?version=2`;
    script.async = true;
    host.appendChild(script);
    return () => {
      host.innerHTML = "";
    };
  }, [boardUrl]);

  return <div ref={hostRef} className="min-h-[24rem]" />;
}
