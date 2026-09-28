"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ClipboardList, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { use } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { StatCard, Badge } from "@/components/ui";

function AssignmentsContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments } = useEnrollment();

  const course = getCourseById(courseId);
  const enrollment = enrollments.find((e) => e.courseId === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const assignments = course.assignments.map((assignment) => {
    const submission = enrollment?.submissions.find((s) => s.assignmentId === assignment.id);
    const isOverdue = !submission && new Date(assignment.dueDate).getTime() < new Date().getTime();
    const status: "not-started" | "pending" | "graded" = !submission
      ? "not-started"
      : submission.status === "graded"
        ? "graded"
        : "pending";
    return {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxScore: assignment.maxScore,
      isOverdue,
      status,
      score: submission?.score ?? null,
    };
  });

  const stats = {
    total: assignments.length,
    submitted: assignments.filter((a) => a.status !== "not-started").length,
    graded: assignments.filter((a) => a.status === "graded").length,
    avgScore:
      assignments.filter((a) => a.score !== null).length > 0
        ? Math.round(
            assignments.filter((a) => a.score !== null).reduce((sum, a) => sum + (a.score || 0), 0) /
              assignments.filter((a) => a.score !== null).length
          )
        : 0,
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-dg border-b border-pg/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList size={32} className="text-pg" />
            <h1 className="text-4xl font-bold text-white tracking-tight">Course Assignments</h1>
          </div>
          <p className="text-mg">{course.title}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Assignments" value={stats.total} icon={<ClipboardList size={20} className="text-pg2" />} />
          <StatCard label="Submitted" value={stats.submitted} icon={<CheckCircle size={20} className="text-pg2" />} />
          <StatCard label="Graded" value={stats.graded} icon={<CheckCircle size={20} className="text-pg2" />} />
          <StatCard label="Avg Score" value={`${stats.avgScore}%`} icon={<ClipboardList size={20} className="text-pg2" />} />
        </div>

        {assignments.length === 0 ? (
          <div className="rounded-xl p-12 text-center bg-white border border-border">
            <ClipboardList size={48} className="mx-auto text-border mb-4" />
            <p className="text-mg text-lg">This course has no assignments yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="rounded-xl p-6 bg-white border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-dt">{assignment.title}</h3>
                      <Badge tone={assignment.status === "graded" ? "success" : assignment.status === "pending" ? "info" : "neutral"}>
                        {assignment.status === "graded" ? "Graded" : assignment.status === "pending" ? "Submitted" : "Not Started"}
                      </Badge>
                    </div>
                    <p className="mb-4 text-mg">{assignment.description}</p>

                    <div className="flex items-center gap-6 text-sm text-mg flex-wrap">
                      <span>Max Score: {assignment.maxScore} pts</span>
                      <span className={`flex items-center gap-2 ${assignment.isOverdue ? "text-err font-medium" : ""}`}>
                        {assignment.isOverdue && <AlertCircle size={16} />}
                        <Clock size={16} />
                        {assignment.isOverdue ? "Overdue" : "Due"} {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {assignment.status === "graded" && (
                      <div className="mb-4">
                        <div className="font-mono text-3xl font-bold mb-1 text-pg2">{assignment.score}%</div>
                      </div>
                    )}

                    {assignment.status === "graded" ? (
                      <button
                        onClick={() => router.push("/my-grades")}
                        className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-white border border-border text-dt hover:bg-ow"
                      >
                        View Feedback <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push(`/courses/${courseId}/assignments/${assignment.id}/submit`)}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          assignment.status === "pending"
                            ? "bg-white border border-border text-dt hover:bg-ow"
                            : "bg-pg text-dg hover:brightness-110"
                        }`}
                      >
                        {assignment.status === "pending" ? "Resubmit" : "Start Assignment"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AssignmentsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <ProtectedRoute>
      <AssignmentsContent courseId={courseId} />
    </ProtectedRoute>
  );
}
