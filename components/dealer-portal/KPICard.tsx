"use client";

interface KPICardProps {
  value: string;
  label: string;
  trend?: { direction: "up" | "down"; value: string };
  onClick?: () => void;
}

export default function KPICard({ value, label, trend, onClick }: KPICardProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={`bg-whisper border border-cloud p-6 text-center ${
        onClick ? "cursor-pointer hover:border-silver transition-colors duration-300" : ""
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="font-[family-name:var(--font-display)] text-3xl font-light text-primary">
          {value}
        </p>
        {trend && (
          <span
            className={`metadata ${
              trend.direction === "up" ? "text-primary" : "text-body"
            }`}
          >
            {trend.direction === "up" ? "\u2191" : "\u2193"} {trend.value}
          </span>
        )}
      </div>
      <p className="section-label">{label}</p>
    </Wrapper>
  );
}
