"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Megaphone,
  LogOut,
  ChevronRight,
} from "lucide-react";
import DashboardPanel from "./panels/DashboardPanel";
import DealerManagementPanel from "./panels/DealerManagementPanel";
import OnboardingPanel from "./panels/OnboardingPanel";
import AnalyticsPanel from "./panels/AnalyticsPanel";
import AnnouncementsPanel from "./panels/AnnouncementsPanel";
import type { AdminSection } from "@/lib/admin/types";

const navItems: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "dealers", label: "Dealer Management", icon: Users },
  { id: "onboarding", label: "Onboard Dealer", icon: UserPlus },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "announcements", label: "Announcements", icon: Megaphone },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin-auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const renderPanel = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardPanel onNavigate={setActiveSection} />;
      case "dealers":
        return <DealerManagementPanel onNavigate={setActiveSection} />;
      case "onboarding":
        return <OnboardingPanel onComplete={() => setActiveSection("dealers")} />;
      case "analytics":
        return <AnalyticsPanel />;
      case "announcements":
        return <AnnouncementsPanel />;
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-[68px]" : "w-[260px]"
        } bg-[var(--color-primary)] flex flex-col transition-all duration-300 flex-shrink-0`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/10">
          <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
            <Image
              src="/images/brand/clb-logo.svg"
              alt="CLB"
              width={32}
              height={32}
              className="h-8 w-8 invert brightness-200"
            />
            {!sidebarCollapsed && (
              <div>
                <p className="text-white text-[13px] font-medium tracking-wide">
                  CLB Admin
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-[2px] font-[var(--font-raleway)]">
                  Operations
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all
                  ${isActive
                    ? "bg-white/10 text-white border-l-2 border-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent"
                  }
                  ${sidebarCollapsed ? "justify-center px-0" : ""}
                `}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-[12px] uppercase tracking-[1.5px] font-[var(--font-raleway)]">
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center py-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <ChevronRight
              size={16}
              className={`transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`}
            />
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white/40 hover:text-white/70 transition-colors
              ${sidebarCollapsed ? "justify-center px-0" : ""}
            `}
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-[11px] uppercase tracking-[1.5px] font-[var(--font-raleway)]">
                {loggingOut ? "Signing out..." : "Sign Out"}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[var(--color-off-white)] overflow-y-auto">
        <div className="p-8 lg:p-10">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
