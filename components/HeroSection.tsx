import NodesBg from "./NodesBg";
import Terminal from "./Terminal";

export default function HeroSection() {
  return (
    <section className="hero">
      <NodesBg />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Practical skills, real proof</span>
          <h1>
            Learn skills employers can <em>actually verify</em>.
          </h1>
          <p className="hero-sub">
            Forge replaces lecture-and-quiz courses with hands-on projects in
            Software Development, Networking, and Multimedia — reviewed by
            mentors and certified for hiring, not just for show.
          </p>
          <div className="hero-actions">
            <a href="#tracks" className="btn btn-primary">
              Choose your track
            </a>
            <a href="#how" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          <div className="hero-note">
            $ status — cohorts open · self-paced with weekly mentor review
          </div>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
