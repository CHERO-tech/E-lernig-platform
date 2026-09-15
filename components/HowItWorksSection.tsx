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
    <section id="how" className="py-24 px-6 md:px-8 bg-dg">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-14 max-w-xl">
          <p className="font-mono text-xs mb-3 text-pg">$ cat ./how-it-works.md</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white tracking-tight">
            From first login to a certificate that opens doors.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              delay={i * 110}
              className="p-6 rounded-xl bg-dg2 border border-pg/[0.12] transition-all"
            >
              <div className="font-mono text-3xl font-bold mb-4 text-pg/25">{step.num}</div>
              <h3 className="font-semibold text-lg mb-3 text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-mg">{step.desc}</p>
              <div className="mt-4 w-8 h-0.5 bg-pg" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
