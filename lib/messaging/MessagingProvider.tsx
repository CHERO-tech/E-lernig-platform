'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { Conversation, Message, MessagingContextType, UserMessages } from './types';
import { useAuth } from '@/lib/auth/useAuth';

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

export const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (loading || !user?.id) return;

    const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const data = JSON.parse(stored) as UserMessages;
        setConversations(data.conversations);
      } catch {
        localStorage.removeItem(storageKey);
        setConversations(DEFAULT_CONVERSATIONS);
      }
    } else {
      setConversations(DEFAULT_CONVERSATIONS);
    }
  }, [user?.id, loading]);

  const persistConversations = useCallback(
    (newConversations: Conversation[]) => {
      if (!user?.id) return;
      const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
      const data: UserMessages = { conversations: newConversations };
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    [user?.id]
  );

  const sendMessage = useCallback(
    (participantId: string, text: string) => {
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.participantId === participantId) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderId: 'me',
                  text,
                  sentAt: Date.now(),
                },
              ],
            };
          }
          return conv;
        });

        const hasConversation = updated.some(c => c.participantId === participantId);
        if (!hasConversation) {
          updated.push({
            id: `conv-${Date.now()}`,
            participantId,
            messages: [
              {
                id: `msg-${Date.now()}`,
                senderId: 'me',
                text,
                sentAt: Date.now(),
              },
            ],
            unread: 0,
            pinned: false,
          });
        }

        persistConversations(updated);
        return updated;
      });
    },
    [persistConversations]
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
    <MessagingContext.Provider value={{ conversations, sendMessage, markConversationRead, getConversationByParticipant }}>
      {children}
    </MessagingContext.Provider>
  );
}
