"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth/useAuth';
import { BookmarksContextType } from './types';

export const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

function storageKey(userId: string): string {
  return `forge_bookmarks_${userId}`;
}

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [bookmarkedCourseIds, setBookmarkedCourseIds] = useState<string[]>([]);

  // SSR-safe hydration: state starts empty and is patched here after mount,
  // once localStorage is available and the signed-in user is known.
  useEffect(() => {
    if (loading || !user?.id) return;
    const stored = localStorage.getItem(storageKey(user.id));
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBookmarkedCourseIds(JSON.parse(stored));
      } catch {
        localStorage.removeItem(storageKey(user.id));
      }
    }
  }, [user?.id, loading]);

  const persist = useCallback(
    (ids: string[]) => {
      if (!user?.id) return;
      localStorage.setItem(storageKey(user.id), JSON.stringify(ids));
    },
    [user]
  );

  const isBookmarked = useCallback(
    (courseId: string) => bookmarkedCourseIds.includes(courseId),
    [bookmarkedCourseIds]
  );

  const toggleBookmark = useCallback(
    (courseId: string) => {
      setBookmarkedCourseIds(prev => {
        const updated = prev.includes(courseId)
          ? prev.filter(id => id !== courseId)
          : [...prev, courseId];
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const value: BookmarksContextType = {
    bookmarkedCourseIds,
    isBookmarked,
    toggleBookmark,
  };

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}
