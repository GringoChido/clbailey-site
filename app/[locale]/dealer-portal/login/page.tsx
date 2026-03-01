"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function DealerLoginPage() {
  const router = useRouter();
  const t = useTranslations("dealerPortal");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/dealer-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dealer-portal");
        router.refresh();
      } else {
        setError(data.error || t("loginFailed"));
      }
    } catch {
      setError(t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <Image
          src="/images/brand/clb-logo.png"
          alt="The C.L. Bailey Co. — Tomball, Texas"
          width={220}
          height={59}
          className="h-[52px] w-auto mb-8 animate-fade-up"
        />
        <h1 className="heading-display text-3xl md:text-4xl mb-6 animate-fade-up">
          {t("title")}
        </h1>
        <p className="text-[13px] text-[var(--color-body)] leading-[26px] max-w-lg mb-16 animate-fade-up animate-delay-1">
          {t("loginDescription")}
        </p>

        <div className="max-w-md animate-fade-up animate-delay-2">
          <div className="border border-[var(--color-cloud)] p-8">
            <p className="section-label mb-6">{t("accessLabel")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[13px] text-[var(--color-body)] mb-2"
                >
                  {t("passwordLabel")}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                  className="input-modern"
                />
              </div>

              {error && (
                <p className="text-[13px] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={!password || loading}
                className="btn-primary w-full disabled:opacity-40"
              >
                {loading ? t("verifying") : t("signIn")}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--color-cloud)]">
              <p className="text-xs text-[var(--color-mid-gray)] leading-relaxed">
                {t("noAccess")}{" "}
                <Link href="/contact-us" className="underline hover:no-underline">
                  {t("contactForAccess")}
                </Link>{" "}
                {t("contactForAccessSuffix")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
