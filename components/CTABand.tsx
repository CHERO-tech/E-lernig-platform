import Link from "next/link";
import Reveal from "./Reveal";

export default function CTABand() {
  return (
    <section className="py-24 px-6 md:px-8 bg-dg">
      <Reveal className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs mb-6 text-pg">$ forge --join</p>
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
          Pick a track.
          <br />
          Start building.
        </h2>
        <p className="text-lg mb-10 text-mg">
          No lecture halls, no waitlist. Take the diagnostic, get matched to a track, and ship
          your first project in week one.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 bg-pg text-dg"
          >
            Get Started Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 bg-pg/10 text-pg border border-pg/30"
          >
            Browse Courses
          </Link>
          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 bg-pg/10 text-pg border border-pg/30"
          >
            Learning Paths
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
