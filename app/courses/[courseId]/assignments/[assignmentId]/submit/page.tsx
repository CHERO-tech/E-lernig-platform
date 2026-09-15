"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useNotifications } from "@/lib/notifications/useNotifications";

function SubmitAssignmentContent({ courseId, assignmentId }: { courseId: string; assignmentId: string }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { submitAssignment } = useEnrollment();
  const { addNotification } = useNotifications();
  const [files, setFiles] = useState<string[]>([]);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const course = getCourseById(courseId);
  const assignment = course?.assignments.find((a) => a.id === assignmentId);

  if (!course || !assignment) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Assignment Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const today = new Date();
  const dueDate = new Date(assignment.dueDate);
  const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0;
  const dueClasses = isOverdue
    ? { box: "bg-err/5 border-err/20", icon: "text-err", text: "text-err" }
    : daysLeft < 3
      ? { box: "bg-warn/5 border-warn/20", icon: "text-warn", text: "text-warn" }
      : { box: "bg-pg/5 border-pg/20", icon: "text-pg2", text: "text-pg2" };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      addNotification({
        type: "system",
        icon: "⚠️",
        title: "Error",
        message: "Please upload at least one file",
      });
      return;
    }
    const fileName = files[files.length - 1];
    submitAssignment(courseId, assignmentId, fileName);
    addNotification({
      type: "system",
      icon: "✅",
      title: "Assignment Submitted",
      message: "Your assignment has been submitted successfully.",
    });
    setSubmissionId(Math.random().toString().slice(2, 8));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <h1 className="text-3xl font-bold text-dt">{assignment.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border flex items-start gap-3 ${dueClasses.box}`}>
              <AlertCircle size={20} className={`${dueClasses.icon} shrink-0 mt-0.5`} />
              <div>
                <p className={`font-semibold ${dueClasses.text}`}>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p className={`text-sm ${dueClasses.text}`}>
                  {isOverdue ? `⚠️ ${Math.abs(daysLeft)} days overdue` : `${daysLeft} days remaining`}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-white border border-border">
              <h2 className="text-xl font-bold mb-4 text-dt">Instructions</h2>
              <p className="leading-relaxed mb-4 text-mg">{assignment.instructions}</p>
              <div className="text-sm text-mg">
                <p>
                  Maximum Points: <span className="font-semibold text-dt">{assignment.maxScore}</span>
                </p>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-white border border-border">
              <h2 className="text-xl font-bold mb-6 text-dt">Submit Your Work</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dt" htmlFor="submission-notes">Submission Notes (Optional)</label>
                  <textarea
                    id="submission-notes"
                    placeholder="Add any notes or explanations about your submission..."
                    rows={4}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-dt">Upload Files</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-border hover:border-pg">
                    <Upload size={32} className="mx-auto mb-3 text-mg" />
                    <p className="mb-2 text-mg">Drag and drop files or click to upload</p>
                    <p className="text-xs mb-4 text-mg">Supported: ZIP, PDF, code files, images</p>
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors bg-pg/10 text-pg2 hover:bg-pg/20"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>

                {files.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-3 text-dt">Uploaded Files ({files.length})</p>
                    <div className="space-y-2">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ow border border-border">
                          <p className="text-sm text-dt">{file}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(i)}
                            className="text-sm font-medium text-err hover:opacity-80"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-8 py-3 bg-pg text-dg rounded-lg font-bold hover:brightness-110">
                    Submit Assignment
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-12 text-center bg-white border border-border">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-pg/10">
              <CheckCircle size={32} className="text-pg2" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-dt">Submitted Successfully!</h2>
            <p className="mb-2 text-mg">Your assignment has been submitted and is now pending review.</p>
            <p className="text-sm mb-8 text-mg">
              Submission ID: #SUB-2025-{submissionId}
            </p>

            <div className="rounded-lg p-6 mb-8 text-left bg-ow">
              <p className="text-sm mb-3 text-mg">Submission Details:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-mg">Assignment:</span>
                  <span className="font-semibold text-dt">{assignment.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mg">Submitted:</span>
                  <span className="font-semibold text-dt">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mg">Files:</span>
                  <span className="font-semibold text-dt">{files.length}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/courses/${courseId}`)}
                className="flex-1 px-8 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
              >
                Back to Course
              </button>
              <button
                onClick={() => router.push("/my-grades")}
                className="flex-1 px-8 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
              >
                View My Grades
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SubmitAssignment({
  params,
}: {
  params: Promise<{ courseId: string; assignmentId: string }>;
}) {
  const { courseId, assignmentId } = use(params);
  return (
    <ProtectedRoute>
      <SubmitAssignmentContent courseId={courseId} assignmentId={assignmentId} />
    </ProtectedRoute>
  );
}
