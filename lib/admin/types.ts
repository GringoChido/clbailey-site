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
  | "analytics"
  | "announcements";
