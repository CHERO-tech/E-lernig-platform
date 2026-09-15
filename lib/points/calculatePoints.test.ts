import { describe, expect, it } from "vitest";
import { calculateUserPoints } from "./calculatePoints";
import { Course } from "@/lib/courses/types";
import { Enrollment } from "@/lib/enrollment/types";

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
    sections: [
      { id: "sec-1", title: "Section 1", lessons: [{ id: "l1", title: "Lesson 1", duration: "5m" }, { id: "l2", title: "Lesson 2", duration: "5m" }] },
    ],
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

describe("calculateUserPoints", () => {
  it("returns 0 for no enrollments", () => {
    expect(calculateUserPoints([], [makeCourse()])).toBe(0);
  });

  it("ignores enrollments for a course that no longer exists", () => {
    const enrollment = makeEnrollment({ courseId: "missing-course", lessonProgress: [{ lessonId: "l1", completed: true }] });
    expect(calculateUserPoints([enrollment], [makeCourse()])).toBe(0);
  });

  it("awards 10 points per completed lesson", () => {
    const enrollment = makeEnrollment({
      lessonProgress: [
        { lessonId: "l1", completed: true },
        { lessonId: "l2", completed: false },
      ],
    });
    expect(calculateUserPoints([enrollment], [makeCourse()])).toBe(10);
  });

  it("awards 25 points per passed quiz (score >= 70) and none for failed attempts", () => {
    const enrollment = makeEnrollment({
      quizAttempts: [
        { quizId: "q1", score: 70, attemptedAt: "" }, // boundary: exactly passing
        { quizId: "q2", score: 69, attemptedAt: "" },
        { quizId: "q3", score: 100, attemptedAt: "" },
      ],
    });
    expect(calculateUserPoints([enrollment], [makeCourse()])).toBe(50);
  });

  it("awards a 100 point bonus only when every lesson in the course is completed", () => {
    const course = makeCourse();
    const partial = makeEnrollment({ lessonProgress: [{ lessonId: "l1", completed: true }, { lessonId: "l2", completed: false }] });
    const complete = makeEnrollment({ lessonProgress: [{ lessonId: "l1", completed: true }, { lessonId: "l2", completed: true }] });

    expect(calculateUserPoints([partial], [course])).toBe(10); // 1 lesson, no bonus
    expect(calculateUserPoints([complete], [course])).toBe(2 * 10 + 100); // both lessons + bonus
  });

  it("sums points across multiple enrollments", () => {
    const courseA = makeCourse({ id: "a" });
    const courseB = makeCourse({ id: "b" });
    const enrollA = makeEnrollment({ courseId: "a", lessonProgress: [{ lessonId: "l1", completed: true }] });
    const enrollB = makeEnrollment({ courseId: "b", quizAttempts: [{ quizId: "q1", score: 90, attemptedAt: "" }] });

    expect(calculateUserPoints([enrollA, enrollB], [courseA, courseB])).toBe(10 + 25);
  });
});
