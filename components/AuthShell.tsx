import Link from "next/link";
import BrandMark from "./BrandMark";

const missionLines = [
  { text: "$ whoami", tone: "text-pg" },
  { text: "> forge-learner", tone: "text-brass" },
  { text: "$ cat mission.txt", tone: "text-pg" },
  { text: "> Learn. Build. Prove Your Skills.", tone: "text-white" },
  { text: "$ ls ./achievements", tone: "text-pg" },
  { text: "> certificates/ projects/ portfolio/", tone: "text-brass" },
];

const badges = ["48+ Projects", "100% Certified", "Career Ready"];

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-dg">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 text-white font-mono font-semibold">
            <BrandMark />
            FORGE
          </Link>
        </div>
        <div className="relative z-10">
          <div className="rounded-xl overflow-hidden bg-dg2 border border-pg/[0.15]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-pg/10">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-pg/60" />
              <span className="ml-2 font-mono text-xs text-mg">welcome.sh</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-3">
              {missionLines.map((line, i) => (
                <div key={i} className={line.tone}>
                  {line.text}
                </div>
              ))}
              <span className="terminal-cursor" />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">
              Skills you can
              <br />
              put to work.
            </h2>
            <p className="text-sm text-mg">
              Hands-on projects in Software Development, Networking, and Multimedia — reviewed by
              mentors, certified for hiring.
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-6 flex-wrap">
          {badges.map((b) => (
            <div key={b} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pg" />
              <span className="font-mono text-xs text-mg">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
