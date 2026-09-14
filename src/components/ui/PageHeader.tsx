import React from "react";

type HeaderVariant = "dark" | "light";

interface PageHeaderProps {
  command: string;
  title: string;
  subtitle?: string;
  variant?: HeaderVariant;
  actions?: React.ReactNode;
  containerClassName?: string;
}

export default function PageHeader({
  command,
  title,
  subtitle,
  variant = "dark",
  actions,
  containerClassName = "max-w-7xl",
}: PageHeaderProps) {
  if (variant === "dark") {
    return (
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className={`${containerClassName} mx-auto px-8 py-10`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>
                $ {command}
              </p>
              <h1
                className="text-page-title mb-1"
                style={{ color: "#FFFFFF" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p style={{ color: "#606C66" }}>
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClassName} mx-auto px-8 py-8`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>
            $ {command}
          </p>
          <h1
            className="text-page-title mb-1"
            style={{ color: "#102019" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: "#606C66" }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
