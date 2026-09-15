import { Enrollment } from "@/lib/enrollment/types";
import { Course } from "@/lib/courses/types";

export function calculateUserPoints(enrollments: Enrollment[], courses: Course[]): number {
  let points = 0;

  enrollments.forEach((enrollment) => {
    const course = courses.find(c => c.id === enrollment.courseId);
    if (!course) return;

    // Completed lessons × 10
    const completedLessons = enrollment.lessonProgress.filter(l => l.completed).length;
    points += completedLessons * 10;

    // Quiz attempts with score ≥ 70 count as passed × 25
    const quizzesPassed = enrollment.quizAttempts.filter(q => q.score >= 70).length;
    points += quizzesPassed * 25;

    // Course completed (all lessons done) × 100
    const totalLessons = course.sections.reduce((sum, sec) => sum + sec.lessons.length, 0);
    const completedCount = enrollment.lessonProgress.filter(l => l.completed).length;
    if (totalLessons > 0 && completedCount === totalLessons) {
      points += 100;
    }
  });

  return points;
}
