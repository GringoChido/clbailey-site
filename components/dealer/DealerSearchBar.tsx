"use client";

import { AVAILABLE_MODELS } from "@/lib/dealer-utils";

interface DealerSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeModel: string | null;
  onModelChange: (model: string | null) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const DealerSearchBar = ({
  query,
  onQueryChange,
  activeModel,
  onModelChange,
  showFilters,
  onToggleFilters,
}: DealerSearchBarProps) => {
  return (
    <div
      className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] mx-4 md:mx-auto md:max-w-4xl -mt-6 relative z-10 p-4 md:p-6"
      style={{ borderRadius: "2px" }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Enter city, state, or zip code"
            className="w-full pl-10 pr-4 py-3 border border-[#e0ddd8] text-[14px] text-[#1a1a1a] placeholder:text-[#999] focus:outline-none focus:border-[#1a3a2a] transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              borderRadius: "2px",
            }}
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={`px-5 py-3 text-[11px] tracking-[2px] uppercase border transition-all duration-300 shrink-0 ${
            showFilters
              ? "bg-[#1a3a2a] border-[#1a3a2a] text-white"
              : "bg-transparent border-[#e0ddd8] text-[#1a1a1a] hover:border-[#1a3a2a]"
          }`}
          style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter by Model
          </span>
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-[#e0ddd8]">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => onModelChange(null)}
              className={`shrink-0 px-4 py-2 text-[11px] tracking-[2px] uppercase border transition-all duration-300 ${
                !activeModel
                  ? "bg-[#1a3a2a] border-[#1a3a2a] text-white"
                  : "bg-transparent border-[#e0ddd8] text-[#1a1a1a] hover:border-[#1a3a2a]"
              }`}
              style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
            >
              All Models
            </button>
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model}
                onClick={() =>
                  onModelChange(
                    activeModel === model.replace("The ", "")
                      ? null
                      : model.replace("The ", "")
                  )
                }
                className={`shrink-0 px-4 py-2 text-[11px] tracking-[2px] uppercase border transition-all duration-300 ${
                  activeModel === model.replace("The ", "")
                    ? "bg-[#1a3a2a] border-[#1a3a2a] text-white"
                    : "bg-transparent border-[#e0ddd8] text-[#1a1a1a] hover:border-[#1a3a2a]"
                }`}
                style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerSearchBar;
