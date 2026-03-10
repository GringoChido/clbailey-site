"use client";

import { territoryStats, monthlyRevenue, productPerformance, adminDealers } from "@/lib/admin/mock-data";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function AnalyticsPanel() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const maxProductRevenue = Math.max(...productPerformance.map((p) => p.revenue));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Administration</p>
        <h1 className="heading-display text-[28px]">Analytics</h1>
      </div>

      {/* Revenue trend */}
      <div className="bg-white border border-[var(--color-cloud)] p-6 mb-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
              Revenue Trend
            </p>
            <p className="text-[11px] text-[var(--color-body)]">Last 6 months</p>
          </div>
          <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-3 h-[180px]">
          {monthlyRevenue.map((m) => {
            const height = (m.revenue / maxRevenue) * 100;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] text-[var(--color-primary)] font-medium">
                  {formatCurrency(m.revenue / 1000)}K
                </span>
                <div className="w-full relative" style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-[var(--color-primary)] opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] uppercase tracking-[1.5px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                  {m.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Territory Performance */}
        <div>
          <p className="section-label mb-4">Territory Performance</p>
          <div className="bg-white border border-[var(--color-cloud)]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
              {["Territory", "Revenue", "Dealers", "Conv. Rate"].map((col) => (
                <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                  {col}
                </p>
              ))}
            </div>
            {territoryStats.map((t) => (
              <div
                key={t.territory}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] last:border-b-0"
              >
                <p className="text-[13px] text-[var(--color-primary)]">{t.territory}</p>
                <p className="text-[13px] text-[var(--color-primary)] font-medium">{formatCurrency(t.totalRevenue)}</p>
                <p className="text-[13px] text-[var(--color-body)]">{t.dealerCount}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[var(--color-cloud)]">
                    <div
                      className="h-full bg-[var(--color-primary)]"
                      style={{ width: `${(t.conversionRate / 30) * 100}%` }}
                    />
                  </div>
                  <span className="text-[12px] text-[var(--color-body)] w-10 text-right">{t.conversionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Performance */}
        <div>
          <p className="section-label mb-4">Product Performance</p>
          <div className="bg-white border border-[var(--color-cloud)]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
              {["Product", "Units", "Revenue"].map((col) => (
                <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                  {col}
                </p>
              ))}
            </div>
            {productPerformance.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] last:border-b-0"
              >
                <div>
                  <p className="text-[13px] text-[var(--color-primary)]">{p.name}</p>
                  <p className="text-[11px] text-[var(--color-body)]">{p.category}</p>
                </div>
                <p className="text-[13px] text-[var(--color-body)] self-center">{p.unitsSold}</p>
                <div className="self-center">
                  <p className="text-[13px] text-[var(--color-primary)] font-medium mb-1">{formatCurrency(p.revenue)}</p>
                  <div className="h-1.5 bg-[var(--color-cloud)]">
                    <div
                      className="h-full bg-[var(--color-primary)] opacity-60"
                      style={{ width: `${(p.revenue / maxProductRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dealer Rankings */}
      <div className="mt-8">
        <p className="section-label mb-4">Dealer Rankings by YTD Revenue</p>
        <div className="bg-white border border-[var(--color-cloud)]">
          <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
            {["#", "Dealer", "Territory", "Orders", "Revenue"].map((col) => (
              <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
                {col}
              </p>
            ))}
          </div>
          {[...adminDealers]
            .sort((a, b) => b.ytdRevenue - a.ytdRevenue)
            .slice(0, 5)
            .map((dealer, i) => {
              return (
                <div
                  key={dealer.id}
                  className="grid grid-cols-[40px_2fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-[var(--color-cloud)] last:border-b-0"
                >
                  <p className="text-[16px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-silver)]">
                    {i + 1}
                  </p>
                  <div>
                    <p className="text-[13px] text-[var(--color-primary)] font-medium">{dealer.name}</p>
                    <p className="text-[11px] text-[var(--color-body)]">{dealer.city}, {dealer.state}</p>
                  </div>
                  <p className="text-[13px] text-[var(--color-body)] self-center">{dealer.territory}</p>
                  <p className="text-[13px] text-[var(--color-body)] self-center">{dealer.totalOrders}</p>
                  <p className="text-[13px] text-[var(--color-primary)] font-medium self-center">{formatCurrency(dealer.ytdRevenue)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
