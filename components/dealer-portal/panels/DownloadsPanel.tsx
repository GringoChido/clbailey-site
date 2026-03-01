"use client";

import { useState } from "react";

interface DownloadItem {
  name: string;
  description: string;
  filename: string;
  categoryKey: string;
}

const downloads: DownloadItem[] = [
  { name: "Skylar Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "skylar-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Viking Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "viking-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Dutchess Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "dutchess-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Tunbridge Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "tunbridge-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Duke Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "duke-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Norwich Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "norwich-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Elayna Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "elayna-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Adrian Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "adrian-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Viking Shuffleboard", description: "Full specification sheet", filename: "viking-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  { name: "Skylar Shuffleboard", description: "Full specification sheet", filename: "skylar-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  { name: "Tunbridge Shuffleboard", description: "Full specification sheet", filename: "tunbridge-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  { name: "2026 Product Catalog", description: "Complete product line overview for showroom use", filename: "clbailey-catalog-2026.pdf", categoryKey: "marketingMaterials" },
  { name: "Brand Guidelines", description: "Logo usage, colors, and typography standards", filename: "brand-guidelines.pdf", categoryKey: "marketingMaterials" },
  { name: "Dealer Display Kit", description: "Point-of-sale materials and signage templates", filename: "dealer-display-kit.pdf", categoryKey: "marketingMaterials" },
  { name: "Spring 2026 Campaign Kit", description: "Social media, email, and in-store signage for spring selling season", filename: "spring-2026-kit.zip", categoryKey: "marketingMaterials" },
  { name: "Social Media Templates", description: "Branded Instagram and Facebook templates with product imagery", filename: "social-media-templates.zip", categoryKey: "marketingMaterials" },
  { name: "Room Size Guide", description: "Printable room measurement guide for customer consultations", filename: "room-size-guide.pdf", categoryKey: "showroomMaterials" },
  { name: "Product Comparison Chart", description: "Side-by-side comparison of all pool table models", filename: "comparison-chart.pdf", categoryKey: "showroomMaterials" },
  { name: "Warranty Registration Cards", description: "Pre-printed warranty registration cards for customer delivery", filename: "warranty-cards.pdf", categoryKey: "showroomMaterials" },
  { name: "2026 MSRP Price List", description: "Current retail pricing for all models", filename: "msrp-2026.pdf", categoryKey: "priceLists" },
  { name: "2026 Dealer Cost Sheet", description: "Dealer pricing and margin structure", filename: "dealer-cost-2026.pdf", categoryKey: "priceLists" },
];

const categoryNames: Record<string, string> = {
  poolTableSpecs: "Pool Table Spec Sheets",
  shuffleboardSpecs: "Shuffleboard Spec Sheets",
  marketingMaterials: "Marketing Materials",
  showroomMaterials: "Showroom Materials",
  priceLists: "Price Lists",
};

const categoryOrder = ["poolTableSpecs", "shuffleboardSpecs", "marketingMaterials", "showroomMaterials", "priceLists"];

export default function DownloadsPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const grouped = downloads.reduce(
    (acc, d) => {
      if (!acc[d.categoryKey]) acc[d.categoryKey] = [];
      if (
        searchQuery === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        acc[d.categoryKey].push(d);
      }
      return acc;
    },
    {} as Record<string, DownloadItem[]>
  );

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search downloads..."
          className="input-modern max-w-sm"
        />
      </div>

      {/* Download Groups */}
      <div className="space-y-12">
        {categoryOrder.map((categoryKey) => {
          const items = grouped[categoryKey];
          if (!items || items.length === 0) return null;
          return (
            <div key={categoryKey}>
              <p className="section-label mb-4">{categoryNames[categoryKey]}</p>
              <div className="border-t border-cloud">
                {items.map((item) => (
                  <div
                    key={item.filename}
                    className="flex items-center justify-between py-4 border-b border-cloud"
                  >
                    <div>
                      <h3 className="heading-card text-sm">{item.name}</h3>
                      <p className="text-[11px] text-body mt-0.5">{item.description}</p>
                    </div>
                    <a
                      href={`/downloads/${item.filename}`}
                      download
                      className="metadata text-mid-gray hover:text-primary transition-colors duration-200 flex-shrink-0 ml-4"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
