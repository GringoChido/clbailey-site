"use client";

import { mockAnnouncements } from "@/lib/salesforce/mock/dealer.mock";
import { mockAnalytics } from "@/lib/salesforce/mock/analytics.mock";
import type { AnnouncementCategory } from "@/lib/salesforce/types";

const categoryLabels: Record<AnnouncementCategory, string> = {
  product_update: "Product",
  pricing: "Pricing",
  operations: "Operations",
  marketing: "Marketing",
};

interface OverviewPanelProps {
  onTabChange: (tab: string) => void;
}

export default function OverviewPanel({ onTabChange }: OverviewPanelProps) {
  const announcements = mockAnnouncements;
  const analytics = mockAnalytics;

  return (
    <div className="space-y-14">
      {/* Top Selling Products */}
      <div>
        <p className="section-label mb-4">Top Selling Models</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {analytics.topProducts.map((product, i) => (
            <div key={i} className="border border-cloud p-4">
              <p className="heading-card text-sm mb-1">{product.productName}</p>
              <p className="font-[family-name:var(--font-display)] text-xl font-light text-primary">
                {product.unitsSold} units
              </p>
              <p className="text-[11px] text-body">
                ${product.revenue.toLocaleString()} revenue
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div>
        <p className="section-label mb-4">Announcements</p>
        <div className="border-t border-cloud pt-4 space-y-0">
          {announcements.map((a) => (
            <div key={a.id} className="border-b border-cloud py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="metadata text-silver">
                      {categoryLabels[a.category]}
                    </span>
                    <span className="text-[10px] text-silver">
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="heading-card text-[15px] mb-1">{a.title}</h3>
                  <p className="text-xs text-body leading-relaxed">{a.body}</p>
                </div>
                {a.actionLabel && a.actionTab && (
                  <button
                    onClick={() => onTabChange(a.actionTab!)}
                    className="btn-outline text-[10px] px-4 py-2 flex-shrink-0 mt-1"
                  >
                    {a.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <p className="section-label mb-4">Quick Actions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Place Order", tab: "orders", desc: "Create a new dealer order" },
            { label: "Configurator", tab: "configurator", desc: "Build and quote configurations" },
            { label: "Downloads", tab: "downloads", desc: "Spec sheets and catalogs" },
            { label: "Support", tab: "support", desc: "Submit a support ticket" },
          ].map((link) => (
            <button
              key={link.tab}
              onClick={() => onTabChange(link.tab)}
              className="border border-cloud p-5 text-left hover:border-silver transition-colors duration-300"
            >
              <p className="heading-card text-sm mb-1">{link.label}</p>
              <p className="text-[11px] text-body">{link.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
