import Reveal from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "Assess & choose your track",
    desc: "A short diagnostic matches you to Software Development, Networking, or Multimedia based on your goals and current skill level.",
  },
  {
    num: "02",
    title: "Build real projects",
    desc: "Weekly hands-on projects and labs, reviewed by a mentor — not video lectures followed by a multiple-choice quiz.",
  },
  {
    num: "03",
    title: "Get certified & hired",
    desc: "Earn an employer-verifiable certificate and a portfolio of finished work you can point to in an interview.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how"
      style={{
        background: "var(--paper-raised)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">The path</span>
          <h2>From first login to a certificate that opens doors.</h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} className="step" delay={i * 110}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
