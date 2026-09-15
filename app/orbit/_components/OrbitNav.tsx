"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function OrbitNav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <>
      <nav
        className={`ob-nav ${isScrolled ? "ob-nav--scrolled" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isScrolled ? "0.75rem 2rem" : "1.5rem 2rem",
          background: isScrolled ? "rgba(11,11,12,0.8)" : "transparent",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--ob-border-subtle)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Orbit
        </div>

        {/* Desktop Navigation */}
        <div className="ob-nav-desktop">
          <a href="#discover" style={{ color: "var(--ob-text-secondary)", fontSize: "0.95rem" }}>
            Discover
          </a>
          <a href="#learn" style={{ color: "var(--ob-text-secondary)", fontSize: "0.95rem" }}>
            Learn
          </a>
          <a href="#categories" style={{ color: "var(--ob-text-secondary)", fontSize: "0.95rem" }}>
            Categories
          </a>
          <a href="#why" style={{ color: "var(--ob-text-secondary)", fontSize: "0.95rem" }}>
            Why Orbit
          </a>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              background: "transparent",
              color: "var(--ob-text-primary)",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Log in
          </button>
          <button
            style={{
              background: "var(--ob-accent)",
              color: "var(--ob-text-inverse)",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--ob-radius-sm)",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ob-text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
            }}
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45 },
                closed: { rotate: 0 },
              }}
            >
              ☰
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          background: "rgba(11,11,12,0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--ob-border-subtle)",
          zIndex: 999,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="#discover" onClick={() => setMobileMenuOpen(false)}>
            Discover
          </a>
          <a href="#learn" onClick={() => setMobileMenuOpen(false)}>
            Learn
          </a>
          <a href="#categories" onClick={() => setMobileMenuOpen(false)}>
            Categories
          </a>
          <a href="#why" onClick={() => setMobileMenuOpen(false)}>
            Why Orbit
          </a>
        </div>
      </motion.div>
    </>
  );
}
