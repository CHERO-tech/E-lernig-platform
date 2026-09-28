"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Mail, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { listContactMessages, setContactMessageHandled, ContactMessage } from "@/lib/shared/crossAccountStore";
import { EmptyState } from "@/components/ui";

function formatDate(epoch: number): string {
  return new Date(epoch).toLocaleString();
}

function MessagesContent() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "new" | "handled">("all");
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    typeof window !== "undefined" ? listContactMessages() : []
  );

  const toggleHandled = (id: string, handled: boolean) => {
    setContactMessageHandled(id, handled);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, handled } : m)));
  };

  const filtered = messages.filter((m) => {
    if (filter === "new") return !m.handled;
    if (filter === "handled") return m.handled;
    return true;
  });

  const newCount = messages.filter((m) => !m.handled).length;

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-ow rounded-lg" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-dt">Contact Messages</h1>
            <p className="text-mg">
              {messages.length} submitted · {newCount} awaiting a reply
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          {(["all", "new", "handled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-4 px-4 font-medium transition-colors capitalize border-b-2 ${
                filter === tab ? "text-ember-strong border-ember-strong" : "text-mg border-transparent hover:text-dt"
              }`}
            >
              {tab === "new" ? "Awaiting Reply" : tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Mail size={48} className="text-pg2" />} title="No messages" description="Nothing here yet." />
        ) : (
          <div className="space-y-4">
            {filtered.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold text-dt">{message.subject}</p>
                    <p className="text-sm text-mg mt-1">
                      {message.name} ·{" "}
                      <a href={`mailto:${message.email}`} className="underline hover:text-dt">
                        {message.email}
                      </a>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${
                      message.handled
                        ? "bg-forge-soft text-ember2 border-brass-soft"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {message.handled ? "Handled" : "Awaiting Reply"}
                  </span>
                </div>
                <p className="text-dt whitespace-pre-line mb-4">{message.message}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="text-xs text-mg">{formatDate(message.submittedAt)}</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                      className="px-3 py-1.5 bg-pg/10 text-pg2 rounded-lg text-sm font-medium hover:bg-pg/20"
                    >
                      Reply by Email
                    </a>
                    <button
                      onClick={() => toggleHandled(message.id, !message.handled)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ow text-dt rounded-lg text-sm font-medium hover:bg-surface"
                    >
                      {message.handled ? <Circle size={14} /> : <CheckCircle size={14} />}
                      {message.handled ? "Mark Unhandled" : "Mark Handled"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminMessages() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MessagesContent />
    </ProtectedRoute>
  );
}
