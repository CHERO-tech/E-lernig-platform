import Link from "next/link";
import Reveal from "./Reveal";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TRACKS = [
  {
    key: "software",
    tag: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16" />
      </svg>
    ),
    title: "Software Development",
    desc: "Ship production-grade apps, not toy exercises — build a deployed portfolio using JavaScript, React, and backend fundamentals.",
    meta: [
      ["18", "projects"],
      ["5", "months"],
    ],
    chips: ["JavaScript", "React", "REST APIs", "Git", "SQL"],
  },
  {
    key: "networking",
    tag: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M12 7.2v6M12 13l-5.5 4M12 13l5.5 4" />
      </svg>
    ),
    title: "Networking",
    desc: "Design, configure, and troubleshoot real networks — from subnetting to enterprise routing — on the same gear IT teams run daily.",
    meta: [
      ["14", "lab sims"],
      ["4", "months"],
    ],
    chips: ["Subnetting", "Cisco IOS", "Routing", "DNS/DHCP", "Security"],
  },
  {
    key: "multimedia",
    tag: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="12" rx="1.5" />
        <path d="M10 9.5v4l4-2z" fill="currentColor" stroke="none" />
        <path d="M8 21h8" />
      </svg>
    ),
    title: "Multimedia",
    desc: "Produce video, motion graphics, and sound design good enough for a client brief, using the tools studios run in production.",
    meta: [
      ["16", "briefs"],
      ["4", "months"],
    ],
    chips: ["Premiere", "After Effects", "Color Grading", "Sound Design"],
  },
] as const;

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 px-6 md:px-8 bg-ow">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-14 max-w-xl">
          <p className="font-mono text-xs mb-3 text-pg2">$ ls ./tracks</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dt tracking-tight">
            Choose Your Track
          </h2>
          <p className="text-mg">
            Every track trades passive video-watching for weekly projects you build, break, and
            fix — the same way you&apos;ll work on the job.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRACKS.map((track, i) => (
            <Reveal
              key={track.key}
              as="article"
              delay={i * 110}
              className="rounded-xl overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-xl bg-white border border-border"
            >
              <div className="p-6 pb-5 bg-dg2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pg/[0.15] text-pg [&>svg]:w-5 [&>svg]:h-5">
                    {track.icon}
                  </div>
                  <span className="font-mono text-xs text-pg/40">{track.tag}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{track.title}</h3>
                <p className="text-sm leading-relaxed text-mg">{track.desc}</p>
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-4 font-mono text-xs text-mg">
                  {track.meta.map(([num, label]) => (
                    <span key={label}>
                      <b className="text-dt">{num}</b> {label}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {track.chips.map((chip) => (
                    <span
                      key={chip}
                      className="font-mono text-xs px-2 py-1 rounded bg-ow text-dt border border-border"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 font-semibold text-sm text-pg2 transition-colors"
                >
                  Explore the track
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
