"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, CheckCircle, Lock, Play } from "lucide-react";
import { use } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { StatCard, Badge } from "@/components/ui";

function QuizzesContent({ courseId }: { courseId: string }) {
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

  const quizzes = course.quizzes.map((quiz) => {
    const attempt = enrollment?.quizAttempts.find((a) => a.quizId === quiz.id);
    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.length,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      completed: !!attempt,
      score: attempt?.score ?? null,
      attempts: enrollment?.quizAttempts.filter((a) => a.quizId === quiz.id).length || 0,
      status: !attempt ? "not-started" : attempt.score >= quiz.passingScore ? "passed" : "failed",
    };
  });

  const stats = {
    total: quizzes.length,
    completed: quizzes.filter((q) => q.completed).length,
    passed: quizzes.filter((q) => q.status === "passed").length,
    avgScore:
      quizzes.filter((q) => q.score !== null).length > 0
        ? Math.round(
            quizzes.filter((q) => q.score !== null).reduce((sum, q) => sum + (q.score || 0), 0) /
              quizzes.filter((q) => q.score !== null).length
          )
        : 0,
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-dg border-b border-pg/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen size={32} className="text-pg" />
            <h1 className="text-4xl font-bold text-white tracking-tight">Course Quizzes</h1>
          </div>
          <p className="text-mg">{course.title}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Quizzes" value={stats.total} icon={<BookOpen size={20} className="text-pg2" />} />
          <StatCard label="Completed" value={stats.completed} icon={<CheckCircle size={20} className="text-pg2" />} />
          <StatCard label="Passed" value={stats.passed} icon={<CheckCircle size={20} className="text-pg2" />} />
          <StatCard label="Avg Score" value={`${stats.avgScore}%`} icon={<BookOpen size={20} className="text-pg2" />} />
        </div>

        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="rounded-xl p-6 bg-white border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-dt">{quiz.title}</h3>
                    <Badge tone={quiz.status === "passed" ? "success" : quiz.status === "failed" ? "danger" : "info"}>
                      {quiz.status === "passed" ? "Passed" : quiz.status === "failed" ? "Failed" : "Not Started"}
                    </Badge>
                  </div>
                  <p className="mb-4 text-mg">{quiz.description}</p>

                  <div className="flex items-center gap-6 text-sm text-mg flex-wrap">
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} /> {quiz.questions} questions
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} /> {quiz.timeLimit} minutes
                    </span>
                    <span>Pass: {quiz.passingScore}%</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {quiz.completed && (
                    <div className="mb-4">
                      <div className="font-mono text-3xl font-bold mb-1 text-pg2">{quiz.score}%</div>
                      <p className="text-xs text-mg">
                        {quiz.attempts} attempt{quiz.attempts > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => router.push(`/courses/${courseId}/quizzes/${quiz.id}`)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      quiz.completed
                        ? "bg-white border border-border text-dt hover:bg-ow"
                        : "bg-pg text-dg hover:brightness-110"
                    }`}
                  >
                    <Play size={16} />
                    {quiz.completed ? "Retake" : "Start"}
                  </button>
                </div>
              </div>

              {quiz.completed && quiz.score !== null && (
                <div className="pt-4 border-t border-border">
                  <div className="w-full h-2 rounded-full overflow-hidden bg-border">
                    <div
                      className={`h-full transition-all ${quiz.score >= quiz.passingScore ? "bg-pg" : "bg-err"}`}
                      style={{ width: `${quiz.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl p-6 bg-info/5 border border-info/20">
          <h3 className="font-bold mb-2 text-dt flex items-center gap-2">
            <Lock size={16} className="text-info" /> Quiz Tips
          </h3>
          <ul className="text-sm space-y-1 text-mg">
            <li>• You can retake quizzes to improve your score</li>
            <li>• Your highest score is recorded and displayed</li>
            <li>• Take your time and review before submitting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function QuizzesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <ProtectedRoute>
      <QuizzesContent courseId={courseId} />
    </ProtectedRoute>
  );
}
