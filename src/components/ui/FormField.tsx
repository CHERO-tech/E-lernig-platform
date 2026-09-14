import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:border-pg focus-visible:ring-2 focus-visible:ring-pg/40 ${className}`}
          style={{
            background: "#F5F7F5",
            border: "1px solid #E2E8E4",
            color: "#102019",
          }}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-3 text-mg2">{icon}</div>
        )}
      </div>
      {hint && (
        <p className="text-xs mt-1" style={{ color: "#606C66" }}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs mt-1 text-err">{error}</p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:border-pg focus-visible:ring-2 focus-visible:ring-pg/40 resize-none ${className}`}
        style={{
          background: "#F5F7F5",
          border: "1px solid #E2E8E4",
          color: "#102019",
        }}
        {...props}
      />
      {hint && (
        <p className="text-xs mt-1" style={{ color: "#606C66" }}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs mt-1 text-err">{error}</p>
      )}
    </div>
  );
}

export function Select({
  label,
  options,
  hint,
  error,
  className = "",
  id,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:border-pg focus-visible:ring-2 focus-visible:ring-pg/40 appearance-none ${className}`}
        style={{
          background: "#F5F7F5",
          border: "1px solid #E2E8E4",
          color: "#102019",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23606C66' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && (
        <p className="text-xs mt-1" style={{ color: "#606C66" }}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs mt-1 text-err">{error}</p>
      )}
    </div>
  );
}
