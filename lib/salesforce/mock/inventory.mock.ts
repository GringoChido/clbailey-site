import type { InventoryItem } from "../types";

export const mockInventory: InventoryItem[] = [
  // Pool Tables
  { productSlug: "skylar", productName: "The Skylar", category: "pool-tables", finish: "Espresso", size: "7'", availableQty: 8, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "skylar", productName: "The Skylar", category: "pool-tables", finish: "Espresso", size: "8'", availableQty: 5, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "skylar", productName: "The Skylar", category: "pool-tables", finish: "Graphite", size: "7'", availableQty: 3, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "skylar", productName: "The Skylar", category: "pool-tables", finish: "Graphite", size: "8'", availableQty: 2, status: "low_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "viking", productName: "The Viking", category: "pool-tables", finish: "Weathered Oak", size: "7'", availableQty: 6, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "viking", productName: "The Viking", category: "pool-tables", finish: "Weathered Oak", size: "8'", availableQty: 4, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "dutchess", productName: "The Dutchess", category: "pool-tables", finish: "Espresso", size: "7'", availableQty: 7, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "dutchess", productName: "The Dutchess", category: "pool-tables", finish: "Espresso", size: "8'", availableQty: 3, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "tunbridge", productName: "The Tunbridge", category: "pool-tables", finish: "Espresso", size: "7'", availableQty: 4, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "tunbridge", productName: "The Tunbridge", category: "pool-tables", finish: "Espresso", size: "8'", availableQty: 1, status: "low_stock", leadTimeDays: 14, warehouse: "Central (Tomball, TX)", restockDate: "2026-03-15" },
  { productSlug: "duke", productName: "The Duke", category: "pool-tables", finish: "Natural Walnut", size: "7'", availableQty: 5, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "duke", productName: "The Duke", category: "pool-tables", finish: "Natural Walnut", size: "8'", availableQty: 2, status: "low_stock", leadTimeDays: 14, warehouse: "Central (Tomball, TX)", restockDate: "2026-03-20" },
  { productSlug: "norwich", productName: "The Norwich", category: "pool-tables", finish: "Natural Walnut", size: "7'", availableQty: 3, status: "in_stock", leadTimeDays: 10, warehouse: "Central (Tomball, TX)" },
  { productSlug: "norwich", productName: "The Norwich", category: "pool-tables", finish: "Natural Walnut", size: "8'", availableQty: 0, status: "out_of_stock", leadTimeDays: 28, warehouse: "Central (Tomball, TX)", restockDate: "2026-04-01" },
  { productSlug: "elayna", productName: "The Elayna", category: "pool-tables", finish: "Espresso", size: "7'", availableQty: 6, status: "in_stock", leadTimeDays: 5, warehouse: "Central (Tomball, TX)" },
  { productSlug: "elayna", productName: "The Elayna", category: "pool-tables", finish: "Espresso", size: "8'", availableQty: 4, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "adrian", productName: "The Adrian", category: "pool-tables", finish: "Natural Walnut", size: "7'", availableQty: 4, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "adrian", productName: "The Adrian", category: "pool-tables", finish: "Natural Walnut", size: "8'", availableQty: 0, status: "made_to_order", leadTimeDays: 42, warehouse: "Central (Tomball, TX)" },

  // Shuffleboards
  { productSlug: "viking-shuffleboard", productName: "Viking Shuffleboard", category: "shuffleboards", finish: "Weathered Oak", size: "9'", availableQty: 3, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "viking-shuffleboard", productName: "Viking Shuffleboard", category: "shuffleboards", finish: "Weathered Oak", size: "12'", availableQty: 2, status: "low_stock", leadTimeDays: 10, warehouse: "Central (Tomball, TX)" },
  { productSlug: "viking-shuffleboard", productName: "Viking Shuffleboard", category: "shuffleboards", finish: "Weathered Oak", size: "14'", availableQty: 0, status: "made_to_order", leadTimeDays: 42, warehouse: "Central (Tomball, TX)" },
  { productSlug: "skylar-shuffleboard", productName: "Skylar Shuffleboard", category: "shuffleboards", finish: "Espresso", size: "9'", availableQty: 4, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "skylar-shuffleboard", productName: "Skylar Shuffleboard", category: "shuffleboards", finish: "Espresso", size: "12'", availableQty: 1, status: "low_stock", leadTimeDays: 14, warehouse: "Central (Tomball, TX)", restockDate: "2026-03-10" },
  { productSlug: "tunbridge-shuffleboard", productName: "Tunbridge Shuffleboard", category: "shuffleboards", finish: "Espresso", size: "9'", availableQty: 3, status: "in_stock", leadTimeDays: 7, warehouse: "Central (Tomball, TX)" },
  { productSlug: "tunbridge-shuffleboard", productName: "Tunbridge Shuffleboard", category: "shuffleboards", finish: "Espresso", size: "12'", availableQty: 2, status: "in_stock", leadTimeDays: 10, warehouse: "Central (Tomball, TX)" },
];
