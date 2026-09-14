import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Input, Textarea } from "../components/ui";

interface ProjectDetail {
  description: string;
  requirements: string[];
  skills: string[];
  githubUrl: string;
  files: string[];
}

const projectDetails: Record<string, ProjectDetail> = {
  "Portfolio Website": {
    description: "A personal portfolio site built to showcase coursework, with a projects gallery, an about page, and a contact form.",
    requirements: ["Responsive layout for mobile and desktop", "Projects gallery with filtering", "Contact form with validation", "Deployed to a live URL"],
    skills: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/amahoro-jean/portfolio-website",
    files: ["README.md", "screenshot-home.png", "screenshot-projects.png"],
  },
  "Office Network": {
    description: "A network design proposal for a small office, covering VLAN segmentation, IP addressing, and a basic security policy.",
    requirements: ["VLAN segmentation plan", "IP addressing scheme", "Network diagram", "Basic firewall rules"],
    skills: ["Cisco", "VLAN", "Networking"],
    githubUrl: "https://github.com/ineza-grace/office-network-design",
    files: ["network-diagram.pdf", "vlan-plan.xlsx", "proposal.docx"],
  },
  "Brand Identity": {
    description: "A complete brand identity package for a fictional client, including logo, color system, typography, and a style guide.",
    requirements: ["Logo in multiple formats", "Color palette with hex codes", "Typography system", "Style guide document"],
    skills: ["Figma"],
    githubUrl: "https://github.com/kagabo-eric/brand-identity",
    files: ["style-guide.pdf", "logo-variants.zip", "moodboard.png"],
  },
  "E-Commerce UI": {
    description: "A UI design and working prototype for an e-commerce storefront, covering the product listing, cart, and checkout flow.",
    requirements: ["Product listing with filters", "Cart with quantity controls", "Checkout flow", "Mobile-responsive design"],
    skills: ["React", "Figma"],
    githubUrl: "https://github.com/munyakazi-lisa/ecommerce-ui",
    files: ["prototype-link.txt", "component-library.fig", "checkout-flow.png"],
  },
};

const fallbackDetail: ProjectDetail = {
  description: "A course project submitted for review.",
  requirements: ["Meets the assignment brief", "Follows project conventions", "Includes documentation"],
  skills: [],
  githubUrl: "",
  files: [],
};

type Decision = "approved" | "changes-requested";

export default function ProjectReviewPage() {
  const [params] = useSearchParams();
  const student = params.get("student") ?? "Student";
  const project = params.get("project") ?? "Project";
  const track = params.get("track") ?? "";
  const submitted = params.get("submitted") ?? "";
  const userName = params.get("userName") ?? "Emmanuel Nkurunziza";
  const userInitials = params.get("userInitials") ?? "EN";

  const detail = projectDetails[project] ?? fallbackDetail;

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [decision, setDecision] = useState<Decision | null>(null);

  const handleApprove = (e: FormEvent) => {
    e.preventDefault();
    if (!score.trim() || !feedback.trim()) return;
    setDecision("approved");
  };

  const handleRequestChanges = () => {
    if (!feedback.trim()) return;
    setDecision("changes-requested");
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-6xl mx-auto px-8 py-3">
          <Link to="/trainer" className="text-sm font-medium" style={{ color: "#35C47A" }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <p className="font-mono text-xs" style={{ color: "#35C47A" }}>$ project review --student="{student}"</p>
            {decision && (
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-full font-bold"
                style={{
                  background: decision === "approved" ? "rgba(53,196,122,0.1)" : "rgba(193,127,51,0.08)",
                  color: decision === "approved" ? "#35C47A" : "#C17F33",
                  border: `1px solid ${decision === "approved" ? "rgba(53,196,122,0.3)" : "rgba(193,127,51,0.25)"}`,
                }}
              >
                {decision === "approved" ? "APPROVED" : "CHANGES REQUESTED"}
              </span>
            )}
          </div>
          <h1 className="text-page-title mb-2" style={{ color: "#FFFFFF" }}>{project}</h1>
          <p className="font-mono text-sm" style={{ color: "#606C66" }}>
            {student}{track && ` · ${track}`}{submitted && ` · Submitted ${submitted}`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#102019" }}>Submission Summary</h3>
            <p className="text-sm mb-4" style={{ color: "#606C66" }}>{detail.description}</p>
            <div className="rounded-lg p-4" style={{ background: "#F5F7F5", border: "1px solid #E2E8E4" }}>
              <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>Requirements:</p>
              <ul className="space-y-1">
                {detail.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 font-mono text-xs" style={{ color: "#606C66" }}>
                    <span style={{ color: "#1F7A4B" }}>›</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {detail.skills.length > 0 && (
            <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>Skills Demonstrated</h3>
              <div className="flex flex-wrap gap-2">
                {detail.skills.map((s) => (
                  <span key={s} className="font-mono text-xs px-3 py-1.5 rounded" style={{ background: "rgba(53,196,122,0.08)", color: "#1F7A4B", border: "1px solid rgba(53,196,122,0.2)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>Submitted Files</h3>
            <div className="space-y-2 mb-5">
              {detail.files.map((f) => (
                <div key={f} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "#F5F7F5", border: "1px solid #E2E8E4" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
                  <span className="flex-1 font-mono text-xs" style={{ color: "#102019" }}>{f}</span>
                </div>
              ))}
            </div>
            {detail.githubUrl && (
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: "#102019" }}>GitHub Repository</p>
                <a
                  href={detail.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs break-all"
                  style={{ color: "#1F7A4B" }}
                >
                  {detail.githubUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <div className="px-5 py-4" style={{ background: "#0B291A", borderBottom: "1px solid rgba(53,196,122,0.12)" }}>
              <p className="font-mono text-xs mb-0.5" style={{ color: "#35C47A" }}>$ git review --submit</p>
              <h3 className="font-semibold text-white">Your Review</h3>
            </div>
            <div className="p-5">
              {decision ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "#35C47A", color: "#071C12" }}>
                      {userInitials}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#102019" }}>{userName}</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>Just now</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#606C66" }}>"{feedback}"</p>
                  {decision === "approved" && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{score}/100</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8E4" }}>
                        <div className="h-full rounded-full" style={{ width: `${score}%`, background: "#35C47A" }} />
                      </div>
                    </div>
                  )}
                  <Button variant="outline" fullWidth onClick={() => setDecision(null)}>Edit Review</Button>
                </div>
              ) : (
                <form onSubmit={handleApprove}>
                  <Input
                    label="Score (%)"
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    hint="Required to approve"
                  />
                  <Textarea
                    label="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What did they do well? What needs work?"
                    required
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <Button type="submit" variant="primary" fullWidth>Approve</Button>
                    <Button type="button" variant="outline" fullWidth onClick={handleRequestChanges}>Request Changes</Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#102019" }}>Submission Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs" style={{ color: "#606C66" }}>Student</p>
                <p className="font-semibold text-sm mt-1" style={{ color: "#102019" }}>{student}</p>
              </div>
              {track && (
                <div>
                  <p className="text-xs" style={{ color: "#606C66" }}>Track</p>
                  <p className="font-semibold text-sm mt-1" style={{ color: "#102019" }}>{track}</p>
                </div>
              )}
              {submitted && (
                <div>
                  <p className="text-xs" style={{ color: "#606C66" }}>Submitted</p>
                  <p className="font-semibold text-sm mt-1" style={{ color: "#102019" }}>{submitted}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
