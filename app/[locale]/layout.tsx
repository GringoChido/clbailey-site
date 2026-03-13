import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LazyAIConcierge from "@/components/ui/LazyAIConcierge";
import CookieConsent from "@/components/ui/CookieConsent";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      {/* Set lang attribute on the root <html> element */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";`,
        }}
      />
      <NextIntlClientProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:text-sm"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-[var(--header-height)] xl:pt-[var(--header-height-xl)]">{children}</main>
        <Footer />
        <LazyAIConcierge />
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}
