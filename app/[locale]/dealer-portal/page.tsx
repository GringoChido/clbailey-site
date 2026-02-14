import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DealerDashboard from "@/components/dealer/DealerDashboard";

export const metadata: Metadata = {
  title: "Dealer Portal",
  description: "Authorized dealer portal for The C.L. Bailey Co. Access product specs, marketing materials, pricing, and dealer resources.",
  robots: { index: false, follow: false },
};

export default async function DealerPortalPage() {
  const t = await getTranslations("dealerPortal");

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-4 animate-fade-up">
          {t("title")}
        </h1>
        <p className="text-brown/60 max-w-lg mb-12 animate-fade-up animate-delay-1">
          {t("welcomeBack")}
        </p>

        <div className="animate-fade-up animate-delay-2">
          <DealerDashboard />
        </div>
      </div>
    </div>
  );
}
