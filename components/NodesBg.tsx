"use client";

import { useEffect, useRef } from "react";

export default function NodesBg() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const shift = Math.min(60, window.scrollY * 0.18);
        el.style.transform = `translateY(${shift}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg ref={ref} className="nodes-bg" viewBox="0 0 400 500" fill="none">
      <path
        className="wire"
        d="M60 60 L180 140 L120 260 L260 320 L220 440"
        stroke="var(--forge)"
        strokeWidth="1.2"
      />
      <path
        className="wire"
        d="M180 140 L320 100 L340 240 L260 320"
        stroke="var(--brass)"
        strokeWidth="1.2"
        style={{ animationDelay: "-2s" }}
      />
      <circle className="pulse" cx="60" cy="60" r="4" fill="var(--ember)" />
      <circle className="pulse" cx="180" cy="140" r="4" fill="var(--forge)" style={{ animationDelay: "-1s" }} />
      <circle className="pulse" cx="120" cy="260" r="4" fill="var(--brass)" style={{ animationDelay: "-2s" }} />
      <circle className="pulse" cx="320" cy="100" r="4" fill="var(--forge)" style={{ animationDelay: "-.5s" }} />
      <circle className="pulse" cx="260" cy="320" r="4" fill="var(--ember)" style={{ animationDelay: "-1.5s" }} />
      <circle className="pulse" cx="340" cy="240" r="4" fill="var(--brass)" style={{ animationDelay: "-2.5s" }} />
      <circle className="pulse" cx="220" cy="440" r="4" fill="var(--forge)" style={{ animationDelay: "-3s" }} />
    </svg>
  );
}
