"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Course, CourseContextType, CourseQuiz, CourseAssignment } from './types';

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'forge_courses';

const DEFAULT_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced React Patterns',
    description: 'Master advanced React techniques and best practices',
    whatYoullLearn: [
      'Advanced Component Patterns',
      'State Management Best Practices',
      'Performance Optimization',
      'Testing Strategies',
    ],
    instructor: 'Sarah Chen',
    category: 'web-development',
    level: 'Advanced',
    price: 79,
    rating: 4.9,
    students: 1245,
    durationHours: 12.5,
    sections: [
      {
        id: 'section-1',
        title: 'Introduction & Setup',
        lessons: [
          { id: 'lesson-1', title: 'Course Overview', duration: '5 min' },
          { id: 'lesson-2', title: 'Setting Up Your Environment', duration: '12 min' },
          { id: 'lesson-3', title: 'Project Structure', duration: '8 min' },
        ],
      },
      {
        id: 'section-2',
        title: 'React Fundamentals',
        lessons: [
          { id: 'lesson-4', title: 'Components & Props', duration: '15 min' },
          { id: 'lesson-5', title: 'State & Lifecycle', duration: '18 min' },
          { id: 'lesson-6', title: 'Event Handling', duration: '10 min' },
        ],
      },
      {
        id: 'section-3',
        title: 'Advanced Patterns',
        lessons: [
          { id: 'lesson-7', title: 'Custom Hooks', duration: '20 min' },
          { id: 'lesson-8', title: 'Context API', duration: '15 min' },
          { id: 'lesson-9', title: 'Performance Optimization', duration: '25 min' },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'React Hooks Fundamentals Quiz',
        description: 'Test your knowledge of React hooks',
        timeLimit: 15,
        passingScore: 70,
        questions: [
          {
            id: 'q-1',
            question: 'What is the primary purpose of the useState hook?',
            options: ['To manage component state', 'To manage component lifecycle', 'To handle side effects', 'To manage context'],
            correct: 0,
            explanation: 'useState is used to add state to functional components.',
          },
          {
            id: 'q-2',
            question: 'Which hook is used for side effects in functional components?',
            options: ['useState', 'useEffect', 'useContext', 'useReducer'],
            correct: 1,
            explanation: 'useEffect is used to perform side effects like data fetching, subscriptions, etc.',
          },
          {
            id: 'q-3',
            question: 'Can you call hooks conditionally?',
            options: ['Yes, always', 'No, hooks must be called at top level', 'Only in useEffect', 'Only in class components'],
            correct: 1,
            explanation: 'Hooks must be called at the top level of your component or custom hook.',
          },
          {
            id: 'q-4',
            question: 'What does useContext do?',
            options: ['Manages component state', 'Accesses context values without consumer wrapper', 'Creates new context', 'Both B and C'],
            correct: 3,
            explanation: 'useContext allows you to access context values and create new contexts.',
          },
          {
            id: 'q-5',
            question: 'How many times should you call a hook in a component?',
            options: ['Once per component', 'As many times as needed, in same order', 'Once per render', 'In any order'],
            correct: 1,
            explanation: 'Hooks should be called in the same order every render for React to properly track state.',
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assignment-1',
        title: 'Build a React Todo App',
        description: 'Create a fully functional todo application',
        instructions: 'Implement a todo app with add, edit, delete, and mark complete functionality using React hooks.',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        maxScore: 100,
        rubric: [
          { id: 'r-1', criterion: 'Functionality', points: 40 },
          { id: 'r-2', criterion: 'Code Quality', points: 30 },
          { id: 'r-3', criterion: 'UI/UX Design', points: 30 },
        ],
      },
    ],
    discussions: [
      {
        id: 'thread-1',
        author: 'John Doe',
        avatar: 'JD',
        title: 'Best practices for state management',
        content: 'What are the best practices for managing state in large React applications?',
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        answers: 5,
        views: 342,
        helpful: 28,
        isPinned: true,
      },
      {
        id: 'thread-2',
        author: 'Sarah Johnson',
        avatar: 'SJ',
        title: 'useEffect dependency array confusion',
        content: 'I am confused about the dependency array in useEffect. When should I use empty array vs passing dependencies?',
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        answers: 3,
        views: 156,
        helpful: 12,
        isPinned: false,
      },
      {
        id: 'thread-3',
        author: 'Mike Chen',
        avatar: 'MC',
        title: 'Performance tips for React apps',
        content: 'What are some performance optimization techniques you use in your React projects?',
        createdAt: Date.now() - 5 * 60 * 60 * 1000,
        answers: 2,
        views: 89,
        helpful: 7,
        isPinned: false,
      },
      {
        id: 'thread-4',
        author: 'Emma Wilson',
        avatar: 'EW',
        title: 'Testing React components',
        content: 'What testing library do you recommend for React component testing?',
        createdAt: Date.now() - 30 * 60 * 1000,
        answers: 1,
        views: 45,
        helpful: 3,
        isPinned: false,
      },
    ],
    reviews: [
      {
        id: 'review-1',
        author: 'Alex Kumar',
        avatar: 'AK',
        rating: 5,
        title: 'Excellent course, highly recommended!',
        text: 'This course is incredibly well structured and the instructor explains complex concepts in a very understandable way.',
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        helpful: 45,
        verified: true,
      },
      {
        id: 'review-2',
        author: 'Lisa Zhang',
        avatar: 'LZ',
        rating: 4,
        title: 'Great content with minor issues',
        text: 'The course content is amazing but some of the quizzes could be a bit clearer in their wording.',
        createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        helpful: 28,
        verified: true,
      },
      {
        id: 'review-3',
        author: 'James Brown',
        avatar: 'JB',
        rating: 5,
        title: 'Fantastic learning experience',
        text: 'I went from intermediate to advanced React skills with this course. Sarah is an excellent instructor.',
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        helpful: 52,
        verified: true,
      },
      {
        id: 'review-4',
        author: 'Maria Garcia',
        avatar: 'MG',
        rating: 4,
        title: 'Good course, could use more examples',
        text: 'Content is solid but more real-world examples throughout would really help cement the concepts.',
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        helpful: 31,
        verified: true,
      },
      {
        id: 'review-5',
        author: 'David Lee',
        avatar: 'DL',
        rating: 5,
        title: 'Best React course I have taken',
        text: 'Comprehensive, well-paced, and incredibly valuable. This course is worth every penny.',
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        helpful: 38,
        verified: true,
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development from scratch',
    whatYoullLearn: ['HTML Basics', 'CSS Styling', 'JavaScript Fundamentals', 'Responsive Design'],
    instructor: 'John Smith',
    category: 'web-development',
    level: 'Beginner',
    price: 49,
    rating: 4.7,
    students: 3421,
    durationHours: 20,
    sections: [
      {
        id: 'section-1',
        title: 'HTML Foundations',
        lessons: [
          { id: 'lesson-1', title: 'HTML Basics', duration: '10 min' },
          { id: 'lesson-2', title: 'Semantic HTML', duration: '12 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Masterclass',
    description: 'Master modern UI/UX design principles and tools',
    whatYoullLearn: ['Design Principles', 'Wireframing', 'Prototyping', 'User Research'],
    instructor: 'Mike Johnson',
    category: 'design',
    level: 'Intermediate',
    price: 59,
    rating: 4.8,
    students: 892,
    durationHours: 15,
    sections: [
      {
        id: 'section-1',
        title: 'Design Basics',
        lessons: [
          { id: 'lesson-1', title: 'Design Principles', duration: '15 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
  {
    id: 'course-4',
    title: 'Python for Data Science',
    description: 'Learn Python for data analysis and visualization',
    whatYoullLearn: ['Python Basics', 'Pandas', 'NumPy', 'Data Visualization'],
    instructor: 'Alex Kumar',
    category: 'data-science',
    level: 'Intermediate',
    price: 69,
    rating: 4.6,
    students: 1567,
    durationHours: 25,
    sections: [
      {
        id: 'section-1',
        title: 'Python Fundamentals',
        lessons: [
          { id: 'lesson-1', title: 'Python Basics', duration: '20 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
  {
    id: 'course-5',
    title: 'Mobile Development with Flutter',
    description: 'Build cross-platform mobile apps with Flutter',
    whatYoullLearn: ['Flutter Widgets', 'State Management', 'Navigation', 'Firebase Integration'],
    instructor: 'Emma Davis',
    category: 'mobile-development',
    level: 'Intermediate',
    price: 49,
    rating: 4.5,
    students: 734,
    durationHours: 18,
    sections: [
      {
        id: 'section-1',
        title: 'Flutter Basics',
        lessons: [
          { id: 'lesson-1', title: 'Flutter Setup', duration: '10 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
  {
    id: 'course-6',
    title: 'Cloud Architecture on AWS',
    description: 'Master AWS cloud architecture and deployment',
    whatYoullLearn: ['EC2', 'S3', 'RDS', 'Lambda', 'VPC'],
    instructor: 'Tom Wilson',
    category: 'cloud',
    level: 'Advanced',
    price: 99,
    rating: 4.8,
    students: 456,
    durationHours: 30,
    sections: [
      {
        id: 'section-1',
        title: 'AWS Foundations',
        lessons: [
          { id: 'lesson-1', title: 'AWS Overview', duration: '15 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
  {
    id: 'course-7',
    title: 'DevOps Fundamentals',
    description: 'Learn DevOps practices and CI/CD pipelines',
    whatYoullLearn: ['Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    instructor: 'John Trainer',
    instructorId: 'trainer-1',
    category: 'devops',
    level: 'Intermediate',
    price: 89,
    rating: 4.4,
    students: 234,
    durationHours: 22,
    sections: [
      {
        id: 'section-1',
        title: 'DevOps Basics',
        lessons: [
          { id: 'lesson-1', title: 'DevOps Introduction', duration: '12 min' },
        ],
      },
    ],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
  },
];

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCourses(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setCourses(DEFAULT_COURSES);
      }
    } else {
      setCourses(DEFAULT_COURSES);
    }
  }, []);

  const persistCourses = useCallback((newCourses: Course[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCourses));
  }, []);

  const getCourseById = useCallback((id: string) => {
    return courses.find(c => c.id === id);
  }, [courses]);

  const addCourse = useCallback(
    (input: Omit<Course, 'id' | 'rating' | 'students' | 'discussions' | 'reviews'>) => {
      const newCourse: Course = {
        ...input,
        id: `course-${Date.now()}`,
        rating: 0,
        students: 0,
        discussions: [],
        reviews: [],
      };
      const updated = [...courses, newCourse];
      persistCourses(updated);
      setCourses(updated);
      return newCourse;
    },
    [courses, persistCourses]
  );

  const incrementStudentCount = useCallback(
    (id: string) => {
      setCourses(prev => {
        const updated = prev.map(c => (c.id === id ? { ...c, students: c.students + 1 } : c));
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const addQuizToCourse = useCallback(
    (courseId: string, quiz: Omit<CourseQuiz, 'id'>) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                quizzes: [...c.quizzes, { ...quiz, id: `quiz-${Date.now()}` }],
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const addAssignmentToCourse = useCallback(
    (courseId: string, assignment: Omit<CourseAssignment, 'id'>) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                assignments: [...c.assignments, { ...assignment, id: `assignment-${Date.now()}` }],
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const postDiscussionQuestion = useCallback(
    (courseId: string, title: string, content: string, author: string, avatar: string) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                discussions: [
                  ...c.discussions,
                  {
                    id: `thread-${Date.now()}`,
                    title,
                    content,
                    author,
                    avatar,
                    createdAt: Date.now(),
                    answers: 0,
                    views: 0,
                    helpful: 0,
                    isPinned: false,
                  },
                ],
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const markDiscussionHelpful = useCallback(
    (courseId: string, threadId: string) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                discussions: c.discussions.map(d =>
                  d.id === threadId ? { ...d, helpful: d.helpful + 1 } : d
                ),
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const submitReview = useCallback(
    (courseId: string, rating: number, title: string, text: string, author: string, avatar: string) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                reviews: [
                  ...c.reviews,
                  {
                    id: `review-${Date.now()}`,
                    rating,
                    title,
                    text,
                    author,
                    avatar,
                    createdAt: Date.now(),
                    helpful: 0,
                    verified: false,
                  },
                ],
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const markReviewHelpful = useCallback(
    (courseId: string, reviewId: string) => {
      setCourses(prev => {
        const updated = prev.map(c =>
          c.id === courseId
            ? {
                ...c,
                reviews: c.reviews.map(r =>
                  r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
                ),
              }
            : c
        );
        persistCourses(updated);
        return updated;
      });
    },
    [persistCourses]
  );

  const value: CourseContextType = {
    courses,
    getCourseById,
    addCourse,
    incrementStudentCount,
    addQuizToCourse,
    addAssignmentToCourse,
    postDiscussionQuestion,
    markDiscussionHelpful,
    submitReview,
    markReviewHelpful,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}
