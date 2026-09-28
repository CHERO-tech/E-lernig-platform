import { Enrollment } from './types';
import { Course } from '@/lib/courses/types';

export type DeadlineType = 'quiz' | 'assignment';

export interface UpcomingDeadline {
  type: DeadlineType;
  courseId: string;
  courseTitle: string;
  title: string;
  dueDate: string;
  isOverdue: boolean;
  href: string;
}

// Only surfaces work the student hasn't done yet — an attempted quiz or a
// submitted assignment drops off the list even if it happened after the due
// date, since there's nothing left to remind them about.
export function getUpcomingDeadlines(
  enrollments: Enrollment[],
  getCourseById: (id: string) => Course | undefined
): UpcomingDeadline[] {
  const deadlines: UpcomingDeadline[] = [];
  const now = Date.now();

  for (const enrollment of enrollments) {
    const course = getCourseById(enrollment.courseId);
    if (!course) continue;

    for (const quiz of course.quizzes) {
      if (!quiz.dueDate) continue;
      const alreadyAttempted = enrollment.quizAttempts.some((a) => a.quizId === quiz.id);
      if (alreadyAttempted) continue;
      deadlines.push({
        type: 'quiz',
        courseId: course.id,
        courseTitle: course.title,
        title: quiz.title,
        dueDate: quiz.dueDate,
        isOverdue: new Date(quiz.dueDate).getTime() < now,
        href: `/courses/${course.id}/quizzes/${quiz.id}`,
      });
    }

    for (const assignment of course.assignments) {
      const alreadySubmitted = enrollment.submissions.some((s) => s.assignmentId === assignment.id);
      if (alreadySubmitted) continue;
      deadlines.push({
        type: 'assignment',
        courseId: course.id,
        courseTitle: course.title,
        title: assignment.title,
        dueDate: assignment.dueDate,
        isOverdue: new Date(assignment.dueDate).getTime() < now,
        href: `/courses/${course.id}/assignments/${assignment.id}/submit`,
      });
    }
  }

  return deadlines.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}
