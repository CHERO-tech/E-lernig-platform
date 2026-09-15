"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { MessageSquare, ThumbsUp, Reply, Flag, Search } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { EmptyState } from "@/components/ui";

function DiscussionsContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, postDiscussionQuestion, markDiscussionHelpful } = useCourses();
  const { addNotification } = useNotifications();
  const [filterTab, setFilterTab] = useState<"all" | "unanswered" | "popular">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });

  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const discussions = course.discussions;

  const formatDate = (epoch: number) => {
    const date = new Date(epoch);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filtered = discussions.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === "unanswered") return d.answers === 0;
    if (filterTab === "popular") return d.views > 100;
    return true;
  });

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <MessageSquare size={32} className="text-pg2" />
              <h1 className="text-3xl font-bold text-dt">Course Discussions</h1>
            </div>
            <button
              onClick={() => setShowNewQuestion(!showNewQuestion)}
              className="px-6 py-2 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
            >
              Ask Question
            </button>
          </div>

          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-mg" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {showNewQuestion && (
          <div className="rounded-xl p-6 mb-8 bg-white border border-border">
            <h2 className="text-xl font-bold mb-4 text-dt">Ask a Question</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-dt">Question Title</label>
                <input
                  type="text"
                  placeholder="What's your question?"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-dt">Details</label>
                <textarea
                  placeholder="Provide more details about your question..."
                  rows={4}
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (!newQuestion.title.trim()) {
                      addNotification({
                        type: "system",
                        icon: "⚠️",
                        title: "Error",
                        message: "Please enter a question title",
                      });
                      return;
                    }
                    const avatar =
                      user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U";
                    postDiscussionQuestion(courseId, newQuestion.title, newQuestion.content, user?.name || "Anonymous", avatar);
                    addNotification({
                      type: "system",
                      icon: "✅",
                      title: "Question Posted",
                      message: "Your question has been posted to the discussion board.",
                    });
                    setShowNewQuestion(false);
                    setNewQuestion({ title: "", content: "" });
                  }}
                  className="flex-1 px-4 py-2 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
                >
                  Post Question
                </button>
                <button
                  onClick={() => {
                    setShowNewQuestion(false);
                    setNewQuestion({ title: "", content: "" });
                  }}
                  className="px-6 py-2 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-border">
          {(["all", "unanswered", "popular"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-6 py-4 font-medium transition-colors capitalize ${
                filterTab === tab ? "text-pg2 border-b-2 border-pg" : "text-mg hover:text-dt"
              }`}
            >
              {tab} (
              {
                discussions.filter((d) => {
                  if (tab === "unanswered") return d.answers === 0;
                  if (tab === "popular") return d.views > 100;
                  return true;
                }).length
              }
              )
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((thread) => (
            <div key={thread.id} className="rounded-xl p-6 bg-white border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-pg text-dg">
                  {thread.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      {thread.answers > 0 && (
                        <span className="inline-block mb-1 px-2 py-1 text-xs font-semibold rounded bg-pg/10 text-pg2">
                          ✓ Answered
                        </span>
                      )}
                      <h3 className="font-bold text-lg mb-1 text-dt">{thread.title}</h3>
                      <p className="text-sm text-mg">
                        by {thread.author} · {formatDate(thread.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-mg">{thread.content}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border flex-wrap gap-3">
                <div className="flex items-center gap-6 text-sm text-mg">
                  <span className="flex items-center gap-1">
                    <Reply size={16} /> {thread.answers} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={16} /> {thread.views} views
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => markDiscussionHelpful(courseId, thread.id)}
                    className="flex items-center gap-1 transition-colors text-mg hover:text-pg2"
                  >
                    <ThumbsUp size={16} /> {thread.helpful}
                  </button>
                  <button
                    onClick={() =>
                      addNotification({
                        type: "system",
                        icon: "🚩",
                        title: "Thread Reported",
                        message: "Thanks — our moderators will review this post.",
                      })
                    }
                    className="p-2 transition-colors text-mg hover:text-err"
                    aria-label="Report thread"
                  >
                    <Flag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <EmptyState
            title="No discussions found"
            description={searchQuery ? "Try adjusting your search" : "Be the first to start a discussion!"}
            action={
              !searchQuery && (
                <button
                  onClick={() => setShowNewQuestion(true)}
                  className="px-8 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
                >
                  Ask a Question
                </button>
              )
            }
          />
        )}

        <div className="mt-12 rounded-xl p-6 bg-info/5 border border-info/20">
          <h3 className="font-bold mb-2 text-dt">💡 Community Guidelines</h3>
          <ul className="text-sm space-y-1 text-mg">
            <li>• Be respectful and constructive in your responses</li>
            <li>• Search for existing answers before posting duplicate questions</li>
            <li>• Use clear, descriptive titles for your questions</li>
            <li>• Include relevant code snippets and error messages</li>
            <li>• Mark helpful answers as helpful to help other students</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Discussions({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <ProtectedRoute>
      <DiscussionsContent courseId={courseId} />
    </ProtectedRoute>
  );
}
