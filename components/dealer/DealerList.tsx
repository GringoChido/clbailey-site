"use client";

import { useRef, useEffect } from "react";
import type { DealerWithDistance } from "@/lib/dealer-types";
import DealerCard from "./DealerCard";

interface DealerListProps {
  dealers: DealerWithDistance[];
  hasLocation: boolean;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onInquiry: (id: string) => void;
}

const DealerList = ({
  dealers,
  hasLocation,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  onInquiry,
}: DealerListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const card = listRef.current.querySelector(
      `[data-dealer-id="${selectedId}"]`
    );
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-1 pb-3">
        <p
          className="text-[11px] tracking-[2px] uppercase text-[#999]"
          style={{ fontFamily: "var(--font-label)" }}
        >
          {dealers.length} dealer{dealers.length !== 1 ? "s" : ""} found
          {hasLocation ? " · sorted by distance" : " · sorted alphabetically"}
        </p>
      </div>
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto space-y-3 pr-1 md:max-h-[540px]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#e0ddd8 transparent" }}
      >
        {dealers.length === 0 ? (
          <div className="py-12 text-center">
            <p
              className="text-[15px] text-[#777] mb-2"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              No dealers match your search.
            </p>
            <p
              className="text-[13px] text-[#999]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              Try a different city, state, or ZIP code.
            </p>
          </div>
        ) : (
          dealers.map((dealer) => (
            <DealerCard
              key={dealer.id}
              dealer={dealer}
              isSelected={selectedId === dealer.id}
              isHovered={hoveredId === dealer.id}
              onSelect={onSelect}
              onHover={onHover}
              onInquiry={onInquiry}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DealerList;
