import { Enrollment } from '@/lib/enrollment/types';
import { Course } from '@/lib/courses/types';
import { getEarnedCertificates } from '@/lib/enrollment/getEarnedCertificates';
import { calculateUserPoints } from '@/lib/points/calculatePoints';
import { listAllEndorsements } from '@/lib/shared/crossAccountStore';

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
}

// Every badge here is computed from real enrollment/certificate/endorsement
// data — there's no hardcoded "you earned this" array. A new account with no
// activity gets every badge back unearned, not a wall of fake trophies.
export function getAchievements(
  userId: string,
  enrollments: Enrollment[],
  courses: Course[],
  getCourseById: (id: string) => Course | undefined
): Achievement[] {
  const lessonsCompleted = enrollments.reduce(
    (sum, e) => sum + e.lessonProgress.filter((p) => p.completed).length,
    0
  );

  const coursesCompleted = enrollments.filter((e) => {
    const course = getCourseById(e.courseId);
    if (!course) return false;
    const total = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
    const completed = e.lessonProgress.filter((p) => p.completed).length;
    return total > 0 && completed === total;
  }).length;

  const certificates = getEarnedCertificates(userId, enrollments, getCourseById);
  const hasPerfectQuiz = enrollments.some((e) => e.quizAttempts.some((a) => a.score === 100));
  const points = calculateUserPoints(enrollments, courses);
  const endorsementCount = listAllEndorsements().filter((e) => e.studentId === userId).length;

  return [
    {
      id: 'first-lesson',
      emoji: '🎯',
      title: 'First Step',
      description: 'Complete your first lesson',
      earned: lessonsCompleted >= 1,
    },
    {
      id: 'first-course',
      emoji: '📘',
      title: 'Course Complete',
      description: 'Finish every lesson in a course',
      earned: coursesCompleted >= 1,
    },
    {
      id: 'first-certificate',
      emoji: '🎓',
      title: 'Certified',
      description: 'Earn your first certificate',
      earned: certificates.length >= 1,
    },
    {
      id: 'perfect-quiz',
      emoji: '💯',
      title: 'Perfect Score',
      description: 'Score 100% on a quiz',
      earned: hasPerfectQuiz,
    },
    {
      id: 'five-courses',
      emoji: '🏆',
      title: 'Serial Learner',
      description: 'Complete 5 courses',
      earned: coursesCompleted >= 5,
    },
    {
      id: 'endorsed',
      emoji: '👍',
      title: 'Recognized',
      description: 'Receive a skill endorsement from a peer',
      earned: endorsementCount >= 1,
    },
    {
      id: 'points-500',
      emoji: '⚡',
      title: 'Rising Star',
      description: 'Earn 500 points',
      earned: points >= 500,
    },
  ];
}
