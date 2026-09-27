"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { CourseLevel, CourseSection } from "@/lib/courses/types";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { SectionsEditor } from "@/components/courses/SectionsEditor";

function CreateCourseContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { addCourse } = useCourses();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "web-development",
    level: "Beginner" as const,
    price: "",
    duration: "",
  });
  const [sections, setSections] = useState<CourseSection[]>([
    { id: "section-1", title: "Section 1", lessons: [] },
  ]);

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
        message: 'Every lesson needs a title before the course can be created.',
      });
      return;
    }
    addCourse({
      title: formData.title,
      description: formData.description,
      whatYoullLearn: [],
      category: formData.category,
      level: formData.level as CourseLevel,
      price: parseInt(formData.price) || 0,
      durationHours: parseInt(formData.duration) || 0,
      instructor: user?.name || 'Unknown',
      instructorId: user?.id,
      sections,
      quizzes: [],
      assignments: [],
      published: true,
    });
    addNotification({
      type: 'system',
      icon: '✅',
      title: 'Course Created',
      message: `"${formData.title}" has been created successfully.`,
    });
    router.push("/trainer/dashboard");
  };

  return (
    <div className="min-h-screen bg-ow">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-ow rounded-lg" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <h1 className="text-3xl font-bold text-dt">Create New Course</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-dt mb-6">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="title">Course Title *</label>
                  <input id="title"
                    type="text"
                    name="title"
                    placeholder="Enter course title"
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
                    placeholder="Describe your course..."
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
                      placeholder="99"
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
                      placeholder="40"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Structure */}
            <div className="border-t border-border pt-6">
              <h2 className="text-2xl font-bold text-dt mb-2">Course Structure</h2>
              <p className="text-sm text-mg mb-6">
                Add sections and lessons. Each lesson needs a title and content — video and downloadable
                resource links are optional.
              </p>
              <SectionsEditor sections={sections} onChange={setSections} />
            </div>

            {/* Actions */}
            <div className="border-t border-border pt-6 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
              >
                Create Course
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 border border-border text-dt rounded-lg font-medium hover:bg-ow"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips for Creating a Great Course</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Use a clear, descriptive title that reflects the course content</li>
            <li>• Break your course into logical sections with manageable lessons</li>
            <li>• Price competitively based on course duration and content quality</li>
            <li>• Add video lessons and practical projects for better engagement</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function CreateCourse() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <CreateCourseContent />
    </ProtectedRoute>
  );
}
