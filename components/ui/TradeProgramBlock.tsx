"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function TradeProgramBlock() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tradeBlock");
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;
    router.push(`/${locale}/dealer?zip=${zip}`);
  };

  return (
    <section className="bg-[var(--color-cloud)] py-16 lg:py-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Become an Authorized Dealer */}
          <div>
            <h3 className="heading-card mb-4">{t("tradeHeading")}</h3>
            <p className="text-[13px] leading-[26px] text-[var(--color-body)] mb-6">
              {t("tradeDescription")}
            </p>
            <Link href={`/${locale}/contact-us`} className="btn-outline">
              {t("tradeCta")}
            </Link>
          </div>

          {/* Find a Dealer */}
          <div>
            <p className="section-label mb-4">{t("dealerLabel")}</p>
            <h3 className="heading-card mb-4">{t("dealerHeading")}</h3>
            <p className="text-[13px] leading-[26px] text-[var(--color-body)] mb-6">
              {t("dealerDescription")}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder={t("zipPlaceholder")}
                maxLength={5}
                inputMode="numeric"
                className="input-modern flex-1"
              />
              <button
                type="submit"
                disabled={zip.length !== 5}
                className="btn-primary disabled:opacity-40"
              >
                {t("searchCta")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
