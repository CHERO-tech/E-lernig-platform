"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle, Play, Download, Check } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { calculateCourseProgress } from "@/lib/enrollment/calculateProgress";

function CourseLearnContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments, markLessonComplete } = useEnrollment();
  const [activeLesson, setActiveLesson] = useState("lesson-1");
  const [expandedSection, setExpandedSection] = useState(0);

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

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Not Enrolled</h1>
          <p className="mb-8 text-mg">Enroll in this course to start learning.</p>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateCourseProgress(enrollment, course);
  const allLessons = course.sections.flatMap((s, si) =>
    s.lessons.map((l) => ({ ...l, sectionId: s.id, sectionTitle: s.title, sectionIndex: si }))
  );
  const currentLesson = allLessons.find((l) => l.id === activeLesson) || allLessons[0];
  const isLessonCompleted = enrollment.lessonProgress.some(
    (p) => p.lessonId === currentLesson?.id && p.completed
  );

  const handleMarkComplete = () => {
    if (currentLesson) {
      markLessonComplete(courseId, currentLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-ow flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => router.back()} className="font-medium text-mg hover:text-dt transition-colors">
              ← Back to Course
            </button>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-mg">{progress.percentComplete}% Complete</span>
              <div className="w-24 h-2 rounded-full overflow-hidden bg-border">
                <div className="h-full bg-pg transition-all duration-300" style={{ width: `${progress.percentComplete}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dg aspect-video flex items-center justify-center m-6 rounded-lg overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-pg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Play size={32} className="text-dg ml-1" />
          </div>
        </div>

        <div className="px-6 pb-8">
          <h1 className="text-3xl font-bold mb-2 text-dt">{currentLesson?.title}</h1>
          <p className="mb-6 text-mg">
            {course.title} · {currentLesson?.duration}
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-dt">Lesson Content</h2>
            <p className="leading-relaxed text-mg">
              Master the fundamentals of {currentLesson?.title.toLowerCase()}. This comprehensive
              lesson covers all the essential concepts you need to know.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleMarkComplete}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isLessonCompleted ? "bg-pg/10 text-pg2" : "bg-pg text-dg hover:brightness-110"
              }`}
            >
              {isLessonCompleted ? (
                <>
                  <Check size={20} /> Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </button>
            <button className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-white border border-border text-dt hover:bg-ow">
              <Download size={20} /> Download Materials
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 bg-white border-l border-border p-6 overflow-y-auto max-h-screen">
        <h3 className="font-bold mb-4 text-dt">Course Content</h3>
        <div className="space-y-2">
          {course.sections.map((section, si) => (
            <div key={section.id}>
              <button
                onClick={() => setExpandedSection(expandedSection === si ? -1 : si)}
                className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-ow"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform text-mg ${expandedSection === si ? "rotate-180" : ""}`}
                />
                <span className="font-medium flex-1 text-left text-dt">{section.title}</span>
                <span className="font-mono text-sm text-mg">{section.lessons.length}</span>
              </button>

              {expandedSection === si && (
                <div className="pl-4 space-y-1">
                  {section.lessons.map((lesson) => {
                    const isCompleted = enrollment.lessonProgress.some(
                      (p) => p.lessonId === lesson.id && p.completed
                    );
                    const isActive = activeLesson === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id as string)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive ? "bg-pg/10 text-pg2 font-medium" : "text-mg hover:bg-ow"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-pg2 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border-2 rounded-full flex-shrink-0 border-border" />
                        )}
                        <span className="flex-1 text-left truncate">{lesson.title}</span>
                        <span className="font-mono text-xs text-mg">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CourseLearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <ProtectedRoute>
      <CourseLearnContent courseId={courseId} />
    </ProtectedRoute>
  );
}
