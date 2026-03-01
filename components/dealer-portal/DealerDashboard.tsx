"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import KPICard from "./KPICard";
import DealerTierBadge from "./DealerTierBadge";
import NotificationBell from "./NotificationBell";
import OverviewPanel from "./panels/OverviewPanel";
import OrdersPanel from "./panels/OrdersPanel";
import ConfiguratorPanel from "./panels/ConfiguratorPanel";
import InventoryPanel from "./panels/InventoryPanel";
import LeadsPanel from "./panels/LeadsPanel";
import DownloadsPanel from "./panels/DownloadsPanel";
import AccountPanel from "./panels/AccountPanel";
import WarrantyPanel from "./panels/WarrantyPanel";
import SupportPanel from "./panels/SupportPanel";
import TrainingPanel from "./panels/TrainingPanel";
import { mockDealer, mockNotifications } from "@/lib/salesforce/mock/dealer.mock";
import { mockAnalytics } from "@/lib/salesforce/mock/analytics.mock";
import type { Notification } from "@/lib/salesforce/types";

type Tab =
  | "overview"
  | "orders"
  | "configurator"
  | "inventory"
  | "leads"
  | "downloads"
  | "account"
  | "warranty"
  | "support"
  | "training";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "configurator", label: "Configurator" },
  { id: "inventory", label: "Inventory" },
  { id: "leads", label: "Leads" },
  { id: "downloads", label: "Downloads" },
  { id: "account", label: "Account" },
  { id: "warranty", label: "Warranty" },
  { id: "support", label: "Support" },
  { id: "training", label: "Training" },
];

export default function DealerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loggingOut, setLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dealer = mockDealer;
  const analytics = mockAnalytics;

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/dealer-auth/logout", { method: "POST" });
    router.push("/dealer-portal/login");
    router.refresh();
  };

  const handleNotificationClick = (n: Notification) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );
    if (n.linkTab) {
      setActiveTab(n.linkTab as Tab);
    }
  };

  return (
    <div>
      {/* Dealer Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <Image
              src="/images/brand/clb-logo.png"
              alt="The C.L. Bailey Co. — Tomball, Texas"
              width={180}
              height={49}
              className="h-[40px] w-auto mb-4"
            />
            <h1 className="heading-sub">Welcome back, {dealer.primaryContact.firstName}</h1>
            <div className="flex items-center gap-3 mt-2">
              <DealerTierBadge tier={dealer.tier} />
              <span className="text-body text-xs">
                Territory: {dealer.territory} | Regional Rep: {dealer.regionalRep.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <KPICard
          value={`$${(analytics.ytdSales / 1000).toFixed(0)}k`}
          label="YTD Sales"
          trend={{ direction: "up", value: `${analytics.growthPercent}%` }}
        />
        <KPICard
          value={String(analytics.openOrders)}
          label="Open Orders"
          onClick={() => setActiveTab("orders")}
        />
        <KPICard
          value={`#${analytics.territoryRank}`}
          label="Territory Rank"
        />
        <KPICard
          value={String(analytics.pendingLeads)}
          label="Pending Leads"
          onClick={() => setActiveTab("leads")}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-cloud mb-10 overflow-x-auto">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 whitespace-nowrap metadata transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-silver hover:text-mid-gray"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="metadata text-silver hover:text-primary transition-colors duration-300 pb-3 ml-6 flex-shrink-0"
        >
          {loggingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewPanel onTabChange={(tab) => setActiveTab(tab as Tab)} />}
      {activeTab === "orders" && <OrdersPanel />}
      {activeTab === "configurator" && <ConfiguratorPanel />}
      {activeTab === "inventory" && <InventoryPanel />}
      {activeTab === "leads" && <LeadsPanel />}
      {activeTab === "downloads" && <DownloadsPanel />}
      {activeTab === "account" && <AccountPanel />}
      {activeTab === "warranty" && <WarrantyPanel />}
      {activeTab === "support" && <SupportPanel />}
      {activeTab === "training" && <TrainingPanel />}
    </div>
  );
}
