import { Enrollment } from './types';
import { Course } from '@/lib/courses/types';
import { calculateCourseProgress } from './calculateProgress';
import { getIssuedCertificates, recordCertificateIfNew } from './certificateStore';

export interface EarnedCertificate {
  courseId: string;
  courseTitle: string;
  instructor: string;
  issuedAt: string;
  score: number;
  credentialId: string;
}

// A course is complete once every lesson is done, every quiz is passed, and
// every assignment has at least been submitted (grading can still be
// pending). The first time a course meets that bar, a certificate record is
// persisted with a real, non-guessable id — later calls just return that
// same record, even if the course's own requirements change afterward.
export function getEarnedCertificates(
  userId: string,
  enrollments: Enrollment[],
  getCourseById: (id: string) => Course | undefined
): EarnedCertificate[] {
  const persisted = getIssuedCertificates(userId);
  const results: EarnedCertificate[] = [];

  for (const enrollment of enrollments) {
    const course = getCourseById(enrollment.courseId);
    if (!course) continue;

    const existingRecord = persisted.find((c) => c.courseId === course.id);

    const progress = calculateCourseProgress(enrollment, course);
    const lessonsComplete = progress.percentComplete === 100;

    const passingAttempts = course.quizzes.map((quiz) =>
      enrollment.quizAttempts.find((a) => a.quizId === quiz.id && a.score >= quiz.passingScore)
    );
    const allQuizzesPassed = passingAttempts.every((a) => !!a);

    const allAssignmentsSubmitted = course.assignments.every((assignment) =>
      enrollment.submissions.some((s) => s.assignmentId === assignment.id)
    );

    if (lessonsComplete && allQuizzesPassed && allAssignmentsSubmitted) {
      const score =
        passingAttempts.length > 0
          ? Math.round(passingAttempts.reduce((sum, a) => sum + (a?.score ?? 0), 0) / passingAttempts.length)
          : 100;
      const record = existingRecord ?? recordCertificateIfNew(userId, course.id, score);
      results.push({
        courseId: course.id,
        courseTitle: course.title,
        instructor: course.instructor,
        issuedAt: record.issuedAt,
        score: record.score,
        credentialId: record.credentialId,
      });
    } else if (existingRecord) {
      // Already earned previously — honor it even though the course no
      // longer meets these requirements today (e.g. a quiz was added later).
      results.push({
        courseId: course.id,
        courseTitle: course.title,
        instructor: course.instructor,
        issuedAt: existingRecord.issuedAt,
        score: existingRecord.score,
        credentialId: existingRecord.credentialId,
      });
    }
  }

  return results;
}
