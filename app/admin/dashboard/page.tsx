"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePeople } from "@/lib/people/usePeople";
import { useCourses } from "@/lib/courses/useCourses";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { StatCard } from "@/components/ui";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  BookOpen,
  DollarSign,
  Award,
  GraduationCap,
  Building2,
  Briefcase,
  UserCog,
} from "lucide-react";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { href: "/admin/moderation", label: "Reports", icon: <AlertTriangle size={18} /> },
  { href: "/admin/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { people } = usePeople();
  const { courses } = useCourses();

  const activeUsers = people.filter((p) => p.status === "active").length;
  const revenue = courses.reduce((sum, c) => sum + c.price * c.students, 0);
  const certificatesIssued = people.reduce((sum, p) => sum + p.certificates, 0);

  const roleBreakdown = [
    { label: "Students", role: "student", icon: <GraduationCap size={20} className="text-pg2" /> },
    { label: "Trainers", role: "trainer", icon: <UserCog size={20} className="text-pg2" /> },
    { label: "Schools", role: "school", icon: <Building2 size={20} className="text-pg2" /> },
    { label: "Companies", role: "company", icon: <Briefcase size={20} className="text-pg2" /> },
  ] as const;

  return (
    <DashboardShell roleLabel="Admin" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs mb-2 text-pg2">$ sudo systemctl status forge</p>
            <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">Platform Overview</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pg" />
              <span className="font-mono text-xs text-pg2">{people.length} total accounts</span>
            </div>
          </div>
          <Link
            href="/settings"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-pg text-dg hover:brightness-110 whitespace-nowrap"
          >
            System Settings
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard label="Total Users" value={people.length} icon={<Users size={20} className="text-pg2" />} />
          <StatCard label="Active Users" value={activeUsers} icon={<BarChart3 size={20} className="text-pg2" />} />
          <StatCard label="Courses" value={courses.length} icon={<BookOpen size={20} className="text-pg2" />} />
          <StatCard
            label="Revenue"
            value={`$${(revenue / 1000).toFixed(1)}k`}
            icon={<DollarSign size={20} className="text-pg2" />}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {roleBreakdown.map((r) => (
            <StatCard
              key={r.role}
              label={r.label}
              value={people.filter((p) => p.role === r.role).length}
              icon={r.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl p-6 bg-white border border-border">
            <h2 className="font-semibold mb-5 text-dt">Admin Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Manage Users", icon: <Users size={22} className="text-pg2" />, href: "/admin/users" },
                { label: "Reports", icon: <AlertTriangle size={22} className="text-pg2" />, href: "/admin/moderation" },
                { label: "Analytics", icon: <BarChart3 size={22} className="text-pg2" />, href: "/admin/analytics" },
                { label: "Settings", icon: <Settings size={22} className="text-pg2" />, href: "/settings" },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all hover:-translate-y-0.5 hover:shadow-lg bg-ow border border-border"
                >
                  {a.icon}
                  <span className="font-mono text-xs text-mg">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 bg-white border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-pg2" />
              <h3 className="font-semibold text-dt">Certificates Issued</h3>
            </div>
            <p className="font-mono text-3xl font-bold text-pg2">{certificatesIssued}</p>
            <p className="text-xs mt-1 text-mg">Across all learners</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}
