"use client";

import { useState } from "react";
import { mockOrders } from "@/lib/salesforce/mock/order.mock";
import StatusBadge from "../StatusBadge";
import StatusTimeline from "../StatusTimeline";
import type { Order, OrderStatus } from "@/lib/salesforce/types";

const statusSteps: OrderStatus[] = ["submitted", "confirmed", "in_production", "shipped", "delivered"];

const statusLabels: Record<OrderStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  confirmed: "Confirmed",
  in_production: "In Production",
  shipped: "Shipped",
  delivered: "Delivered",
};

type FilterStatus = "all" | OrderStatus;

export default function OrdersPanel() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const orders = mockOrders;

  const filteredOrders =
    filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {(["all", ...statusSteps, "draft"] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`metadata px-3 py-1.5 transition-colors duration-200 ${
                filterStatus === s
                  ? "bg-primary text-white"
                  : "bg-cloud/50 text-mid-gray hover:bg-cloud"
              }`}
            >
              {s === "all" ? "All" : statusLabels[s as OrderStatus]}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="border-t border-cloud">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[120px_100px_1fr_120px_100px_100px] gap-4 py-3 px-4">
          <span className="metadata">Order #</span>
          <span className="metadata">Date</span>
          <span className="metadata">Items</span>
          <span className="metadata">Status</span>
          <span className="metadata text-right">Total</span>
          <span className="metadata text-right">ETA</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="heading-sub mb-2">No orders found</p>
            <p className="text-xs text-body">Try adjusting your filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="w-full grid grid-cols-1 md:grid-cols-[120px_100px_1fr_120px_100px_100px] gap-2 md:gap-4 py-4 px-4 border-b border-cloud text-left hover:bg-off-white transition-colors duration-200"
            >
              <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                {order.orderNumber}
              </span>
              <span className="text-xs text-body">
                {new Date(order.createdDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-xs text-body line-clamp-1">
                {order.lineItems.map((li) => `${li.quantity}x ${li.productName}`).join(", ")}
              </span>
              <span>
                <StatusBadge status={order.status} />
              </span>
              <span className="text-xs text-primary text-right font-[family-name:var(--font-display)]">
                ${order.total.toLocaleString()}
              </span>
              <span className="text-xs text-body text-right">
                {order.eta
                  ? new Date(order.eta).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "\u2014"}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Order Detail Sub-view ─── */

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const timelineSteps = statusSteps.map((step) => {
    const event = order.statusTimeline.find((e) => e.status === step);
    const currentIdx = statusSteps.indexOf(order.status);
    const stepIdx = statusSteps.indexOf(step);
    return {
      label: statusLabels[step],
      date: event?.date,
      note: event?.note,
      completed: stepIdx <= currentIdx && order.status !== "draft",
      active: step === order.status,
    };
  });

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Orders
      </button>

      {/* Order header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-card text-xl">{order.orderNumber}</h2>
          <p className="text-xs text-body mt-1">
            Placed{" "}
            {new Date(order.createdDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {order.customerName && ` for ${order.customerName}`}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Status Timeline */}
      {order.status !== "draft" && (
        <div className="mb-10 border border-cloud p-6">
          <p className="section-label mb-2">Order Progress</p>
          <StatusTimeline steps={timelineSteps} />
        </div>
      )}

      {/* Line Items */}
      <div className="mb-10">
        <p className="section-label mb-4">Items</p>
        <div className="border-t border-cloud">
          {order.lineItems.map((li) => (
            <div
              key={li.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_100px_80px_100px] gap-2 md:gap-4 py-4 border-b border-cloud"
            >
              <div>
                <p className="heading-card text-sm">{li.productName}</p>
                <p className="text-[11px] text-body mt-0.5">
                  {li.finish} {li.feltColor && `/ ${li.feltColor} felt`} / {li.size}
                </p>
                {li.accessories.length > 0 && (
                  <p className="text-[11px] text-silver mt-0.5">
                    + {li.accessories.join(", ")}
                  </p>
                )}
              </div>
              <p className="text-xs text-body">
                ${li.unitPrice.toLocaleString()} each
              </p>
              <p className="text-xs text-body">Qty: {li.quantity}</p>
              <p className="text-xs text-primary text-right font-[family-name:var(--font-display)]">
                ${li.totalPrice.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end gap-1 mt-4">
          <div className="flex gap-8">
            <span className="text-xs text-body">Subtotal</span>
            <span className="text-xs text-primary w-24 text-right">${order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex gap-8">
            <span className="text-xs text-body">Shipping</span>
            <span className="text-xs text-primary w-24 text-right">${order.shipping.toLocaleString()}</span>
          </div>
          <div className="flex gap-8 pt-2 border-t border-cloud mt-2">
            <span className="metadata">Total</span>
            <span className="font-[family-name:var(--font-display)] text-lg text-primary w-24 text-right">
              ${order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {order.shippingInfo && (
        <div className="mb-10">
          <p className="section-label mb-4">Shipping</p>
          <div className="border border-cloud p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="metadata mb-1">Carrier</p>
              <p className="text-xs text-primary">{order.shippingInfo.carrier}</p>
            </div>
            <div>
              <p className="metadata mb-1">Tracking</p>
              <p className="text-xs text-primary">{order.shippingInfo.trackingNumber}</p>
            </div>
            <div>
              <p className="metadata mb-1">Shipped</p>
              <p className="text-xs text-body">
                {order.shippingInfo.shippedDate
                  ? new Date(order.shippingInfo.shippedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Pending"}
              </p>
            </div>
            <div>
              <p className="metadata mb-1">Est. Delivery</p>
              <p className="text-xs text-body">
                {new Date(order.shippingInfo.estimatedDelivery).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notes.length > 0 && (
        <div>
          <p className="section-label mb-4">Notes</p>
          <div className="space-y-2">
            {order.notes.map((note, i) => (
              <p key={i} className="text-xs text-body border-l-2 border-cloud pl-3 py-1">
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
