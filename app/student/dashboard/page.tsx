"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import DashboardShell, { DashboardNavItem } from "@/components/DashboardShell";
import { NotificationBell } from "@/components/NotificationBell";
import { StatCard, EmptyState } from "@/components/ui";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { calculateCourseProgress } from "@/lib/enrollment/calculateProgress";
import { getUpcomingDeadlines } from "@/lib/enrollment/getUpcomingDeadlines";
import { getActivityFeed, ActivityType } from "@/lib/enrollment/getActivityFeed";
import { getUnremindedDeadlines, markDeadlinesReminded } from "@/lib/enrollment/deadlineReminders";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  Settings,
  FileCheck2,
  Award as AwardIcon,
  ThumbsUp,
  Video,
  ArrowLeft,
  Clock,
  AlertCircle,
  History,
  CheckCircle2,
  UserPlus,
  Bookmark,
  FileText,
} from "lucide-react";

const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  enrolled: <UserPlus size={16} className="text-info" />,
  quiz: <CheckCircle2 size={16} className="text-pg2" />,
  assignment: <FileCheck2 size={16} className="text-pg2" />,
  certificate: <AwardIcon size={16} className="text-warn" />,
};

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/my-learning", label: "My Learning", icon: <BookOpen size={18} /> },
  { href: "/my-grades", label: "My Grades", icon: <GraduationCap size={18} /> },
  { href: "/certificates", label: "Certificates", icon: <Award size={18} /> },
  { href: "/saved-courses", label: "Saved Courses", icon: <Bookmark size={18} /> },
  { href: "/resources", label: "Resources", icon: <FileText size={18} /> },
  { href: "/live-sessions", label: "Live Sessions", icon: <Video size={18} /> },
  { href: "/skill-endorsements", label: "Skill Endorsements", icon: <ThumbsUp size={18} /> },
  { href: "/messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

function DashboardContent() {
  const { user } = useAuth();
  const { getCourseById } = useCourses();
  const { enrollments } = useEnrollment();
  const { addNotification } = useNotifications();

  const enrolled = enrollments
    .map((enrollment) => {
      const course = getCourseById(enrollment.courseId);
      if (!course) return null;
      const progress = calculateCourseProgress(enrollment, course);
      const nextLesson = course.sections
        .flatMap((s) => s.lessons)
        .find((lesson) => !enrollment.lessonProgress.find((p) => p.lessonId === lesson.id && p.completed));
      return { enrollment, course, progress, nextLesson };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const coursesCompleted = enrolled.filter((e) => e.progress.percentComplete === 100).length;
  const lessonsCompleted = enrolled.reduce((sum, e) => sum + e.progress.lessonsCompleted, 0);
  const submissions = enrolled.reduce((sum, e) => sum + e.progress.assignmentsSubmitted, 0);

  const allDeadlines = getUpcomingDeadlines(enrollments, getCourseById);
  const deadlines = allDeadlines.slice(0, 5);
  const activity = user ? getActivityFeed(user.id, enrollments, getCourseById).slice(0, 5) : [];

  // One-time reminder per deadline: the first time it's due within 3 days
  // (or already overdue), notify once and never again for that same item.
  useEffect(() => {
    if (!user) return;
    const toRemind = getUnremindedDeadlines(user.id, allDeadlines);
    if (toRemind.length === 0) return;
    for (const deadline of toRemind) {
      addNotification({
        type: "course",
        icon: deadline.type === "quiz" ? "📝" : "📋",
        title: deadline.isOverdue ? `Overdue: ${deadline.title}` : `Due soon: ${deadline.title}`,
        message: `${deadline.courseTitle} — ${deadline.type} due ${new Date(deadline.dueDate).toLocaleDateString()}`,
        link: deadline.href,
      });
    }
    markDeadlinesReminded(user.id, toRemind);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const formatDueDate = (dueDate: string) =>
    new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatActivityTime = (timestamp: number) => {
    const diffMs = new Date().getTime() - timestamp;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <DashboardShell roleLabel="Student" navItems={NAV_ITEMS}>
      <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-mg hover:text-dt transition-colors mb-3">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <p className="font-mono text-xs mb-2 text-pg2">$ whoami — student</p>
            <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
              Welcome back, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="text-mg">Continue building your skills.</p>
          </div>
          <NotificationBell />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Courses Enrolled" value={enrolled.length} />
          <StatCard label="Courses Completed" value={coursesCompleted} />
          <StatCard label="Lessons Completed" value={lessonsCompleted} />
          <StatCard label="Assignments Submitted" value={submissions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden bg-white border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-dt">Continue Learning</h2>
              <Link href="/courses" className="font-mono text-xs text-pg2">
                View all →
              </Link>
            </div>

            {enrolled.length === 0 ? (
              <EmptyState
                title="No courses yet"
                description="Browse the catalog and enroll in a track to get started."
                action={
                  <Link
                    href="/courses"
                    className="inline-flex px-4 py-2 rounded-lg font-semibold text-sm bg-pg text-dg hover:brightness-110"
                  >
                    Browse Courses
                  </Link>
                }
              />
            ) : (
              <div className="divide-y divide-border">
                {enrolled.map(({ course, progress, nextLesson }) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}/learn`}
                    className="block hover:bg-ow transition-colors"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-pg/10 text-pg2">
                          {course.title[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <p className="font-semibold text-sm text-dt truncate">{course.title}</p>
                            <div className="flex items-center gap-1 shrink-0">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#35C47A">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <span className="font-mono text-xs text-pg2">{course.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs mb-3 text-mg">by {course.instructor}</p>
                          <p className="font-mono text-xs mb-3 text-mg">
                            {nextLesson ? `Next: ${nextLesson.title}` : "All lessons complete"} ·{" "}
                            {progress.lessonsCompleted}/{progress.lessonsTotal} lessons
                          </p>
                          <div className="h-1.5 rounded-full mb-2 bg-border">
                            <div
                              className="h-full rounded-full transition-all bg-pg"
                              style={{ width: `${progress.percentComplete}%` }}
                            />
                          </div>
                          <p className="font-mono text-xs text-pg2">{progress.percentComplete}% complete</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Deadlines */}
          <div className="rounded-xl overflow-hidden bg-white border border-border">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <Clock size={18} className="text-mg" />
              <h2 className="font-semibold text-dt">Upcoming Deadlines</h2>
            </div>
            {deadlines.length === 0 ? (
              <p className="p-6 text-sm text-mg">Nothing due — you&apos;re all caught up.</p>
            ) : (
              <div className="divide-y divide-border">
                {deadlines.map((deadline) => (
                  <Link
                    key={`${deadline.type}-${deadline.courseId}-${deadline.title}`}
                    href={deadline.href}
                    className="flex items-start gap-3 px-6 py-3 hover:bg-ow transition-colors"
                  >
                    {deadline.isOverdue ? (
                      <AlertCircle size={16} className="text-err shrink-0 mt-0.5" />
                    ) : (
                      <Clock size={16} className="text-mg shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dt truncate">{deadline.title}</p>
                      <p className="text-xs text-mg truncate">{deadline.courseTitle}</p>
                    </div>
                    <p className={`font-mono text-xs shrink-0 ${deadline.isOverdue ? "text-err font-medium" : "text-mg"}`}>
                      {deadline.isOverdue ? "Overdue" : formatDueDate(deadline.dueDate)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden bg-white border border-border">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <History size={18} className="text-mg" />
              <h2 className="font-semibold text-dt">Recent Activity</h2>
            </div>
            {activity.length === 0 ? (
              <p className="p-6 text-sm text-mg">Nothing yet — enroll in a course to get started.</p>
            ) : (
              <div className="divide-y divide-border">
                {activity.map((event, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-3">
                    {ACTIVITY_ICONS[event.type]}
                    <p className="flex-1 text-sm text-dt truncate">{event.detail}</p>
                    <p className="font-mono text-xs text-mg shrink-0">{formatActivityTime(event.timestamp)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            {[
              { label: "My Grades", icon: <FileCheck2 size={22} className="text-pg2" />, href: "/my-grades" },
              { label: "Certificates", icon: <AwardIcon size={22} className="text-pg2" />, href: "/certificates" },
              { label: "Messages", icon: <MessageSquare size={22} className="text-pg2" />, href: "/messages" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white border border-border"
              >
                {item.icon}
                <p className="text-sm font-semibold text-dt">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="student">
      <DashboardContent />
    </ProtectedRoute>
  );
}
