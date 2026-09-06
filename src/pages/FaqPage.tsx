import { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card } from "../components/ui";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "Getting Started",
    question: "How do I create an account?",
    answer: "Visit the sign-up page, select your role (Student, Trainer, etc.), and fill in your details. Verify your email to activate your account.",
  },
  {
    category: "Getting Started",
    question: "What learning tracks are available?",
    answer: "We offer three main tracks: Software Development, Networking, and Multimedia & Design. Each track contains multiple courses.",
  },
  {
    category: "Courses",
    question: "Can I take multiple courses at once?",
    answer: "Yes! You can enroll in as many courses as you want. We recommend focusing on one or two at a time for better learning outcomes.",
  },
  {
    category: "Courses",
    question: "Are there free courses available?",
    answer: "Yes, we offer free beginner courses. Professional and Career tiers unlock advanced content and mentorship.",
  },
  {
    category: "Projects",
    question: "How long do I have to submit a project?",
    answer: "Project deadlines vary by course. You can see the deadline on each project page. Extensions may be available upon request.",
  },
  {
    category: "Certificates",
    question: "Are certificates verified?",
    answer: "Yes, all certificates are tamper-proof and verifiable. Employers and institutions can verify your achievements on our platform.",
  },
];

export default function FaqPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <SiteLayout>
      <div
        style={{
          background: "#071C12",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <div className="max-w-3xl mx-auto px-8 py-12">
          <Link
            to="/help"
            className="inline-block mb-4 text-sm transition-colors"
            style={{ color: "#35C47A" }}
          >
            ← Back to Help Center
          </Link>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#718078" }}>
            Find answers to common questions about TVET Digital Academy
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#102019" }}>
              {category}
            </h2>
            <div className="space-y-3">
              {faqs
                .filter((f) => f.category === category)
                .map((faq, idx) => (
                  <Card
                    key={idx}
                    padding="md"
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() =>
                      setExpandedId(expandedId === idx ? null : idx)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="font-semibold text-sm flex-1"
                        style={{ color: "#102019" }}
                      >
                        {faq.question}
                      </p>
                      <span
                        className="ml-4 transition-transform"
                        style={{
                          color: "#35C47A",
                          transform:
                            expandedId === idx ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </div>
                    {expandedId === idx && (
                      <p
                        className="text-sm mt-3 pt-3"
                        style={{
                          color: "#718078",
                          borderTop: "1px solid #E2E8E4",
                        }}
                      >
                        {faq.answer}
                      </p>
                    )}
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
