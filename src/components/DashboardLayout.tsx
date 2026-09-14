import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  key: string;
}

interface DashboardLayoutProps {
  role: string;
  roleLabel: string;
  navItems: NavItem[];
  children: React.ReactNode;
  activeKey: string;
  onNav: (key: string) => void;
  userName?: string;
  userInitials?: string;
}

export default function DashboardLayout({
  role,
  roleLabel,
  navItems,
  children,
  activeKey,
  onNav,
  userName = "User",
  userInitials = "U",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F5F7F5" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300 shrink-0"
        style={{
          width: sidebarOpen ? 240 : 64,
          background: "#0B291A",
          borderRight: "1px solid rgba(53,196,122,0.12)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: "rgba(53,196,122,0.12)", minHeight: 68 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#35C47A" }}
          >
            <span className="font-bold text-xs" style={{ color: "#071C12", fontFamily: "monospace" }}>
              T
            </span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-semibold text-sm leading-tight">TVET Digital</p>
              <p className="font-mono text-xs" style={{ color: "#35C47A" }}>
                {roleLabel}
              </p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto opacity-40 hover:opacity-80 transition-opacity"
            style={{ color: "#8BE0B0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M15 18l-6-6 6-6" />
              ) : (
                <path d="M9 18l6-6-6-6" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNav(item.key)}
                className="w-full flex items-center gap-3 px-4 py-2.5 transition-all text-left"
                style={{
                  color: active ? "#35C47A" : "#8BE0B0",
                  background: active ? "rgba(53,196,122,0.1)" : "transparent",
                  borderRight: active ? "2px solid #35C47A" : "2px solid transparent",
                  fontSize: 13,
                }}
              >
                <span className="shrink-0 w-5 flex items-center justify-center">{item.icon}</span>
                {sidebarOpen && <span className="truncate font-medium">{item.label}</span>}
                {active && sidebarOpen && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#35C47A" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "rgba(53,196,122,0.12)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              {userInitials}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{userName}</p>
                <p className="font-mono text-xs truncate" style={{ color: "#606C66" }}>
                  {role}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
