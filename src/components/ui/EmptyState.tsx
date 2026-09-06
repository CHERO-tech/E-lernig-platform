import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#35C47A"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 8 16 12 12 16" />
      <polyline points="8 12 12 16 8 20" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "#102019" }}>
        {title}
      </h3>
      {description && (
        <p className="text-sm mb-6 max-w-sm" style={{ color: "#718078" }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
