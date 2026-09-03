"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

function QuizContent({ params }: { params: { courseId: string; quizId: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = {
    title: "React Hooks Fundamentals Quiz",
    course: "Advanced React Patterns",
    totalQuestions: 5,
    timeLimit: 15, // minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of the useState hook?",
        options: [
          "To manage component state",
          "To manage component lifecycle",
          "To handle side effects",
          "To manage context",
        ],
        correct: 0,
        explanation: "useState is used to add state to functional components.",
      },
      {
        id: 2,
        question: "Which hook is used for side effects in functional components?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correct: 1,
        explanation:
          "useEffect is used to perform side effects like data fetching, subscriptions, etc.",
      },
      {
        id: 3,
        question: "Can you call hooks conditionally?",
        options: [
          "Yes, always",
          "No, hooks must be called at top level",
          "Only in useEffect",
          "Only in class components",
        ],
        correct: 1,
        explanation:
          "Hooks must be called at the top level of your component or custom hook.",
      },
      {
        id: 4,
        question: "What does useContext do?",
        options: [
          "Manages component state",
          "Accesses context values without consumer wrapper",
          "Creates new context",
          "Both B and C",
        ],
        correct: 3,
        explanation:
          "useContext allows you to access context values and create new contexts.",
      },
      {
        id: 5,
        question: "How many times should you call a hook in a component?",
        options: [
          "Once per component",
          "As many times as needed, in same order",
          "Once per render",
          "In any order",
        ],
        correct: 1,
        explanation:
          "Hooks should be called in the same order every render for React to properly track state.",
      },
    ],
  };

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
                isPassing ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isPassing ? (
                <CheckCircle size={64} className="text-green-600" />
              ) : (
                <AlertCircle size={64} className="text-red-600" />
              )}
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {score}%
            </h2>
            <p className={`text-2xl font-semibold mb-2 ${isPassing ? "text-green-600" : "text-red-600"}`}>
              {isPassing ? "You Passed! 🎉" : "Keep Learning 📚"}
            </p>
            <p className="text-gray-600 mb-8">
              {isPassing
                ? `Great job! You scored ${score}% and passed the quiz.`
                : `You scored ${score}%. You need ${quiz.passingScore}% to pass.`}
            </p>

            {/* Results Breakdown */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-6">Results Breakdown</h3>
              <div className="space-y-4">
                {quiz.questions.map((q, idx) => {
                  const isCorrect = parseInt(answers[idx]) === q.correct;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        isCorrect
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCorrect
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {isCorrect ? "✓" : "✗"}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{q.question}</p>
                          <p className={`text-sm mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                            {q.options[parseInt(answers[idx])]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700 mt-2">
                              Correct: {q.options[q.correct]}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 mt-2 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              {!isPassing && (
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Retake Quiz
                </button>
              )}
              <button
                onClick={() => router.push(`/courses/${params.courseId}/learn`)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                {isPassing ? "Continue Course" : "Review Material"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {quiz.totalQuestions}</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock size={18} /> 15:00
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-6 pb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{currentQ.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  selectedAnswer === idx.toString()
                    ? "border-green-600 bg-green-50 text-green-900"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === idx.toString()
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === idx.toString() && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {Object.keys(answers).length} / {quiz.totalQuestions} answered
            </div>

            {currentQuestion === quiz.totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < quiz.totalQuestions}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>

        {/* Question Navigator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-lg border border-gray-200 p-6"
        >
          <p className="text-sm font-semibold text-gray-700 mb-4">Question Navigator</p>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-full p-3 rounded-lg font-bold transition-all ${
                  currentQuestion === idx
                    ? "bg-green-600 text-white shadow-lg"
                    : answers[idx]
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Quiz({ params }: { params: { courseId: string; quizId: string } }) {
  return (
    <ProtectedRoute>
      <QuizContent params={params} />
    </ProtectedRoute>
  );
}
