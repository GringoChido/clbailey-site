"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm text-[var(--color-sand)] tracking-wide">
        {t("subscribeSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border-b border-[rgba(212,201,184,0.3)]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          aria-label={t("emailPlaceholder")}
          required
          className="flex-1 bg-transparent border-none py-3.5 text-sm font-light tracking-wide text-[var(--color-light-on-dark)] placeholder:text-[var(--color-sand)]/40 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-bronze)] focus-visible:outline-offset-2"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label={t("subscribe")}
          className="py-3.5 px-3.5 text-[var(--color-sand)] bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-[var(--color-light-on-dark)] disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-[var(--color-sand)]/60 mt-2">
          {t("subscribeError")}
        </p>
      )}
    </form>
  );
}
