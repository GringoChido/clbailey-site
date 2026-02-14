"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── Static data for dealer resources ─── */

interface DownloadItem {
  name: string;
  description: string;
  filename: string;
  categoryKey: string;
}

const downloads: DownloadItem[] = [
  // Spec Sheets
  { name: "Skylar Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "skylar-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Viking Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "viking-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Dutchess Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "dutchess-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Tunbridge Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "tunbridge-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Duke Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "duke-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Norwich Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "norwich-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Elayna Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "elayna-spec.pdf", categoryKey: "poolTableSpecs" },
  { name: "Adrian Pool Table", description: "Full specification sheet with dimensions and finishes", filename: "adrian-spec.pdf", categoryKey: "poolTableSpecs" },
  // Shuffleboard Spec Sheets
  { name: "Viking Shuffleboard", description: "Full specification sheet", filename: "viking-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  { name: "Skylar Shuffleboard", description: "Full specification sheet", filename: "skylar-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  { name: "Tunbridge Shuffleboard", description: "Full specification sheet", filename: "tunbridge-shuffleboard-spec.pdf", categoryKey: "shuffleboardSpecs" },
  // Marketing Materials
  { name: "2026 Product Catalog", description: "Complete product line overview for showroom use", filename: "clbailey-catalog-2026.pdf", categoryKey: "marketingMaterials" },
  { name: "Brand Guidelines", description: "Logo usage, colors, and typography standards", filename: "brand-guidelines.pdf", categoryKey: "marketingMaterials" },
  { name: "Dealer Display Kit", description: "Point-of-sale materials and signage templates", filename: "dealer-display-kit.pdf", categoryKey: "marketingMaterials" },
  // Price Lists
  { name: "2026 MSRP Price List", description: "Current retail pricing for all models", filename: "msrp-2026.pdf", categoryKey: "priceLists" },
  { name: "2026 Dealer Cost Sheet", description: "Dealer pricing and margin structure", filename: "dealer-cost-2026.pdf", categoryKey: "priceLists" },
];

interface Announcement {
  date: string;
  title: string;
  body: string;
  type: "info" | "update" | "alert";
}

const announcements: Announcement[] = [
  {
    date: "2026-02-10",
    title: "New Addison Model Coming Q2 2026",
    body: "The Addison pool table is entering production. High-resolution images and spec sheets will be available by April. Pre-orders open March 1.",
    type: "update",
  },
  {
    date: "2026-01-15",
    title: "2026 Price List Updated",
    body: "The 2026 MSRP and dealer cost sheets have been updated in the Downloads section. New pricing takes effect March 1, 2026.",
    type: "info",
  },
  {
    date: "2026-01-05",
    title: "Holiday Shipping Schedule",
    body: "Standard lead times resume January 6. Orders placed during the holiday window may see an additional 1-2 week delay.",
    type: "alert",
  },
];

/* ─── Tabs ─── */
type Tab = "overview" | "downloads" | "account";

export default function DealerDashboard() {
  const router = useRouter();
  const t = useTranslations("dealerPortal");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/dealer-auth/logout", { method: "POST" });
    router.push("/dealer-portal/login");
    router.refresh();
  };

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: "overview", labelKey: "overview" },
    { id: "downloads", labelKey: "downloads" },
    { id: "account", labelKey: "account" },
  ];

  /* Group downloads by category key */
  const grouped = downloads.reduce(
    (acc, d) => {
      if (!acc[d.categoryKey]) acc[d.categoryKey] = [];
      acc[d.categoryKey].push(d);
      return acc;
    },
    {} as Record<string, DownloadItem[]>
  );

  return (
    <div>
      {/* Tab Navigation + Logout */}
      <div className="flex items-center justify-between border-b border-brown/10 mb-12">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "text-brown border-b-2 border-brown"
                  : "text-brown/40 hover:text-brown/70"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-xs uppercase tracking-wider text-brown/40 hover:text-brown transition-colors pb-4"
        >
          {loggingOut ? t("signingOut") : t("signOut")}
        </button>
      </div>

      {/* ─── Overview Tab ─── */}
      {activeTab === "overview" && (
        <div className="space-y-16">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { labelKey: "productLines", value: "4" },
              { labelKey: "activeModels", value: "22" },
              { labelKey: "specSheets", value: "11" },
              { labelKey: "priceLists", value: "2" },
            ].map((stat) => (
              <div key={stat.labelKey} className="border border-brown/10 p-6 text-center">
                <p className="font-serif text-3xl mb-1">{stat.value}</p>
                <p className="heritage-label text-brown/40">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <SectionLabel label={t("announcements")} />
            <div className="border-t border-brown/20 pt-4 space-y-6">
              {announcements.map((a, i) => (
                <div key={i} className="border-b border-brown/10 pb-6 last:border-b-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        a.type === "alert"
                          ? "bg-red-400"
                          : a.type === "update"
                          ? "bg-amber-400"
                          : "bg-green-400"
                      }`}
                    />
                    <h3 className="font-serif text-lg">{a.title}</h3>
                    <span className="text-xs text-brown/30 ml-auto flex-shrink-0">
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-brown/60 leading-relaxed pl-5">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <SectionLabel label={t("quickLinks")} />
            <div className="border-t border-brown/20 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("downloads")}
                  className="border border-brown/10 p-6 text-left hover:border-brown/30 transition-colors"
                >
                  <p className="font-serif text-lg mb-1">{t("downloads")}</p>
                  <p className="text-xs text-brown/50">{t("downloadsDesc")}</p>
                </button>
                <Link
                  href="/products"
                  className="border border-brown/10 p-6 text-left hover:border-brown/30 transition-colors"
                >
                  <p className="font-serif text-lg mb-1">{t("productCatalog")}</p>
                  <p className="text-xs text-brown/50">{t("productCatalogDesc")}</p>
                </Link>
                <Link
                  href="/contact-us"
                  className="border border-brown/10 p-6 text-left hover:border-brown/30 transition-colors"
                >
                  <p className="font-serif text-lg mb-1">{t("support")}</p>
                  <p className="text-xs text-brown/50">{t("supportDesc")}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Downloads Tab ─── */}
      {activeTab === "downloads" && (
        <div className="space-y-16">
          {Object.entries(grouped).map(([categoryKey, items]) => (
            <div key={categoryKey} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <SectionLabel label={t(categoryKey)} />
              <div className="border-t border-brown/20 pt-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.filename}
                      className="flex items-center justify-between border-b border-brown/10 pb-4"
                    >
                      <div>
                        <h3 className="font-serif text-lg">{item.name}</h3>
                        <p className="text-sm text-brown/50">{item.description}</p>
                      </div>
                      <a
                        href={`/downloads/${item.filename}`}
                        download
                        className="heritage-label text-brown/50 hover:text-forest transition-colors flex-shrink-0 ml-4"
                      >
                        {t("download")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Account Tab ─── */}
      {activeTab === "account" && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <SectionLabel label={t("dealerInfo")} />
            <div className="border-t border-brown/20 pt-4">
              <div className="max-w-lg space-y-6">
                <p className="text-sm text-brown/60 leading-relaxed">
                  {t("dealerInfoDesc")}
                </p>

                <div className="border border-brown/10 p-6 space-y-4">
                  <div>
                    <p className="heritage-label text-brown/40 mb-1">{t("supportContact")}</p>
                    <p className="text-sm text-brown/70">info@clbailey.com</p>
                  </div>
                  <div>
                    <p className="heritage-label text-brown/40 mb-1">{t("phone")}</p>
                    <p className="text-sm text-brown/70">877-258-1963</p>
                  </div>
                  <div>
                    <p className="heritage-label text-brown/40 mb-1">{t("hours")}</p>
                    <p className="text-sm text-brown/70">{t("hoursMTh")}</p>
                    <p className="text-sm text-brown/70">{t("hoursFri")}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact-us"
                    className="inline-block bg-forest text-bone px-8 py-3 heritage-label hover:bg-forest-light transition-colors"
                  >
                    {t("contactSupport")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <SectionLabel label={t("territory")} />
            <div className="border-t border-brown/20 pt-4">
              <p className="text-sm text-brown/60 leading-relaxed max-w-lg">
                {t("territoryDesc")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
