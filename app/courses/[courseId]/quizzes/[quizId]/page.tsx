"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { use, useState, useCallback, useEffect } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { isAnswerCorrect } from "@/lib/courses/gradeQuizQuestion";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function QuizContent({ courseId, quizId }: { courseId: string; quizId: string }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments, recordQuizAttempt } = useEnrollment();
  const { addNotification } = useNotifications();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const course = getCourseById(courseId);
  const quiz = course?.quizzes.find((q) => q.id === quizId);
  const priorAttempt = quiz
    ? enrollments.find((e) => e.courseId === courseId)?.quizAttempts.find((a) => a.quizId === quiz.id)
    : undefined;
  // Exams are single-attempt: once a prior attempt exists, the taking UI
  // (and its timer) never starts again — this session's `submitted` covers
  // the attempt that's currently in progress, not one from a past visit.
  const examLocked = !!quiz?.isExam && !!priorAttempt && !submitted;

  const handleSubmit = useCallback(() => {
    if (!quiz) return;
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (isAnswerCorrect(q, answers[idx])) correctCount++;
    });
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    recordQuizAttempt(courseId, quiz.id, finalScore);
    addNotification({
      type: "system",
      icon: "📝",
      title: "Quiz Submitted",
      message: `You scored ${finalScore}% on ${quiz.title}.`,
    });
    setSubmitted(true);
  }, [quiz, answers, recordQuizAttempt, courseId, addNotification]);

  // Countdown, backed by a start timestamp in sessionStorage so refreshing the
  // page mid-attempt doesn't reset the clock. Auto-submits at zero. Both the
  // tick and the auto-submit run from the interval's own callback (not
  // synchronously in the effect body) so state updates stay tied to that
  // external timer rather than to render.
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!quiz || submitted || examLocked) return;
    const storageKey = `forge_quiz_start_${quiz.id}`;
    let startedAt = Number(sessionStorage.getItem(storageKey));
    if (!startedAt) {
      startedAt = Date.now();
      sessionStorage.setItem(storageKey, String(startedAt));
    }
    const totalSeconds = quiz.timeLimit * 60;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(0, totalSeconds - elapsed);
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz, submitted, examLocked, handleSubmit]);

  useEffect(() => {
    if (quiz && submitted) {
      sessionStorage.removeItem(`forge_quiz_start_${quiz.id}`);
    }
  }, [quiz, submitted]);

  if (!course || !quiz) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Quiz Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  if (examLocked && priorAttempt) {
    const passed = priorAttempt.score >= quiz.passingScore;
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-xl p-12 text-center bg-white border border-border">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? "bg-pg/10" : "bg-err/10"}`}>
            {passed ? <CheckCircle size={64} className="text-pg2" /> : <AlertCircle size={64} className="text-err" />}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-dt">Exam Already Completed</h1>
          <p className="text-mg mb-6">
            This exam allows a single attempt. You scored{" "}
            <span className={`font-bold ${passed ? "text-pg2" : "text-err"}`}>{priorAttempt.score}%</span> on{" "}
            {new Date(priorAttempt.attemptedAt).toLocaleDateString()}.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/courses/${courseId}/quizzes`)}
              className="w-full px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => router.push("/my-grades")}
              className="w-full px-6 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
            >
              View Feedback in My Grades
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex.toString() }));
  };

  const handleTextAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const isPassing = score >= quiz.passingScore;

  if (submitted) {
    return (
      <div className="min-h-screen bg-ow">
        <div className="bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
              <ArrowLeft size={20} className="text-mg" />
            </button>
            <h1 className="text-3xl font-bold text-dt">Quiz Results</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="rounded-xl p-12 text-center bg-white border border-border">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isPassing ? "bg-pg/10" : "bg-err/10"
              }`}
            >
              {isPassing ? (
                <CheckCircle size={64} className="text-pg2" />
              ) : (
                <AlertCircle size={64} className="text-err" />
              )}
            </div>

            <h2 className={`text-4xl font-bold mb-2 ${isPassing ? "text-pg2" : "text-err"}`}>{score}%</h2>
            <p className="text-xl mb-8 text-mg">
              {isPassing ? "🎉 Congratulations! You passed!" : "Keep practicing and try again!"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-lg p-6 bg-ow">
                <p className="text-sm mb-2 text-mg">Questions Answered</p>
                <p className="text-3xl font-bold text-dt">
                  {Object.keys(answers).length}/{quiz.questions.length}
                </p>
              </div>
              <div className="rounded-lg p-6 bg-ow">
                <p className="text-sm mb-2 text-mg">Passing Score</p>
                <p className="text-3xl font-bold text-dt">{quiz.passingScore}%</p>
              </div>
              <div className="rounded-lg p-6 bg-ow">
                <p className="text-sm mb-2 text-mg">Time Limit</p>
                <p className="text-3xl font-bold text-dt">{quiz.timeLimit}m</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push(`/courses/${courseId}/quizzes`)}
                className="w-full px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
              >
                Back to Quizzes
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setScore(0);
                }}
                className="w-full px-6 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
              >
                Retake Quiz
              </button>
            </div>

            <div className="mt-12 text-left border-t border-border pt-8">
              <h3 className="text-xl font-bold mb-6 text-dt">Answer Review</h3>
              <div className="space-y-4">
                {quiz.questions.map((q, idx) => {
                  const type = q.type ?? "multiple-choice";
                  const isCorrect = isAnswerCorrect(q, answers[idx]);
                  const answered = idx in answers && answers[idx].trim() !== "";
                  const yourAnswerText = type === "short-answer" ? answers[idx] : q.options[parseInt(answers[idx] || "-1")];
                  const correctAnswerText =
                    type === "short-answer" ? (q.acceptableAnswers ?? []).join(" / ") : q.options[q.correct];
                  return (
                    <div key={q.id} className="rounded-lg p-4 border border-border">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                            !answered ? "bg-mg/20 text-mg" : isCorrect ? "bg-pg text-dg" : "bg-err text-white"
                          }`}
                        >
                          {!answered ? "—" : isCorrect ? "✓" : "✗"}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-2 text-dt">{q.question}</p>
                          {answered && (
                            <p className="text-sm mb-2 text-mg">
                              Your answer: <span className="font-medium text-dt">{yourAnswerText}</span>
                            </p>
                          )}
                          {answered && !isCorrect && (
                            <p className="text-sm mb-2 text-pg2">
                              Correct answer: <span className="font-medium">{correctAnswerText}</span>
                            </p>
                          )}
                          <p className="text-sm text-mg">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div className="flex-1 mx-4">
            <h1 className="text-2xl font-bold text-dt">{quiz.title}</h1>
            <p className="text-sm text-mg">{course.title}</p>
          </div>
          <div
            className={`flex items-center gap-2 font-medium font-mono ${
              timeRemaining !== null && timeRemaining <= 60 ? "text-err" : "text-mg"
            }`}
          >
            <Clock size={20} />
            <span>{formatTime(timeRemaining ?? quiz.timeLimit * 60)}</span>
          </div>
        </div>

        {quiz.dueDate && new Date(quiz.dueDate).getTime() < new Date().getTime() && (
          <div className="bg-err/5 border-t border-err/20 px-6 py-2">
            <p className="max-w-4xl mx-auto text-sm text-err font-medium flex items-center gap-2">
              <AlertCircle size={16} /> This quiz was due {new Date(quiz.dueDate).toLocaleDateString()} — you can still submit, but it&apos;s overdue.
            </p>
          </div>
        )}

        <div className="bg-ow">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between text-sm mb-2 text-mg">
              <span>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden bg-border">
              <div
                className="h-full bg-pg transition-all"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div key={currentQuestion} className="rounded-xl p-8 mb-8 bg-white border border-border">
          <h2 className="text-2xl font-bold mb-8 text-dt">{currentQ.question}</h2>

          {(currentQ.type ?? "multiple-choice") === "short-answer" ? (
            <div className="mb-8">
              <label htmlFor="short-answer-input" className="sr-only">
                Your answer
              </label>
              <input
                id="short-answer-input"
                type="text"
                placeholder="Type your answer"
                value={selectedAnswer ?? ""}
                onChange={(e) => handleTextAnswerChange(e.target.value)}
                className="w-full p-4 border-2 border-border rounded-lg focus:outline-none focus:border-pg text-dt"
              />
            </div>
          ) : (
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === idx.toString() ? "border-pg bg-pg/[0.06]" : "border-border hover:border-mg"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedAnswer === idx.toString() ? "border-pg bg-pg" : "border-border"
                      }`}
                    />
                    <span className="font-medium text-dt">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl p-6 bg-white border border-border">
          <h3 className="font-bold mb-4 text-dt">Question Overview</h3>
          <div className="grid grid-cols-6 gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                  idx === currentQuestion
                    ? "bg-pg text-dg"
                    : idx in answers
                      ? "bg-pg/10 text-pg2"
                      : "bg-ow text-mg hover:bg-border"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage({ params }: { params: Promise<{ courseId: string; quizId: string }> }) {
  const { courseId, quizId } = use(params);
  return (
    <ProtectedRoute>
      <QuizContent courseId={courseId} quizId={quizId} />
    </ProtectedRoute>
  );
}
