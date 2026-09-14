import { Enrollment } from './types';
import { Course } from '@/lib/courses/types';

export interface ProgressStats {
  lessonsCompleted: number;
  lessonsTotal: number;
  quizzesCompleted: number;
  assignmentsSubmitted: number;
  assignmentsGraded: number;
  percentComplete: number;
}

export function calculateCourseProgress(enrollment: Enrollment, course: Course): ProgressStats {
  const lessonsTotal = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
  const lessonsCompleted = enrollment.lessonProgress.filter(p => p.completed).length;
  const quizzesCompleted = enrollment.quizAttempts.length;
  const assignmentsSubmitted = enrollment.submissions.length;
  const assignmentsGraded = enrollment.submissions.filter(s => s.status === 'graded').length;

  const percentComplete = lessonsTotal > 0 ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0;

  return {
    lessonsCompleted,
    lessonsTotal,
    quizzesCompleted,
    assignmentsSubmitted,
    assignmentsGraded,
    percentComplete,
  };
}
