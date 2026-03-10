"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Eye,
  Archive,
  Tag,
  Calendar,
  Edit3,
  Play,
  Users,
  DollarSign,
  Plus,
} from "lucide-react";
import {
  marketingAssets,
  dealerPromotions,
  marketingCampaigns,
} from "@/lib/admin/mock-data";
import type {
  MarketingSubTab,
  AssetCategory,
  AssetStatus,
  PromotionStatus,
  CampaignStatus,
  CampaignChannel,
} from "@/lib/admin/types";

const subTabs: { id: MarketingSubTab; label: string }[] = [
  { id: "enablement", label: "Sales Enablement" },
  { id: "promotions", label: "Promotions" },
  { id: "campaigns", label: "Campaigns" },
];

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatFileSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

/* ─── Status / Category Label Styles ─── */

const assetStatusStyles: Record<AssetStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-gray-100 text-gray-500 border-gray-200",
};

const categoryLabels: Record<AssetCategory, string> = {
  sell_sheet: "Sell Sheet",
  catalog: "Catalog",
  brand_guide: "Brand Guide",
  campaign_kit: "Campaign Kit",
  showroom: "Showroom",
  price_list: "Price List",
};

const promoStatusStyles: Record<PromotionStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  expired: "bg-gray-100 text-gray-500 border-gray-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

