import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Button } from "../components/ui";

interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const questions: Question[] = [
  {
    id: 1,
    category: "Basics",
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correctAnswer: 0,
    difficulty: "beginner",
  },
  {
    id: 2,
    category: "Programming",
    text: "Which of these is a programming language?",
    options: ["HTML", "Python", "CSS", "XML"],
    correctAnswer: 1,
    difficulty: "beginner",
  },
  {
    id: 3,
    category: "Web Dev",
    text: "What is the purpose of CSS?",
    options: ["Store data", "Style and layout web pages", "Handle user requests", "Create databases"],
    correctAnswer: 1,
    difficulty: "beginner",
  },
  {
    id: 4,
    category: "JavaScript",
    text: "What is a variable in JavaScript used for?",
    options: ["Styling elements", "Storing data values", "Creating HTML tags", "Managing databases"],
    correctAnswer: 1,
    difficulty: "beginner",
  },
  {
    id: 5,
    category: "Networking",
    text: "What is an IP address?",
    options: ["Internet Protocol address", "Internal Program address", "Information Processing address", "Inter-device Protocol address"],
    correctAnswer: 0,
    difficulty: "intermediate",
  },
  {
    id: 6,
    category: "Databases",
    text: "What does SQL stand for?",
    options: ["Standard Query Language", "Structured Query Language", "Simple Query Logic", "Sequential Query Language"],
    correctAnswer: 1,
    difficulty: "intermediate",
  },
  {
    id: 7,
    category: "React",
    text: "What is a React component?",
    options: ["A CSS file", "A reusable piece of UI", "A database table", "A network protocol"],
    correctAnswer: 1,
    difficulty: "intermediate",
  },
  {
    id: 8,
    category: "Advanced",
    text: "What is a REST API primarily used for?",
    options: ["Styling websites", "Creating databases", "Enabling communication between applications", "Managing user authentication"],
    correctAnswer: 2,
    difficulty: "advanced",
  },
  {
    id: 9,
    category: "Security",
    text: "What is encryption used for?",
    options: ["Compressing files", "Protecting data from unauthorized access", "Speeding up networks", "Organizing databases"],
    correctAnswer: 1,
    difficulty: "advanced",
  },
  {
    id: 10,
    category: "Architecture",
    text: "What is microservices architecture?",
    options: ["Using very small servers", "Breaking applications into small, independent services", "A type of database", "A network topology"],
    correctAnswer: 1,
    difficulty: "advanced",
  },
];

interface Result {
  level: "Beginner" | "Intermediate" | "Advanced";
  score: number;
  totalQuestions: number;
  recommendedCourses: string[];
}

export default function PlacementExamPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / questions.length) * 100;
    let level: "Beginner" | "Intermediate" | "Advanced";
    let recommendedCourses: string[];

    if (percentage < 50) {
      level = "Beginner";
      recommendedCourses = [
        "Programming Fundamentals",
        "UI/UX Design",
        "Graphic Design",
      ];
    } else if (percentage < 75) {
      level = "Intermediate";
      recommendedCourses = [
        "Web Development",
        "Computer Networking",
        "Database Systems",
      ];
    } else {
      level = "Advanced";
      recommendedCourses = [
        "Network Security",
        "Mobile Development",
        "Video Editing",
      ];
    }

    const examResult: Result = {
      level,
      score: correctCount,
      totalQuestions: questions.length,
      recommendedCourses,
    };

    // Save user's skill level
    localStorage.setItem("userSkillLevel", examResult.level.toLowerCase());

    setResult(examResult);
    setShowResult(true);
  };

  if (showResult && result) {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto px-8 py-12">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "#D1F8E8" }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#35C47A"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              className="text-page-title mb-3"
              style={{ color: "#102019" }}
            >
              Assessment Complete!
            </h1>
            <p style={{ color: "#606C66" }}>
              Your skill level has been determined
            </p>
          </div>

          <Card variant="terminal" title="Your Results" className="mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <p style={{ color: "#606C66" }}>Score</p>
                <p
                  style={{ color: "#1F7A4B" }}
                  className="font-mono font-bold text-lg"
                >
                  {result.score}/{result.totalQuestions}
                </p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <p style={{ color: "#606C66" }}>Percentage</p>
                <p
                  style={{ color: "#1F7A4B" }}
                  className="font-mono font-bold text-lg"
                >
                  {Math.round((result.score / result.totalQuestions) * 100)}%
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ color: "#606C66" }}>Level</p>
                <p
                  style={{ color: "#1F7A4B" }}
                  className="font-mono font-bold text-lg"
                >
                  {result.level}
                </p>
              </div>
            </div>
          </Card>

          <Card variant="terminal" title="Recommended Courses for You" className="mb-8">
            <div className="space-y-2">
              {result.recommendedCourses.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-2 py-2"
                  style={{ color: "#606C66" }}
                >
                  <span style={{ color: "#1F7A4B" }}>✓</span>
                  {course}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate("/courses")}
            >
              View Recommended Courses
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setSelectedAnswers(Array(questions.length).fill(null));
              }}
            >
              Retake Exam
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const q = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1
              className="text-page-title"
              style={{ color: "#102019" }}
            >
              Skill Assessment
            </h1>
            <span className="font-mono text-sm" style={{ color: "#606C66" }}>
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "#E2E8E4" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPercent}%`, background: "#35C47A" }}
            />
          </div>
        </div>

        <Card variant="terminal" padding="lg" className="mb-8">
          <div className="mb-6">
            <p className="text-xs font-mono mb-2" style={{ color: "#606C66" }}>
              {q.category.toUpperCase()}
            </p>
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "#102019" }}
            >
              {q.text}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {q.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center p-4 border rounded-lg cursor-pointer transition-all"
                style={{
                  borderColor:
                    selectedAnswers[currentQuestion] === idx
                      ? "#35C47A"
                      : "#E2E8E4",
                  background:
                    selectedAnswers[currentQuestion] === idx
                      ? "rgba(53,196,122,0.05)"
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="answer"
                  checked={selectedAnswers[currentQuestion] === idx}
                  onChange={() => handleSelectAnswer(idx)}
                  className="w-4 h-4 mr-4"
                />
                <span style={{ color: "#606C66" }}>{option}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={selectedAnswers.some((a) => a === null)}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === null}
              >
                Next →
              </Button>
            )}
          </div>
        </Card>

        <p className="text-center text-xs" style={{ color: "#606C66" }}>
          Answer all questions to continue
        </p>
      </div>
    </SiteLayout>
  );
}
