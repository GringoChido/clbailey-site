"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Truck,
  Clock,
  Package,
  CheckCircle2,
  X,
} from "lucide-react";
import { adminOrders } from "@/lib/admin/mock-data";
import type { AdminOrder, AdminOrderStatus } from "@/lib/admin/types";

const statusConfig: Record<AdminOrderStatus, { dot: string; text: string; label: string }> = {
  submitted: { dot: "bg-amber-500", text: "text-amber-600", label: "Submitted" },
  confirmed: { dot: "bg-blue-500", text: "text-blue-600", label: "Confirmed" },
  in_production: { dot: "bg-[var(--color-primary)]", text: "text-[var(--color-primary)]", label: "In Production" },
  shipped: { dot: "bg-emerald-500", text: "text-emerald-600", label: "Shipped" },
  delivered: { dot: "bg-[var(--color-mid-gray)]", text: "text-[var(--color-mid-gray)]", label: "Delivered" },
};

const statusFlow: AdminOrderStatus[] = ["submitted", "confirmed", "in_production", "shipped", "delivered"];

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function OrderManagementPanel() {
  const [orders, setOrders] = useState(adminOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.dealerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.productSummary.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const submitted = orders.filter((o) => o.status === "submitted").length;
  const confirmed = orders.filter((o) => o.status === "confirmed").length;
  const inProduction = orders.filter((o) => o.status === "in_production").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const advanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const idx = statusFlow.indexOf(o.status);
        if (idx >= statusFlow.length - 1) return o;
        return { ...o, status: statusFlow[idx + 1], updatedDate: new Date().toISOString().split("T")[0] };
      })
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Administration</p>
        <h1 className="heading-display text-[28px]">Order Management</h1>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Orders", value: orders.length.toString() },
          { label: "Submitted", value: (submitted + confirmed).toString() },
          { label: "In Production", value: inProduction.toString() },
          { label: "Shipped", value: shipped.toString() },
          { label: "YTD Revenue", value: formatCurrency(totalRevenue) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-[var(--color-cloud)] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-1">
              {label}
            </p>
            <p className="text-[22px] font-[var(--font-roboto-condensed)] font-light text-[var(--color-primary)]">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-silver)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number, dealer, customer, or product..."
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
            Status:
          </span>
          {(["all", ...statusFlow] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-[1px] border transition-colors ${
                statusFilter === s
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : "border-[var(--color-cloud)] text-[var(--color-body)] hover:border-[var(--color-silver)]"
              }`}
            >
              {s === "in_production" ? "Production" : s}
            </button>
          ))}
          {statusFilter !== "all" && (
            <button onClick={() => setStatusFilter("all")} className="ml-2 text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]">
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Order table */}
      <div className="bg-white border border-[var(--color-cloud)]">
        {/* Table header */}
        <div className="grid grid-cols-[1.2fr_1.5fr_2fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-[var(--color-cloud)] bg-[var(--color-off-white)]">
          {["Order #", "Dealer", "Products", "Status", "Total", "Date", ""].map((col) => (
            <p key={col} className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
              {col}
            </p>
          ))}
        </div>

        {/* Table rows */}
        {filtered.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            expanded={expandedId === order.id}
            onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
            onAdvance={() => advanceStatus(order.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-[var(--color-body)]">No orders match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderRow({
  order,
  expanded,
  onToggle,
  onAdvance,
}: {
  order: AdminOrder;
  expanded: boolean;
  onToggle: () => void;
  onAdvance: () => void;
}) {
  const status = statusConfig[order.status];
  const canAdvance = order.status !== "delivered";

  return (
    <div className={`border-b border-[var(--color-cloud)] last:border-b-0 ${expanded ? "bg-[var(--color-whisper)]" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full grid grid-cols-[1.2fr_1.5fr_2fr_1fr_1fr_1fr_40px] gap-4 px-5 py-4 text-left hover:bg-[var(--color-whisper)] transition-colors"
      >
        <p className="heading-card text-[14px] self-center">{order.orderNumber}</p>
        <div className="self-center">
          <p className="text-[13px] text-[var(--color-primary)]">{order.dealerName}</p>
          <p className="text-[11px] text-[var(--color-body)]">{order.territory}</p>
        </div>
        <p className="text-[12px] text-[var(--color-body)] self-center truncate">{order.productSummary}</p>
        <div className="self-center flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className={`text-[12px] ${status.text}`}>{status.label}</span>
        </div>
        <p className="text-[13px] text-[var(--color-primary)] self-center font-medium">
          {formatCurrency(order.total)}
        </p>
        <p className="text-[12px] text-[var(--color-body)] self-center">
          {formatDate(order.createdDate)}
        </p>
        <div className="self-center flex justify-center">
          {expanded ? <ChevronUp size={14} className="text-[var(--color-mid-gray)]" /> : <ChevronDown size={14} className="text-[var(--color-silver)]" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5 animate-fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-white border border-[var(--color-cloud)]">
            {/* Order Details */}
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Order Details
              </p>
              <p className="text-[13px] text-[var(--color-primary)] font-medium mb-1">
                {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
              </p>
              <p className="text-[12px] text-[var(--color-body)] mb-1">{order.productSummary}</p>
              <div className="mt-2 space-y-1 text-[12px] text-[var(--color-body)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between font-medium text-[var(--color-primary)]">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Customer */}
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Customer
              </p>
              <p className="text-[13px] text-[var(--color-primary)] font-medium mb-1">{order.customerName}</p>
              <p className="text-[12px] text-[var(--color-body)]">via {order.dealerName}</p>
            </div>

            {/* Shipping */}
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Shipping
              </p>
              {order.carrier ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)]">
                    <Truck size={11} /> {order.carrier}
                  </div>
                  {order.trackingNumber && (
                    <p className="text-[12px] text-[var(--color-body)]">
                      Tracking: <span className="font-medium text-[var(--color-primary)]">{order.trackingNumber}</span>
                    </p>
                  )}
                  {order.eta && (
                    <div className="flex items-center gap-2 text-[12px] text-[var(--color-body)]">
                      <Clock size={11} /> ETA: {formatDate(order.eta)}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[12px] text-[var(--color-body)]">Not yet assigned</p>
              )}
            </div>

            {/* Status & Actions */}
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-2">
                Status
              </p>
              <div className="flex items-center gap-4 mb-3">
                {statusFlow.map((s, i) => {
                  const isCurrent = s === order.status;
                  const isPast = statusFlow.indexOf(order.status) > i;
                  return (
                    <div key={s} className="flex items-center gap-1">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isPast ? "bg-emerald-500" : isCurrent ? statusConfig[s].dot : "bg-[var(--color-cloud)]"
                        }`}
                      />
                      {i < statusFlow.length - 1 && (
                        <div className={`w-4 h-px ${isPast ? "bg-emerald-500" : "bg-[var(--color-cloud)]"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-[12px] text-[var(--color-body)] mb-3">
                Last updated {formatDate(order.updatedDate)}
              </p>
              <div className="flex gap-2">
                {canAdvance && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdvance();
                    }}
                    className="btn-primary text-[11px] px-3 py-1.5 flex items-center gap-1.5"
                  >
                    {order.status === "submitted" && <><CheckCircle2 size={12} /> Confirm</>}
                    {order.status === "confirmed" && <><Package size={12} /> Start Production</>}
                    {order.status === "in_production" && <><Truck size={12} /> Mark Shipped</>}
                    {order.status === "shipped" && <><CheckCircle2 size={12} /> Mark Delivered</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
