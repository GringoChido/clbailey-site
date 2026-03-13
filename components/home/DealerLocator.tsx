"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function DealerLocator() {
  const [zip, setZip] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("dealerLocator");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = zip.trim();
    router.push(query ? `/${locale}/dealer?zip=${query}` : `/${locale}/dealer`);
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-deep)]">
      {/* Layered radial gradients for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 100%, rgba(168,146,121,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 0%, rgba(212,201,184,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(168,146,121,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Thin bronze accent line top */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-6 pt-14 pb-2 max-w-xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-bronze)]/30 to-transparent" />
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className="text-[var(--color-bronze)] opacity-40"
          >
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-bronze)]/30 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center py-12 pb-14">
        <p className="section-label !text-[var(--color-bronze)]/60 mb-5">
          {t("label")}
        </p>

        <h2 className="heading-display text-[22px] md:text-[28px] !text-[var(--color-light-on-dark)] mb-3">
          {t("heading")}
        </h2>

        <p
          className="text-[13px] leading-[22px] mb-8 max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(245,240,232,0.4)",
          }}
        >
          {t("subtext")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
        >
          <div
            className="relative flex-1 transition-all duration-300"
            style={{
              boxShadow: focused
                ? "0 0 0 1px rgba(168,146,121,0.3), 0 4px 20px rgba(0,0,0,0.15)"
                : "0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t("placeholder")}
              className="w-full px-5 py-3.5 text-[13px] bg-white/[0.04] text-[var(--color-light-on-dark)] placeholder:text-white/25 focus:outline-none transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                borderRadius: "2px",
              }}
            />
          </div>
          <button
            type="submit"
            className="sm:w-auto px-7 py-3.5 text-[11px] tracking-[2px] uppercase transition-all duration-300 border border-[var(--color-bronze)]/30 text-[var(--color-light-on-dark)] hover:bg-[var(--color-bronze)]/10 hover:border-[var(--color-bronze)]/50"
            style={{
              fontFamily: "var(--font-label)",
              fontWeight: 500,
              borderRadius: "2px",
            }}
          >
            {t("cta")}
          </button>
        </form>
      </div>

      {/* Thin bronze accent line bottom */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-6 pb-0 max-w-xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-bronze)]/30 to-transparent" />
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className="text-[var(--color-bronze)] opacity-40"
          >
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-bronze)]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
