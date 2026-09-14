"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useNotifications } from "@/lib/notifications/useNotifications";

function QuizContent({ params }: { params: { courseId: string; quizId: string } }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { recordQuizAttempt } = useEnrollment();
  const { addNotification } = useNotifications();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const course = getCourseById(params.courseId);
  const quiz = course?.quizzes.find(q => q.id === params.quizId);

  if (!course || !quiz) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
            Back
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex.toString(),
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (parseInt(answers[idx]) === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    recordQuizAttempt(params.courseId, params.quizId, finalScore);
    addNotification({
      type: 'system',
      icon: '📝',
      title: 'Quiz Submitted',
      message: `You scored ${finalScore}% on ${quiz.title}.`,
    });
    setSubmitted(true);
  };

  const isPassing = score >= quiz.passingScore;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isPassing ? "bg-forge-soft" : "bg-red-100"
              }`}
            >
              {isPassing ? (
                <CheckCircle size={64} className="text-ember-strong" />
              ) : (
                <AlertCircle size={64} className="text-red-600" />
              )}
            </div>

            <h2 className={`text-4xl font-bold mb-2 ${isPassing ? "text-ember-strong" : "text-red-600"}`}>
              {score}%
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {isPassing ? "🎉 Congratulations! You passed!" : "Keep practicing and try again!"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm mb-2">Questions Answered</p>
                <p className="text-3xl font-bold text-gray-900">{Object.keys(answers).length}/{quiz.questions.length}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm mb-2">Passing Score</p>
                <p className="text-3xl font-bold text-gray-900">{quiz.passingScore}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm mb-2">Time Limit</p>
                <p className="text-3xl font-bold text-gray-900">{quiz.timeLimit}m</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push(`/courses/${params.courseId}/quizzes`)}
                className="w-full px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
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
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Retake Quiz
              </button>
            </div>

            {/* Answer Review */}
            <div className="mt-12 text-left border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Answer Review</h3>
              <div className="space-y-4">
                {quiz.questions.map((q, idx) => {
                  const isCorrect = parseInt(answers[idx] || "-1") === q.correct;
                  const answered = idx in answers;
                  return (
                    <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold ${
                          !answered ? "bg-gray-300" : isCorrect ? "bg-ember-strong" : "bg-red-600"
                        }`}>
                          {!answered ? "—" : isCorrect ? "✓" : "✗"}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                          {answered && (
                            <p className="text-sm text-gray-600 mb-2">
                              Your answer: <span className="font-medium">{q.options[parseInt(answers[idx])]}</span>
                            </p>
                          )}
                          {answered && !isCorrect && (
                            <p className="text-sm text-ember-strong mb-2">
                              Correct answer: <span className="font-medium">{q.options[q.correct]}</span>
                            </p>
                          )}
                          <p className="text-sm text-gray-600">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 mx-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600 text-sm">{course.title}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={20} />
            <span className="font-medium">{quiz.timeLimit}m</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-ember-strong transition-all"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{currentQ.question}</h2>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === idx.toString()
                    ? "border-ember-strong bg-forge-soft"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedAnswer === idx.toString()
                      ? "border-ember-strong bg-ember-strong"
                      : "border-gray-300"
                  }`} />
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>

        {/* Question Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Question Overview</h3>
          <div className="grid grid-cols-6 gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                  idx === currentQuestion
                    ? "bg-ember-strong text-white"
                    : idx in answers
                      ? "bg-forge-soft text-ember"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

export default function QuizPage({ params }: { params: { courseId: string; quizId: string } }) {
  return (
    <ProtectedRoute>
      <QuizContent params={params} />
    </ProtectedRoute>
  );
}
