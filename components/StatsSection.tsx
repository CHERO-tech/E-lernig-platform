const stats = [
  { value: "3", label: "Learning Tracks" },
  { value: "48+", label: "Hands-on Projects & Labs" },
  { value: "100%", label: "Verified Certificates" },
  { value: "1:1", label: "Mentor Project Reviews" },
];

export default function StatsSection() {
  return (
    <div className="bg-dg2 border-t border-pg/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-mono text-3xl sm:text-4xl font-bold mb-2 text-pg">{s.value}</div>
            <div className="text-sm text-mg">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
