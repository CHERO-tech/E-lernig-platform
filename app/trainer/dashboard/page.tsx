"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { StatCard, EmptyState } from "@/components/ui";
import {
  LayoutDashboard,
  PlusCircle,
  FileCheck2,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Star,
  DollarSign,
  BookOpen,
} from "lucide-react";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/trainer/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/trainer/create-course", label: "Create Course", icon: <PlusCircle size={18} /> },
  { href: "/trainer/grading", label: "Grading", icon: <FileCheck2 size={18} /> },
  { href: "/trainer/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { href: "/messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();

  const trainerCourses = courses.filter((c) => c.instructorId === user?.id);
  const totalStudents = trainerCourses.reduce((sum, c) => sum + c.students, 0);
  const avgRating =
    trainerCourses.length > 0
      ? (trainerCourses.reduce((sum, c) => sum + c.rating, 0) / trainerCourses.length).toFixed(1)
      : "0.0";
  const courseRevenue = trainerCourses.reduce((sum, c) => sum + c.price * c.students, 0);

  return (
    <DashboardShell roleLabel="Trainer" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs mb-2 text-pg2">$ whoami — trainer</p>
            <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
              Welcome back, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="text-mg">Here&apos;s your teaching overview.</p>
          </div>
          <Link
            href="/trainer/create-course"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-pg text-dg hover:brightness-110 whitespace-nowrap"
          >
            + Create Course
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Students" value={totalStudents} icon={<Users size={20} className="text-pg2" />} />
          <StatCard label="Active Courses" value={trainerCourses.length} icon={<BookOpen size={20} className="text-pg2" />} />
          <StatCard label="Avg. Rating" value={avgRating} icon={<Star size={20} className="text-pg2" />} />
          <StatCard
            label="Course Revenue"
            value={`$${(courseRevenue / 1000).toFixed(1)}k`}
            icon={<DollarSign size={20} className="text-pg2" />}
          />
        </div>

        <div className="rounded-xl overflow-hidden bg-white border border-border mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-dt">My Courses</h2>
            <Link href="/trainer/create-course" className="font-mono text-xs text-pg2">
              + New course
            </Link>
          </div>

          {trainerCourses.length === 0 ? (
            <EmptyState
              title="No courses yet"
              description="Create your first course to start teaching."
              action={
                <Link
                  href="/trainer/create-course"
                  className="inline-flex px-4 py-2 rounded-lg font-semibold text-sm bg-pg text-dg hover:brightness-110"
                >
                  Create Course
                </Link>
              }
            />
          ) : (
            <div className="divide-y divide-border">
              {trainerCourses.map((course) => {
                const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);
                const completed = courseEnrollments.filter((e) => {
                  const total = e.lessonProgress.length;
                  const done = e.lessonProgress.filter((lp) => lp.completed).length;
                  return total > 0 && done === total;
                }).length;
                const completionPercent =
                  courseEnrollments.length > 0 ? Math.round((completed / courseEnrollments.length) * 100) : 0;

                return (
                  <div key={course.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-dt truncate">{course.title}</p>
                      <p className="text-xs text-mg mt-1">
                        {course.students} students · {course.category}
                      </p>
                      <div className="h-1.5 rounded-full mt-3 max-w-xs bg-border">
                        <div
                          className="h-full rounded-full bg-pg"
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                      <p className="font-mono text-xs mt-1.5 text-pg2">{completionPercent}% avg. completion</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="flex items-center gap-1 font-mono text-xs text-pg2">
                        <Star size={12} fill="currentColor" />
                        {course.rating.toFixed(1)}
                      </span>
                      <Link
                        href={`/courses/${course.id}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-pg/10 text-pg2 hover:bg-pg/20"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-semibold mb-3 text-dt">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Grade Assignments", icon: <FileCheck2 size={20} className="text-pg2" />, href: "/trainer/grading" },
              { label: "Create Quiz", icon: <PlusCircle size={20} className="text-pg2" />, href: "/trainer/quizzes/create" },
              { label: "View Analytics", icon: <BarChart3 size={20} className="text-pg2" />, href: "/trainer/analytics" },
              { label: "Messages", icon: <MessageSquare size={20} className="text-pg2" />, href: "/messages" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white border border-border"
              >
                {action.icon}
                <p className="text-xs font-semibold text-dt">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function TrainerDashboard() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <DashboardContent />
    </ProtectedRoute>
  );
}
