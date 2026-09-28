"use client";

import { Plus, Trash2 } from "lucide-react";

interface ObjectivesEditorProps {
  objectives: string[];
  onChange: (objectives: string[]) => void;
}

export function ObjectivesEditor({ objectives, onChange }: ObjectivesEditorProps) {
  const updateObjective = (index: number, value: string) => {
    onChange(objectives.map((o, i) => (i === index ? value : o)));
  };

  const addObjective = () => {
    onChange([...objectives, ""]);
  };

  const removeObjective = (index: number) => {
    onChange(objectives.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {objectives.length === 0 && (
        <p className="text-sm text-mg mb-2">No objectives yet — add what a student will be able to do after this course.</p>
      )}
      {objectives.map((objective, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={objective}
            onChange={(e) => updateObjective(i, e.target.value)}
            placeholder="e.g. Build and deploy a full-stack web app"
            aria-label={`Learning objective ${i + 1}`}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
          />
          <button
            type="button"
            onClick={() => removeObjective(i)}
            className="p-2 text-mg hover:text-err rounded-lg hover:bg-ow transition-colors"
            aria-label={`Remove objective ${i + 1}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addObjective}
        className="flex items-center gap-2 text-sm font-medium text-pg2 hover:underline mt-2"
      >
        <Plus size={16} /> Add Objective
      </button>
    </div>
  );
}
