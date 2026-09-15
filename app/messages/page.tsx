"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useMessaging } from "@/lib/messaging/useMessaging";
import { usePeople } from "@/lib/people/usePeople";
import Link from "next/link";
import { Search, MoreHorizontal, Pin } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/components/ui";
import { useNotifications } from "@/lib/notifications/useNotifications";

function MessagesContent() {
  const { conversations } = useMessaging();
  const { people } = usePeople();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const togglePin = (e: React.MouseEvent, convId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPinnedIds((prev) =>
      prev.includes(convId) ? prev.filter((id) => id !== convId) : [...prev, convId]
    );
  };

  const handleMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addNotification({
      type: "system",
      icon: "⚙️",
      title: "More Options",
      message: "Archive, mute, and delete options are coming soon.",
    });
  };

  const formatTime = (epoch: number) => {
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

  const conversationList = conversations.map((conv) => {
    const person = people.find((p) => p.id === conv.participantId);
    const lastMsg = conv.messages[conv.messages.length - 1];
    return {
      ...conv,
      person,
      lastMessage: lastMsg?.text || "(no messages)",
      time: lastMsg ? formatTime(lastMsg.sentAt) : "",
      name: person?.name || "Unknown",
      avatar: person?.avatar || "?",
      online: person?.online || false,
    };
  });

  const filtered = conversationList.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-ow flex flex-col">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-4 text-dt">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mg" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
             aria-label="Search conversations"/>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex-1">
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((conv) => (
              <Link key={conv.id} href={`/messages/${conv.participantId}`}>
                <div className="rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group bg-white border border-border hover:border-pg">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold bg-pg text-dg">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-pg" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-semibold text-dt">{conv.name}</p>
                        <p className="text-xs shrink-0 text-mg">{conv.time}</p>
                      </div>
                      <p className="text-sm truncate text-mg">{conv.lastMessage}</p>
                    </div>

                    {conv.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 bg-pg text-dg">
                        {conv.unread}
                      </span>
                    )}

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => togglePin(e, conv.id)}
                        className={`p-2 rounded-lg hover:bg-ow ${pinnedIds.includes(conv.id) ? "text-pg2" : "text-mg"}`}
                        title={pinnedIds.includes(conv.id) ? "Unpin" : "Pin"}
                      >
                        <Pin size={18} fill={pinnedIds.includes(conv.id) ? "currentColor" : "none"} />
                      </button>
                      <button onClick={handleMore} className="p-2 rounded-lg text-mg hover:bg-ow" title="More">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Search size={48} className="text-pg2" />}
            title="No conversations found"
            description={searchTerm ? "Try a different search term." : "Start a conversation from a course or profile."}
          />
        )}
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <ProtectedRoute>
      <MessagesContent />
    </ProtectedRoute>
  );
}
