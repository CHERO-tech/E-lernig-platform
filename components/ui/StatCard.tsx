import React from "react";

type TrendTone = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendTone?: TrendTone;
}

const trendClasses: Record<TrendTone, string> = {
  up: "text-pg2",
  down: "text-err",
  neutral: "text-mg",
};

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendTone = "neutral",
}: StatCardProps) {
  return (
    <div className="rounded-xl p-5 transition-all hover:shadow-lg border border-border bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-mg">{label}</p>
        {icon && <div>{icon}</div>}
      </div>
      <p className="font-mono text-3xl font-bold mb-1 text-pg2">{value}</p>
      {trend && <p className={`font-mono text-xs ${trendClasses[trendTone]}`}>{trend}</p>}
    </div>
  );
}
