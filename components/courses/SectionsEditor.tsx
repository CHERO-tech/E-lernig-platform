"use client";

import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CourseSection, CourseLesson } from "@/lib/courses/types";

interface SectionsEditorProps {
  sections: CourseSection[];
  onChange: (sections: CourseSection[]) => void;
}

export function SectionsEditor({ sections, onChange }: SectionsEditorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(sections[0]?.id ?? null);

  const addSection = () => {
    const newSection: CourseSection = {
      id: `section-${Date.now()}`,
      title: `Section ${sections.length + 1}`,
      lessons: [],
    };
    onChange([...sections, newSection]);
    setExpandedSection(newSection.id);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  const updateSectionTitle = (id: string, title: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  const addLesson = (sectionId: string) => {
    onChange(
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: [...s.lessons, { id: `lesson-${Date.now()}`, title: "", duration: "", content: "" }] }
          : s
      )
    );
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    onChange(
      sections.map((s) =>
        s.id === sectionId ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) } : s
      )
    );
  };

  const updateLesson = (sectionId: string, lessonId: string, patch: Partial<CourseLesson>) => {
    onChange(
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) }
          : s
      )
    );
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 p-4 bg-ow">
            <button
              type="button"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="p-1"
              aria-label={expandedSection === section.id ? "Collapse section" : "Expand section"}
            >
              <ChevronDown
                size={18}
                className={`transition-transform text-mg ${expandedSection === section.id ? "rotate-180" : ""}`}
              />
            </button>
            <input
              type="text"
              value={section.title}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
              placeholder="Section title"
              aria-label="Section title"
              className="flex-1 px-3 py-1.5 border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ember-strong"
            />
            <span className="text-xs text-mg whitespace-nowrap">
              {section.lessons.length} lesson{section.lessons.length !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={() => removeSection(section.id)}
              className="p-2 hover:bg-red-100 rounded-lg text-red-600"
              aria-label={`Remove ${section.title || "section"}`}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {expandedSection === section.id && (
            <div className="p-4 space-y-4">
              {section.lessons.map((lesson, li) => (
                <div key={lesson.id} className="p-4 bg-white border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-mg">Lesson {li + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeLesson(section.id, lesson.id)}
                      className="p-1.5 hover:bg-red-100 rounded text-red-600"
                      aria-label="Remove lesson"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                      placeholder="Lesson title"
                      aria-label="Lesson title"
                      className="md:col-span-2 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={(e) => updateLesson(section.id, lesson.id, { duration: e.target.value })}
                      placeholder="Duration (e.g. 10 min)"
                      aria-label="Lesson duration"
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                  </div>
                  <textarea
                    value={lesson.content}
                    onChange={(e) => updateLesson(section.id, lesson.id, { content: e.target.value })}
                    placeholder="Lesson content — what the student reads and learns in this lesson"
                    aria-label="Lesson content"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="url"
                      value={lesson.videoUrl ?? ""}
                      onChange={(e) => updateLesson(section.id, lesson.id, { videoUrl: e.target.value || undefined })}
                      placeholder="Video URL (optional, embeddable link)"
                      aria-label="Lesson video URL"
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                    <input
                      type="url"
                      value={lesson.resourceUrl ?? ""}
                      onChange={(e) => updateLesson(section.id, lesson.id, { resourceUrl: e.target.value || undefined })}
                      placeholder="Resource URL (optional, downloadable link)"
                      aria-label="Lesson resource URL"
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addLesson(section.id)}
                className="w-full px-4 py-2 border-2 border-dashed border-border text-dt rounded-lg text-sm font-medium hover:border-ember-strong hover:text-ember-strong transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Lesson
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full px-4 py-3 border-2 border-dashed border-border text-dt rounded-lg font-medium hover:border-ember-strong hover:text-ember-strong transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Add Section
      </button>
    </div>
  );
}
