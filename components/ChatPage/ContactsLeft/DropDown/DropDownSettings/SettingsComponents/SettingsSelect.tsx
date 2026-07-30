"use client";

type Option = { value: string; label: string };

type SettingsSelectProps = {
  id: string;
  label: string;
  description?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function SettingsSelect({
  id,
  label,
  description,
  value,
  options,
  onChange,
}: SettingsSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-text-900/60">
        {label}
      </label>
      {description && (
        <p className="mt-0.5 text-xs text-text-900/50">{description}</p>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full max-w-xs bg-primary-200/60 hover:bg-primary-200 focus:bg-primary-200/60 rounded-lg px-3 py-2 text-sm text-text-900 outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option className="bg-background-100" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="mt-4 h-px bg-background-900/20" />
    </div>
  );
}
