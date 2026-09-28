"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Megaphone } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { listEnrolledUserIds, readEnrollmentsForUser, writeNotificationForUser } from "@/lib/shared/crossAccountStore";

function AnnouncementsContent() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { addNotification } = useNotifications();

  const myCourses = courses.filter((c) => c.instructorId === user?.id);
  const [courseId, setCourseId] = useState(myCourses[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    const course = myCourses.find((c) => c.id === courseId);
    if (!course) {
      addNotification({ type: "system", icon: "⚠️", title: "Error", message: "Select a course first" });
      return;
    }
    if (!title.trim() || !message.trim()) {
      addNotification({ type: "system", icon: "⚠️", title: "Error", message: "Please enter a title and message" });
      return;
    }

    setSending(true);
    let recipientCount = 0;
    for (const studentId of listEnrolledUserIds()) {
      const enrollments = readEnrollmentsForUser(studentId);
      const isEnrolled = enrollments.enrollments.some((e) => e.courseId === courseId);
      if (!isEnrolled) continue;
      writeNotificationForUser(studentId, {
        type: "course",
        icon: "📣",
        title: title.trim(),
        message: message.trim(),
        link: `/courses/${courseId}`,
      });
      recipientCount++;
    }
    setSending(false);

    addNotification({
      type: "system",
      icon: "✅",
      title: "Announcement Sent",
      message: `Delivered to ${recipientCount} student${recipientCount !== 1 ? "s" : ""} in ${course.title}.`,
    });
    setTitle("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/trainer/dashboard" className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Megaphone size={28} className="text-pg2" />
            <h1 className="text-3xl font-bold text-dt">Course Announcements</h1>
          </div>
          <p className="text-mg mt-1">Send a message to every student currently enrolled in one of your courses.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {myCourses.length === 0 ? (
          <div className="rounded-xl p-12 text-center bg-white border border-border">
            <p className="text-mg">You don&apos;t have any courses yet.</p>
          </div>
        ) : (
          <div className="rounded-xl p-6 bg-white border border-border space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-dt" htmlFor="announcement-course">Course</label>
              <select
                id="announcement-course"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
              >
                {myCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-dt" htmlFor="announcement-title">Title</label>
              <input
                id="announcement-title"
                type="text"
                placeholder="e.g. New lesson added this week"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-dt" htmlFor="announcement-message">Message</label>
              <textarea
                id="announcement-message"
                rows={5}
                placeholder="What do your students need to know?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={sending}
              className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send to All Enrolled Students"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnnouncementsPage() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <AnnouncementsContent />
    </ProtectedRoute>
  );
}
