"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductConfiguratorProps {
  productName: string;
  productSlug: string;
  sizes: string[];
  finishes: string[];
  locale: string;
}

interface DealerResult {
  name: string;
  city: string;
  state: string;
  phone: string;
}

interface ConfiguratorResponse {
  success: boolean;
  dealer: DealerResult | null;
  error?: string;
}

const FINISH_COLORS: Record<string, string> = {
  Espresso: "#3C2415",
  Graphite: "#4A4A4A",
  Rustic: "#7B6147",
  Timber: "#8B7355",
  "Warm Chestnut": "#8B5E3C",
  "Weathered Oak": "#8B7D6B",
  Driftwood: "#9B8B78",
  Cocoa: "#4E3629",
  Chestnut: "#6B3A2E",
  "Dark Walnut": "#3B2716",
  Natural: "#C4A87C",
  Mahogany: "#5C2D1A",
  Oak: "#A08050",
  Slate: "#5A5A5A",
};

const getFinishColor = (name: string): string =>
  FINISH_COLORS[name] ?? "#7B6147";

const STEPS = [1, 2, 3] as const;
type Step = (typeof STEPS)[number];

const ProductConfigurator = ({
  productName,
  productSlug,
  sizes,
  finishes,
  locale,
}: ProductConfiguratorProps) => {
  const t = useTranslations("configurator");
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", zip: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConfiguratorResponse | null>(null);

  const summaryParts = [
    productName,
    selectedSize,
    selectedFinish,
  ].filter(Boolean);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setCurrentStep(2);
  };

  const handleFinishSelect = (finish: string) => {
    setSelectedFinish(finish);
    setCurrentStep(3);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedSize || !selectedFinish) return;

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t("errorEmail"));
      return;
    }

    if (!formData.zip || !/^\d{5}$/.test(formData.zip.trim())) {
      setError(t("errorZip"));
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads/configurator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          zip: formData.zip.trim(),
          product: productSlug,
          size: selectedSize,
          finish: selectedFinish,
        }),
      });

      const data = (await res.json()) as ConfiguratorResponse;

      if (!res.ok || !data.success) {
        setError(data.error ?? t("errorGeneric"));
        return;
      }

      setResult(data);
    } catch {
      setError(t("errorNetwork"));
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="py-10">
        <div className="text-center max-w-lg mx-auto">
          <p className="section-label mb-4">{t("configSent")}</p>
          <h3 className="heading-card text-2xl mb-6">
            {t("thankYou", { name: formData.name || "" })}
          </h3>

          {result.dealer ? (
            <div className="space-y-4">
              <p className="text-body leading-relaxed">
                {t("sentToDealer", {
                  product: productName,
                  dealer: result.dealer.name,
                  location: `${result.dealer.city}, ${result.dealer.state}`,
                })}
              </p>
              <div className="border border-cloud p-6 mt-6">
                <p className="metadata mb-2">{result.dealer.name}</p>
                <p className="text-body">{result.dealer.phone}</p>
                <p className="text-body">
                  {result.dealer.city}, {result.dealer.state}
                </p>
              </div>
              <p className="text-body text-sm mt-4">
                {t("expectResponse")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-body leading-relaxed">
                {t("configReceived", { product: productName })}
              </p>
            </div>
          )}

          <Link
            href={`/${locale}/dealer`}
            className="btn-outline mt-8 inline-block"
          >
            {t("findDealer")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-8 mb-10">
        {STEPS.map((step) => (
          <button
            key={step}
            onClick={() => {
              if (step === 1) setCurrentStep(1);
              if (step === 2 && selectedSize) setCurrentStep(2);
              if (step === 3 && selectedSize && selectedFinish)
                setCurrentStep(3);
            }}
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              currentStep === step ? "opacity-100" : "opacity-40"
            } ${
              step < currentStep
                ? "cursor-pointer hover:opacity-70"
                : step === currentStep
                  ? "cursor-default"
                  : "cursor-default"
            }`}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center text-[10px] font-semibold transition-colors duration-300 ${
                step <= currentStep
                  ? "bg-primary text-white"
                  : "border border-cloud text-mid-gray"
              }`}
            >
              {step}
            </span>
            <span className="metadata hidden sm:inline">
              {step === 1 && t("stepSize")}
              {step === 2 && t("stepFinish")}
              {step === 3 && t("stepContact")}
            </span>
          </button>
        ))}
      </div>

      {/* Summary line */}
      <div className="text-center mb-10">
        <p className="heading-card text-lg tracking-wide">
          {summaryParts.join(" / ")}
        </p>
      </div>

      {/* Step 1: Size */}
      <div
        className={`transition-opacity duration-500 ${
          currentStep === 1
            ? "opacity-100"
            : "opacity-0 absolute pointer-events-none"
        }`}
      >
        <div className="text-center max-w-md mx-auto">
          <p className="section-label mb-6">{t("selectSize")}</p>
          <div className="flex justify-center gap-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`metadata px-6 py-3 transition-colors duration-300 ${
                  selectedSize === size
                    ? "bg-primary text-white border border-primary"
                    : "bg-transparent text-mid-gray border border-cloud hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2: Finish */}
      <div
        className={`transition-opacity duration-500 ${
          currentStep === 2
            ? "opacity-100"
            : "opacity-0 absolute pointer-events-none"
        }`}
      >
        <div className="text-center max-w-lg mx-auto">
          <p className="section-label mb-6">{t("selectFinish")}</p>
          <div className="flex flex-wrap justify-center gap-5">
            {finishes.map((finish) => (
              <button
                key={finish}
                onClick={() => handleFinishSelect(finish)}
                className={`group flex flex-col items-center gap-2 transition-opacity duration-300 ${
                  selectedFinish === finish
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-14 h-14 transition-all duration-300 ${
                    selectedFinish === finish
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-1 ring-cloud"
                  }`}
                  style={{ backgroundColor: getFinishColor(finish) }}
                />
                <span className="text-[10px] text-body uppercase tracking-wider group-hover:text-primary transition-colors duration-200">
                  {finish}
                </span>
              </button>
            ))}
          </div>

          {selectedSize && (
            <button
              onClick={() => setCurrentStep(1)}
              className="mt-8 text-body text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              {t("backToSize")}
            </button>
          )}
        </div>
      </div>

      {/* Step 3: Contact Form */}
      <div
        className={`transition-opacity duration-500 ${
          currentStep === 3
            ? "opacity-100"
            : "opacity-0 absolute pointer-events-none"
        }`}
      >
        <div className="max-w-sm mx-auto">
          <p className="section-label mb-6 text-center">
            {t("sendToDealer")}
          </p>

          <div className="space-y-5">
            <div>
              <label className="metadata block mb-2">{t("labelName")}</label>
              <input
                type="text"
                className="input-modern"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={t("placeholderName")}
              />
            </div>

            <div>
              <label className="metadata block mb-2">
                {t("labelEmail")} <span className="text-silver">*</span>
              </label>
              <input
                type="email"
                className="input-modern"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={t("placeholderEmail")}
                required
              />
            </div>

            <div>
              <label className="metadata block mb-2">
                {t("labelZip")} <span className="text-silver">*</span>
              </label>
              <input
                type="text"
                className="input-modern"
                value={formData.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
                placeholder={t("placeholderZip")}
                maxLength={5}
                inputMode="numeric"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm mt-4 text-center" style={{ color: "#8B4040" }}>
              {error}
            </p>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`btn-primary w-full ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? t("sending") : t("sendConfig")}
            </button>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="mt-6 block mx-auto text-body text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200"
          >
            {t("backToFinish")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;
