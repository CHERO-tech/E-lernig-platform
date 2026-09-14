import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const termLines = [
  { text: "$ academy init", color: "#35C47A" },
  { text: "> loading learning paths...", color: "#606C66" },
  { text: "> software-development ✓", color: "#8BE0B0" },
  { text: "> networking ✓", color: "#8BE0B0" },
  { text: "> multimedia-design ✓", color: "#8BE0B0" },
  { text: "> practical-projects ✓", color: "#8BE0B0" },
  { text: "> mentor-reviews ✓", color: "#8BE0B0" },
  { text: "$ status — ready", color: "#35C47A" },
];

const stats = [
  { value: "3", label: "Learning Tracks", mono: true },
  { value: "48+", label: "Hands-on Projects & Labs", mono: true },
  { value: "100%", label: "Verified Certificates", mono: true },
  { value: "1:1", label: "Mentor Project Reviews", mono: true },
];

const tracks = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Software Development",
    tag: "01",
    desc: "Learn programming, web development, mobile development, databases, software testing, Git, and cloud technologies.",
    courses: ["Programming Fundamentals", "Web Development", "Mobile Development", "Database Systems", "Git & GitHub", "Cloud Computing"],
    cta: "Explore Software Dev",
    accent: "#35C47A",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
    label: "Networking",
    tag: "02",
    desc: "Build practical networking and infrastructure skills for the modern connected world.",
    courses: ["Computer Networks", "IP Addressing", "Routing & Switching", "Network Security", "Server Administration", "Network Troubleshooting"],
    cta: "Explore Networking",
    accent: "#35C47A",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M7 21h10M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Multimedia & Design",
    tag: "03",
    desc: "Develop creative and digital production skills across design, video, and animation.",
    courses: ["Graphic Design", "UI/UX Design", "Video Editing", "Animation", "Photography", "Digital Content Creation"],
    cta: "Explore Multimedia",
    accent: "#35C47A",
  },
];

const steps = [
  { n: "01", title: "Choose a learning path", desc: "Pick from Software Development, Networking, or Multimedia & Design." },
  { n: "02", title: "Learn through structured lessons", desc: "Video lessons, readings, demonstrations and resources — all in one place." },
  { n: "03", title: "Complete practical projects", desc: "Apply your skills to real-world projects reviewed by mentors." },
  { n: "04", title: "Take assessments", desc: "Demonstrate your knowledge with structured quizzes and exams." },
  { n: "05", title: "Earn verified certificates", desc: "Receive tamper-proof, verifiable digital certificates." },
  { n: "06", title: "Build your portfolio", desc: "Showcase projects and certificates to employers and institutions." },
];

const projects = [
  { track: "Software Dev", title: "E-Commerce System", level: "Intermediate", skills: ["React", "Node.js", "MongoDB"], tag: "web" },
  { track: "Software Dev", title: "Inventory Manager", level: "Advanced", skills: ["Python", "PostgreSQL", "REST API"], tag: "backend" },
  { track: "Networking", title: "Office Network Design", level: "Intermediate", skills: ["Cisco", "VLAN", "Routing"], tag: "network" },
  { track: "Networking", title: "Network Security Setup", level: "Advanced", skills: ["Firewall", "IDS", "VPN"], tag: "security" },
  { track: "Multimedia", title: "Brand Identity Design", level: "Beginner", skills: ["Figma", "Illustrator", "Typography"], tag: "design" },
  { track: "Multimedia", title: "Advertisement Video", level: "Intermediate", skills: ["Premiere Pro", "After Effects"], tag: "video" },
];

