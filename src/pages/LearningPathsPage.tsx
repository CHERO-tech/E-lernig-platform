import type { ReactElement } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Button, Badge } from "../components/ui";
import { navItems as studentNavItems } from "./StudentDashboard";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  courses: number;
  duration: string;
  level: string;
  skills: string[];
  progress: number;
}

const learningPaths: LearningPath[] = [
  {
    id: "software-dev",
    title: "Software Development",
    description: "Master programming, web development, mobile apps, and modern software engineering practices.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    courses: 6,
    duration: "12-16 weeks",
    level: "Beginner to Advanced",
    skills: ["Python", "JavaScript", "React", "Databases", "Git", "APIs"],
    progress: 45,
  },
  {
    id: "networking",
    title: "Networking & Infrastructure",
    description: "Build practical networking skills, understand infrastructure design, and master network security.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.8">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="16" y="2" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <line x1="8" y1="5" x2="9" y2="5" /><line x1="15" y1="5" x2="16" y2="5" />
        <line x1="5" y1="8" x2="5" y2="9" /><line x1="19" y1="8" x2="19" y2="9" />
        <line x1="12" y1="15" x2="5" y2="16" /><line x1="12" y1="15" x2="19" y2="16" />
      </svg>
    ),
    courses: 5,
    duration: "10-14 weeks",
    level: "Intermediate to Advanced",
    skills: ["Networking", "Security", "Cisco", "Linux", "Cloud Infrastructure"],
    progress: 30,
  },
  {
    id: "multimedia",
    title: "Multimedia & Design",
    description: "Develop creative and digital production skills in graphic design, UI/UX, video editing, and animation.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M7 21h10M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    courses: 6,
    duration: "8-12 weeks",
    level: "Beginner to Intermediate",
    skills: ["Figma", "Adobe XD", "Photoshop", "Video Editing", "After Effects"],
    progress: 60,
  },
];

function LearningPathsGrid({ coursesHref }: { coursesHref: string }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              padding="lg"
              title={
                <div className="flex items-center gap-3">
                  {path.icon}
                  <span>{path.title}</span>
                </div>
              }
              className="flex flex-col"
            >
              <p className="text-sm mb-4" style={{ color: "#606C66" }}>
                {path.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b" style={{ borderColor: "#E2E8E4" }}>
                <div>
                  <p className="text-xs" style={{ color: "#606C66" }}>Courses</p>
                  <p className="font-bold text-lg" style={{ color: "#1F7A4B" }}>
                    {path.courses}
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#606C66" }}>Duration</p>
                  <p className="font-semibold text-sm" style={{ color: "#102019" }}>
                    {path.duration}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: "#606C66" }}>
                  Level
                </p>
                <p style={{ color: "#102019" }}>{path.level}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: "#606C66" }}>
                  Key Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {path.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} tone="brand" pill>
                      {skill}
                    </Badge>
                  ))}
                  {path.skills.length > 3 && (
                    <Badge tone="neutral" pill>
                      +{path.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: "#606C66" }}>
                    Your Progress
                  </p>
                  <p
                    className="font-mono font-semibold text-xs"
                    style={{ color: "#1F7A4B" }}
                  >
                    {path.progress}%
                  </p>
                </div>
                <div className="h-2 rounded-full" style={{ background: "#E2E8E4" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${path.progress}%`, background: "#35C47A" }}
                  />
                </div>
              </div>

              <Link to={coursesHref} className="block mt-auto">
                <Button variant="primary" fullWidth>
                  Explore Path
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Info section */}
        <Card padding="lg" title="How Learning Paths Work">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
              >
                1
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "#102019" }}>
                  Choose Your Path
                </p>
                <p style={{ color: "#606C66" }}>
                  Select a learning path that matches your career goals
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
              >
                2
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "#102019" }}>
                  Follow Structured Courses
                </p>
                <p style={{ color: "#606C66" }}>
                  Complete courses in the recommended order to build a complete skillset
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
              >
                3
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "#102019" }}>
                  Build Projects
                </p>
                <p style={{ color: "#606C66" }}>
                  Apply your skills through practical, industry-relevant projects
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
              >
                4
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "#102019" }}>
                  Earn Certification
                </p>
                <p style={{ color: "#606C66" }}>
                  Complete your path and earn a verified certificate
                </p>
              </div>
            </div>
          </div>
        </Card>
    </>
  );
}

export default function LearningPathsPage() {
  const [params] = useSearchParams();
  const role = params.get("role");
  const userName = params.get("userName") ?? "Amahoro Jean de Dieu";
  const userInitials = params.get("userInitials") ?? "AJ";

  if (role === "student") {
    return (
      <DashboardLayout
        role="student"
        roleLabel="Student"
        navItems={studentNavItems}
        activeKey="paths"
        onNav={(key) => {
          if (key === "dashboard") window.location.href = "/student";
          if (key === "current-course") window.location.href = "/current-course";
          if (key === "courses") window.location.href = "/courses?role=student&userName=Amahoro+Jean+de+Dieu&userInitials=AJ";
          if (key === "projects") window.location.href = "/projects?role=student";
          if (key === "certificates") window.location.href = "/certificate";
          if (key === "portfolio") window.location.href = "/portfolio/1";
          if (key === "notifications") window.location.href = "/notifications";
        }}
        userName={userName}
        userInitials={userInitials}
      >
        <div className="p-8">
          <div className="mb-8">
            <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./paths --all</p>
            <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Learning Paths</h1>
            <p style={{ color: "#606C66" }}>Choose a structured learning path and master a complete skillset</p>
          </div>
          <LearningPathsGrid coursesHref={`/courses?role=student&userName=${encodeURIComponent(userName)}&userInitials=${encodeURIComponent(userInitials)}`} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Header */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>
              $ ls ./paths --all
            </p>
            <h1
              className="text-4xl font-bold mb-3 tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              Learning Paths
            </h1>
            <p style={{ color: "#606C66" }}>
              Choose a structured learning path and master a complete skillset
            </p>
          </div>
        </div>
      </div>

      {/* Paths Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <LearningPathsGrid coursesHref="/courses" />
      </div>
    </SiteLayout>
  );
}