const campaignStatusStyles: Record<CampaignStatus, string> = {
  planning: "bg-blue-50 text-blue-700 border-blue-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-gray-100 text-gray-500 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

const channelLabels: Record<CampaignChannel, string> = {
  email: "Email",
  co_op_digital: "Co-Op Digital",
  trade_show: "Trade Show",
  direct_mail: "Direct Mail",
  social: "Social Media",
};

export default function MarketingPanel() {
  const [activeTab, setActiveTab] = useState<MarketingSubTab>("enablement");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Administration</p>
        <h1 className="heading-display text-[28px]">Marketing</h1>
      </div>

      {/* Sub-tab bar */}
      <div className="flex items-center gap-2 mb-8">
        {subTabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-[1.5px] font-[var(--font-raleway)] border transition-colors ${
              activeTab === id
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-[var(--color-cloud)] text-[var(--color-body)] hover:border-[var(--color-silver)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "enablement" && <SalesEnablementTab />}
      {activeTab === "promotions" && <PromotionsTab />}
      {activeTab === "campaigns" && <CampaignsTab />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Sales Enablement Tab
   ═══════════════════════════════════════════════════════════════════ */

function SalesEnablementTab() {
  const [search, setSearch] = useState("");

  const totalDownloads = marketingAssets.reduce((sum, a) => sum + a.downloads, 0);
  const mostDownloaded = [...marketingAssets].sort((a, b) => b.downloads - a.downloads)[0];
  const activeAssets = marketingAssets.filter((a) => a.status === "active");

  const filtered = marketingAssets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      categoryLabels[a.category].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Active Assets
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {activeAssets.length}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Downloads
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {totalDownloads}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Most Downloaded
          </p>
          <p className="text-[14px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)] truncate">
            {mostDownloaded.name}
          </p>
        </div>
      </div>

      {/* Search + Upload button */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-silver)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets by name or category..."
            className="input-modern pl-10 w-full"
          />
        </div>
        <button className="btn-primary text-[12px] px-6 flex items-center gap-2">
          <Plus size={14} /> Upload Asset
        </button>
      </div>

      {/* Asset table */}
      <div className="bg-white border border-[var(--color-cloud)]">
        <div className="grid grid-cols-[2fr_1fr_0.7fr_0.7fr_0.8fr_1fr_80px] gap-4 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
          {["Asset", "Category", "Format", "Status", "Downloads", "Updated", ""].map((col) => (
            <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
              {col}
            </p>
          ))}
        </div>

        {filtered.map((asset) => (
          <div key={asset.id} className="grid grid-cols-[2fr_1fr_0.7fr_0.7fr_0.8fr_1fr_80px] gap-4 px-5 py-4 border-b border-[var(--color-cloud)] last:border-b-0 hover:bg-[var(--color-whisper)] transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[var(--color-silver)] flex-shrink-0" />
                <p className="heading-card text-[13px]">{asset.name}</p>
              </div>
              <p className="text-[11px] text-[var(--color-body)] mt-0.5 ml-[22px] truncate">{asset.description}</p>
            </div>
            <p className="text-[12px] text-[var(--color-body)] self-center">{categoryLabels[asset.category]}</p>
            <p className="text-[11px] text-[var(--color-mid-gray)] self-center uppercase">
              {asset.fileType} ({formatFileSize(asset.fileSizeKb)})
            </p>
            <div className="self-center">
              <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[1px] border ${assetStatusStyles[asset.status]}`}>
                {asset.status}
              </span>
            </div>
            <div className="self-center flex items-center gap-1.5 text-[13px] text-[var(--color-primary)]">
              <Download size={11} /> {asset.downloads}
            </div>
            <p className="text-[12px] text-[var(--color-body)] self-center">{formatDate(asset.updatedAt)}</p>
            <div className="self-center flex items-center gap-2">
              <button className="text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors">
                <Eye size={14} />
              </button>
              <button className="text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors">
                <Archive size={14} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-[var(--color-body)]">No assets match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Promotions Tab
   ═══════════════════════════════════════════════════════════════════ */

function PromotionsTab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activePromos = dealerPromotions.filter((p) => p.status === "active");
  const totalRedemptions = dealerPromotions.reduce((sum, p) => sum + p.redemptions, 0);
  const mostPopular = [...dealerPromotions].sort((a, b) => b.redemptions - a.redemptions)[0];

  const promoTypeLabels: Record<string, string> = {
    volume_discount: "Volume Discount",
    seasonal_rebate: "Seasonal Rebate",
    spiff: "Spiff",
    co_op: "Co-Op",
    floor_model: "Floor Model",
  };

  return (
    <div>
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Active Promotions
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {activePromos.length}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Redemptions
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {totalRedemptions}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Most Popular
          </p>
          <p className="text-[14px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)] truncate">
            {mostPopular.title}
          </p>
        </div>
      </div>

      {/* New Promotion button */}
      <div className="flex justify-end mb-6">
        <button className="btn-primary text-[12px] px-6 flex items-center gap-2">
          <Plus size={14} /> New Promotion
        </button>
      </div>

      {/* Promotion cards */}
      <div className="space-y-4">
        {dealerPromotions.map((promo) => {
          const isExpanded = expandedId === promo.id;
          return (
            <div key={promo.id} className="bg-white border border-[var(--color-cloud)]">
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[1px] border ${promoStatusStyles[promo.status]}`}>
                      {promo.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                      {promoTypeLabels[promo.type]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : promo.id)}
                      className="text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <button className="text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors">
                      <Edit3 size={14} />
                    </button>
                    <button className="text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors">
                      <Archive size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="heading-card text-[15px] mb-2">{promo.title}</h3>
                <div className="flex items-center gap-4 text-[12px] text-[var(--color-body)]">
                  <span className="flex items-center gap-1.5">
                    <Tag size={11} /> {promo.incentiveValue}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} /> {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                  </span>
                </div>

                {/* Redemption progress */}
                {promo.maxRedemptions && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-[var(--color-mid-gray)] mb-1">
                      <span>Redemptions</span>
                      <span>{promo.redemptions} / {promo.maxRedemptions}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--color-cloud)]">
                      <div
                        className="h-full bg-[var(--color-primary)] transition-all"
                        style={{ width: `${Math.min(100, (promo.redemptions / promo.maxRedemptions) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-5 pb-4 pt-0 border-t border-[var(--color-cloud)] animate-fade-up">
                  <div className="pt-4">
                    <p className="text-[13px] text-[var(--color-body)] leading-[22px] mb-3">{promo.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                        Eligible Tiers:
                      </span>
                      {promo.eligibleTiers.map((tier) => (
                        <span key={tier} className="px-2 py-0.5 text-[10px] uppercase tracking-[1px] border border-[var(--color-cloud)] text-[var(--color-body)]">
                          {tier}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Campaigns Tab
   ═══════════════════════════════════════════════════════════════════ */

function CampaignsTab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeCampaigns = marketingCampaigns.filter((c) => c.status === "active");
  const totalLeads = marketingCampaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);
  const totalBudget = marketingCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = marketingCampaigns.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div>
      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Active Campaigns
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {activeCampaigns.length}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Leads
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {totalLeads}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Budget
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {formatCurrency(totalBudget)}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Budget Utilized
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* New Campaign button */}
      <div className="flex justify-end mb-6">
        <button className="btn-primary text-[12px] px-6 flex items-center gap-2">
          <Plus size={14} /> New Campaign
        </button>
      </div>

      {/* Campaign cards */}
      <div className="space-y-4">
        {marketingCampaigns.map((campaign) => {
          const isExpanded = expandedId === campaign.id;
          const budgetPct = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;

          return (
            <div key={campaign.id} className="bg-white border border-[var(--color-cloud)]">
              <button
                onClick={() => setExpandedId(isExpanded ? null : campaign.id)}
                className="w-full px-5 py-4 text-left"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[1px] border ${campaignStatusStyles[campaign.status]}`}>
                      {campaign.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                      {channelLabels[campaign.channel]}
                    </span>
                    <span className="text-[11px] text-[var(--color-body)]">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {campaign.status === "active" && <Play size={12} className="text-emerald-600" />}
                  </div>
                </div>
                <h3 className="heading-card text-[15px] mb-3">{campaign.name}</h3>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Budget */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[var(--color-mid-gray)] mb-1">
                      <span className="flex items-center gap-1"><DollarSign size={10} /> Budget</span>
                      <span>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--color-cloud)]">
                      <div
                        className="h-full bg-[var(--color-primary)] transition-all"
                        style={{ width: `${Math.min(100, budgetPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Dealers */}
                  <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)]">
                    <Users size={12} className="text-[var(--color-silver)]" />
                    <span><strong className="text-[var(--color-primary)]">{campaign.dealersReached}</strong> dealers reached</span>
                  </div>

                  {/* Leads */}
                  <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)]">
                    <Tag size={12} className="text-[var(--color-silver)]" />
                    <span><strong className="text-[var(--color-primary)]">{campaign.leadsGenerated}</strong> leads generated</span>
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-5 pb-4 border-t border-[var(--color-cloud)] animate-fade-up">
                  <div className="pt-4">
                    <p className="text-[13px] text-[var(--color-body)] leading-[22px] mb-3">{campaign.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                        Target Tiers:
                      </span>
                      {campaign.targetTiers.map((tier) => (
                        <span key={tier} className="px-2 py-0.5 text-[10px] uppercase tracking-[1px] border border-[var(--color-cloud)] text-[var(--color-body)]">
                          {tier}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
