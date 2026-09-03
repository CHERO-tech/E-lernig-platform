"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

function SubmitAssignmentContent({ params }: { params: { courseId: string; assignmentId: string } }) {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const assignment = {
    title: "Build a React Todo App",
    dueDate: "2025-03-20",
    maxScore: 100,
    instructions: "Create a functional todo application using React with the following features: add/delete todos, mark as complete, local storage persistence.",
  };

  const today = new Date();
  const dueDate = new Date(assignment.dueDate);
  const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Due Date Alert */}
            <div
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                isOverdue
                  ? "bg-red-50 border-red-200"
                  : daysLeft < 3
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
              }`}
            >
              <AlertCircle
                size={20}
                className={
                  isOverdue ? "text-red-600" : daysLeft < 3 ? "text-yellow-600" : "text-green-600"
                }
              />
              <div>
                <p className={`font-semibold ${isOverdue ? "text-red-900" : daysLeft < 3 ? "text-yellow-900" : "text-green-900"}`}>
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <p className={`text-sm ${isOverdue ? "text-red-800" : daysLeft < 3 ? "text-yellow-800" : "text-green-800"}`}>
                  {isOverdue ? `⚠️ ${Math.abs(daysLeft)} days overdue` : `${daysLeft} days remaining`}
                </p>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{assignment.instructions}</p>
              <div className="text-sm text-gray-600">
                <p>Maximum Points: <span className="font-semibold text-gray-900">{assignment.maxScore}</span></p>
              </div>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Work</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Text Submission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Add any notes or explanations about your submission..."
                    rows={4}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                    <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-2">Drag and drop files or click to upload</p>
                    <p className="text-xs text-gray-500 mb-4">Supported: ZIP, PDF, code files, images</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 cursor-pointer transition-colors"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Files ({files.length})</p>
                    <div className="space-y-2">
                      {files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="text-sm text-gray-700">{file}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(i)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    Submit Assignment
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
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Submitted Successfully!</h2>
            <p className="text-gray-600 mb-2">Your assignment has been submitted and is now pending review.</p>
            <p className="text-sm text-gray-600 mb-8">
              Submission ID: #SUB-2025-{Math.random().toString().slice(2, 8)}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <p className="text-sm text-gray-600 mb-3">Submission Details:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Assignment:</span>
                  <span className="font-semibold text-gray-900">{assignment.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Submitted:</span>
                  <span className="font-semibold text-gray-900">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Files:</span>
                  <span className="font-semibold text-gray-900">{files.length}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/courses/${params.courseId}`)}
                className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Back to Course
              </button>
              <button
                onClick={() => router.push("/my-grades")}
                className="flex-1 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                View My Grades
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SubmitAssignment({
  params,
}: {
  params: { courseId: string; assignmentId: string };
}) {
  return (
    <ProtectedRoute>
      <SubmitAssignmentContent params={params} />
    </ProtectedRoute>
  );
}
