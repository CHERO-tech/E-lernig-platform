"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { CourseLevel } from "@/lib/courses/types";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";

function EditCourseContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, updateCourse } = useCourses();
  const { addNotification } = useNotifications();
  const course = getCourseById(courseId);

  const [formData, setFormData] = useState({
    title: course?.title ?? "",
    description: course?.description ?? "",
    category: course?.category ?? "web-development",
    level: (course?.level ?? "Beginner") as CourseLevel,
    price: String(course?.price ?? ""),
    duration: String(course?.durationHours ?? ""),
    published: course?.published !== false,
  });

  // Not owned by this trainer (or not found) — bounce back rather than editing someone else's course.
  useEffect(() => {
    if (course && course.instructorId && course.instructorId !== user?.id) {
      router.push("/trainer/dashboard");
    }
  }, [course, user?.id, router]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <button
            onClick={() => router.push("/trainer/dashboard")}
            className="px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addNotification({
        type: 'system',
        icon: '⚠️',
        title: 'Error',
        message: 'Please enter a course title',
      });
      return;
    }
    updateCourse(courseId, {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      price: parseInt(formData.price) || 0,
      durationHours: parseInt(formData.duration) || 0,
      published: formData.published,
    });
    addNotification({
      type: 'system',
      icon: '✅',
      title: 'Course Updated',
      message: `"${formData.title}" has been updated.`,
    });
    router.push("/trainer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.push("/trainer/dashboard")} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Back to dashboard">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">Course Title *</label>
                  <input id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Description *</label>
                  <textarea id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">Category *</label>
                    <select id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    >
                      <option value="web-development">Web Development</option>
                      <option value="mobile-dev">Mobile Development</option>
                      <option value="design">Design</option>
                      <option value="data-science">Data Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="level">Level *</label>
                    <select id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">Price ($) *</label>
                    <input id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duration">Duration (hours) *</label>
                    <input id="duration"
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Published — visible in the course catalog and search
                  </span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Course Content</h2>
              <p className="text-sm text-gray-600">
                {course.sections.length} section{course.sections.length !== 1 ? "s" : ""}, {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
              </p>
              <ul className="mt-3 space-y-1">
                {course.sections.map((section) => (
                  <li key={section.id} className="text-sm text-gray-700">
                    {section.title} <span className="text-gray-500">({section.lessons.length} lessons)</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => router.push("/trainer/dashboard")}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <ProtectedRoute requiredRole="trainer">
      <EditCourseContent courseId={courseId} />
    </ProtectedRoute>
  );
}
