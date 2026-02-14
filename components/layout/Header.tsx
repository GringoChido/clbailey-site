"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

/*
 * Old Money Sourcebook header.
 * 3-column flex: nav | wordmark | utility.
 * Text-only wordmark "C.L. Bailey & Co." — no logo image.
 * Estate Grey divider beneath. No drop shadows.
 */

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const isHome = pathname === "/" || pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("nav.poolTables"), href: "/products/pool-tables" },
    { label: t("nav.shuffleboards"), href: "/products/shuffleboards" },
    { label: t("nav.furniture"), href: "/products/game-room-furniture" },
  ];

  const utilityItems = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = !isHome || scrolled;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "es") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          solid
            ? "bg-vellum/95 backdrop-blur-md border-b border-estate/10"
            : "bg-transparent"
        }`}
      >
        {/* 3-column layout: nav | wordmark | utility */}
        <nav className="flex items-center justify-between px-6 xl:px-12 h-[72px]">
          {/* ── Left: Primary nav ── */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`heritage-label transition-colors duration-300 hover:text-estate whitespace-nowrap ${
                  solid ? "text-ink" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ── Center: Text wordmark ── */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
          >
            <span
              className={`font-serif text-xl xl:text-2xl tracking-[0.05em] uppercase whitespace-nowrap transition-colors duration-700 select-none ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              C.L. Bailey{" "}
              <span className="italic font-normal opacity-60 lowercase mx-1">
                &amp;
              </span>{" "}
              Co.
            </span>
          </Link>

          {/* ── Right: Utility nav + Language ── */}
          <div className="hidden lg:flex items-center gap-6">
            {utilityItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`heritage-label transition-colors duration-300 hover:text-estate whitespace-nowrap ${
                  solid ? "text-ink/50" : "text-white/60"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language toggle */}
            <div
              className={`flex items-center gap-1.5 heritage-label ${
                solid ? "text-ink/30" : "text-white/30"
              }`}
            >
              <button
                onClick={() => switchLocale("en")}
                className={`transition-colors hover:opacity-100 ${
                  locale === "en"
                    ? solid
                      ? "text-ink"
                      : "text-white"
                    : ""
                }`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => switchLocale("es")}
                className={`transition-colors hover:opacity-100 ${
                  locale === "es"
                    ? solid
                      ? "text-ink"
                      : "text-white"
                    : ""
                }`}
              >
                ES
              </button>
            </div>

            {/* Dealer CTA — Ink, not green */}
            <Link
              href="/dealer"
              className="heritage-label px-6 py-2.5 bg-ink text-vellum hover:bg-ink-light transition-all duration-300"
            >
              {t("nav.findDealer")}
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              solid ? "text-ink" : "text-white"
            }`}
            aria-label={t("nav.toggleMenu")}
          >
            {mobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-vellum">
          <div className="pt-24 px-8 pb-8 h-full overflow-y-auto">
            <nav className="space-y-0">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-3xl font-serif text-ink border-b border-estate/10"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-8 space-y-0">
                {utilityItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg text-ink/50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile language switcher */}
              <div className="pt-6 flex items-center gap-3 text-sm text-ink/40">
                <button
                  onClick={() => {
                    switchLocale("en");
                    setMobileOpen(false);
                  }}
                  className={locale === "en" ? "text-ink font-medium" : ""}
                >
                  English
                </button>
                <span className="opacity-30">|</span>
                <button
                  onClick={() => {
                    switchLocale("es");
                    setMobileOpen(false);
                  }}
                  className={locale === "es" ? "text-ink font-medium" : ""}
                >
                  Espa&ntilde;ol
                </button>
              </div>

              <div className="pt-8">
                <Link
                  href="/dealer"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-4 bg-ink text-vellum heritage-label"
                >
                  {t("nav.findDealer")}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
