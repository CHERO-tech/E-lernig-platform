"use client";

import { MotionConfig } from "framer-motion";

export function OrbitProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
