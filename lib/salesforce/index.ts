/* ─── Salesforce Service Layer ───
 * When SALESFORCE_ENABLED=false (default), returns mock data.
 * When SALESFORCE_ENABLED=true, will call Salesforce REST API.
 * Components import from @/lib/salesforce and never know the difference.
 */

import type {
  DealerProfile,
  Notification,
  Announcement,
  Order,
  OrderStatus,
  OrderLineItem,
  InventoryItem,
  Lead,
  LeadStatus,
  DealerAnalytics,
  WarrantyRegistration,
  WarrantyClaim,
  SupportTicket,
  ProductConfigOptions,
} from "./types";

import { mockDealer, mockNotifications, mockAnnouncements } from "./mock/dealer.mock";
import { mockOrders } from "./mock/order.mock";
import { mockInventory } from "./mock/inventory.mock";
import { mockLeads } from "./mock/lead.mock";
import { mockAnalytics } from "./mock/analytics.mock";
import { mockRegistrations, mockWarrantyClaims } from "./mock/warranty.mock";
import { mockTickets } from "./mock/support.mock";
import { mockConfigOptions } from "./mock/configurator.mock";

/* ─── Dealer Service ─── */

export async function getDealerProfile(_dealerId?: string): Promise<DealerProfile> {
  return mockDealer;
}

export async function getNotifications(_dealerId?: string): Promise<Notification[]> {
  return mockNotifications;
}

export async function markNotificationRead(_notificationId: string): Promise<void> {
  // Mock: no-op
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return mockAnnouncements;
}

/* ─── Order Service ─── */

export async function getOrders(_dealerId?: string): Promise<Order[]> {
  return mockOrders;
}

export async function getOrder(orderId: string): Promise<Order | undefined> {
  return mockOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
}

export async function createOrder(
  _dealerId: string,
  _lineItems: OrderLineItem[]
): Promise<Order> {
  // Mock: return first order as placeholder
  return mockOrders[0];
}

export async function updateOrderStatus(
  _orderId: string,
  _status: OrderStatus
): Promise<Order> {
  return mockOrders[0];
}

/* ─── Inventory Service ─── */

export async function getInventory(): Promise<InventoryItem[]> {
  return mockInventory;
}

export async function getProductAvailability(
  productSlug: string
): Promise<InventoryItem[]> {
  return mockInventory.filter((i) => i.productSlug === productSlug);
}

/* ─── Lead Service ─── */

export async function getLeads(_dealerId?: string): Promise<Lead[]> {
  return mockLeads;
}

export async function getLead(leadId: string): Promise<Lead | undefined> {
  return mockLeads.find((l) => l.id === leadId);
}

export async function updateLeadStatus(
  _leadId: string,
  _status: LeadStatus,
  _note?: string
): Promise<Lead> {
  return mockLeads[0];
}

/* ─── Analytics Service ─── */

export async function getDealerAnalytics(
  _dealerId?: string
): Promise<DealerAnalytics> {
  return mockAnalytics;
}

/* ─── Warranty Service ─── */

export async function getWarrantyRegistrations(
  _dealerId?: string
): Promise<WarrantyRegistration[]> {
  return mockRegistrations;
}

export async function getWarrantyClaims(
  _dealerId?: string
): Promise<WarrantyClaim[]> {
  return mockWarrantyClaims;
}

export async function getWarrantyClaim(
  claimId: string
): Promise<WarrantyClaim | undefined> {
  return mockWarrantyClaims.find((c) => c.id === claimId);
}

/* ─── Support Service ─── */

export async function getSupportTickets(
  _dealerId?: string
): Promise<SupportTicket[]> {
  return mockTickets;
}

export async function getSupportTicket(
  ticketId: string
): Promise<SupportTicket | undefined> {
  return mockTickets.find((t) => t.id === ticketId);
}

/* ─── Configurator Service ─── */

export async function getConfigOptions(): Promise<ProductConfigOptions[]> {
  return mockConfigOptions;
}

export async function getProductConfig(
  productSlug: string
): Promise<ProductConfigOptions | undefined> {
  return mockConfigOptions.find((c) => c.productSlug === productSlug);
}

/* ─── Re-export types ─── */
export type * from "./types";
