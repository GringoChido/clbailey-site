"use client";

import { useState, useMemo } from "react";
import { mockInventory } from "@/lib/salesforce/mock/inventory.mock";
import StatusBadge from "../StatusBadge";
import type { AvailabilityStatus } from "@/lib/salesforce/types";

type FilterCategory = "all" | "pool-tables" | "shuffleboards";
type FilterAvailability = "all" | AvailabilityStatus;

export default function InventoryPanel() {
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [filterAvailability, setFilterAvailability] = useState<FilterAvailability>("all");

  const inventory = mockInventory;

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      if (filterCategory !== "all" && item.category !== filterCategory) return false;
      if (filterAvailability !== "all" && item.status !== filterAvailability) return false;
      return true;
    });
  }, [inventory, filterCategory, filterAvailability]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <p className="metadata mb-2">Product Line</p>
          <div className="flex gap-2">
            {(["all", "pool-tables", "shuffleboards"] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`metadata px-3 py-1.5 transition-colors duration-200 ${
                  filterCategory === cat
                    ? "bg-primary text-white"
                    : "bg-cloud/50 text-mid-gray hover:bg-cloud"
                }`}
              >
                {cat === "all" ? "All" : cat === "pool-tables" ? "Pool Tables" : "Shuffleboards"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="metadata mb-2">Availability</p>
          <div className="flex gap-2">
            {(["all", "in_stock", "low_stock", "out_of_stock", "made_to_order"] as FilterAvailability[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterAvailability(s)}
                className={`metadata px-3 py-1.5 transition-colors duration-200 ${
                  filterAvailability === s
                    ? "bg-primary text-white"
                    : "bg-cloud/50 text-mid-gray hover:bg-cloud"
                }`}
              >
                {s === "all" ? "All" : s === "in_stock" ? "In Stock" : s === "low_stock" ? "Low" : s === "out_of_stock" ? "Out" : "MTO"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="border-t border-cloud">
        <div className="hidden md:grid grid-cols-[1fr_120px_80px_80px_120px_120px_140px] gap-4 py-3 px-4">
          <span className="metadata">Product</span>
          <span className="metadata">Finish</span>
          <span className="metadata">Size</span>
          <span className="metadata text-right">Qty</span>
          <span className="metadata">Status</span>
          <span className="metadata">Lead Time</span>
          <span className="metadata">Warehouse</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="heading-sub mb-2">No items match your filters</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={`${item.productSlug}-${item.finish}-${item.size}-${i}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_120px_80px_80px_120px_120px_140px] gap-2 md:gap-4 py-3 px-4 border-b border-cloud"
            >
              <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                {item.productName}
              </span>
              <span className="text-xs text-body">{item.finish}</span>
              <span className="text-xs text-body">{item.size}</span>
              <span className="text-xs text-primary text-right font-[family-name:var(--font-display)]">
                {item.availableQty}
              </span>
              <span>
                <StatusBadge status={item.status} />
              </span>
              <span className="text-xs text-body">
                {item.leadTimeDays} days
                {item.restockDate && (
                  <span className="block text-[10px] text-silver">
                    Restock:{" "}
                    {new Date(item.restockDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </span>
              <span className="text-[11px] text-body">{item.warehouse}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
