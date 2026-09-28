"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { EmptyState } from "@/components/ui";

function ResourcesContent() {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments } = useEnrollment();

  const resourcesByCourse = enrollments
    .map((enrollment) => {
      const course = getCourseById(enrollment.courseId);
      if (!course) return null;
      const resources = course.sections
        .flatMap((s) => s.lessons)
        .filter((l) => !!l.resourceUrl)
        .map((l) => ({ lessonTitle: l.title, resourceUrl: l.resourceUrl! }));
      if (resources.length === 0) return null;
      return { courseId: course.id, courseTitle: course.title, resources };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <FileText size={28} className="text-pg2" />
            <h1 className="text-3xl font-bold text-dt">Downloadable Resources</h1>
          </div>
          <p className="text-mg mt-1">Materials attached to lessons across your enrolled courses.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {resourcesByCourse.length === 0 ? (
          <EmptyState
            icon={<FileText size={48} className="text-pg2" />}
            title="No downloadable resources yet"
            description="Enroll in a course and continue learning — any downloadable materials your instructor attaches to a lesson will show up here."
            action={
              <Link href="/courses" className="inline-block px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110 transition-all">
                Browse Courses
              </Link>
            }
          />
        ) : (
          <div className="space-y-6">
            {resourcesByCourse.map(({ courseId, courseTitle, resources }) => (
              <div key={courseId} className="rounded-xl bg-white border border-border overflow-hidden">
                <div className="px-6 py-4 bg-ow border-b border-border flex items-center justify-between">
                  <h2 className="font-bold text-dt">{courseTitle}</h2>
                  <Link href={`/courses/${courseId}/learn`} className="text-xs font-mono text-pg2">
                    Go to course →
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-6 py-3 hover:bg-ow transition-colors"
                    >
                      <span className="text-sm text-dt">{resource.lessonTitle}</span>
                      <Download size={16} className="text-mg shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <ResourcesContent />
    </ProtectedRoute>
  );
}
