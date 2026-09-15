"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  height?: string;
  trackHeight?: string;
}

export function HorizontalScrollSection({
  children,
  height = "300vh",
  trackHeight = "100dvh",
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} style={{ height }}>
      <div
        ref={trackRef}
        style={{
          position: "sticky",
          top: 0,
          height: trackHeight,
          overflow: "hidden",
        }}
      >
        <motion.div style={{ x }} className="ob-h-scroll-track">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
