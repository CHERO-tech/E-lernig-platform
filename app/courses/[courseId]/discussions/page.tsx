"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { MessageSquare, ThumbsUp, Reply, Flag, Search } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";

function DiscussionsContent({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, postDiscussionQuestion } = useCourses();
  const { addNotification } = useNotifications();
  const [filterTab, setFilterTab] = useState<"all" | "unanswered" | "popular">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });

  const course = getCourseById(params.courseId);
  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
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

  const filtered = discussions.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === "unanswered") return d.answers === 0;
    if (filterTab === "popular") return d.views > 100;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageSquare size={32} className="text-ember-strong" />
              <h1 className="text-3xl font-bold text-gray-900">Course Discussions</h1>
            </div>
            <button
              onClick={() => setShowNewQuestion(!showNewQuestion)}
              className="px-6 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
            >
              Ask Question
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* New Question Form */}
        {showNewQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ask a Question</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
                <input
                  type="text"
                  placeholder="What's your question?"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                <textarea
                  placeholder="Provide more details about your question..."
                  rows={4}
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (!newQuestion.title.trim()) {
                      addNotification({
                        type: 'system',
                        icon: '⚠️',
                        title: 'Error',
                        message: 'Please enter a question title',
                      });
                      return;
                    }
                    const avatar = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
                    postDiscussionQuestion(params.courseId, newQuestion.title, newQuestion.content, user?.name || 'Anonymous', avatar);
                    addNotification({
                      type: 'system',
                      icon: '✅',
                      title: 'Question Posted',
                      message: 'Your question has been posted to the discussion board.',
                    });
                    setShowNewQuestion(false);
                    setNewQuestion({ title: "", content: "" });
                  }}
                  className="flex-1 px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
                >
                  Post Question
                </button>
                <button
                  onClick={() => {
                    setShowNewQuestion(false);
                    setNewQuestion({ title: "", content: "" });
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {["all", "unanswered", "popular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab as "all" | "unanswered" | "popular")}
              className={`px-6 py-4 font-medium transition-colors capitalize ${
                filterTab === tab
                  ? "text-ember-strong border-b-2 border-ember-strong"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab} ({discussions.filter(d => {
                if (tab === "unanswered") return d.answers === 0;
                if (tab === "popular") return d.views > 100;
                return true;
              }).length})
            </button>
          ))}
        </motion.div>

        {/* Discussion Threads */}
        <div className="space-y-4">
          {filtered.map((thread, i) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Thread Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-ember-strong flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {thread.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {thread.answers > 0 && (
                          <span className="px-2 py-1 bg-forge-soft text-ember text-xs font-semibold rounded">
                            ✓ Answered
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{thread.title}</h3>
                      <p className="text-sm text-gray-600">
                        by {thread.author} • {formatDate(thread.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{thread.content}</p>
                </div>
              </div>

              {/* Thread Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Reply size={16} /> {thread.answers} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={16} /> {thread.views} views
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1 text-gray-600 hover:text-ember-strong transition-colors"
                  >
                    <ThumbsUp size={16} /> {thread.helpful}
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Flag size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No discussions found</h2>
            <p className="text-gray-600 mb-6">
              {searchQuery ? "Try adjusting your search" : "Be the first to start a discussion!"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowNewQuestion(true)}
                className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
              >
                Ask a Question
              </button>
            )}
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">💡 Community Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be respectful and constructive in your responses</li>
            <li>• Search for existing answers before posting duplicate questions</li>
            <li>• Use clear, descriptive titles for your questions</li>
            <li>• Include relevant code snippets and error messages</li>
            <li>• Mark helpful answers as helpful to help other students</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function Discussions({ params }: { params: { courseId: string } }) {
  return (
    <ProtectedRoute>
      <DiscussionsContent params={params} />
    </ProtectedRoute>
  );
}
