"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  Package,
  UserPlus,
  FileText,
  Settings,
} from "lucide-react";
import { adminKPIs, recentActivity } from "@/lib/admin/mock-data";
import type { AdminSection, ActivityType } from "@/lib/admin/types";

interface Props {
  onNavigate: (section: AdminSection) => void;
}

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const activityColors: Record<ActivityType, string> = {
  order: "bg-[var(--color-primary)]",
  lead: "bg-[var(--color-mid-gray)]",
  dealer: "bg-[var(--color-silver)]",
  warranty: "bg-[var(--color-body)]",
  system: "bg-[var(--color-cloud)]",
};

const activityLabels: Record<ActivityType, string> = {
  order: "Order",
  lead: "Lead",
  dealer: "Dealer",
  warranty: "Warranty",
  system: "System",
};

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

export default function DashboardPanel({ onNavigate }: Props) {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="section-label mb-2">Administration</p>
        <h1 className="heading-display text-[28px]">Dashboard</h1>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {adminKPIs.map((kpi) => {
          const TrendIcon = trendIcon[kpi.trend];
          return (
            <div
              key={kpi.label}
              className="bg-white border border-[var(--color-cloud)] p-5"
            >
              <p className="text-[11px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-3">
                {kpi.label}
              </p>
              <p className="text-[28px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)] leading-none mb-2">
                {kpi.value}
              </p>
              <div className="flex items-center gap-1.5">
                <TrendIcon
                  size={12}
                  className={
                    kpi.trend === "up"
                      ? "text-emerald-600"
                      : kpi.trend === "down"
                      ? "text-red-500"
                      : "text-[var(--color-mid-gray)]"
                  }
                />
                <span
                  className={`text-[11px] ${
                    kpi.trend === "up"
                      ? "text-emerald-600"
                      : kpi.trend === "down"
                      ? "text-red-500"
                      : "text-[var(--color-mid-gray)]"
                  }`}
                >
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}% vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Recent Activity */}
        <div>
          <p className="section-label mb-4">Recent Activity</p>
          <div className="bg-white border border-[var(--color-cloud)]">
            {recentActivity.map((entry, i) => (
              <div
                key={entry.id}
                className={`flex items-start gap-4 px-5 py-4 ${
                  i < recentActivity.length - 1 ? "border-b border-[var(--color-cloud)]" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[entry.type]}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[var(--color-primary)] leading-[22px]">
                    {entry.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] uppercase tracking-[1.5px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                      {activityLabels[entry.type]}
                    </span>
                    {entry.dealerName && (
                      <span className="text-[11px] text-[var(--color-body)]">
                        {entry.dealerName}
                      </span>
                    )}
                    <span className="text-[11px] text-[var(--color-silver)]">
                      {timeAgo(entry.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="section-label mb-4">Quick Actions</p>
          <div className="space-y-3">
            {[
              { label: "Onboard New Dealer", icon: UserPlus, section: "onboarding" as AdminSection },
              { label: "Manage Dealers", icon: Package, section: "dealers" as AdminSection },
              { label: "View Analytics", icon: FileText, section: "analytics" as AdminSection },
              { label: "Post Announcement", icon: Settings, section: "announcements" as AdminSection },
            ].map(({ label, icon: Icon, section }) => (
              <button
                key={label}
                onClick={() => onNavigate(section)}
                className="w-full flex items-center gap-3 bg-white border border-[var(--color-cloud)] px-5 py-4 text-left hover:border-[var(--color-silver)] transition-colors group"
              >
                <Icon size={16} className="text-[var(--color-mid-gray)] group-hover:text-[var(--color-primary)] transition-colors" />
                <span className="text-[12px] uppercase tracking-[1.5px] text-[var(--color-primary)] font-[var(--font-raleway)]">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-8">
            <p className="section-label mb-4">System Status</p>
            <div className="bg-white border border-[var(--color-cloud)] p-5 space-y-3">
              {[
                { label: "Website", status: "Operational" },
                { label: "Dealer Portal", status: "Operational" },
                { label: "AI Concierge", status: "Operational" },
                { label: "Email Service", status: "Operational" },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[13px] text-[var(--color-body)]">{label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-emerald-600">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