const pricing = [
  {
    name: "Basic",
    price: "Free",
    desc: "Start your learning journey",
    features: ["Learning materials", "Beginner courses", "Community access", "Basic assessments"],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Professional",
    price: "RWF 15,000",
    period: "/month",
    desc: "Practical skills for career-ready learners",
    features: ["All Basic features", "Advanced courses", "Practical projects", "Verified certificates", "Mentor feedback"],
    cta: "Start Professional",
    featured: true,
  },
  {
    name: "Career",
    price: "RWF 25,000",
    period: "/month",
    desc: "Full ecosystem for job placement",
    features: ["All Professional features", "1:1 Mentorship sessions", "Career preparation", "Portfolio review", "Employer introductions", "Priority support"],
    cta: "Start Career",
    featured: false,
  },
];

function useCounter(target: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [target, start]);
  return count;
}

export default function LandingPage() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setVisibleLines((prev) => [...prev, i]);
      i++;
      if (i >= termLines.length) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(7,28,18,0.98)", borderBottom: "1px solid rgba(53,196,122,0.1)" }}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center font-black text-xs" style={{ background: "linear-gradient(135deg, #35C47A 0%, #2aa566 100%)", color: "#071C12", boxShadow: "0 4px 12px rgba(53,196,122,0.25)" }}>T</div>
          <div>
            <p className="text-white font-bold text-sm tracking-tight leading-none">TVET</p>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#35C47A", marginTop: "2px" }}>ACADEMY</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Tracks", href: "#tracks" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Featured", href: "#featured" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="text-sm transition-colors" style={{ color: "#606C66" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#606C66")}
            >{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded text-sm font-medium transition-all" style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" }}>Log In</Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded text-sm font-semibold transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
            style={{ background: "#35C47A", color: "#071C12" }}
          >
            Get started
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16" style={{ background: "#071C12", minHeight: "100vh" }}>
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up">
            <p className="font-mono text-sm mb-8 flex items-center gap-2" style={{ color: "#35C47A" }}>
              <span style={{ color: "#606C66" }}>{">"}</span> DIGITAL SKILLS ACADEMY / RWANDA
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight" style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              Learn Digital Skills.<br />
              Build Real Projects.<br />
              <span style={{ color: "#35C47A" }}>Prove What You Can Do.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#8BE0B0", maxWidth: 520 }}>
              Build practical, industry-relevant skills through structured courses, hands-on projects, assessments, certificates, and career preparation.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/courses"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                style={{ background: "#35C47A", color: "#071C12", boxShadow: "0 4px 12px rgba(53,196,122,0.25)" }}
              >
                Explore Learning Tracks
              </Link>
              <a
                href="#how-it-works"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm border transition-all hover:bg-white/10 hover:border-green-400"
                style={{ borderColor: "rgba(53,196,122,0.3)", color: "#8BE0B0" }}
              >
                See How It Works
              </a>
            </div>
            <p className="font-mono text-xs" style={{ color: "#606C66" }}>
              $ status — practical learning • mentor reviewed • career ready
            </p>
          </div>

          {/* Terminal */}
          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.18)" }}
          >
            <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#35C47A", opacity: 0.6 }} />
              <span className="ml-3 font-mono text-xs" style={{ color: "#606C66" }}>academy — bash</span>
            </div>
            <div className="p-6 font-mono text-sm min-h-64">
              {termLines.map((line, i) => (
                <div
                  key={i}
                  className="mb-3 transition-all duration-300"
                  style={{
                    color: line.color,
                    opacity: visibleLines.includes(i) ? 1 : 0,
                    transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  {line.text}
                </div>
              ))}
              {visibleLines.length === termLines.length && (
                <span className="terminal-cursor" />
              )}
            </div>
            <div className="px-6 pb-6 grid grid-cols-2 gap-3">
              {["14 Courses Ready", "48 Projects Active", "Rwanda Certified", "FCM Notifications"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: "rgba(53,196,122,0.06)", border: "1px solid rgba(53,196,122,0.12)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#35C47A" }} />
                  <span className="font-mono text-xs" style={{ color: "#8BE0B0" }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div ref={statsRef} className="relative z-10" style={{ background: "#0B291A", borderTop: "1px solid rgba(53,196,122,0.1)" }}>
          <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono text-4xl font-bold mb-2" style={{ color: "#35C47A" }}>{s.value}</div>
                <div className="text-sm" style={{ color: "#606C66" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING TRACKS ── */}
      <section id="tracks" className="py-24 px-8" style={{ background: "#F5F7F5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-xl">
            <p className="font-mono text-xs mb-3" style={{ color: "#1F7A4B" }}>$ ls ./tracks</p>
            <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "#102019" }}>Choose Your Track</h2>
            <p style={{ color: "#606C66" }}>Build practical skills through focused technical learning paths designed for the digital economy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.label}
                className="rounded-xl overflow-hidden group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}
              >
                <div className="p-6 pb-5" style={{ background: "#0B291A" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(53,196,122,0.15)", color: "#35C47A" }}>
                      {track.icon}
                    </div>
                    <span className="font-mono text-xs" style={{ color: "rgba(53,196,122,0.4)" }}>{track.tag}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#FFFFFF" }}>{track.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#606C66" }}>{track.desc}</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {track.courses.map((c) => (
                      <span key={c} className="font-mono text-xs px-2 py-1 rounded" style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}>{c}</span>
                    ))}
                  </div>
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 font-semibold text-sm transition-colors"
                    style={{ color: "#1F7A4B" }}
                  >
                    {track.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section id="featured" className="py-24 px-8" style={{ background: "#071C12" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs mb-3" style={{ color: "#35C47A" }}>$ ls ./courses --featured</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight" style={{ color: "#FFFFFF" }}>
                Featured Courses
              </h2>
            </div>
            <Link to="/featured-courses" className="font-semibold text-sm flex items-center gap-2" style={{ color: "#35C47A" }}>
              View all featured <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "web-dev", title: "Web Development", instructor: "Emmanuel Nkurunziza", rating: 4.8, enrolled: 342, level: "Intermediate", track: "Software Dev" },
              { id: "prog-fundamentals", title: "Programming Fundamentals", instructor: "Alice Uwimana", rating: 4.9, enrolled: 521, level: "Beginner", track: "Software Dev" },
              { id: "networking", title: "Computer Networking", instructor: "Patrick Habimana", rating: 4.7, enrolled: 198, level: "Intermediate", track: "Networking" },
              { id: "ui-ux", title: "UI/UX Design", instructor: "Grace Mukamana", rating: 4.9, enrolled: 287, level: "Beginner", track: "Multimedia" },
              { id: "graphic-design", title: "Graphic Design", instructor: "Grace Mukamana", rating: 4.7, enrolled: 203, level: "Beginner", track: "Multimedia" },
              { id: "network-security", title: "Network Security", instructor: "Patrick Habimana", rating: 4.6, enrolled: 112, level: "Advanced", track: "Networking" },
            ].map((course) => (
              <Link key={course.id} to="/featured-courses" className="block group">
                <div
                  className="rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.12)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: "#FFFFFF" }}>{course.title}</h3>
                      <p className="text-xs font-mono mb-3" style={{ color: "#606C66" }}>{course.level} · {course.track}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(53,196,122,0.15)", color: "#35C47A" }}>
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "#8BE0B0" }}>{course.instructor}</p>
                      <p className="text-xs" style={{ color: "#606C66" }}>Instructor</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(53,196,122,0.12)" }}>
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#35C47A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      <span className="text-xs font-mono" style={{ color: "#35C47A" }}>{course.rating}</span>
                      <span className="text-xs" style={{ color: "#606C66" }}>({course.enrolled.toLocaleString()})</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "#35C47A" }}>View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-8" style={{ background: "#071C12" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-xl">
            <p className="font-mono text-xs mb-3" style={{ color: "#35C47A" }}>$ cat ./how-it-works.md</p>
            <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "#FFFFFF" }}>Your Learning Journey</h2>
            <p style={{ color: "#606C66" }}>Six structured stages from first lesson to career portfolio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="p-6 rounded-xl transition-all hover:border-opacity-40"
                style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.12)" }}
              >
                <div className="font-mono text-3xl font-bold mb-4" style={{ color: "rgba(53,196,122,0.25)" }}>{step.n}</div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "#FFFFFF" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#606C66" }}>{step.desc}</p>
                <div className="mt-4 w-8 h-0.5" style={{ background: "#35C47A" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="py-24 px-8" style={{ background: "#F5F7F5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs mb-3" style={{ color: "#1F7A4B" }}>$ ls ./projects --active</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight" style={{ color: "#102019" }}>
                Don't Just Learn.<br />
                <span style={{ color: "#1F7A4B" }}>Build.</span>
              </h2>
            </div>
            <Link to="/projects" className="font-semibold text-sm flex items-center gap-2" style={{ color: "#1F7A4B" }}>
              View all projects <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="rounded-xl p-5 group hover:shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: "#F5F7F5", color: "#606C66", border: "1px solid #E2E8E4" }}>{proj.track}</span>
                  <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: "rgba(53,196,122,0.08)", color: "#1F7A4B", border: "1px solid rgba(53,196,122,0.15)" }}>{proj.level}</span>
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: "#102019" }}>{proj.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.skills.map((s) => (
                    <span key={s} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "#F5F7F5", color: "#606C66" }}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: "#35C47A" }} />
                    <span className="font-mono text-xs" style={{ color: "#606C66" }}>Active</span>
                  </div>
                  <Link to="/projects" className="text-sm font-semibold transition-colors" style={{ color: "#1F7A4B" }}>View Project →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-8" style={{ background: "#0B291A" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs mb-3" style={{ color: "#35C47A" }}>$ cat ./pricing.json</p>
            <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "#FFFFFF" }}>Plans for Every Learner</h2>
            <p style={{ color: "#606C66" }}>Start free, grow at your pace. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className="rounded-xl p-7 transition-all"
                style={{
                  background: plan.featured ? "#35C47A" : "#071C12",
                  border: plan.featured ? "none" : "1px solid rgba(53,196,122,0.15)",
                  transform: plan.featured ? "scale(1.04)" : "scale(1)",
                }}
              >
                <p className="font-mono text-xs mb-3" style={{ color: plan.featured ? "#071C12" : "#35C47A", opacity: plan.featured ? 0.7 : 1 }}>
                  {plan.name.toUpperCase()}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold" style={{ color: plan.featured ? "#071C12" : "#FFFFFF" }}>{plan.price}</span>
                  {plan.period && <span className="text-sm mb-1.5" style={{ color: plan.featured ? "rgba(7,28,18,0.6)" : "#606C66" }}>{plan.period}</span>}
                </div>
                <p className="text-sm mb-6" style={{ color: plan.featured ? "rgba(7,28,18,0.7)" : "#606C66" }}>{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: plan.featured ? "#071C12" : "#8BE0B0" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    background: plan.featured ? "#071C12" : "#35C47A",
                    color: plan.featured ? "#35C47A" : "#071C12",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8" style={{ background: "#071C12" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs mb-6" style={{ color: "#35C47A" }}>$ academy --join</p>
          <h2 className="text-5xl font-bold mb-6 tracking-tight" style={{ color: "#FFFFFF" }}>
            Start building your<br />digital career today.
          </h2>
          <p className="text-lg mb-10" style={{ color: "#606C66" }}>
            Join thousands of Rwandan students already learning, building, and proving their skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "rgba(53,196,122,0.1)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.3)" }}
            >
              Browse Courses
            </Link>
            <Link
              to="/learning-paths"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "rgba(53,196,122,0.1)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.3)" }}
            >
              Learning Paths
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "rgba(53,196,122,0.1)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.3)" }}
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
