import React from "react";

type TrendTone = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendTone?: TrendTone;
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendTone = "neutral",
}: StatCardProps) {
  const trendColor =
    trendTone === "up" ? "#1F7A4B" : trendTone === "down" ? "#C92C2C" : "#606C66";

  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 transition-all hover:shadow-lg border border-border border-l-4 border-l-pg"
      style={{ background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      <span className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-pg/30 pointer-events-none" />
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs uppercase tracking-wide" style={{ color: "#606C66" }}>
          {label}
        </p>
        {icon && <div>{icon}</div>}
      </div>
      <p className="font-mono text-3xl font-bold mb-1" style={{ color: "#1F7A4B" }}>
        {value}
      </p>
      {trend && (
        <p className="font-mono text-xs" style={{ color: trendColor }}>
          {trend}
        </p>
      )}
    </div>
  );
}
