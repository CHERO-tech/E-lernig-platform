import React from "react";

type BadgeTone = "brand" | "neutral" | "success" | "warning" | "info" | "danger";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  pill?: boolean;
  dot?: boolean;
  mono?: boolean;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-pg/10 text-pg border border-pg/20",
  neutral: "bg-mg/10 text-mg border border-mg/20",
  success: "bg-pg/10 text-pg border border-pg/20",
  warning: "bg-warn/10 text-warn border border-warn/25",
  info: "bg-info/10 text-info border border-info/25",
  danger: "bg-err/10 text-err border border-err/25",
};

export default function Badge({
  children,
  tone = "brand",
  pill = false,
  dot = false,
  mono = false,
  className = "",
}: BadgeProps) {
  const roundedClass = pill ? "rounded-full" : "rounded";
  const fontClass = mono ? "font-mono" : "";
  const baseClasses = `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${roundedClass} ${fontClass} transition-colors ${toneClasses[tone]} ${className}`;

  return (
    <span className={baseClasses}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor:
              tone === "warning"
                ? "#d97706"
                : tone === "info"
                  ? "#3b82f6"
                  : tone === "danger"
                    ? "#dc2626"
                    : "#35C47A",
          }}
        />
      )}
      {children}
    </span>
  );
}
