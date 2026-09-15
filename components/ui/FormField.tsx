import React from "react";

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
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold mb-1.5 text-dt">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-3 text-gray-400">{icon}</div>
        )}
      </div>
      {hint && <p className="text-xs mt-1 text-mg">{hint}</p>}
      {error && <p className="text-xs mt-1 text-err">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold mb-1.5 text-dt">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none bg-ow border border-border text-dt focus:border-pg ${className}`}
        {...props}
      />
      {hint && <p className="text-xs mt-1 text-mg">{hint}</p>}
      {error && <p className="text-xs mt-1 text-err">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options,
  hint,
  error,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold mb-1.5 text-dt">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 pr-9 rounded-lg text-sm outline-none transition-all appearance-none bg-ow border border-border text-dt focus:border-pg ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23718078' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs mt-1 text-mg">{hint}</p>}
      {error && <p className="text-xs mt-1 text-err">{error}</p>}
    </div>
  );
}
