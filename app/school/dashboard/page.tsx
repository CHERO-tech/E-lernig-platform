"use client";

import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { usePeople } from "@/lib/people/usePeople";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { StatCard } from "@/components/ui";
import { Building2, Users, BookOpen, Settings, UserCog } from "lucide-react";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/school/dashboard", label: "Dashboard", icon: <Building2 size={18} /> },
  { href: "#", label: "Students", icon: <Users size={18} />, disabled: true },
  { href: "#", label: "Programs", icon: <BookOpen size={18} />, disabled: true },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { people } = usePeople();

  const trainerCount = people.filter((p) => p.role === "trainer").length;
  const studentCount = people.filter((p) => p.role === "student").length;

  return (
    <DashboardShell roleLabel="School" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2 text-pg2">$ whoami — school</p>
          <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
            Welcome, {user?.name?.split(" ")[0]}.
          </h1>
          <p className="text-mg">An overview of what&apos;s available on the platform.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Programs on Platform" value={courses.length} icon={<BookOpen size={20} className="text-pg2" />} />
          <StatCard label="Registered Trainers" value={trainerCount} icon={<UserCog size={20} className="text-pg2" />} />
          <StatCard label="Registered Students" value={studentCount} icon={<Users size={20} className="text-pg2" />} />
        </div>

        <div className="rounded-xl p-6 bg-white border border-border">
          <h2 className="font-semibold mb-2 text-dt">Institution tools are on the way</h2>
          <p className="text-sm text-mg max-w-lg">
            Per-institution student rosters, program management, and completion reports aren&apos;t
            wired up yet — the platform doesn&apos;t track which students or trainers belong to
            which institution. The stats above reflect the whole platform, not just your school.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function SchoolDashboard() {
  return (
    <ProtectedRoute requiredRole="school">
      <DashboardContent />
    </ProtectedRoute>
  );
}
