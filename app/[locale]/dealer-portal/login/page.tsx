"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-6 animate-fade-up">
          {t("title")}
        </h1>
        <p className="text-brown/60 max-w-lg mb-16 animate-fade-up animate-delay-1">
          {t("loginDescription")}
        </p>

        <div className="max-w-md animate-fade-up animate-delay-2">
          <div className="border border-brown/10 p-8">
            <p className="heritage-label text-brown/40 mb-6">{t("accessLabel")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-brown/60 mb-2"
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
                  className="w-full border border-brown/20 bg-transparent px-5 py-3.5 text-sm focus:outline-none focus:border-brown transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={!password || loading}
                className="w-full bg-brown text-cream px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-brown-light transition-colors disabled:opacity-40"
              >
                {loading ? t("verifying") : t("signIn")}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-brown/10">
              <p className="text-xs text-brown/40 leading-relaxed">
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
