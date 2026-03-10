"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CONSENT_KEY = "clb-cookie-consent";

export type ConsentLevel = "all" | "essential" | null;

export function getConsentLevel(): ConsentLevel {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "all" || stored === "essential") return stored;
  return null;
}

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (level: "all" | "essential") => {
    localStorage.setItem(CONSENT_KEY, level);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: level }));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-[var(--color-deep)] border-t border-[rgba(212,201,184,0.15)] animate-in slide-in-from-bottom"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[var(--color-sand)]/80 leading-relaxed flex-1">
          {t("message")}{" "}
          <Link
            href="/privacy-policy"
            className="text-[var(--color-sand)] underline underline-offset-2"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => accept("essential")}
            className="text-xs px-4 py-2.5 border border-[var(--color-sand)]/30 text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] hover:border-[var(--color-sand)]/60 transition-colors duration-300 uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-label)" }}
          >
            {t("essentialOnly")}
          </button>
          <button
            onClick={() => accept("all")}
            className="text-xs px-4 py-2.5 bg-[var(--color-sand)]/20 border border-[var(--color-sand)]/40 text-[var(--color-sand)] hover:bg-[var(--color-sand)]/30 transition-colors duration-300 uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-label)" }}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
