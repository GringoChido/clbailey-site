/* ─── Salesforce Object Type Definitions ─── */

/* ─── Dealer ─── */
export type DealerTier = "platinum" | "gold" | "silver" | "bronze";

export interface DealerProfile {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website?: string;
  tier: DealerTier;
  territory: string;
  territoryId: string;
  regionalRep: {
    name: string;
    email: string;
    phone: string;
  };
  primaryContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    title: string;
  };
  ytdSales: number;
  annualTarget: number;
  tierProgress: {
    currentTier: DealerTier;
    nextTier: DealerTier | null;
    amountToNextTier: number;
  };
  territoryRank: number;
  totalDealersInTerritory: number;
  joinDate: string;
}

/* ─── Orders ─── */
export type OrderStatus =
  | "draft"
  | "submitted"
  | "confirmed"
  | "in_production"
  | "shipped"
  | "delivered";

export interface OrderLineItem {
  id: string;
  productSlug: string;
  productName: string;
  model: string;
  finish: string;
  feltColor: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  accessories: string[];
}

export interface OrderStatusEvent {
  status: OrderStatus;
  date: string;
  note?: string;
}

export interface ShippingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippedDate?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  dealerId: string;
  status: OrderStatus;
  createdDate: string;
  updatedDate: string;
  lineItems: OrderLineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName?: string;
  customerEmail?: string;
  statusTimeline: OrderStatusEvent[];
  shippingInfo?: ShippingInfo;
  notes: string[];
  eta?: string;
}

/* ─── Inventory ─── */
export type AvailabilityStatus = "in_stock" | "low_stock" | "out_of_stock" | "made_to_order";

export interface InventoryItem {
  productSlug: string;
  productName: string;
  category: string;
  finish: string;
  size: string;
  availableQty: number;
  status: AvailabilityStatus;
  restockDate?: string;
  leadTimeDays: number;
  warehouse: string;
}

/* ─── Leads ─── */
export type LeadStatus = "new" | "contacted" | "qualified" | "quote_sent" | "won" | "lost";
export type LeadSource = "website" | "trade_show" | "referral" | "phone" | "campaign";

export interface LeadActivity {
  date: string;
  action: string;
  note?: string;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  location: string;
  zip: string;
  source: LeadSource;
  status: LeadStatus;
  productInterest: string;
  roomSize?: string;
  budgetRange?: string;
  createdDate: string;
  updatedDate: string;
  activities: LeadActivity[];
  notes: string[];
}

/* ─── Analytics ─── */
export interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productName: string;
  unitsSold: number;
  revenue: number;
}

export interface DealerAnalytics {
  ytdSales: number;
  priorYearSales: number;
  growthPercent: number;
  territoryRank: number;
  totalDealers: number;
  monthlyData: MonthlySales[];
  topProducts: TopProduct[];
  openOrders: number;
  pendingLeads: number;
  avgOrderValue: number;
  conversionRate: number;
}

/* ─── Warranty ─── */
export type WarrantyClaimStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "parts_shipped"
  | "resolved";

export interface WarrantyRegistration {
  id: string;
  serialNumber: string;
  productName: string;
  productSlug: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryDate: string;
  installerName: string;
  registrationDate: string;
  warrantyExpiration: string;
  dealerId: string;
}

export interface WarrantyClaimMessage {
  date: string;
  author: string;
  message: string;
}

export interface WarrantyClaim {
  id: string;
  claimNumber: string;
  registrationId: string;
  serialNumber: string;
  productName: string;
  customerName: string;
  issueDescription: string;
  requestedResolution: string;
  status: WarrantyClaimStatus;
  photos: string[];
  createdDate: string;
  updatedDate: string;
  statusTimeline: { status: WarrantyClaimStatus; date: string; note?: string }[];
  messages: WarrantyClaimMessage[];
}

/* ─── Support ─── */
export type TicketCategory =
  | "order_issue"
  | "warranty_claim"
  | "product_question"
  | "marketing_request"
  | "portal_help"
  | "other";

