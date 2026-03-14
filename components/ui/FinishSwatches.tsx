"use client";

import { getFinishColor } from "@/lib/finishes";
export { getFinishColor } from "@/lib/finishes";

interface FinishSwatchesProps {
  finishes: string[];
  size: "sm" | "lg";
  selected?: string;
  onSelect?: (finish: string) => void;
}

const FinishSwatches = ({
  finishes,
  size,
  selected,
  onSelect,
}: FinishSwatchesProps) => {
  const isVarious = (name: string) => name.toLowerCase().trim() === "various";

  if (size === "sm") {
    return (
      <div className="flex items-center gap-2">
        {finishes.map((finish) => {
          const isActive = selected === finish;
          const color = getFinishColor(finish);

          return (
            <button
              key={finish}
              type="button"
              onClick={() => onSelect?.(finish)}
              aria-label={finish}
              className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "ring-1 ring-[var(--color-primary)] ring-offset-1"
                  : ""
              }`}
              style={
                isVarious(finish)
                  ? {
                      background:
                        "conic-gradient(#3c2415, #4a4a4a, #6b3a2a, #967d6b, #b08d57, #3c2415)",
                    }
                  : { backgroundColor: color }
              }
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      {finishes.map((finish) => {
        const isActive = selected === finish;
        const color = getFinishColor(finish);

        return (
          <button
            key={finish}
            type="button"
            onClick={() => onSelect?.(finish)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-16 h-16 transition-all duration-200 ${
                isActive
                  ? "ring-2 ring-[var(--color-primary)] ring-offset-2"
                  : "ring-1 ring-[var(--color-cloud)] group-hover:ring-[var(--color-mid-gray)]"
              }`}
              style={
                isVarious(finish)
                  ? {
                      background:
                        "conic-gradient(#3c2415, #4a4a4a, #6b3a2a, #967d6b, #b08d57, #3c2415)",
                    }
                  : { backgroundColor: color }
              }
            />
            <span
              className={`text-[11px] font-[family-name:var(--font-label)] uppercase tracking-[1.5px] text-center max-w-[80px] transition-all duration-200 ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-mid-gray)] group-hover:text-[var(--color-primary)]"
              }`}
            >
              {finish}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FinishSwatches;
