"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "div" | "article";

export default function Reveal({
  as = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: Tag;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = `reveal${inView ? " in-view" : ""}${className ? ` ${className}` : ""}`;
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  if (as === "article") {
    return (
      <article ref={ref as React.RefObject<HTMLElement>} className={classes} style={style}>
        {children}
      </article>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={classes} style={style}>
      {children}
    </div>
  );
}
