export interface LessonProgress {
  lessonId: string;
  completed: boolean;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  attemptedAt: string;
}

export interface AssignmentSubmission {
  assignmentId: string;
  fileName: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  score?: number;
  feedback?: string;
}

export interface Enrollment {
  courseId: string;
  enrolledAt: string;
  lessonProgress: LessonProgress[];
  quizAttempts: QuizAttempt[];
  submissions: AssignmentSubmission[];
}

export interface UserEnrollments {
  enrollments: Enrollment[];
}

export interface EnrollmentContextType {
  enrollments: Enrollment[];
  enroll: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  recordQuizAttempt: (courseId: string, quizId: string, score: number) => void;
  submitAssignment: (courseId: string, assignmentId: string, fileName: string) => void;
}
