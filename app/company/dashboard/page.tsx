"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { usePeople } from "@/lib/people/usePeople";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { EmptyState } from "@/components/ui";
import { Briefcase, Users, Target, TrendingUp, Settings, Search, MessageSquare, Award, BookOpen } from "lucide-react";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/company/dashboard", label: "Dashboard", icon: <Briefcase size={18} /> },
  { href: "#", label: "Candidates", icon: <Users size={18} />, disabled: true },
  { href: "/opportunities", label: "Opportunities", icon: <Target size={18} /> },
  { href: "#", label: "Analytics", icon: <TrendingUp size={18} />, disabled: true },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { user } = useAuth();
  const { people } = usePeople();
  const [search, setSearch] = useState("");

  const students = people.filter((p) => p.role === "student");
  const filtered = students.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell roleLabel="Company" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs mb-2 text-pg2">$ whoami — company</p>
            <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
              Welcome back, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="text-mg">Find talent, or post a role for the community.</p>
          </div>
          <Link
            href="/company/post-job"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-pg text-dg hover:brightness-110 whitespace-nowrap"
          >
            + Post Opportunity
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden bg-white border border-border">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border gap-4">
            <h2 className="font-semibold text-dt">Find Students</h2>
            <div className="relative w-full max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mg" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location..."
                aria-label="Search by name or location"
                className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No students found" description="Try a different name or location." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {filtered.map((student) => (
                <div key={student.id} className="rounded-xl p-5 bg-ow border border-border">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0 bg-pg/10 text-pg2">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-dt truncate">{student.name}</p>
                        {student.online && <span className="w-2 h-2 rounded-full bg-pg shrink-0" title="Online" />}
                      </div>
                      <p className="text-xs text-mg truncate">{student.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-3 border-y border-border mb-4">
                    <div className="text-center flex-1">
                      <p className="font-mono text-lg font-bold flex items-center justify-center gap-1 text-dt">
                        <BookOpen size={14} className="text-pg2" /> {student.courseCount}
                      </p>
                      <p className="text-xs text-mg">Courses</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="font-mono text-lg font-bold flex items-center justify-center gap-1 text-dt">
                        <Award size={14} className="text-pg2" /> {student.certificates}
                      </p>
                      <p className="text-xs text-mg">Certificates</p>
                    </div>
                  </div>

                  <Link
                    href={`/messages/${student.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-pg text-dg hover:brightness-110 transition-all"
                  >
                    <MessageSquare size={16} />
                    Message
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

export default function CompanyDashboard() {
  return (
    <ProtectedRoute requiredRole="company">
      <DashboardContent />
    </ProtectedRoute>
  );
}
