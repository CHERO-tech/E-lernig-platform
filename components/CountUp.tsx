"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 900;

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(match ? "0" + match[2] : value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      const id = window.setTimeout(() => setDisplay(value), 0);
      return () => window.clearTimeout(id);
    }

    let rafId = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION_MS);
            const current = Math.round(target * easeOutQuad(t));
            setDisplay(`${current}${suffix}`);
            if (t < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className="stat-num">
      {display}
    </span>
  );
}
