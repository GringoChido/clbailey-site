"use client";

interface Swatch {
  id: string;
  name: string;
  colorHex: string;
}

interface SwatchSelectorProps {
  label: string;
  options: Swatch[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function SwatchSelector({ label, options, selected, onSelect }: SwatchSelectorProps) {
  return (
    <div>
      <p className="section-label mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((swatch) => (
          <button
            key={swatch.id}
            onClick={() => onSelect(swatch.id)}
            className={`group flex flex-col items-center gap-1.5 ${
              selected === swatch.id ? "" : "opacity-60 hover:opacity-100"
            } transition-opacity duration-200`}
            title={swatch.name}
          >
            <div
              className={`w-10 h-10 ${
                selected === swatch.id
                  ? "ring-2 ring-primary ring-offset-2"
                  : "ring-1 ring-cloud"
              }`}
              style={{ backgroundColor: swatch.colorHex }}
            />
            <span className="text-[10px] text-body group-hover:text-primary transition-colors duration-200">
              {swatch.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
