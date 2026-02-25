"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid
            ? "bg-white/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        {/* ── Announcement bar ── */}
        <div
          className={`announcement-bar transition-[max-height,opacity,padding] duration-500 overflow-hidden ${
            scrolled
              ? "max-h-0 opacity-0 !py-0"
              : "max-h-12 opacity-100"
          }`}
        >
          {t("nav.announcement")}
        </div>

        {/* ── Main nav bar — Arhaus 3-column: hamburger+nav | wordmark | utility ── */}
        <nav className="flex items-center justify-between px-6 xl:px-12 h-[68px]">
          {/* ── Left: Hamburger (mobile) + Primary nav (desktop) ── */}
          <div className="flex items-center gap-7 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-1 transition-colors duration-300 ${
                solid ? "text-ink" : "text-white"
              }`}
              aria-label={t("nav.toggleMenu")}
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>

            {/* Desktop nav */}
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
          </div>

          {/* ── Center: Text wordmark ── */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
          >
            <span
              className={`font-serif text-xl xl:text-[1.375rem] tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-500 select-none ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              C.L. Bailey{" "}
              <span className="italic font-normal opacity-50 lowercase mx-0.5">
                &amp;
              </span>{" "}
              Co.
            </span>
          </Link>

          {/* ── Right: Utility nav + Language + Dealer CTA ── */}
          <div className="hidden lg:flex items-center gap-6">
            {utilityItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`heritage-label transition-colors duration-300 hover:text-estate whitespace-nowrap ${
                  solid ? "text-ink/50" : "text-white/50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language toggle */}
            <div
              className={`flex items-center gap-1.5 heritage-label ${
                solid ? "text-ink/25" : "text-white/25"
              }`}
            >
              <button
                onClick={() => switchLocale("en")}
                className={`transition-colors duration-300 hover:opacity-100 ${
                  locale === "en"
                    ? solid ? "text-ink" : "text-white"
                    : ""
                }`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => switchLocale("es")}
                className={`transition-colors duration-300 hover:opacity-100 ${
                  locale === "es"
                    ? solid ? "text-ink" : "text-white"
                    : ""
                }`}
              >
                ES
              </button>
            </div>

            {/* Dealer CTA pill */}
            <Link
              href="/dealer"
              className={`heritage-label px-5 py-2 transition-colors duration-300 ${
                solid
                  ? "bg-ink text-white hover:bg-ink-light"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {t("nav.findDealer")}
            </Link>
          </div>

          {/* ── Mobile: Dealer icon ── */}
          <Link
            href="/dealer"
            className={`lg:hidden p-1 transition-colors duration-300 ${
              solid ? "text-ink" : "text-white"
            }`}
            aria-label={t("nav.findDealer")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </Link>
        </nav>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="pt-28 px-8 pb-8 h-full overflow-y-auto">
            <nav className="space-y-0">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-2xl font-light text-ink border-b border-border tracking-[0.01em]"
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
                    className="block py-3 text-base text-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Language switcher */}
              <div className="pt-6 flex items-center gap-3 text-sm text-muted">
                <button
                  onClick={() => { switchLocale("en"); setMobileOpen(false); }}
                  className={locale === "en" ? "text-ink font-medium" : ""}
                >
                  English
                </button>
                <span className="opacity-30">|</span>
                <button
                  onClick={() => { switchLocale("es"); setMobileOpen(false); }}
                  className={locale === "es" ? "text-ink font-medium" : ""}
                >
                  Espa&ntilde;ol
                </button>
              </div>

              <div className="pt-8">
                <Link
                  href="/dealer"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-4 bg-ink text-white heritage-label"
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
