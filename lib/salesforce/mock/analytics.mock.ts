import type { DealerAnalytics } from "../types";

export const mockAnalytics: DealerAnalytics = {
  ytdSales: 342800,
  priorYearSales: 306100,
  growthPercent: 12,
  territoryRank: 3,
  totalDealers: 18,
  openOrders: 4,
  pendingLeads: 3,
  avgOrderValue: 5840,
  conversionRate: 62,
  monthlyData: [
    { month: "Mar 2025", revenue: 28400, orders: 5 },
    { month: "Apr 2025", revenue: 31200, orders: 6 },
    { month: "May 2025", revenue: 26800, orders: 4 },
    { month: "Jun 2025", revenue: 22100, orders: 4 },
    { month: "Jul 2025", revenue: 19600, orders: 3 },
    { month: "Aug 2025", revenue: 24300, orders: 4 },
    { month: "Sep 2025", revenue: 27500, orders: 5 },
    { month: "Oct 2025", revenue: 32100, orders: 6 },
    { month: "Nov 2025", revenue: 38400, orders: 7 },
    { month: "Dec 2025", revenue: 42600, orders: 8 },
    { month: "Jan 2026", revenue: 35200, orders: 6 },
    { month: "Feb 2026", revenue: 34600, orders: 5 },
  ],
  topProducts: [
    { productName: "The Skylar", unitsSold: 18, revenue: 96400 },
    { productName: "The Duke", unitsSold: 12, revenue: 82200 },
    { productName: "The Norwich", unitsSold: 9, revenue: 54000 },
    { productName: "The Tunbridge", unitsSold: 8, revenue: 45600 },
    { productName: "Viking Shuffleboard", unitsSold: 6, revenue: 38400 },
  ],
};
