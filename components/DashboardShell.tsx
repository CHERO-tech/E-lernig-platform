"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";
import { useAuth } from "@/lib/auth/useAuth";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export default function DashboardShell({
  roleLabel,
  navItems,
  children,
}: {
  roleLabel: string;
  navItems: DashboardNavItem[];
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-ow">
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 md:hidden z-40 p-2 bg-dg2 text-white rounded-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-dg2 border-r border-pg/[0.12] flex flex-col fixed h-screen z-40 transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-pg/[0.12] min-h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 text-white font-mono font-semibold text-sm">
            <BrandMark />
            FORGE
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-brass"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-mg/50 cursor-not-allowed"
                >
                  <span className="shrink-0 w-5 flex items-center justify-center">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-wide bg-white/5 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all border-r-2 ${
                  active
                    ? "text-pg bg-pg/10 border-pg font-medium"
                    : "text-brass border-transparent hover:bg-white/5"
                }`}
              >
                <span className="shrink-0 w-5 flex items-center justify-center">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-pg/[0.12]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm bg-pg text-dg">
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="font-mono text-xs truncate text-mg">{roleLabel}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-mg hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-64 min-w-0">{children}</main>
    </div>
  );
}
