"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";
import { useAuth } from "@/lib/auth/useAuth";
import { LogOut, Settings, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "#tracks", label: "Tracks" },
  { href: "#how", label: "How it works" },
  { href: "#difference", label: "Why Forge" },
  { href: "#employers", label: "For employers" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push("/");
  };

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
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white text-xs font-bold">
                  {user?.avatar}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                        {user?.role}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href={`/${user?.role}/dashboard`}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Zap size={16} />
                        My Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-slate-200 dark:border-slate-700"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

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
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="mobile-btn">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="mobile-btn">
                  Get started
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/${user?.role}/dashboard`}
                  onClick={() => setOpen(false)}
                  className="mobile-btn"
                >
                  My Dashboard
                </Link>
                <Link href="/settings" onClick={() => setOpen(false)} className="mobile-btn">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="mobile-btn text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
