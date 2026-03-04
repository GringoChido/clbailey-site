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
    <div className="flex flex-wrap gap-5">
      {finishes.map((finish) => {
        const isActive = selected === finish;
        const color = getFinishColor(finish);

        return (
          <button
            key={finish}
            type="button"
            onClick={() => onSelect?.(finish)}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div
              className="w-10 h-10 transition-all duration-200"
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
              className={`text-[10px] text-[var(--color-mid-gray)] leading-tight text-center max-w-[60px] transition-all duration-200 ${
                isActive
                  ? "underline underline-offset-2 text-[var(--color-primary)]"
                  : "group-hover:text-[var(--color-primary)]"
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
