"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { Users, BookOpen, BarChart3, AlertCircle, Settings } from "lucide-react";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/guardian/dashboard", label: "Dashboard", icon: <Users size={18} /> },
  { href: "#", label: "My Wards", icon: <BookOpen size={18} />, disabled: true },
  { href: "#", label: "Analytics", icon: <BarChart3 size={18} />, disabled: true },
  { href: "/notifications", label: "Alerts", icon: <AlertCircle size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { user } = useAuth();

  return (
    <DashboardShell roleLabel="Guardian" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2 text-pg2">$ whoami — guardian</p>
          <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
            Welcome, {user?.name?.split(" ")[0]}.
          </h1>
          <p className="text-mg">Monitor your ward&apos;s learning progress and performance.</p>
        </div>

        <div className="rounded-xl p-6 bg-white border border-border mb-6">
          <h2 className="font-semibold mb-2 text-dt">Ward tracking isn&apos;t connected yet</h2>
          <p className="text-sm text-mg max-w-lg">
            There&apos;s no guardian-to-student relationship in the platform&apos;s data yet, so
            there&apos;s no real ward to show progress for here. Once accounts can be linked to a
            guardian, this page will show their enrolled courses, progress, and activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/notifications"
            className="flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white border border-border"
          >
            <AlertCircle size={22} className="text-pg2" />
            <div>
              <p className="text-sm font-semibold text-dt">Alerts</p>
              <p className="text-xs text-mg">Notifications sent to your account</p>
            </div>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white border border-border"
          >
            <Settings size={22} className="text-pg2" />
            <div>
              <p className="text-sm font-semibold text-dt">Settings</p>
              <p className="text-xs text-mg">Manage your account</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function GuardianDashboard() {
  return (
    <ProtectedRoute requiredRole="guardian">
      <DashboardContent />
    </ProtectedRoute>
  );
}