export type TicketPriority = "standard" | "urgent";
export type TicketStatus = "open" | "in_progress" | "awaiting_response" | "resolved";

export interface TicketMessage {
  date: string;
  author: string;
  message: string;
  isInternal: boolean;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  dealerId: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  attachments: string[];
  createdDate: string;
  updatedDate: string;
  messages: TicketMessage[];
}

/* ─── Notifications ─── */
export type NotificationType =
  | "new_lead"
  | "order_update"
  | "announcement"
  | "price_update"
  | "product_launch";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  date: string;
  read: boolean;
  linkTo?: string;
  linkTab?: string;
}

/* ─── Announcements ─── */
export type AnnouncementCategory = "product_update" | "pricing" | "operations" | "marketing";

export interface Announcement {
  id: string;
  date: string;
  title: string;
  body: string;
  category: AnnouncementCategory;
  actionLabel?: string;
  actionTab?: string;
  actionHref?: string;
}

/* ─── Quote ─── */
export interface QuoteConfiguration {
  productSlug: string;
  productName: string;
  category: string;
  finish: string;
  feltColor: string;
  size: string;
  accessories: string[];
  dealerCost: number;
  msrp: number;
}

export interface QuoteRequest {
  configurations: QuoteConfiguration[];
  customerName: string;
  customerEmail?: string;
  dealerNote?: string;
  deliveryFee: number;
  installationFee: number;
}

/* ─── Product Configuration Options ─── */
export interface FinishOption {
  id: string;
  name: string;
  colorHex: string;
}

export interface FeltColorOption {
  id: string;
  name: string;
  colorHex: string;
}

export interface ProductConfigOptions {
  productSlug: string;
  finishes: FinishOption[];
  feltColors: FeltColorOption[];
  sizes: string[];
  accessories: { id: string; name: string; price: number }[];
  dealerCost: Record<string, number>;
  msrp: Record<string, number>;
}

/* ─── Service Interfaces ─── */
export interface DealerService {
  getProfile(dealerId: string): Promise<DealerProfile>;
  getNotifications(dealerId: string): Promise<Notification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  getAnnouncements(): Promise<Announcement[]>;
}

export interface OrderService {
  getOrders(dealerId: string): Promise<Order[]>;
  getOrder(orderId: string): Promise<Order>;
  createOrder(dealerId: string, lineItems: OrderLineItem[]): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
}

export interface InventoryService {
  getInventory(): Promise<InventoryItem[]>;
  getProductAvailability(productSlug: string): Promise<InventoryItem[]>;
  requestNotification(dealerId: string, productSlug: string, finish: string): Promise<void>;
}

export interface LeadService {
  getLeads(dealerId: string): Promise<Lead[]>;
  getLead(leadId: string): Promise<Lead>;
  updateLeadStatus(leadId: string, status: LeadStatus, note?: string): Promise<Lead>;
  addLeadNote(leadId: string, note: string): Promise<Lead>;
}

export interface AnalyticsService {
  getDealerAnalytics(dealerId: string): Promise<DealerAnalytics>;
}

export interface WarrantyService {
  getRegistrations(dealerId: string): Promise<WarrantyRegistration[]>;
  registerWarranty(registration: Omit<WarrantyRegistration, "id" | "registrationDate" | "warrantyExpiration">): Promise<WarrantyRegistration>;
  getClaims(dealerId: string): Promise<WarrantyClaim[]>;
  getClaim(claimId: string): Promise<WarrantyClaim>;
  submitClaim(claim: Omit<WarrantyClaim, "id" | "claimNumber" | "createdDate" | "updatedDate" | "statusTimeline" | "messages">): Promise<WarrantyClaim>;
  addClaimMessage(claimId: string, message: string): Promise<WarrantyClaim>;
}

export interface SupportService {
  getTickets(dealerId: string): Promise<SupportTicket[]>;
  getTicket(ticketId: string): Promise<SupportTicket>;
  createTicket(ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdDate" | "updatedDate" | "messages">): Promise<SupportTicket>;
  addTicketMessage(ticketId: string, message: string): Promise<SupportTicket>;
}
