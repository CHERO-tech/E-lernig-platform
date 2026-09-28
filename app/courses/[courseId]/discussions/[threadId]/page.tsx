"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, ThumbsUp, Flag, MessageSquare } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { submitReport } from "@/lib/shared/crossAccountStore";

function ThreadContent({ courseId, threadId }: { courseId: string; threadId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, postDiscussionReply, markDiscussionHelpful } = useCourses();
  const { addNotification } = useNotifications();
  const [replyText, setReplyText] = useState("");

  const course = getCourseById(courseId);
  const thread = course?.discussions.find((d) => d.id === threadId);

  if (!course || !thread) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Thread Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (epoch: number) => new Date(epoch).toLocaleString();

  const handlePostReply = () => {
    if (!replyText.trim()) {
      addNotification({
        type: "system",
        icon: "⚠️",
        title: "Error",
        message: "Please enter a reply",
      });
      return;
    }
    const avatar =
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";
    postDiscussionReply(courseId, threadId, replyText.trim(), user?.name || "Anonymous", avatar);
    setReplyText("");
  };

  const handleReport = (content: string) => {
    submitReport({
      type: "Discussion Reply",
      content,
      reporterId: user?.id ?? "unknown",
      reporterName: user?.name ?? "Unknown",
    });
    addNotification({
      type: "system",
      icon: "🚩",
      title: "Reply Reported",
      message: "Thanks — our moderators will review this post.",
    });
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-dt">{thread.title}</h1>
            <p className="text-sm text-mg">{course.title}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Original post */}
        <div className="rounded-xl p-6 bg-white border border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-pg text-dg">
              {thread.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-mg mb-2">
                {thread.author} · {formatDate(thread.createdAt)}
              </p>
              <p className="text-dt leading-relaxed whitespace-pre-line">{thread.content}</p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => markDiscussionHelpful(courseId, thread.id)}
                  className="flex items-center gap-1 text-sm transition-colors text-mg hover:text-pg2"
                >
                  <ThumbsUp size={16} /> {thread.helpful}
                </button>
                <button
                  onClick={() => handleReport(`"${thread.title}" in course discussions`)}
                  className="flex items-center gap-1 text-sm transition-colors text-mg hover:text-err"
                >
                  <Flag size={16} /> Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div>
          <h2 className="font-bold text-dt mb-4 flex items-center gap-2">
            <MessageSquare size={18} /> {thread.replies.length} {thread.replies.length === 1 ? "Reply" : "Replies"}
          </h2>
          {thread.replies.length === 0 ? (
            <div className="rounded-xl p-8 text-center bg-white border border-border">
              <p className="text-mg">No replies yet. Be the first to help out.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {thread.replies.map((reply) => (
                <div key={reply.id} className="rounded-xl p-5 bg-white border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 bg-ow border border-border text-dt">
                      {reply.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-mg mb-2">
                        {reply.author} · {formatDate(reply.createdAt)}
                      </p>
                      <p className="text-dt leading-relaxed whitespace-pre-line">{reply.content}</p>
                      <button
                        onClick={() => handleReport(`Reply by ${reply.author} on "${thread.title}"`)}
                        className="flex items-center gap-1 text-xs mt-3 transition-colors text-mg hover:text-err"
                      >
                        <Flag size={14} /> Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply form */}
        <div className="rounded-xl p-6 bg-white border border-border">
          <h3 className="font-bold text-dt mb-3">Post a Reply</h3>
          <label htmlFor="reply-content" className="sr-only">
            Your reply
          </label>
          <textarea
            id="reply-content"
            rows={4}
            placeholder="Share your answer or thoughts..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg mb-4"
          />
          <button
            onClick={handlePostReply}
            className="px-6 py-2 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ThreadPage({ params }: { params: Promise<{ courseId: string; threadId: string }> }) {
  const { courseId, threadId } = use(params);
  return (
    <ProtectedRoute>
      <ThreadContent courseId={courseId} threadId={threadId} />
    </ProtectedRoute>
  );
}
