import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { EnrollmentProvider } from "./EnrollmentProvider";
import { useEnrollment } from "./useEnrollment";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { User } from "@/lib/auth/types";

vi.mock("@/lib/auth/useAuth");
vi.mock("@/lib/courses/useCourses");

const mockUser: User = {
  id: "student-42",
  email: "student@example.com",
  name: "Student",
  role: "student",
  createdAt: new Date(),
};

const incrementStudentCount = vi.fn();

function mockLoggedIn(user: User | null = mockUser, loading = false) {
  vi.mocked(useAuth).mockReturnValue({
    user,
    loading,
  } as ReturnType<typeof useAuth>);
  vi.mocked(useCourses).mockReturnValue({
    incrementStudentCount,
  } as unknown as ReturnType<typeof useCourses>);
}

function wrapper({ children }: { children: ReactNode }) {
  return <EnrollmentProvider>{children}</EnrollmentProvider>;
}

function storageKey(userId: string) {
  return `forge_enrollments_${userId}`;
}

describe("EnrollmentProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    incrementStudentCount.mockClear();
    mockLoggedIn();
  });

  it("stays empty while auth is still loading", async () => {
    mockLoggedIn(mockUser, true);
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    // Give effects a chance to run; enrollments should remain untouched.
    await new Promise((r) => setTimeout(r, 10));
    expect(result.current.enrollments).toEqual([]);
  });

  it("seeds the default enrollment only for the demo student-1 account", async () => {
    mockLoggedIn({ ...mockUser, id: "student-1" });
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toHaveLength(1));
    expect(result.current.enrollments[0].courseId).toBe("course-1");
  });

  it("starts empty for any other user with nothing persisted, without writing to storage", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    // Hydration for an "empty" result has no distinct observable transition,
    // so just give effects a chance to run before asserting the end state.
    await new Promise((r) => setTimeout(r, 10));
    expect(result.current.enrollments).toEqual([]);
    expect(localStorage.getItem(storageKey(mockUser.id))).toBeNull();
  });

  it("hydrates from a previously persisted enrollment set", async () => {
    localStorage.setItem(
      storageKey(mockUser.id),
      JSON.stringify({ enrollments: [{ courseId: "course-9", enrolledAt: "", lessonProgress: [], quizAttempts: [], submissions: [] }] })
    );
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toHaveLength(1));
    expect(result.current.enrollments[0].courseId).toBe("course-9");
  });

  it("enroll() adds a new enrollment, persists it, and increments the course's student count", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toEqual([]));

    act(() => {
      result.current.enroll("course-5");
    });

    expect(result.current.enrollments).toHaveLength(1);
    expect(result.current.enrollments[0].courseId).toBe("course-5");
    expect(incrementStudentCount).toHaveBeenCalledWith("course-5");
    const persisted = JSON.parse(localStorage.getItem(storageKey(mockUser.id))!);
    expect(persisted.enrollments[0].courseId).toBe("course-5");
  });

  it("enroll() is a no-op if the user is already enrolled in the course", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toEqual([]));

    act(() => result.current.enroll("course-5"));
    act(() => result.current.enroll("course-5"));

    expect(result.current.enrollments).toHaveLength(1);
    expect(incrementStudentCount).toHaveBeenCalledTimes(1);
  });

  it("markLessonComplete() records a lesson once and ignores repeats", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toEqual([]));

    act(() => result.current.enroll("course-5"));
    act(() => result.current.markLessonComplete("course-5", "lesson-a"));
    act(() => result.current.markLessonComplete("course-5", "lesson-a"));

    expect(result.current.enrollments[0].lessonProgress).toEqual([{ lessonId: "lesson-a", completed: true }]);
  });

  it("recordQuizAttempt() appends an attempt with the given score", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toEqual([]));

    act(() => result.current.enroll("course-5"));
    act(() => result.current.recordQuizAttempt("course-5", "quiz-1", 88));

    expect(result.current.enrollments[0].quizAttempts).toHaveLength(1);
    expect(result.current.enrollments[0].quizAttempts[0]).toMatchObject({ quizId: "quiz-1", score: 88 });
  });

  it("submitAssignment() appends a submission with 'submitted' status", async () => {
    const { result } = renderHook(() => useEnrollment(), { wrapper });
    await waitFor(() => expect(result.current.enrollments).toEqual([]));

    act(() => result.current.enroll("course-5"));
    act(() => result.current.submitAssignment("course-5", "assign-1", "homework.pdf"));

    expect(result.current.enrollments[0].submissions).toHaveLength(1);
    expect(result.current.enrollments[0].submissions[0]).toMatchObject({
      assignmentId: "assign-1",
      fileName: "homework.pdf",
      status: "submitted",
    });
  });
});
