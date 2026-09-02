import Reveal from "./Reveal";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const TRACKS = [
  {
    key: "software",
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
    <section id="tracks">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Pick one to start</span>
          <h2>Three tracks, built around the job, not the syllabus.</h2>
          <p>
            Every track trades passive video-watching for weekly projects you
            build, break, and fix — the same way you&apos;ll work on the job.
          </p>
        </Reveal>

        <div className="tracks-grid">
          {TRACKS.map((track, i) => (
            <Reveal key={track.key} as="article" className={`track-card ${track.key}`} delay={i * 110}>
              <div className="track-icon">{track.icon}</div>
              <h3>{track.title}</h3>
              <p className="desc">{track.desc}</p>
              <div className="track-meta">
                {track.meta.map(([num, label]) => (
                  <span key={label}>
                    <b>{num}</b> {label}
                  </span>
                ))}
              </div>
              <div className="chips">
                {track.chips.map((chip) => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ))}
              </div>
              <a className="track-link" href="#">
                Explore the track <ArrowIcon />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
