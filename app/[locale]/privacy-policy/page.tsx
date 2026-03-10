import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { company } from "@/lib/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: `${t("title")} | ${company.name}`,
    robots: { index: true, follow: true },
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Header */}
        <p className="section-label mb-3 text-[var(--color-mid-gray)]">
          {t("introLabel")}
        </p>
        <h1
          className="text-3xl lg:text-4xl mb-3 text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          {t("introHeading")}
        </h1>
        <p className="metadata text-[var(--color-mid-gray)] mb-10">
          {t("lastUpdated")}
        </p>
        <p className="text-[var(--color-body)] leading-relaxed mb-16">
          {t("introText")}
        </p>

        {/* Information We Collect */}
        <PolicySection label={t("collectLabel")} heading={t("collectHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t("collectText")}
          </p>
          <ul className="space-y-2">
            {(["leads", "newsletter", "dealer", "configurator", "chat"] as const).map((key) => (
              <li key={key} className="text-[var(--color-body)] leading-relaxed pl-4 border-l-2 border-[var(--color-cloud)]">
                {t(`collectItems.${key}`)}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* How We Use It */}
        <PolicySection label={t("useLabel")} heading={t("useHeading")}>
          <ul className="space-y-2">
            {(["respond", "specs", "newsletter", "improve"] as const).map((key) => (
              <li key={key} className="text-[var(--color-body)] leading-relaxed pl-4 border-l-2 border-[var(--color-cloud)]">
                {t(`useItems.${key}`)}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Third Parties */}
        <PolicySection label={t("sharingLabel")} heading={t("sharingHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t("sharingText")}
          </p>
          <ul className="space-y-2">
            {(["dealers", "email", "sheets", "maps", "ai"] as const).map((key) => (
              <li key={key} className="text-[var(--color-body)] leading-relaxed pl-4 border-l-2 border-[var(--color-cloud)]">
                {t(`sharingItems.${key}`)}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Cookies */}
        <PolicySection label={t("cookiesLabel")} heading={t("cookiesHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t("cookiesText")}
          </p>
        </PolicySection>

        {/* Your Rights */}
        <PolicySection label={t("rightsLabel")} heading={t("rightsHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t("rightsText")}
          </p>
          <ul className="space-y-2 mb-6">
            {(["access", "delete", "optout", "correct"] as const).map((key) => (
              <li key={key} className="text-[var(--color-body)] leading-relaxed pl-4 border-l-2 border-[var(--color-cloud)]">
                {t(`rightsItems.${key}`)}
              </li>
            ))}
          </ul>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t("rightsContact")}{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--color-primary)] border-b border-[var(--color-primary)]"
            >
              {company.email}
            </a>
          </p>
        </PolicySection>

        {/* CCPA */}
        <PolicySection label={t("ccpaLabel")} heading={t("ccpaHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t("ccpaText")}
          </p>
        </PolicySection>

        {/* Security */}
        <PolicySection label={t("securityLabel")} heading={t("securityHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t("securityText")}
          </p>
        </PolicySection>

        {/* Contact */}
        <PolicySection label={t("contactLabel")} heading={t("contactHeading")}>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t("contactText")}
          </p>
          <div className="text-[var(--color-body)] leading-relaxed space-y-1">
            <p>{company.name}</p>
            <p>{company.address.street}, {company.address.city}, {company.address.state} {company.address.zip}</p>
            <p>
              <a href={`mailto:${company.email}`} className="text-[var(--color-primary)] border-b border-[var(--color-primary)]">
                {company.email}
              </a>
            </p>
            <p>
              <a href={`tel:${company.phone.replace(/-/g, "")}`} className="text-[var(--color-primary)] border-b border-[var(--color-primary)]">
                {company.phone}
              </a>
            </p>
          </div>
        </PolicySection>

        {/* Legal Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[var(--color-cloud)]">
          <p className="text-xs text-[var(--color-mid-gray)] leading-relaxed italic">
            {t("legalDisclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}

function PolicySection({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-14">
      <p className="section-label mb-2 text-[var(--color-mid-gray)]">{label}</p>
      <h2
        className="text-xl mb-5 text-[var(--color-primary)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        {heading}
      </h2>
      {children}
    </div>
  );
}
