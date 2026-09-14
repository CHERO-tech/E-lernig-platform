"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";

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
    sections: [{ id: 1, title: "Section 1", lessons: 3 }],
  });

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
    const newCourse = addCourse({
      title: formData.title,
      description: formData.description,
      whatYoullLearn: [],
      category: formData.category,
      level: formData.level as any,
      price: parseInt(formData.price) || 0,
      durationHours: parseInt(formData.duration) || 0,
      instructor: user?.name || 'Unknown',
      instructorId: user?.id,
      sections: [],
      quizzes: [],
      assignments: [],
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter course title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Describe your course..."
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                    <select
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="99"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours) *</label>
                    <input
                      type="number"
                      name="duration"
                      placeholder="40"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Structure */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Structure</h2>
              <div className="space-y-4">
                {formData.sections.map((section) => (
                  <div key={section.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{section.title}</p>
                      <p className="text-sm text-gray-600">{section.lessons} lessons</p>
                    </div>
                    <button type="button" className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg font-medium hover:border-ember-strong hover:text-ember-strong transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add Section
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
              >
                Create Course
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
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
