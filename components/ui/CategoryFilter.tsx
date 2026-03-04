"use client";

type SortOption = "featured" | "az" | "za";

interface CategoryFilterProps {
  availableSizes: string[];
  onSortChange: (sort: SortOption) => void;
  onSizeFilter: (size: string | null) => void;
  currentSort: SortOption;
  currentSize: string | null;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
];

export default function CategoryFilter({
  availableSizes,
  onSortChange,
  onSizeFilter,
  currentSort,
  currentSize,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-[var(--header-height)] z-30 bg-white border-b border-[var(--color-cloud)]">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between py-4 px-6 lg:px-10 min-w-max max-w-[90rem] mx-auto">
          {/* Sort options */}
          <div className="flex items-center gap-0">
            {sortOptions.map((option, i) => (
              <div key={option.value} className="flex items-center">
                {i > 0 && (
                  <span className="metadata text-[var(--color-cloud)] mx-3 select-none">|</span>
                )}
                <button
                  type="button"
                  onClick={() => onSortChange(option.value)}
                  className={`metadata transition-colors duration-300 ${
                    currentSort === option.value
                      ? "text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-px"
                      : "text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>

          {/* Size filter pills */}
          {availableSizes.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSizeFilter(null)}
                className={`metadata transition-colors duration-300 ${
                  currentSize === null
                    ? "text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-px"
                    : "text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]"
                }`}
              >
                All
              </button>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeFilter(size)}
                  className={`metadata transition-colors duration-300 ${
                    currentSize === size
                      ? "text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-px"
                      : "text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
