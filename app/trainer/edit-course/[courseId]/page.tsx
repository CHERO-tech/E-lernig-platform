"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { CourseLevel, CourseSection } from "@/lib/courses/types";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { SectionsEditor } from "@/components/courses/SectionsEditor";

function EditCourseContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, updateCourse } = useCourses();
  const { addNotification } = useNotifications();
  const course = getCourseById(courseId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "web-development",
    level: "Beginner" as CourseLevel,
    price: "",
    duration: "",
    published: true,
  });
  const [sections, setSections] = useState<CourseSection[]>([]);

  // `courses` hydrates from localStorage asynchronously after mount (it starts
  // empty), so a hard page load straight onto this URL can render before the
  // real course data exists. Populate the form the first time it becomes
  // available, adjusting state during render rather than in an effect.
  const [hasHydratedForm, setHasHydratedForm] = useState(false);
  if (!hasHydratedForm && course) {
    setHasHydratedForm(true);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: String(course.price),
      duration: String(course.durationHours),
      published: course.published !== false,
    });
    setSections(course.sections);
  }

  // Not owned by this trainer (or not found) — bounce back rather than editing someone else's course.
  useEffect(() => {
    if (course && course.instructorId && course.instructorId !== user?.id) {
      router.push("/trainer/dashboard");
    }
  }, [course, user?.id, router]);

  if (!course) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dt mb-4">Course Not Found</h1>
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
    if (sections.some((s) => s.lessons.some((l) => !l.title.trim()))) {
      addNotification({
        type: 'system',
        icon: '⚠️',
        title: 'Error',
        message: 'Every lesson needs a title before saving.',
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
      sections,
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
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.push("/trainer/dashboard")} className="p-2 hover:bg-ow rounded-lg" aria-label="Back to dashboard">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <h1 className="text-3xl font-bold text-dt">Edit Course</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dt mb-6">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="title">Course Title *</label>
                  <input id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="description">Description *</label>
                  <textarea id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dt mb-2" htmlFor="category">Category *</label>
                    <select id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    >
                      <option value="web-development">Web Development</option>
                      <option value="mobile-dev">Mobile Development</option>
                      <option value="design">Design</option>
                      <option value="data-science">Data Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dt mb-2" htmlFor="level">Level *</label>
                    <select id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
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
                    <label className="block text-sm font-medium text-dt mb-2" htmlFor="price">Price ($) *</label>
                    <input id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dt mb-2" htmlFor="duration">Duration (hours) *</label>
                    <input id="duration"
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 p-4 bg-ow rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-dt">
                    Published — visible in the course catalog and search
                  </span>
                </label>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-2xl font-bold text-dt mb-2">Course Structure</h2>
              <p className="text-sm text-mg mb-6">
                Edit sections and lessons. Each lesson needs a title and content — video and downloadable
                resource links are optional.
              </p>
              <SectionsEditor sections={sections} onChange={setSections} />
            </div>

            <div className="border-t border-border pt-6 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => router.push("/trainer/dashboard")}
                className="px-8 py-3 border border-border text-dt rounded-lg font-medium hover:bg-ow"
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
