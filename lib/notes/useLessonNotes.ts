import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/useAuth';

function storageKey(userId: string, courseId: string): string {
  return `forge_notes_${userId}_${courseId}`;
}

// Personal, per-student notes on a lesson. There's no sharing or sync beyond
// this browser — same storage model as the rest of the app's per-user state.
export function useLessonNotes(courseId: string) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user?.id) return;
    const stored = localStorage.getItem(storageKey(user.id, courseId));
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(JSON.parse(stored));
      } catch {
        localStorage.removeItem(storageKey(user.id, courseId));
      }
    }
  }, [user?.id, courseId]);

  const setLessonNote = useCallback(
    (lessonId: string, content: string) => {
      if (!user?.id) return;
      setNotes((prev) => {
        const updated = { ...prev, [lessonId]: content };
        localStorage.setItem(storageKey(user.id, courseId), JSON.stringify(updated));
        return updated;
      });
    },
    [user, courseId]
  );

  return { notes, setLessonNote };
}
