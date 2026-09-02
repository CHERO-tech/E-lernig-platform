"use client";

import { useState } from "react";
import BrandMark from "./BrandMark";

const NAV_LINKS = [
  { href: "#tracks", label: "Tracks" },
  { href: "#how", label: "How it works" },
  { href: "#difference", label: "Why Forge" },
  { href: "#employers", label: "For employers" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site">
      <nav className="wrap">
        <a className="brand" href="#top">
          <BrandMark />
          FORGE
        </a>
        <div className="navlinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="navcta">
          <a href="#" className="btn btn-ghost btn-sm">
            Log in
          </a>
          <a href="#tracks" className="btn btn-primary btn-sm">
            Get started
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div>
          <div className="mobile-menu-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
