"use client";

import { mockDealer } from "@/lib/salesforce/mock/dealer.mock";
import { mockAnalytics } from "@/lib/salesforce/mock/analytics.mock";
import DealerTierBadge from "../DealerTierBadge";
import ProgressBar from "../ProgressBar";

export default function AccountPanel() {
  const dealer = mockDealer;
  const analytics = mockAnalytics;

  return (
    <div className="space-y-14">
      {/* Dealer Profile */}
      <div>
        <p className="section-label mb-4">Dealer Profile</p>
        <div className="border border-cloud p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="heading-card text-lg">{dealer.name}</h3>
              <p className="text-xs text-body mt-1">
                {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
              </p>
            </div>
            <DealerTierBadge tier={dealer.tier} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-cloud">
            <div>
              <p className="metadata mb-1">Primary Contact</p>
              <p className="text-xs text-primary">
                {dealer.primaryContact.firstName} {dealer.primaryContact.lastName}
              </p>
              <p className="text-xs text-body">{dealer.primaryContact.title}</p>
              <p className="text-xs text-body">{dealer.primaryContact.email}</p>
              <p className="text-xs text-body">{dealer.primaryContact.phone}</p>
            </div>
            <div>
              <p className="metadata mb-1">Regional Sales Manager</p>
              <p className="text-xs text-primary">{dealer.regionalRep.name}</p>
              <p className="text-xs text-body">{dealer.regionalRep.email}</p>
              <p className="text-xs text-body">{dealer.regionalRep.phone}</p>
            </div>
            <div>
              <p className="metadata mb-1">Territory</p>
              <p className="text-xs text-primary">{dealer.territory}</p>
              <p className="text-xs text-body mt-1">
                Rank #{dealer.territoryRank} of {dealer.totalDealersInTerritory} dealers
              </p>
              <p className="text-xs text-body">
                Member since {new Date(dealer.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-cloud">
            <button className="btn-outline text-[10px] px-4 py-2">
              Request Profile Update
            </button>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div>
        <p className="section-label mb-4">Performance Summary</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-cloud p-6">
            <p className="metadata mb-3">YTD Sales vs. Target</p>
            <ProgressBar current={dealer.ytdSales} target={dealer.annualTarget} />
            <div className="mt-4">
              <p className="text-xs text-body">
                Average order value: ${analytics.avgOrderValue.toLocaleString()}
              </p>
              <p className="text-xs text-body">
                Lead conversion rate: {analytics.conversionRate}%
              </p>
            </div>
          </div>

          <div className="border border-cloud p-6">
            <p className="metadata mb-3">Tier Progress</p>
            <div className="flex items-center gap-3 mb-3">
              <DealerTierBadge tier={dealer.tier} />
              {dealer.tierProgress.nextTier && (
                <>
                  <span className="text-silver">&rarr;</span>
                  <span className="metadata text-silver">
                    {dealer.tierProgress.nextTier.charAt(0).toUpperCase() +
                      dealer.tierProgress.nextTier.slice(1)}
                  </span>
                </>
              )}
            </div>
            {dealer.tierProgress.nextTier && (
              <p className="text-xs text-body">
                You are ${dealer.tierProgress.amountToNextTier.toLocaleString()} away from{" "}
                {dealer.tierProgress.nextTier.charAt(0).toUpperCase() +
                  dealer.tierProgress.nextTier.slice(1)}{" "}
                status.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div>
        <p className="section-label mb-4">Support</p>
        <div className="border border-cloud p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="metadata mb-1">Email</p>
              <p className="text-xs text-primary">info@clbailey.com</p>
            </div>
            <div>
              <p className="metadata mb-1">Phone</p>
              <p className="text-xs text-primary">877-258-1963</p>
            </div>
            <div>
              <p className="metadata mb-1">Hours</p>
              <p className="text-xs text-body">Mon through Thu: 8:00 AM to 4:30 PM CST</p>
              <p className="text-xs text-body">Fri: 8:00 AM to 12:00 PM CST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
