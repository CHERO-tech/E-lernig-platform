import { Link } from "react-router-dom";
import { Card, StatCard, Badge, Button } from "../components/ui";
import Footer from "../components/Footer";

interface Project {
  title: string;
  description: string;
  skills: string[];
  level: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack web application with React and Node.js",
    skills: ["React", "Node.js", "MongoDB", "REST API"],
    level: "Advanced",
  },
  {
    title: "Portfolio Website",
    description: "Responsive personal portfolio showcasing projects",
    skills: ["React", "Tailwind CSS", "Figma", "UI/UX"],
    level: "Intermediate",
  },
];

const certificates: Certificate[] = [
  { title: "Web Development", issuer: "TVET Digital Academy", date: "Sep 2026" },
  { title: "Programming Fundamentals", issuer: "TVET Digital Academy", date: "Aug 2026" },
];

export default function StudentPortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F7F5" }}>
      {/* Simple Header */}
      <header className="py-12 px-8" style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-sm text-pg hover:text-white mb-6 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                Amahoro Jean de Dieu
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: "#718078" }}>INES-Ruhengeri</span>
                <span className="text-sm" style={{ color: "#718078" }}>•</span>
                <span className="text-sm" style={{ color: "#35C47A" }}>Software Development Track</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Download Portfolio
              </Button>
              <Button variant="primary" size="sm">
                Share Portfolio
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Projects Completed" value="7" />
          <StatCard label="Certificates Earned" value="2" />
          <StatCard label="Skills Mastered" value="12" />
          <StatCard label="Learning Streak" value="45 days" />
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#102019" }}>
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Node.js",
              "PostgreSQL",
              "REST API",
              "Git",
              "Responsive Design",
              "Problem Solving",
              "Team Collaboration",
              "Web Development",
              "UI/UX Design",
              "Agile",
            ].map((skill) => (
              <Badge key={skill} tone="brand" mono>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#102019" }}>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.title} title={project.title}>
                <p className="text-sm mb-4" style={{ color: "#718078" }}>
                  {project.description}
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.skills.map((skill) => (
                      <Badge key={skill} tone="info" mono>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Badge tone="success">{project.level}</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  View Project →
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#102019" }}>
            Certificates & Achievements
          </h2>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <Card key={cert.title} padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#102019" }}>
                      {cert.title}
                    </p>
                    <p className="text-xs" style={{ color: "#718078" }}>
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Certificate →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
