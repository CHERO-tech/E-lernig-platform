import { describe, expect, it } from "vitest";
import { calculateCourseProgress } from "./calculateProgress";
import { Course } from "@/lib/courses/types";
import { Enrollment } from "./types";

function makeCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: "course-1",
    title: "Course",
    description: "",
    whatYoullLearn: [],
    instructor: "Someone",
    category: "Software Development",
    level: "Beginner",
    price: 0,
    rating: 0,
    students: 0,
    durationHours: 0,
    sections: [],
    quizzes: [],
    assignments: [],
    discussions: [],
    reviews: [],
    ...overrides,
  };
}

function makeEnrollment(overrides: Partial<Enrollment> = {}): Enrollment {
  return {
    courseId: "course-1",
    enrolledAt: new Date().toISOString(),
    lessonProgress: [],
    quizAttempts: [],
    submissions: [],
    ...overrides,
  };
}

describe("calculateCourseProgress", () => {
  it("reports 0% when the course has no lessons, without dividing by zero", () => {
    const stats = calculateCourseProgress(makeEnrollment(), makeCourse({ sections: [] }));
    expect(stats.lessonsTotal).toBe(0);
    expect(stats.percentComplete).toBe(0);
  });

  it("counts lessons across multiple sections and rounds the percentage", () => {
    const course = makeCourse({
      sections: [
        { id: "s1", title: "S1", lessons: [{ id: "l1", title: "L1", duration: "5m" }, { id: "l2", title: "L2", duration: "5m" }] },
        { id: "s2", title: "S2", lessons: [{ id: "l3", title: "L3", duration: "5m" }] },
      ],
    });
    const enrollment = makeEnrollment({
      lessonProgress: [{ lessonId: "l1", completed: true }],
    });

    const stats = calculateCourseProgress(enrollment, course);
    expect(stats.lessonsTotal).toBe(3);
    expect(stats.lessonsCompleted).toBe(1);
    expect(stats.percentComplete).toBe(33); // 1/3 rounded
  });

  it("reports 100% when every lesson is completed", () => {
    const course = makeCourse({
      sections: [{ id: "s1", title: "S1", lessons: [{ id: "l1", title: "L1", duration: "5m" }] }],
    });
    const enrollment = makeEnrollment({ lessonProgress: [{ lessonId: "l1", completed: true }] });

    expect(calculateCourseProgress(enrollment, course).percentComplete).toBe(100);
  });

  it("counts quiz attempts and separates submitted from graded assignments", () => {
    const enrollment = makeEnrollment({
      quizAttempts: [{ quizId: "q1", score: 90, attemptedAt: "" }, { quizId: "q2", score: 60, attemptedAt: "" }],
      submissions: [
        { assignmentId: "a1", fileName: "a.pdf", submittedAt: "", status: "graded", score: 85 },
        { assignmentId: "a2", fileName: "b.pdf", submittedAt: "", status: "submitted" },
      ],
    });

    const stats = calculateCourseProgress(enrollment, makeCourse());
    expect(stats.quizzesCompleted).toBe(2);
    expect(stats.assignmentsSubmitted).toBe(2);
    expect(stats.assignmentsGraded).toBe(1);
  });
});
