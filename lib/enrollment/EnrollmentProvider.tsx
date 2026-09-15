"use client";

import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/useAuth';
import { useCourses } from '@/lib/courses/useCourses';
import { Enrollment, EnrollmentContextType } from './types';

export const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

const DEFAULT_ENROLLMENTS: Enrollment[] = [
  {
    courseId: 'course-1',
    enrolledAt: new Date('2024-01-15').toISOString(),
    lessonProgress: [
      { lessonId: 'lesson-1', completed: true },
      { lessonId: 'lesson-2', completed: true },
      { lessonId: 'lesson-3', completed: false },
      { lessonId: 'lesson-4', completed: false },
      { lessonId: 'lesson-5', completed: false },
      { lessonId: 'lesson-6', completed: false },
      { lessonId: 'lesson-7', completed: false },
      { lessonId: 'lesson-8', completed: false },
      { lessonId: 'lesson-9', completed: false },
    ],
    quizAttempts: [],
    submissions: [
      {
        assignmentId: 'assign-1',
        fileName: 'react-patterns-refactor.zip',
        submittedAt: new Date('2024-02-10').toISOString(),
        status: 'submitted',
      },
    ],
  },
];

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { incrementStudentCount } = useCourses();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // SSR-safe hydration: state starts at the default and is patched here
  // after mount, once localStorage is available (see app/layout.tsx).
  useEffect(() => {
    if (loading || !user?.id) return;

    const storageKey = `forge_enrollments_${user.id}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const data = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEnrollments(data.enrollments || []);
      } catch {
        localStorage.removeItem(storageKey);
        setEnrollments(user.id === 'student-1' ? DEFAULT_ENROLLMENTS : []);
      }
    } else {
      setEnrollments(user.id === 'student-1' ? DEFAULT_ENROLLMENTS : []);
    }
  }, [user?.id, loading]);

  const persistEnrollments = (data: Enrollment[]) => {
    if (!user?.id) return;
    const storageKey = `forge_enrollments_${user.id}`;
    localStorage.setItem(storageKey, JSON.stringify({ enrollments: data }));
  };

  const enroll = (courseId: string) => {
    setEnrollments(prev => {
      const exists = prev.find(e => e.courseId === courseId);
      if (exists) return prev;

      const newEnrollment: Enrollment = {
        courseId,
        enrolledAt: new Date().toISOString(),
        lessonProgress: [],
        quizAttempts: [],
        submissions: [],
      };

      const updated = [...prev, newEnrollment];
      persistEnrollments(updated);
      incrementStudentCount(courseId);
      return updated;
    });
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setEnrollments(prev => {
      const updated = prev.map(e => {
        if (e.courseId !== courseId) return e;
        const existing = e.lessonProgress.find(l => l.lessonId === lessonId);
        if (existing) return e;
        return {
          ...e,
          lessonProgress: [...e.lessonProgress, { lessonId, completed: true }],
        };
      });
      persistEnrollments(updated);
      return updated;
    });
  };

  const recordQuizAttempt = (courseId: string, quizId: string, score: number) => {
    setEnrollments(prev => {
      const updated = prev.map(e => {
        if (e.courseId !== courseId) return e;
        return {
          ...e,
          quizAttempts: [...e.quizAttempts, { quizId, score, attemptedAt: new Date().toISOString() }],
        };
      });
      persistEnrollments(updated);
      return updated;
    });
  };

  const submitAssignment = (courseId: string, assignmentId: string, fileName: string) => {
    setEnrollments(prev => {
      const updated: Enrollment[] = prev.map(e => {
        if (e.courseId !== courseId) return e;
        const newSubmission: Enrollment['submissions'][0] = {
          assignmentId,
          fileName,
          submittedAt: new Date().toISOString(),
          status: 'submitted',
        };
        return {
          ...e,
          submissions: [...e.submissions, newSubmission],
        };
      });
      persistEnrollments(updated);
      return updated;
    });
  };

  const value: EnrollmentContextType = {
    enrollments,
    enroll,
    markLessonComplete,
    recordQuizAttempt,
    submitAssignment,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}
