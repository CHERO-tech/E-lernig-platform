"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Calendar } from "lucide-react";
import { useState } from "react";

function CreateAssignmentContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "advanced-react",
    dueDate: "",
    maxScore: 100,
    instructions: "",
    rubric: [
      { id: 1, criterion: "Code Quality", points: 30 },
      { id: 2, criterion: "Functionality", points: 40 },
      { id: 3, criterion: "Documentation", points: 30 },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRubric = () => {
    const newId = Math.max(...formData.rubric.map(r => r.id), 0) + 1;
    setFormData(prev => ({
      ...prev,
      rubric: [...prev.rubric, { id: newId, criterion: "", points: 0 }],
    }));
  };

  const handleRubricChange = (id: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      rubric: prev.rubric.map(r =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    }));
  };

  const handleDeleteRubric = (id: number) => {
    setFormData(prev => ({
      ...prev,
      rubric: prev.rubric.filter(r => r.id !== id),
    }));
  };

  const totalPoints = formData.rubric.reduce((sum, r) => sum + r.points, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <h1 className="text-3xl font-bold text-gray-900">Create Assignment</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assignment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Build a React Todo App"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Brief description of the assignment..."
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="advanced-react">Advanced React Patterns</option>
                      <option value="web-dev">Web Development</option>
                      <option value="data-science">Data Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
                  <textarea
                    name="instructions"
                    placeholder="Detailed instructions for students..."
                    rows={4}
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Grading Rubric */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Grading Rubric</h2>
                <p className="text-sm font-semibold text-green-600">Total: {totalPoints} points</p>
              </div>

              <div className="space-y-3">
                {formData.rubric.map((criterion) => (
                  <div key={criterion.id} className="flex gap-4 items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 uppercase mb-1">Criterion</label>
                      <input
                        type="text"
                        placeholder="e.g., Code Quality"
                        value={criterion.criterion}
                        onChange={(e) => handleRubricChange(criterion.id, "criterion", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="w-24">
                      <label className="block text-xs text-gray-600 uppercase mb-1">Points</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={criterion.points}
                        onChange={(e) => handleRubricChange(criterion.id, "points", parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteRubric(criterion.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddRubric}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add Criterion
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-8 flex gap-4">
              <button
                type="submit"
                className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Create Assignment
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

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips for Creating Effective Assignments</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be clear about what students need to deliver</li>
            <li>• Set realistic deadlines that give students enough time</li>
            <li>• Use detailed rubrics to guide grading and student effort</li>
            <li>• Include examples of excellent work when possible</li>
            <li>• Break down complex projects into smaller milestones</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function CreateAssignment() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <CreateAssignmentContent />
    </ProtectedRoute>
  );
}
