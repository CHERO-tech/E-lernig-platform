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
      <div className="bg-dg border-b border-pg/10">
        <div className={`${containerClassName} mx-auto px-8 py-10`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs mb-2 text-pg">$ {command}</p>
              <h1 className="text-3xl font-bold mb-1 text-white tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-mg">{subtitle}</p>}
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
          <p className="font-mono text-xs mb-2 text-pg2">$ {command}</p>
          <h1 className="text-3xl font-bold mb-1 text-dt tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-mg">{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
