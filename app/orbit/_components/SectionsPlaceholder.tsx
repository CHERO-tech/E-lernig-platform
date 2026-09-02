"use client";

import { Reveal } from "./primitives/Reveal";
import { FEATURED_COURSES } from "../_lib/courses";
import { CATEGORIES } from "../_lib/categories";
import { INSTRUCTORS } from "../_lib/instructors";
import { TESTIMONIALS } from "../_lib/testimonials";
import { PLATFORM_STATS } from "../_lib/stats";
import {
  BookOpen,
  Code,
  Zap,
  Trophy,
  Grid3x3,
  TrendingUp,
  Users,
  MessageSquare,
  ArrowRight,
  Briefcase,
  Layout,
  Brain,
} from "lucide-react";

export function DiscoverSection() {
  return (
    <section id="discover" className="ob-section ob-section--alt">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Start Exploring</span>
          <h2 className="ob-h2">Featured Courses</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
          {FEATURED_COURSES.map((course, i) => (
            <Reveal key={course.id} delay={i * 0.08}>
              <div className="ob-card">
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {course.id === "web-dev" && <Code />}
                  {course.id === "product-strategy" && <Briefcase />}
                  {course.id === "ux-design" && <Layout />}
                  {course.id === "python-data" && <Brain />}
                  {course.id === "content-strategy" && <BookOpen />}
                  {course.id === "leadership" && <Users />}
                </div>
                <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>{course.title}</h3>
                <p style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem", margin: "0.5rem 0" }}>
                  {course.duration} • {course.level}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearnSection() {
  return (
    <section id="learn" className="ob-section">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Learning Structure</span>
          <h2 className="ob-h2">How Learning Works</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <Reveal delay={0.08}>
              <h3 className="ob-h3">Step-by-step Modules</h3>
              <p style={{ color: "var(--ob-text-secondary)", lineHeight: 1.8 }}>
                Each course is structured around learning objectives. Foundation, core concepts, projects, and capstone — proven to stick.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.16}>
              <h3 className="ob-h3">Interactive Lessons</h3>
              <p style={{ color: "var(--ob-text-secondary)", lineHeight: 1.8 }}>
                Quizzes, code exercises, and mini-projects let you learn by doing. Every lesson includes hands-on practice.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PracticeSection() {
  return (
    <section id="practice" className="ob-section ob-section--alt">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Real Projects</span>
          <h2 className="ob-h2">Practice by Building</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            { name: "Code Challenges", icon: Code },
            { name: "Design Briefs", icon: Layout },
            { name: "Mini Projects", icon: Zap },
            { name: "Capstone Work", icon: Trophy },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.name} delay={i * 0.08}>
                <div
                  style={{
                    padding: "2rem",
                    background: "var(--ob-bg-surface)",
                    borderRadius: "var(--ob-radius-md)",
                    border: "1px solid var(--ob-border-subtle)",
                    textAlign: "center",
                  }}
                >
                  <Icon size={32} style={{ color: "var(--ob-accent)", margin: "0 auto 1rem" }} />
                  <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{item.name}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProgressSection() {
  return (
    <section id="progress" className="ob-section">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Track Progress</span>
          <h2 className="ob-h2">Your Learning Journey</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          {["Start", "Lessons", "Skills", "Assessment", "Certificate"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "var(--ob-bg-surface)",
                    border: "2px solid var(--ob-accent)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                    color: "var(--ob-accent)",
                  }}
                >
                  ✓
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ob-text-secondary)" }}>{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section id="categories" className="ob-section ob-section--alt">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Explore Paths</span>
          <h2 className="ob-h2">Learning Categories</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.06}>
              <div className="ob-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {cat.id === "tech" && <Code />}
                  {cat.id === "business" && <TrendingUp />}
                  {cat.id === "design" && <Layout />}
                  {cat.id === "data" && <Brain />}
                  {cat.id === "writing" && <BookOpen />}
                  {cat.id === "personal" && <Users />}
                  {cat.id === "creative" && <Zap />}
                </div>
                <h3 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>{cat.label}</h3>
                <p style={{ color: "var(--ob-text-tertiary)", fontSize: "0.85rem", margin: 0 }}>{cat.courses} courses</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section id="why" className="ob-section">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Platform Impact</span>
          <h2 className="ob-h2">Why Choose Our Platform?</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { icon: Code, title: "Project-Based", desc: "Build real portfolios, not toy projects" },
            { icon: Users, title: "Expert Mentors", desc: "1:1 feedback from working professionals" },
            { icon: Trophy, title: "Verifiable", desc: "Certificates employers actually trust" },
            { icon: TrendingUp, title: "Job Support", desc: "Career board and interview prep included" },
            { icon: Zap, title: "Flexible", desc: "Learn at your own pace, anytime" },
            { icon: Briefcase, title: "Career Growth", desc: "Connected with industry opportunities" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div style={{ textAlign: "center" }}>
                  <Icon size={40} style={{ color: "var(--ob-accent)", margin: "0 auto 1rem" }} />
                  <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>{item.title}</h3>
                  <p style={{ color: "var(--ob-text-secondary)", margin: "0.5rem 0 0 0", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function InstructorsSection() {
  return (
    <section id="instructors" className="ob-section ob-section--alt">
      <div className="ob-container">
        <Reveal>
          <span className="ob-eyebrow">Expert Team</span>
          <h2 className="ob-h2">Learn from Professionals</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {INSTRUCTORS.map((instructor, i) => (
            <Reveal key={instructor.id} delay={i * 0.1}>
              <div className="ob-card">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "var(--ob-accent-soft)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--ob-text-inverse)",
                  }}
                >
                  {instructor.initials}
                </div>
                <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>{instructor.name}</h3>
                <p style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem", margin: "0.25rem 0" }}>{instructor.title}</p>
                <p style={{ color: "var(--ob-text-tertiary)", fontSize: "0.85rem", margin: "0.5rem 0 0 0", lineHeight: 1.6 }}>
                  {instructor.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="ob-section">
      <div className="ob-container" style={{ maxWidth: "700px" }}>
        <Reveal>
          <span className="ob-eyebrow">Learner Stories</span>
          <h2 className="ob-h2">What People Are Saying</h2>
        </Reveal>
        <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 0.1}>
              <div
                style={{
                  padding: "1.5rem",
                  background: "var(--ob-bg-surface)",
                  borderRadius: "var(--ob-radius-md)",
                  border: "1px solid var(--ob-border-subtle)",
                  borderLeft: "4px solid var(--ob-accent)",
                }}
              >
                <MessageSquare size={20} style={{ color: "var(--ob-accent)", marginBottom: "1rem" }} />
                <p style={{ color: "var(--ob-text-secondary)", fontStyle: "italic", margin: "0 0 1rem 0", lineHeight: 1.8 }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "var(--ob-accent-soft)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "var(--ob-text-inverse)",
                    }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p style={{ margin: "0", fontWeight: 600, fontSize: "0.95rem" }}>{testimonial.author}</p>
                    <p style={{ margin: "0", color: "var(--ob-text-tertiary)", fontSize: "0.85rem" }}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="ob-section ob-section--alt" style={{ textAlign: "center" }}>
      <div className="ob-container" style={{ maxWidth: "600px" }}>
        <Reveal>
          <h2 className="ob-h2">Ready to Start Learning?</h2>
          <p style={{ color: "var(--ob-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, margin: "1.5rem 0 2rem 0" }}>
            Join thousands of professionals building real skills and launching their careers.
          </p>
          <button
            className="ob-btn ob-btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Get Started <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export function OrbitFooter() {
  return (
    <footer className="ob-section" style={{ background: "var(--ob-bg-surface)", borderTop: "1px solid var(--ob-border-subtle)" }}>
      <div className="ob-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <h4 style={{ margin: "0 0 1rem 0", color: "var(--ob-accent)" }}>Learning Platform</h4>
            <p style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem", margin: 0 }}>
              Premium education for modern professionals.
            </p>
          </div>
          <div>
            <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.95rem" }}>Explore</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#discover" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  Courses
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#categories" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  Categories
                </a>
              </li>
              <li>
                <a href="#instructors" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  Instructors
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.95rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  About
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "var(--ob-text-secondary)", fontSize: "0.9rem" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--ob-border-subtle)", paddingTop: "2rem", textAlign: "center", color: "var(--ob-text-tertiary)", fontSize: "0.85rem" }}>
          <p style={{ margin: 0 }}>© 2026 Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
