/* Shared animation constants for Orbit sections
 * Single source of truth for consistent motion feel across all components.
 */

export const ORBIT_EASE = [0.16, 1, 0.3, 1] as const;

export const MOTION = {
  easing: ORBIT_EASE,
  duration: {
    fast: 0.3,
    base: 0.5,
    slow: 0.7,
    verySlow: 1,
  },
  stagger: {
    sm: 0.05,
    md: 0.08,
    lg: 0.11,
  },
  viewport: {
    once: true,
    amount: 0.3,
  },
  spring: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  },
};

export const scrollOffset = {
  small: "start end",
  large: "start start",
} as const;
