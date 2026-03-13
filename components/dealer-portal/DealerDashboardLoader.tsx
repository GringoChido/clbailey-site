"use client";

import dynamic from "next/dynamic";

const DealerDashboard = dynamic(
  () => import("@/components/dealer-portal/DealerDashboard"),
  { ssr: false }
);

const DealerDashboardLoader = () => {
  return <DealerDashboard />;
};

export default DealerDashboardLoader;
