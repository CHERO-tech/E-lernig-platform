import React from "react";

type PaddingSize = "none" | "sm" | "md" | "lg";
type HeaderTone = "light" | "dark";
type CardVariant = "default" | "terminal";

interface CardProps {
  children: React.ReactNode;
  padding?: PaddingSize;
  title?: string;
  action?: React.ReactNode;
  headerTone?: HeaderTone;
  variant?: CardVariant;
  className?: string;
}

const paddingClasses: Record<PaddingSize, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  padding = "md",
  title,
  action,
  headerTone = "light",
  variant = "default",
  className = "",
}: CardProps) {
  const headerBg = headerTone === "dark" ? "bg-dg2" : "bg-white";
  const isTerminal = variant === "terminal";
  const terminalTitleColor = headerTone === "dark" ? "#8BE0B0" : "#35C47A";

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-shadow ${isTerminal ? "border-l-4 border-l-pg" : ""} ${className}`}
    >
      {isTerminal && (
        <span className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-pg/30 pointer-events-none" />
      )}
      {title && (
        <div
          className={`${headerBg} px-6 py-4 border-b border-border flex items-center justify-between`}
        >
          <p
            className={
              isTerminal
                ? "font-mono text-xs tracking-wide uppercase flex items-center gap-1.5"
                : `font-semibold ${headerTone === "dark" ? "text-white" : "text-dt"}`
            }
            style={isTerminal ? { color: terminalTitleColor } : undefined}
          >
            {isTerminal && <span className="opacity-60">▸</span>}
            {title}
          </p>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  );
}
