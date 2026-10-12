export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  videoUrl?: string;
  resourceUrl?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export type QuizQuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface CourseQuizQuestion {
  id: string;
  // Absent means 'multiple-choice' — quizzes created before this type
  // existed have no `type` field at all, and keep working unchanged.
  type?: QuizQuestionType;
  question: string;
  options: string[];
  correct: number;
  // Only used when type === 'short-answer'; options/correct are unused then.
  acceptableAnswers?: string[];
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  dueDate?: string;
  questions: CourseQuizQuestion[];
  // Exams reuse the whole quiz engine (question types, timer, grading) but
  // are single-attempt — no retake once submitted.
  isExam?: boolean;
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  points: number;
}

export interface CourseAssignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxScore: number;
  rubric: RubricCriterion[];
}

export interface DiscussionReply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: number;
}

export interface DiscussionThread {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  createdAt: number;
  replies: DiscussionReply[];
  views: number;
  helpful: number;
  isPinned: boolean;
}

export interface CourseReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  createdAt: number;
  helpful: number;
  verified: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  whatYoullLearn: string[];
  instructor: string;
  instructorId?: string;
  thumbnail?: string;
  category: string;
  level: CourseLevel;
  price: number;
  rating: number;
  students: number;
  durationHours: number;
  sections: CourseSection[];
  quizzes: CourseQuiz[];
  assignments: CourseAssignment[];
  discussions: DiscussionThread[];
  reviews: CourseReview[];
  published: boolean;
}

export interface CourseContextType {
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  addCourse: (input: Omit<Course, 'id' | 'rating' | 'students' | 'discussions' | 'reviews'>) => Course;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  incrementStudentCount: (id: string) => void;
  addQuizToCourse: (courseId: string, quiz: Omit<CourseQuiz, 'id'>) => void;
  addAssignmentToCourse: (courseId: string, assignment: Omit<CourseAssignment, 'id'>) => void;
  postDiscussionQuestion: (courseId: string, title: string, content: string, author: string, avatar: string) => void;
  postDiscussionReply: (courseId: string, threadId: string, content: string, author: string, avatar: string) => void;
  markDiscussionHelpful: (courseId: string, threadId: string) => void;
  submitReview: (courseId: string, rating: number, title: string, text: string, author: string, avatar: string) => void;
  markReviewHelpful: (courseId: string, reviewId: string) => void;
}
