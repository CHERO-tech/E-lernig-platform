"use client";

import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useMessaging } from "@/lib/messaging/useMessaging";
import { useAuth } from "@/lib/auth/useAuth";
import { usePeople } from "@/lib/people/usePeople";
import { getKnownUsers } from "@/lib/shared/crossAccountStore";
import { use, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Send, MoreHorizontal } from "lucide-react";
import { useNotifications } from "@/lib/notifications/useNotifications";

function ChatContent({ userId }: { userId: string }) {
  const router = useRouter();
  const { sendMessage, markConversationRead, getConversationByParticipant } = useMessaging();
  const { user: currentUser } = useAuth();
  const { getPersonById } = usePeople();
  const { addNotification } = useNotifications();
  const [message, setMessage] = useState("");

  const person = getPersonById(userId);
  const recipient = useMemo(() => {
    if (person) return { name: person.name, avatar: person.avatar, online: person.online };
    const known = getKnownUsers().find((u) => u.id === userId);
    if (known) return { name: known.name, avatar: known.avatar || known.name.slice(0, 2).toUpperCase(), online: false };
    return undefined;
  }, [person, userId]);
  const conversation = getConversationByParticipant(userId);
  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (recipient) {
      markConversationRead(userId);
    }
  }, [userId, markConversationRead, recipient]);

  if (!recipient) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">User Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (epoch: number) => {
    const date = new Date(epoch);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const messages = conversation?.messages || [];

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(userId, message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-ow flex flex-col">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
              <ArrowLeft size={20} className="text-mg" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-pg text-dg">
                  {recipient.avatar}
                </div>
                {recipient.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-pg" />
                )}
              </div>
              <div>
                <p className="font-semibold text-dt">{recipient.name}</p>
                <p className="text-xs text-mg">{recipient.online ? "Active now" : "Offline"}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              addNotification({
                type: "system",
                icon: "⚙️",
                title: "More Options",
                message: "Block, mute, and delete conversation options are coming soon.",
              })
            }
            className="p-2 rounded-lg text-mg hover:bg-ow"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-xs ${msg.senderId === currentUserId ? "flex-row-reverse" : ""}`}>
              {msg.senderId !== currentUserId && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-pg text-dg">
                  {recipient.avatar}
                </div>
              )}
              <div className={`${msg.senderId === currentUserId ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.senderId === currentUserId ? "bg-pg text-dg rounded-br-none" : "bg-white border border-border text-dt rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <p className="text-xs text-mg">{formatTime(msg.sentAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-border sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
             aria-label="Type a message"/>
            <button
              onClick={handleSend}
              className="px-4 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110 transition-colors flex items-center gap-2"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  return (
    <ProtectedRoute>
      <ChatContent userId={userId} />
    </ProtectedRoute>
  );
}
