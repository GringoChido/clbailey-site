"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Globe,
  MapPin,
  X,
} from "lucide-react";
import { adminDealers } from "@/lib/admin/mock-data";
import type { AdminDealer, AdminSection, DealerTier, DealerStatus } from "@/lib/admin/types";

interface Props {
  onNavigate: (section: AdminSection) => void;
}

const tierColors: Record<DealerTier, string> = {
  platinum: "bg-[var(--color-primary)] text-white",
  gold: "bg-[#8B7355] text-white",
  silver: "bg-[var(--color-silver)] text-[var(--color-primary)]",
  bronze: "bg-[#A0785A] text-white",
};

const statusColors: Record<DealerStatus, string> = {
  active: "text-emerald-600",
  inactive: "text-red-500",
  pending: "text-amber-600",
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DealerManagementPanel({ onNavigate }: Props) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<DealerTier | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = adminDealers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.territory.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || d.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalRevenue = adminDealers.reduce((sum, d) => sum + d.ytdRevenue, 0);
  const totalOrders = adminDealers.reduce((sum, d) => sum + d.totalOrders, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-2">Administration</p>
          <h1 className="heading-display text-[28px]">Dealer Management</h1>
        </div>
        <button
          onClick={() => onNavigate("onboarding")}
          className="btn-primary text-[12px] px-6"
        >
          + Add New Dealer
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Dealers
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {adminDealers.length}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Combined YTD Revenue
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="bg-white border border-[var(--color-cloud)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
            Total Orders YTD
          </p>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {totalOrders}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-silver)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dealers by name, city, or territory..."
            className="input-modern pl-10 w-full"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-outline flex items-center gap-2 text-[12px] ${showFilters ? "border-[var(--color-primary)]" : ""}`}
        >
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Filter row */}
      {showFilters && (
        <div className="flex items-center gap-2 mb-6 animate-fade-up">
          <span className="text-[11px] text-[var(--color-mid-gray)] uppercase tracking-[1.5px] font-[var(--font-raleway)]">
            Tier:
          </span>
          {(["all", "platinum", "gold", "silver", "bronze"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-[1px] border transition-colors ${
                tierFilter === tier
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : "border-[var(--color-cloud)] text-[var(--color-body)] hover:border-[var(--color-silver)]"
              }`}
            >
              {tier}
            </button>
          ))}
          {tierFilter !== "all" && (
            <button onClick={() => setTierFilter("all")} className="ml-2 text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]">
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Dealer table */}
      <div className="bg-white border border-[var(--color-cloud)]">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
          {["Dealer", "Territory", "Tier", "Status", "YTD Revenue", "Last Order", ""].map((col) => (
            <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
              {col}
            </p>
          ))}
        </div>

        {/* Table rows */}
        {filtered.map((dealer) => (
          <DealerRow
            key={dealer.id}
            dealer={dealer}
            expanded={expandedId === dealer.id}
            onToggle={() => setExpandedId(expandedId === dealer.id ? null : dealer.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-[var(--color-body)]">No dealers match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DealerRow({
  dealer,
  expanded,
  onToggle,
}: {
  dealer: AdminDealer;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border-b border-[var(--color-cloud)] last:border-b-0 ${expanded ? "bg-[var(--color-whisper)]" : ""}`}>
      {/* Row */}
      <button
        onClick={onToggle}
        className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-4 text-left hover:bg-[var(--color-whisper)] transition-colors"
      >
        <div>
          <p className="heading-card text-[14px]">{dealer.name}</p>
          <p className="text-[12px] text-[var(--color-body)]">{dealer.city}, {dealer.state}</p>
        </div>
        <p className="text-[13px] text-[var(--color-body)] self-center">{dealer.territory}</p>
        <div className="self-center">
          <span className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-[1px] ${tierColors[dealer.tier]}`}>
            {dealer.tier}
          </span>
        </div>
        <div className="self-center flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${dealer.status === "active" ? "bg-emerald-500" : dealer.status === "pending" ? "bg-amber-500" : "bg-red-500"}`} />
          <span className={`text-[12px] capitalize ${statusColors[dealer.status]}`}>{dealer.status}</span>
        </div>
        <p className="text-[13px] text-[var(--color-primary)] self-center font-medium">
          {formatCurrency(dealer.ytdRevenue)}
        </p>
        <p className="text-[12px] text-[var(--color-body)] self-center">
          {formatDate(dealer.lastOrderDate)}
        </p>
        <div className="self-center flex justify-center">
          {expanded ? <ChevronUp size={14} className="text-[var(--color-mid-gray)]" /> : <ChevronDown size={14} className="text-[var(--color-silver)]" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5 animate-fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-white border border-[var(--color-cloud)]">
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Contact
              </p>
              <p className="text-[13px] text-[var(--color-primary)] font-medium mb-1">{dealer.contactName}</p>
              <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)] mb-1">
                <Mail size={11} /> {dealer.contactEmail}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)]">
                <Phone size={11} /> {dealer.contactPhone}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Location
              </p>
              <div className="flex items-start gap-2 text-[12px] text-[var(--color-body)]">
                <MapPin size={11} className="mt-0.5 flex-shrink-0" />
                <span>{dealer.address}<br />{dealer.city}, {dealer.state} {dealer.zip}</span>
              </div>
              {dealer.website && (
                <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)] mt-1">
                  <Globe size={11} /> {dealer.website.replace("https://", "")}
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Performance
              </p>
              <p className="text-[13px] text-[var(--color-body)]">
                <span className="text-[var(--color-primary)] font-medium">{dealer.totalOrders}</span> orders YTD
              </p>
              <p className="text-[13px] text-[var(--color-body)]">
                Avg: <span className="text-[var(--color-primary)] font-medium">{formatCurrency(Math.round(dealer.ytdRevenue / dealer.totalOrders))}</span> per order
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Account
              </p>
              <p className="text-[12px] text-[var(--color-body)]">
                Member since {formatDate(dealer.joinDate)}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="btn-outline text-[11px] px-3 py-1.5">Edit</button>
                <button className="btn-outline text-[11px] px-3 py-1.5 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
