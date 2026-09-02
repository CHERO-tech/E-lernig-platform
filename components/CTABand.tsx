import Reveal from "./Reveal";

export default function CTABand() {
  return (
    <section>
      <div className="wrap">
        <Reveal className="cta-band">
          <span className="eyebrow">Start this week</span>
          <h2>Pick a track. Start building.</h2>
          <p>
            No lecture halls, no waitlist. Take the diagnostic, get matched to
            a track, and ship your first project in week one.
          </p>
          <a href="#tracks" className="btn btn-primary">
            Choose your track
          </a>
        </Reveal>
      </div>
    </section>
  );
}
