"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useNotifications } from "@/lib/notifications/useNotifications";

function QuizContent({ courseId, quizId }: { courseId: string; quizId: string }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { recordQuizAttempt } = useEnrollment();
  const { addNotification } = useNotifications();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const course = getCourseById(courseId);
  const quiz = course?.quizzes.find((q) => q.id === quizId);

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

  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex.toString() }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (parseInt(answers[idx]) === q.correct) correctCount++;
    });
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    recordQuizAttempt(courseId, quizId, finalScore);
    addNotification({
      type: "system",
      icon: "📝",
      title: "Quiz Submitted",
      message: `You scored ${finalScore}% on ${quiz.title}.`,
    });
    setSubmitted(true);
  };

  const isPassing = score >= quiz.passingScore;

  if (submitted) {
    return (
      <div className="min-h-screen bg-ow">
        <div className="bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow">
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
                  const isCorrect = parseInt(answers[idx] || "-1") === q.correct;
                  const answered = idx in answers;
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
                              Your answer:{" "}
                              <span className="font-medium text-dt">{q.options[parseInt(answers[idx])]}</span>
                            </p>
                          )}
                          {answered && !isCorrect && (
                            <p className="text-sm mb-2 text-pg2">
                              Correct answer: <span className="font-medium">{q.options[q.correct]}</span>
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
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div className="flex-1 mx-4">
            <h1 className="text-2xl font-bold text-dt">{quiz.title}</h1>
            <p className="text-sm text-mg">{course.title}</p>
          </div>
          <div className="flex items-center gap-2 text-mg">
            <Clock size={20} />
            <span className="font-medium font-mono">{quiz.timeLimit}m</span>
          </div>
        </div>

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
