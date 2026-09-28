import { Enrollment } from './types';
import { Course } from '@/lib/courses/types';
import { getEarnedCertificates } from './getEarnedCertificates';

export type ActivityType = 'enrolled' | 'quiz' | 'assignment' | 'certificate';

export interface ActivityEvent {
  type: ActivityType;
  courseId: string;
  courseTitle: string;
  detail: string;
  timestamp: number;
}

// Built only from events that actually carry a timestamp in the data model
// (enrollment date, quiz attempts, assignment submissions, certificates).
// Individual lesson completions have no timestamp (LessonProgress is just
// {lessonId, completed}), so they can't appear here — that's a real gap in
// the data model, not something to fake with an invented date.
export function getActivityFeed(
  userId: string,
  enrollments: Enrollment[],
  getCourseById: (id: string) => Course | undefined
): ActivityEvent[] {
  const events: ActivityEvent[] = [];

  for (const enrollment of enrollments) {
    const course = getCourseById(enrollment.courseId);
    if (!course) continue;

    events.push({
      type: 'enrolled',
      courseId: course.id,
      courseTitle: course.title,
      detail: `Enrolled in ${course.title}`,
      timestamp: new Date(enrollment.enrolledAt).getTime(),
    });

    for (const attempt of enrollment.quizAttempts) {
      const quiz = course.quizzes.find((q) => q.id === attempt.quizId);
      events.push({
        type: 'quiz',
        courseId: course.id,
        courseTitle: course.title,
        detail: `Scored ${attempt.score}% on "${quiz?.title ?? 'a quiz'}"`,
        timestamp: new Date(attempt.attemptedAt).getTime(),
      });
    }

    for (const submission of enrollment.submissions) {
      const assignment = course.assignments.find((a) => a.id === submission.assignmentId);
      events.push({
        type: 'assignment',
        courseId: course.id,
        courseTitle: course.title,
        detail: `Submitted "${assignment?.title ?? 'an assignment'}"`,
        timestamp: new Date(submission.submittedAt).getTime(),
      });
    }
  }

  for (const cert of getEarnedCertificates(userId, enrollments, getCourseById)) {
    events.push({
      type: 'certificate',
      courseId: cert.courseId,
      courseTitle: cert.courseTitle,
      detail: `Earned a certificate in ${cert.courseTitle}`,
      timestamp: new Date(cert.issuedAt).getTime(),
    });
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
}
