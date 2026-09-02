import Reveal from "./Reveal";

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const TYPICAL = [
  "Watch videos, pass a quiz",
  "A certificate anyone can print",
  "Learn alone, no feedback loop",
  "An internship that's real only on paper",
];

const FORGE = [
  "Build and ship a real project every week",
  "A certificate employers can verify online",
  "Weekly feedback from a working mentor",
  "A portfolio of proof you can show, not tell",
];

export default function DifferenceSection() {
  return (
    <section id="difference">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Why Forge</span>
          <h2>Most online courses end at &quot;watched.&quot; Forge ends at &quot;built.&quot;</h2>
        </Reveal>
        <Reveal className="compare">
          <div className="compare-col typical">
            <div className="compare-title">Typical online course</div>
            <ul className="compare-list">
              {TYPICAL.map((item) => (
                <li key={item}>
                  <CrossIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-col forge">
            <div className="compare-title">Forge</div>
            <ul className="compare-list">
              {FORGE.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
