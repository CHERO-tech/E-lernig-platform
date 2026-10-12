"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Plus, Pencil, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/lib/categories/useCategories";
import { useCourses } from "@/lib/courses/useCourses";
import { useNotifications } from "@/lib/notifications/useNotifications";

function CategoriesContent() {
  const router = useRouter();
  const { categories, addCategory, renameCategory, deleteCategory } = useCategories();
  const { courses } = useCourses();
  const { addNotification } = useNotifications();
  const [newLabel, setNewLabel] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");

  const courseCountFor = (key: string) => courses.filter((c) => c.category === key).length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    if (categories.some((c) => c.label.toLowerCase() === newLabel.trim().toLowerCase())) {
      addNotification({ type: "system", icon: "⚠️", title: "Error", message: "That category already exists" });
      return;
    }
    addCategory(newLabel.trim());
    setNewLabel("");
  };

  const startEditing = (key: string, label: string) => {
    setEditingKey(key);
    setEditingLabel(label);
  };

  const handleRename = (key: string) => {
    if (!editingLabel.trim()) return;
    renameCategory(key, editingLabel.trim());
    setEditingKey(null);
  };

  const handleDelete = (key: string, label: string) => {
    const count = courseCountFor(key);
    if (count > 0) {
      addNotification({
        type: "system",
        icon: "⚠️",
        title: "Can't delete yet",
        message: `${count} course${count !== 1 ? "s" : ""} still use "${label}". Move them to another category first.`,
      });
      return;
    }
    deleteCategory(key);
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.push("/admin/dashboard")} className="p-2 hover:bg-ow rounded-lg" aria-label="Back to dashboard">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-dt">Manage Categories</h1>
            <p className="text-mg">Categories available to trainers when they create or edit a course.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <label htmlFor="new-category" className="sr-only">
            New category name
          </label>
          <input
            id="new-category"
            type="text"
            placeholder="e.g. Cybersecurity"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
          >
            <Plus size={18} /> Add
          </button>
        </form>

        <div className="bg-white rounded-lg border border-border divide-y divide-border">
          {categories.map((category, i) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 px-6 py-4"
            >
              <Tag size={16} className="text-mg shrink-0" />
              {editingKey === category.key ? (
                <input
                  type="text"
                  value={editingLabel}
                  onChange={(e) => setEditingLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRename(category.key)}
                  autoFocus
                  className="flex-1 px-3 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                />
              ) : (
                <span className="flex-1 text-sm font-medium text-dt">{category.label}</span>
              )}
              <span className="text-xs text-mg font-mono shrink-0">
                {courseCountFor(category.key)} course{courseCountFor(category.key) !== 1 ? "s" : ""}
              </span>
              {editingKey === category.key ? (
                <button
                  onClick={() => handleRename(category.key)}
                  className="text-xs font-medium text-pg2 hover:underline shrink-0"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(category.key, category.label)}
                  className="p-2 text-mg hover:text-dt rounded-lg hover:bg-ow shrink-0"
                  aria-label={`Rename ${category.label}`}
                >
                  <Pencil size={14} />
                </button>
              )}
              <button
                onClick={() => handleDelete(category.key, category.label)}
                className="p-2 text-mg hover:text-err rounded-lg hover:bg-ow shrink-0"
                aria-label={`Delete ${category.label}`}
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <CategoriesContent />
    </ProtectedRoute>
  );
}
