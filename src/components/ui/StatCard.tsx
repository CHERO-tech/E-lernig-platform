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
    trendTone === "up" ? "#35C47A" : trendTone === "down" ? "#dc2626" : "#718078";

  return (
    <div
      className="rounded-xl p-5 transition-all hover:shadow-lg border border-border"
      style={{ background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs" style={{ color: "#718078" }}>
          {label}
        </p>
        {icon && <div>{icon}</div>}
      </div>
      <p className="font-mono text-3xl font-bold mb-1" style={{ color: "#35C47A" }}>
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
