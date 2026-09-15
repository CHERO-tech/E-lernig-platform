"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const termLines = [
  { text: "$ forge init", tone: "text-pg" },
  { text: "> loading learning paths...", tone: "text-mg" },
  { text: "> software-development ✓", tone: "text-brass" },
  { text: "> networking ✓", tone: "text-brass" },
  { text: "> multimedia-design ✓", tone: "text-brass" },
  { text: "> practical-projects ✓", tone: "text-brass" },
  { text: "> mentor-reviews ✓", tone: "text-brass" },
  { text: "$ status — ready", tone: "text-pg" },
];

const readyBadges = ["14 Courses Ready", "48 Projects Active", "Mentor Reviewed", "Certificates Verified"];

export default function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setVisibleLines((prev) => [...prev, i]);
      i++;
      if (i >= termLines.length) clearInterval(timer);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-dg pt-28 pb-16 px-6 md:px-8">
      <div className="grid-bg absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="fade-up">
          <p className="font-mono text-sm mb-6 flex items-center gap-2 text-pg">
            <span className="text-mg">{">"}</span> SKILLS YOU CAN PUT TO WORK
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
            Learn Digital Skills.
            <br />
            Build Real Projects.
            <br />
            <span className="text-pg">Prove What You Can Do.</span>
          </h1>
          <p className="text-lg leading-relaxed mb-8 text-brass max-w-lg">
            Forge replaces lecture-and-quiz courses with hands-on projects in Software
            Development, Networking, and Multimedia — reviewed by mentors and certified for
            hiring.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/courses"
              className="px-7 py-3.5 rounded-lg font-semibold text-sm bg-pg text-dg transition-all hover:shadow-lg hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
            >
              Explore Learning Tracks
            </Link>
            <a
              href="#how"
              className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-pg/30 text-brass transition-all hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>
          <p className="font-mono text-xs text-mg">
            $ status — practical learning • mentor reviewed • career ready
          </p>
        </div>

        {/* Terminal */}
        <div className="rounded-xl overflow-hidden shadow-2xl bg-dg2 border border-pg/[0.18]">
          <div className="flex items-center gap-2 px-5 py-3.5 bg-dg border-b border-pg/10">
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full bg-pg/60" />
            <span className="ml-3 font-mono text-xs text-mg">forge — bash</span>
          </div>
          <div className="p-6 font-mono text-sm min-h-64">
            {termLines.map((line, i) => (
              <div
                key={i}
                className={`mb-3 transition-all duration-300 ${line.tone}`}
                style={{
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {line.text}
              </div>
            ))}
            {visibleLines.length === termLines.length && <span className="terminal-cursor" />}
          </div>
          <div className="px-6 pb-6 grid grid-cols-2 gap-3">
            {readyBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-3 py-2 rounded bg-pg/[0.06] border border-pg/[0.12]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pg" />
                <span className="font-mono text-xs text-brass">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
