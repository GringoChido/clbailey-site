"use client";

import Link from "next/link";
import Image from "next/image";
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
    { label: t("nav.accessories"), href: "/products/accessories" },
    { label: t("nav.cueRacks"), href: "/products/cue-racks" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact-us" },
    { label: t("nav.dealerPortal"), href: "/dealer-portal" },
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

  const textColor = solid ? "text-[var(--color-primary)]" : "text-white";
  const textColorMuted = solid ? "text-[var(--color-mid-gray)]" : "text-white/25";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid
            ? "bg-[var(--overlay-nav)] backdrop-blur-md border-b border-[var(--color-cloud)]"
            : "bg-transparent"
        }`}
      >
        {/* Announcement bar */}
        <div
          className={`announcement-bar transition-[max-height,opacity,padding] duration-500 overflow-hidden ${
            scrolled
              ? "max-h-0 opacity-0 !py-0"
              : "max-h-20 opacity-100"
          }`}
        >
          {t("nav.announcement")}
        </div>

        {/* ── Top row: utility icons left | LOGO center | utility icons right ── */}
        <div
          className={`transition-[max-height,opacity,padding] duration-500 overflow-hidden ${
            scrolled
              ? "max-h-0 opacity-0 !py-0"
              : "max-h-24 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between px-6 xl:px-12 py-4">
            {/* Left: hamburger (mobile) + language toggle (desktop) */}
            <div className="flex items-center gap-4 w-[120px]">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`xl:hidden p-1 transition-colors duration-300 ${textColor}`}
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

              {/* Language toggle (desktop only) */}
              <div
                className={`hidden xl:flex items-center gap-1.5 font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[2px] ${textColorMuted}`}
              >
                <button
                  onClick={() => switchLocale("en")}
                  className={`transition-colors duration-300 hover:opacity-100 ${
                    locale === "en" ? textColor : ""
                  }`}
                >
                  EN
                </button>
                <span className="opacity-40">|</span>
                <button
                  onClick={() => switchLocale("es")}
                  className={`transition-colors duration-300 hover:opacity-100 ${
                    locale === "es" ? textColor : ""
                  }`}
                >
                  ES
                </button>
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/brand/clb-logo.png"
                alt="The C.L. Bailey Co."
                width={280}
                height={75}
                className="h-[48px] xl:h-[56px] w-auto select-none"
                priority
                unoptimized
              />
            </Link>

            {/* Right: Find a Dealer */}
            <div className="flex items-center justify-end w-[120px]">
              <Link
                href="/dealer"
                className={`hidden xl:inline-flex items-center whitespace-nowrap font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[2px] px-5 py-2 rounded-full border transition-all duration-300 ${
                  solid
                    ? "border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                    : "border-white/30 text-white hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
                {t("nav.findDealer")}
              </Link>
              <Link
                href="/dealer"
                className={`xl:hidden p-1 transition-colors duration-300 ${textColor}`}
                aria-label={t("nav.findDealer")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom row: nav links (desktop) ── */}
        <nav
          className={`hidden xl:flex items-center justify-center gap-1 2xl:gap-2 px-6 xl:px-12 transition-[padding] duration-500 ${
            scrolled ? "py-3" : "py-2.5"
          } border-t ${
            solid ? "border-[var(--color-cloud)]/50" : "border-white/10"
          }`}
        >
          {/* Scrolled: show compact logo on far left */}
          <Link
            href="/"
            className={`absolute left-6 xl:left-12 flex-shrink-0 transition-[opacity] duration-500 ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src="/images/brand/clb-logo.png"
              alt="The C.L. Bailey Co."
              width={280}
              height={75}
              className="h-[32px] w-auto select-none"
              unoptimized
            />
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-[family-name:var(--font-label)] text-[10px] xl:text-[11px] font-medium uppercase tracking-[1.5px] xl:tracking-[2px] transition-colors duration-300 hover:text-[var(--color-bronze)] whitespace-nowrap px-2 xl:px-3 ${textColor}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Scrolled: show utility icons on far right */}
          <div
            className={`absolute right-6 xl:right-12 flex items-center gap-3 transition-[opacity] duration-500 ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[2px] ${textColorMuted}`}
            >
              <button
                onClick={() => switchLocale("en")}
                className={`transition-colors duration-300 hover:opacity-100 ${
                  locale === "en" ? textColor : ""
                }`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => switchLocale("es")}
                className={`transition-colors duration-300 hover:opacity-100 ${
                  locale === "es" ? textColor : ""
                }`}
              >
                ES
              </button>
            </div>
            <Link
              href="/dealer"
              className="inline-flex items-center font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1.5 rounded-full border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
            >
              {t("nav.findDealer")}
            </Link>
          </div>
        </nav>

        {/* ── Mobile: compact bar when scrolled ── */}
        <div
          className={`xl:hidden flex items-center justify-between px-6 transition-[max-height,opacity,padding] duration-500 overflow-hidden ${
            scrolled
              ? "max-h-16 opacity-100 py-3"
              : "max-h-0 opacity-0 !py-0"
          }`}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-1 transition-colors duration-300 ${textColor}`}
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
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/brand/clb-logo.png"
              alt="The C.L. Bailey Co."
              width={280}
              height={75}
              className="h-[34px] w-auto select-none"
              unoptimized
            />
          </Link>
          <Link
            href="/dealer"
            className={`p-1 transition-colors duration-300 ${textColor}`}
            aria-label={t("nav.findDealer")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-off-white)]">
          <div className="pt-28 px-8 pb-8 h-full overflow-y-auto">
            <nav className="space-y-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-2xl text-[var(--color-primary)] border-b border-[var(--color-cloud)] tracking-[0.01em] hover:text-[var(--color-bronze)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Language switcher */}
              <div className="pt-6 flex items-center gap-3 heritage-label text-[var(--color-body)]">
                <button
                  onClick={() => { switchLocale("en"); setMobileOpen(false); }}
                  className={locale === "en" ? "text-[var(--color-primary)]" : ""}
                >
                  English
                </button>
                <span className="opacity-30">|</span>
                <button
                  onClick={() => { switchLocale("es"); setMobileOpen(false); }}
                  className={locale === "es" ? "text-[var(--color-primary)]" : ""}
                >
                  Espa&ntilde;ol
                </button>
              </div>

              <div className="pt-8">
                <Link
                  href="/dealer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block text-center"
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
