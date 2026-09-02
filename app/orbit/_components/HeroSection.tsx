"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section
      ref={ref}
      className="ob-hero"
      style={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background floating objects */}
      {!prefersReduced && (
        <>
          <motion.div
            className="ob-float-obj ob-float-1"
            style={{ y: y1 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              style={{
                width: "200px",
                height: "150px",
                background: "rgba(51, 166, 106, 0.1)",
                borderRadius: "var(--ob-radius-lg)",
                border: "1px solid var(--ob-border-subtle)",
              }}
            />
          </motion.div>
          <motion.div
            className="ob-float-obj ob-float-2"
            style={{ y: y2 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <div
              style={{
                width: "180px",
                height: "180px",
                background: "rgba(51, 166, 106, 0.08)",
                borderRadius: "50%",
                border: "1px solid var(--ob-border-subtle)",
              }}
            />
          </motion.div>
          <motion.div
            className="ob-float-obj ob-float-3"
            style={{ y: y3 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <div
              style={{
                width: "160px",
                height: "160px",
                background: "rgba(51, 166, 106, 0.12)",
                borderRadius: "var(--ob-radius-lg)",
                border: "1px solid var(--ob-border-subtle)",
              }}
            />
          </motion.div>
        </>
      )}

      {/* Content */}
      <motion.div
        className="ob-container"
        style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "800px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="ob-eyebrow">Master Real Skills</span>
        <h1 className="ob-h1" style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
          Learn. Build. Grow.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--ob-text-secondary)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
          Master in-demand skills through project-based learning with expert mentorship. No lectures, no passive watching — 
          just you, real projects, and personalized feedback that transforms your career.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            className="ob-btn ob-btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Explore Courses <ArrowRight size={18} />
          </motion.button>
          <motion.button
            className="ob-btn ob-btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            How It Works
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
