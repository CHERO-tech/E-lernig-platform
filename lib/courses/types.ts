export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: CourseQuizQuestion[];
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

export interface DiscussionThread {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  createdAt: number;
  answers: number;
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
}

export interface CourseContextType {
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  addCourse: (input: Omit<Course, 'id' | 'rating' | 'students' | 'discussions' | 'reviews'>) => Course;
  incrementStudentCount: (id: string) => void;
  addQuizToCourse: (courseId: string, quiz: Omit<CourseQuiz, 'id'>) => void;
  addAssignmentToCourse: (courseId: string, assignment: Omit<CourseAssignment, 'id'>) => void;
  postDiscussionQuestion: (courseId: string, title: string, content: string, author: string, avatar: string) => void;
  markDiscussionHelpful: (courseId: string, threadId: string) => void;
  submitReview: (courseId: string, rating: number, title: string, text: string, author: string, avatar: string) => void;
  markReviewHelpful: (courseId: string, reviewId: string) => void;
}
