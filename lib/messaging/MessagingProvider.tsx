'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { Conversation, MessagingContextType, UserMessages } from './types';
import { useAuth } from '@/lib/auth/useAuth';
import { readMessagesForUser, writeMessagesForUser } from '@/lib/shared/crossAccountStore';

const STORAGE_KEY_PREFIX = 'forge_messages_';

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'person-2',
    messages: [
      { id: 'msg-1', senderId: 'person-2', text: 'Hey! How are you doing?', sentAt: Date.now() - 3 * 60 * 60 * 1000 },
      { id: 'msg-2', senderId: 'me', text: 'Hi Sarah! Doing great, thanks for asking! How about you?', sentAt: Date.now() - 3 * 60 * 60 * 1000 + 60 * 1000 },
      { id: 'msg-3', senderId: 'person-2', text: 'I\'m good! I wanted to discuss the course materials', sentAt: Date.now() - 3 * 60 * 60 * 1000 + 2 * 60 * 1000 },
      { id: 'msg-4', senderId: 'person-2', text: 'Do you have time this week?', sentAt: Date.now() - 3 * 60 * 60 * 1000 + 3 * 60 * 1000 },
      { id: 'msg-5', senderId: 'me', text: 'Of course! I\'m free on Wednesday afternoon', sentAt: Date.now() - 3 * 60 * 60 * 1000 + 5 * 60 * 1000 },
      { id: 'msg-6', senderId: 'person-2', text: 'That sounds great! When can we discuss?', sentAt: Date.now() - 3 * 60 * 60 * 1000 + 6 * 60 * 1000 },
    ],
    unread: 0,
    pinned: false,
  },
  {
    id: 'conv-2',
    participantId: 'person-1',
    messages: [
      { id: 'msg-7', senderId: 'person-1', text: 'Hey, did you check the latest assignment?', sentAt: Date.now() - 24 * 60 * 60 * 1000 },
      { id: 'msg-8', senderId: 'me', text: 'Yes, just submitted it! Let me know if you need any clarification', sentAt: Date.now() - 24 * 60 * 60 * 1000 + 30 * 60 * 1000 },
    ],
    unread: 1,
    pinned: false,
  },
];

function seedConversationsFor(userId: string): Conversation[] {
  return DEFAULT_CONVERSATIONS.map((conv) => ({
    ...conv,
    messages: conv.messages.map((m) => ({ ...m, senderId: m.senderId === 'me' ? userId : m.senderId })),
  }));
}

export const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // SSR-safe hydration: state starts at the default and is patched here
  // after mount, once localStorage is available (see app/layout.tsx).
  useEffect(() => {
    if (loading || !user?.id) return;

    const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const data = JSON.parse(stored) as UserMessages;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConversations(data.conversations);
      } catch {
        localStorage.removeItem(storageKey);
        setConversations(seedConversationsFor(user.id));
      }
    } else {
      setConversations(seedConversationsFor(user.id));
    }
  }, [user?.id, loading]);

  const userId = user?.id;
  const userName = user?.name;
  const persistConversations = useCallback(
    (newConversations: Conversation[]) => {
      if (!userId) return;
      const storageKey = `${STORAGE_KEY_PREFIX}${userId}`;
      const data: UserMessages = { conversations: newConversations };
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    [userId]
  );

  const sendMessage = useCallback(
    (participantId: string, text: string) => {
      if (!userId) return;

      const message = {
        id: `msg-${Date.now()}`,
        senderId: userId,
        text,
        sentAt: Date.now(),
      };

      // Update the sender's own copy.
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.participantId === participantId) {
            return { ...conv, messages: [...conv.messages, message] };
          }
          return conv;
        });

        const hasConversation = updated.some(c => c.participantId === participantId);
        if (!hasConversation) {
          updated.push({
            id: `conv-${Date.now()}`,
            participantId,
            messages: [message],
            unread: 0,
            pinned: false,
          });
        }

        persistConversations(updated);
        return updated;
      });

      // Deliver into the recipient's own inbox so it's there when they log in.
      const recipientData = readMessagesForUser(participantId);
      const recipientConversations = recipientData.conversations;
      const recipientConvIdx = recipientConversations.findIndex(c => c.participantId === userId);
      let updatedRecipientConversations: Conversation[];
      if (recipientConvIdx >= 0) {
        updatedRecipientConversations = recipientConversations.map((conv, i) =>
          i === recipientConvIdx
            ? { ...conv, messages: [...conv.messages, message], unread: conv.unread + 1 }
            : conv
        );
      } else {
        updatedRecipientConversations = [
          ...recipientConversations,
          {
            id: `conv-${Date.now()}-${participantId}`,
            participantId: userId,
            messages: [message],
            unread: 1,
            pinned: false,
          },
        ];
      }
      writeMessagesForUser(participantId, { conversations: updatedRecipientConversations });
    },
    [userId, persistConversations]
  );

  const markConversationRead = useCallback(
    (participantId: string) => {
      setConversations(prev => {
        const updated = prev.map(conv =>
          conv.participantId === participantId ? { ...conv, unread: 0 } : conv
        );
        persistConversations(updated);
        return updated;
      });
    },
    [persistConversations]
  );

  const getConversationByParticipant = useCallback(
    (participantId: string) => conversations.find(c => c.participantId === participantId),
    [conversations]
  );

  return (
    <MessagingContext.Provider
      value={{ conversations, sendMessage, markConversationRead, getConversationByParticipant, currentUserId: userId, currentUserName: userName }}
    >
      {children}
    </MessagingContext.Provider>
  );
}
