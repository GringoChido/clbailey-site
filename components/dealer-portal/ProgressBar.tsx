"use client";

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  showValues?: boolean;
}

export default function ProgressBar({ current, target, label, showValues = true }: ProgressBarProps) {
  const percent = Math.min((current / target) * 100, 100);

  return (
    <div>
      {label && <p className="section-label mb-2">{label}</p>}
      <div className="h-2 bg-cloud w-full">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showValues && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-body">
            ${current.toLocaleString()}
          </span>
          <span className="text-xs text-mid-gray">
            ${target.toLocaleString()} target
          </span>
        </div>
      )}
    </div>
  );
}
