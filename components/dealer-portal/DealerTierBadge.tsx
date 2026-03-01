"use client";

import type { DealerTier } from "@/lib/salesforce/types";

const tierLabels: Record<DealerTier, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

interface DealerTierBadgeProps {
  tier: DealerTier;
}

export default function DealerTierBadge({ tier }: DealerTierBadgeProps) {
  return (
    <span className="metadata bg-primary/10 text-primary px-3 py-1 inline-block">
      {tierLabels[tier]} Dealer
    </span>
  );
}
