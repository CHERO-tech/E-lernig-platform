"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Layer {
  id: string;
  content: React.ReactNode;
  range: [number, number];
  offset?: { y?: number; x?: number; rotate?: number };
  className?: string;
}

interface LayeredRevealProps {
  layers: Layer[];
  className?: string;
}

export function LayeredReveal({ layers, className = "" }: LayeredRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className={`ob-layered-section ${className}`}>
      {layers.map((layer) => (
        <LayerElement
          key={layer.id}
          layer={layer}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function LayerElement({
  layer,
  scrollYProgress,
}: {
  layer: Layer;
  scrollYProgress: any;
}) {
  const [rangeStart, rangeEnd] = layer.range;
  const opacity = useTransform(
    scrollYProgress,
    [rangeStart, (rangeStart + rangeEnd) / 2, rangeEnd],
    [0, 1, 0]
  );

  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [40, 0]);

  return (
    <motion.div
      className={`ob-layer ${layer.className || ""}`}
      style={{
        opacity,
        y,
        position: "absolute",
        top: layer.offset?.y || 0,
        left: layer.offset?.x || 0,
      }}
    >
      {layer.content}
    </motion.div>
  );
}
