"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterStatProps {
  value: string;
  label: string;
}

export function CounterStat({ value, label }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = value.slice(match[1].length);
    const start = performance.now();
    const duration = 900;

    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) * (1 - t);
      const current = Math.round(target * eased);
      setDisplayValue(`${current}${suffix}`);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="ob-stat">
      <div className="ob-stat-value">{displayValue}</div>
      <div className="ob-stat-label">{label}</div>
    </div>
  );
}
