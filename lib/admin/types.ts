/* ─── Admin Panel Type Definitions ─── */

export type DealerTier = "platinum" | "gold" | "silver" | "bronze";
export type DealerStatus = "active" | "inactive" | "pending";
export type AnnouncementCategory = "product_update" | "pricing" | "operations" | "marketing";
export type AnnouncementStatus = "draft" | "published" | "archived";
export type ActivityType = "order" | "lead" | "dealer" | "warranty" | "system";

export interface AdminDealer {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website?: string;
  tier: DealerTier;
  status: DealerStatus;
  joinDate: string;
  lastOrderDate: string;
  ytdRevenue: number;
  totalOrders: number;
  territory: string;
}

export interface AdminKPI {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "flat";
}

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  dealerName?: string;
}

export interface AdminAnnouncement {
  id: string;
  title: string;
  body: string;
  category: AnnouncementCategory;
  status: AnnouncementStatus;
  createdAt: string;
  publishedAt?: string;
  targetAudience: "all" | DealerTier;
}

export interface TerritoryStats {
  territory: string;
  dealerCount: number;
  totalRevenue: number;
  avgOrderValue: number;
  leadCount: number;
  conversionRate: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface ProductPerformance {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

export type AdminSection =
  | "dashboard"
  | "dealers"
  | "onboarding"
  | "orders"
  | "marketing"
  | "analytics"
  | "announcements";

export type MarketingSubTab = "enablement" | "promotions" | "campaigns";

/* ─── Sales Enablement ─── */

export type AssetCategory = "sell_sheet" | "catalog" | "brand_guide" | "campaign_kit" | "showroom" | "price_list";
export type AssetFileType = "pdf" | "zip" | "png" | "jpg";
export type AssetStatus = "active" | "draft" | "archived";

export interface MarketingAsset {
  id: string;
  name: string;
  description: string;
  category: AssetCategory;
  filename: string;
  fileType: AssetFileType;
  fileSizeKb: number;
  status: AssetStatus;
  version: string;
  uploadedAt: string;
  updatedAt: string;
  downloads: number;
  targetTier: "all" | DealerTier;
}

/* ─── Promotions ─── */

export type PromotionType = "volume_discount" | "seasonal_rebate" | "spiff" | "co_op" | "floor_model";
export type PromotionStatus = "active" | "scheduled" | "expired" | "draft";

export interface DealerPromotion {
  id: string;
  title: string;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  eligibleTiers: DealerTier[];
  eligibleProducts: string[];
  incentiveValue: string;
  redemptions: number;
  maxRedemptions: number | null;
  createdAt: string;
}

/* ─── Campaigns ─── */

export type CampaignStatus = "planning" | "active" | "completed" | "paused";
export type CampaignChannel = "email" | "co_op_digital" | "trade_show" | "direct_mail" | "social";

export interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  targetTiers: DealerTier[];
  dealersReached: number;
  leadsGenerated: number;
  budget: number;
  spent: number;
  createdAt: string;
}

/* ─── Order Management ─── */

export type AdminOrderStatus = "submitted" | "confirmed" | "in_production" | "shipped" | "delivered";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  dealerId: string;
  dealerName: string;
  status: AdminOrderStatus;
  createdDate: string;
  updatedDate: string;
  itemCount: number;
  productSummary: string;
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  territory: string;
  eta: string | null;
  trackingNumber: string | null;
  carrier: string | null;
}
