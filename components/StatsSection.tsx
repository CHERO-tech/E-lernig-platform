import Reveal from "./Reveal";
import CountUp from "./CountUp";

const STATS = [
  { num: "3", label: "practical tracks" },
  { num: "48", label: "hands-on projects & labs" },
  { num: "100%", label: "certificates verified online" },
  { num: "1:1", label: "mentor project reviews" },
];

export default function StatsSection() {
  return (
    <div className="stats">
      <div className="wrap">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <CountUp value={stat.num} />
            <div className="stat-label">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
