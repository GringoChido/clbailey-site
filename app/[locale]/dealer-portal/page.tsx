import type { Metadata } from "next";
import DealerDashboard from "@/components/dealer-portal/DealerDashboard";

export const metadata: Metadata = {
  title: "Dealer Portal",
  description: "Authorized dealer portal for The C.L. Bailey Co. Access product specs, marketing materials, pricing, and dealer resources.",
  robots: { index: false, follow: false },
};

export default async function DealerPortalPage() {
  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="animate-fade-up">
          <DealerDashboard />
        </div>
      </div>
    </div>
  );
}
