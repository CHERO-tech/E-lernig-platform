"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle, Lock, Play, MessageCircle, Download, Check } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { calculateCourseProgress } from "@/lib/enrollment/calculateProgress";

function CourseLearnContent({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments, markLessonComplete } = useEnrollment();
  const [activeLesson, setActiveLesson] = useState('lesson-1');
  const [expandedSection, setExpandedSection] = useState(0);

  const course = getCourseById(params.courseId);
  const enrollment = enrollments.find(e => e.courseId === params.courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Not Enrolled</h1>
          <p className="text-gray-600 mb-8">Enroll in this course to start learning.</p>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
            Back
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateCourseProgress(enrollment, course);
  const allLessons = course.sections.flatMap((s, si) =>
    s.lessons.map(l => ({ ...l, sectionId: s.id, sectionTitle: s.title, sectionIndex: si }))
  );
  const currentLesson = allLessons.find(l => l.id === activeLesson) || allLessons[0];
  const isLessonCompleted = enrollment.lessonProgress.some(p => p.lessonId === currentLesson?.id && p.completed);

  const handleMarkComplete = () => {
    if (currentLesson) {
      markLessonComplete(params.courseId, currentLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 font-medium">
              ← Back to Course
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{progress.percentComplete}% Complete</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ember-strong transition-all duration-300"
                  style={{ width: `${progress.percentComplete}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black aspect-video flex items-center justify-center m-6 rounded-lg overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Play size={32} className="text-black ml-1" />
          </div>
        </motion.div>

        {/* Lesson Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentLesson?.title}</h1>
          <p className="text-gray-600 mb-6">{course.title} • {currentLesson?.duration}</p>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Content</h2>
            <p className="text-gray-600 leading-relaxed">
              Master the fundamentals of {currentLesson?.title.toLowerCase()}. This comprehensive lesson covers all the essential concepts you need to know.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleMarkComplete}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isLessonCompleted
                  ? 'bg-forge-soft text-ember'
                  : 'bg-ember-strong text-white hover:bg-ember'
              }`}
            >
              {isLessonCompleted ? (
                <>
                  <Check size={20} /> Completed
                </>
              ) : (
                'Mark as Complete'
              )}
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2">
              <Download size={20} /> Download Materials
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto max-h-screen"
      >
        <h3 className="font-bold text-gray-900 mb-4">Course Content</h3>
        <div className="space-y-2">
          {course.sections.map((section, si) => (
            <div key={section.id}>
              <button
                onClick={() => setExpandedSection(expandedSection === si ? -1 : si)}
                className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform ${expandedSection === si ? 'rotate-180' : ''}`}
                />
                <span className="font-medium text-gray-900 flex-1 text-left">{section.title}</span>
                <span className="text-sm text-gray-600">{section.lessons.length}</span>
              </button>

              {expandedSection === si && (
                <div className="pl-4 space-y-1">
                  {section.lessons.map(lesson => {
                    const isCompleted = enrollment.lessonProgress.some(p => p.lessonId === lesson.id && p.completed);
                    const isActive = activeLesson === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id as string)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-forge-soft text-ember font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-ember-strong flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                        )}
                        <span className="flex-1 text-left truncate">{lesson.title}</span>
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CourseLearnPage({ params }: { params: { courseId: string } }) {
  return (
    <ProtectedRoute>
      <CourseLearnContent params={params} />
    </ProtectedRoute>
  );
}
