import type { ProductConfigOptions } from "../types";

export const mockConfigOptions: ProductConfigOptions[] = [
  {
    productSlug: "skylar",
    finishes: [
      { id: "espresso", name: "Espresso", colorHex: "#3c2415" },
      { id: "graphite", name: "Graphite", colorHex: "#4a4a4a" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
      { id: "red", name: "Red", colorHex: "#8b2e2e" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "dining-top", name: "Dining Top Conversion", price: 800 },
    ],
    dealerCost: { "7'": 3000, "8'": 3200 },
    msrp: { "7'": 4995, "8'": 5495 },
  },
  {
    productSlug: "viking",
    finishes: [
      { id: "weathered-oak", name: "Weathered Oak", colorHex: "#8b7d6b" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
      { id: "red", name: "Red", colorHex: "#8b2e2e" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "cue-rack", name: "Matching Cue Rack", price: 450 },
    ],
    dealerCost: { "7'": 3100, "8'": 3400 },
    msrp: { "7'": 5195, "8'": 5695 },
  },
  {
    productSlug: "dutchess",
    finishes: [
      { id: "espresso", name: "Espresso", colorHex: "#3c2415" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
    ],
    dealerCost: { "7'": 2600, "8'": 2800 },
    msrp: { "7'": 4295, "8'": 4695 },
  },
  {
    productSlug: "tunbridge",
    finishes: [
      { id: "espresso", name: "Espresso", colorHex: "#3c2415" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "red", name: "Red", colorHex: "#8b2e2e" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "cue-rack", name: "Matching Cue Rack", price: 420 },
    ],
    dealerCost: { "7'": 3200, "8'": 3400 },
    msrp: { "7'": 5295, "8'": 5795 },
  },
  {
    productSlug: "duke",
    finishes: [
      { id: "natural-walnut", name: "Natural Walnut", colorHex: "#6b4e37" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "cue-rack", name: "Matching Cue Rack", price: 480 },
    ],
    dealerCost: { "7'": 3800, "8'": 4100 },
    msrp: { "7'": 6295, "8'": 6895 },
  },
  {
    productSlug: "norwich",
    finishes: [
      { id: "natural-walnut", name: "Natural Walnut", colorHex: "#6b4e37" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "cue-rack", name: "Matching Cue Rack", price: 520 },
    ],
    dealerCost: { "7'": 3400, "8'": 3600 },
    msrp: { "7'": 5695, "8'": 6195 },
  },
  {
    productSlug: "elayna",
    finishes: [
      { id: "espresso", name: "Espresso", colorHex: "#3c2415" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
    ],
    dealerCost: { "7'": 2400, "8'": 2600 },
    msrp: { "7'": 3995, "8'": 4395 },
  },
  {
    productSlug: "adrian",
    finishes: [
      { id: "natural-walnut", name: "Natural Walnut", colorHex: "#6b4e37" },
    ],
    feltColors: [
      { id: "navy", name: "Navy", colorHex: "#1b2a4a" },
      { id: "burgundy", name: "Burgundy", colorHex: "#6b2c3e" },
      { id: "forest-green", name: "Forest Green", colorHex: "#2d5a3d" },
      { id: "camel", name: "Camel", colorHex: "#c4a87c" },
      { id: "steel-gray", name: "Steel Gray", colorHex: "#7a7d82" },
    ],
    sizes: ["7'", "8'"],
    accessories: [
      { id: "accessory-kit", name: "Accessory Kit", price: 350 },
      { id: "table-cover", name: "Table Cover", price: 120 },
      { id: "cue-rack", name: "Matching Cue Rack", price: 440 },
    ],
    dealerCost: { "7'": 2800, "8'": 3000 },
    msrp: { "7'": 4695, "8'": 5095 },
  },
];
