import React from "react";

type PaddingSize = "none" | "sm" | "md" | "lg";
type HeaderTone = "light" | "dark";

interface CardProps {
  children: React.ReactNode;
  padding?: PaddingSize;
  title?: string;
  action?: React.ReactNode;
  headerTone?: HeaderTone;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
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
  className = "",
  style,
  onClick,
}: CardProps) {
  const headerBg = headerTone === "dark" ? "bg-dg2" : "bg-white";

  return (
    <div
      className={`rounded-xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-shadow ${className}`}
      style={style}
      onClick={onClick}
    >
      {title && (
        <div
          className={`${headerBg} px-6 py-4 border-b border-border flex items-center justify-between`}
        >
          <p
            className={`font-semibold ${headerTone === "dark" ? "text-white" : "text-dt"}`}
          >
            {title}
          </p>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  );
}
