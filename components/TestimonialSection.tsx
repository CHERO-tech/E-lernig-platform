import Reveal from "./Reveal";

export default function TestimonialSection() {
  return (
    <section
      id="employers"
      style={{
        background: "var(--paper-raised)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <Reveal className="testimonial">
          <div className="avatar">AU</div>
          <div>
            <blockquote>
              &quot;I finished my TVET diploma with almost no hands-on lab
              time. Forge is the first place I actually configured a real
              router — and my certificate has a link my interviewer could
              click.&quot;
            </blockquote>
            <cite>Aline U. — Networking track, hired as a Junior Network Technician</cite>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
