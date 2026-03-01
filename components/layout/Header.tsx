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

  const allNavItems = [
    { label: t("nav.poolTables"), href: "/products/pool-tables" },
    { label: t("nav.shuffleboards"), href: "/products/shuffleboards" },
    { label: t("nav.furniture"), href: "/products/game-room-furniture" },
    { label: t("nav.accessories"), href: "/products/accessories" },
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
              : "max-h-12 opacity-100"
          }`}
        >
          {t("nav.announcement")}
        </div>

        {/* Main nav bar: logo left | nav links + lang + CTA right */}
        <nav className="flex items-center justify-between px-6 xl:px-12 h-[68px]">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-1 transition-colors duration-300 ${
                solid ? "text-[var(--color-primary)]" : "text-white"
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

            {/* Logo — far left */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/brand/clb-logo.png"
                alt="The C.L. Bailey Co."
                width={280}
                height={75}
                className={`h-[42px] lg:h-[44px] xl:h-[52px] w-auto select-none transition-[filter] duration-500 ${
                  solid
                    ? ""
                    : "[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.95))_drop-shadow(0_0_4px_rgba(255,255,255,1))_drop-shadow(0_0_2px_rgba(255,255,255,1))]"
                }`}
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Right: All nav links + Language toggle + Dealer CTA */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 ml-auto">
            {allNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-[family-name:var(--font-label)] text-[10px] xl:text-[11px] font-medium uppercase tracking-[1.5px] xl:tracking-[2px] transition-colors duration-300 hover:text-[var(--color-silver)] whitespace-nowrap ${
                  solid ? "text-[var(--color-primary)]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language toggle */}
            <div
              className={`flex items-center gap-1.5 font-[family-name:var(--font-label)] text-[10px] xl:text-[11px] font-medium uppercase tracking-[1.5px] xl:tracking-[2px] ${
                solid ? "text-[var(--color-primary)]/25" : "text-white/25"
              }`}
            >
              <button
                onClick={() => switchLocale("en")}
                className={`transition-colors duration-300 hover:opacity-100 ${
                  locale === "en"
                    ? solid ? "text-[var(--color-primary)]" : "text-white"
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
                    ? solid ? "text-[var(--color-primary)]" : "text-white"
                    : ""
                }`}
              >
                ES
              </button>
            </div>

            {/* Dealer CTA pill */}
            <Link
              href="/dealer"
              className={solid ? "btn-primary" : "btn-outline-white"}
            >
              {t("nav.findDealer")}
            </Link>
          </div>

          {/* Mobile: Dealer icon */}
          <Link
            href="/dealer"
            className={`lg:hidden p-1 transition-colors duration-300 ${
              solid ? "text-[var(--color-primary)]" : "text-white"
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

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="pt-28 px-8 pb-8 h-full overflow-y-auto">
            <nav className="space-y-0">
              {allNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-2xl text-[var(--color-primary)] border-b border-[var(--color-cloud)] tracking-[0.01em]"
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
