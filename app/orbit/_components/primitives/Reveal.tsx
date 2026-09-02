"use client";

import { motion, MotionProps } from "framer-motion";
import { MOTION } from "../../_lib/motion";

interface RevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "section";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...props
}: RevealProps) {
  const Component = motion[as as keyof typeof motion] as any;

  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration.base,
        delay,
        ease: MOTION.easing,
      }}
      viewport={MOTION.viewport}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
