"use client";

import type { DealerWithDistance } from "@/lib/dealer-types";
import { formatDistance } from "@/lib/dealer-utils";

interface DealerCardProps {
  dealer: DealerWithDistance;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onInquiry: (id: string) => void;
}

const DealerCard = ({
  dealer,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onInquiry,
}: DealerCardProps) => {
  const dist = formatDistance(dealer.distance);

  return (
    <div
      data-dealer-id={dealer.id}
      onClick={() => onSelect(dealer.id)}
      onMouseEnter={() => onHover(dealer.id)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative p-5 border cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "bg-[#1a3a2a] border-[#1a3a2a] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
            : isHovered
              ? "bg-[#faf9f6] border-[#c8a96e]/40 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              : "bg-white border-[#e0ddd8] hover:border-[#c8a96e]/30"
        }
      `}
      style={{ borderRadius: "2px" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className={`text-[18px] font-normal leading-snug ${
            isSelected ? "text-white" : "text-[#1a1a1a]"
          }`}
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {dealer.name}
        </h3>
        {dist && (
          <span
            className={`shrink-0 text-[11px] font-medium tracking-[2px] uppercase whitespace-nowrap ${
              isSelected ? "text-[#c8a96e]" : "text-[#999]"
            }`}
            style={{ fontFamily: "var(--font-label)" }}
          >
            {dist}
          </span>
        )}
      </div>

      <p
        className={`text-[13px] leading-relaxed mb-3 ${
          isSelected ? "text-white/70" : "text-[#777]"
        }`}
        style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
      >
        {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {dealer.models.map((model) => (
          <span
            key={model}
            className={`inline-block px-2 py-0.5 text-[10px] tracking-[1.5px] uppercase ${
              isSelected
                ? "bg-white/10 text-white/80"
                : "bg-[rgba(26,58,42,0.06)] text-[#1a3a2a]"
            }`}
            style={{ fontFamily: "var(--font-label)", borderRadius: "1px" }}
          >
            {model}
          </span>
        ))}
        {dealer.hasShowroom && (
          <span
            className={`inline-block px-2 py-0.5 text-[10px] tracking-[1.5px] uppercase border ${
              isSelected
                ? "border-[#c8a96e]/50 text-[#c8a96e]"
                : "border-[#c8a96e]/30 text-[#c8a96e]"
            }`}
            style={{ fontFamily: "var(--font-label)", borderRadius: "1px" }}
          >
            Showroom
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <a
          href={`tel:${dealer.phone.replace(/[^0-9]/g, "")}`}
          onClick={(e) => e.stopPropagation()}
          className={`text-[13px] transition-colors ${
            isSelected
              ? "text-white/80 hover:text-white"
              : "text-[#1a3a2a] hover:text-[#1a3a2a]/70"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {dealer.phone}
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInquiry(dealer.id);
          }}
          className={`px-4 py-2 text-[11px] tracking-[2px] uppercase border transition-all duration-300 ${
            isSelected
              ? "border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#1a3a2a]"
              : "border-[#1a3a2a] text-[#1a3a2a] hover:bg-[#1a3a2a] hover:text-white"
          }`}
          style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
        >
          Send Inquiry
        </button>
      </div>
    </div>
  );
};

export default DealerCard;
