"use client";

import { useState } from "react";
import Image from "next/image";
import { img } from "@/lib/products";
import FinishSwatches from "@/components/ui/FinishSwatches";

interface AccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const AccordionSection = ({
  title,
  defaultOpen = false,
  children,
}: AccordionSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[var(--color-cloud)]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-5 cursor-pointer group"
        aria-expanded={open}
      >
        <span className="metadata">{title}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`text-[var(--color-mid-gray)] transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface ProductAccordionProps {
  features: string[];
  sizes: string[];
  finishes: string[];
  dimensionsImage: string | null;
  locale: string;
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  en: {
    features: "Features & Construction",
    sizes: "Available Sizes",
    finishes: "Finish Options",
    warranty: "Warranty & Care",
  },
  es: {
    features: "Caracteristicas y Construccion",
    sizes: "Tamanos Disponibles",
    finishes: "Opciones de Acabado",
    warranty: "Garantia y Cuidado",
  },
};

const WARRANTY_TEXT: Record<string, string> = {
  en: "Lifetime structural warranty on all solid hardwood products. Professional installation recommended. Contact your authorized dealer for complete warranty details.",
  es: "Garantia estructural de por vida en todos los productos de madera maciza. Se recomienda instalacion profesional. Contacte a su distribuidor autorizado para conocer los detalles completos de la garantia.",
};

const ProductAccordion = ({
  features,
  sizes,
  finishes,
  dimensionsImage,
  locale,
}: ProductAccordionProps) => {
  const lang = locale === "es" ? "es" : "en";
  const labels = SECTION_LABELS[lang];
  const warrantyText = WARRANTY_TEXT[lang];

  return (
    <div>
      {/* Features */}
      <AccordionSection title={labels.features} defaultOpen>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="text-[13px] text-[var(--color-body)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-[1px] before:bg-[var(--color-silver)]"
            >
              {feature}
            </li>
          ))}
        </ul>
      </AccordionSection>

      {/* Sizes */}
      <AccordionSection title={labels.sizes}>
        <ul className="space-y-2">
          {sizes.map((size, i) => (
            <li
              key={i}
              className="text-[13px] text-[var(--color-body)] leading-relaxed"
            >
              {size}
            </li>
          ))}
        </ul>
        {dimensionsImage && (
          <div className="mt-5 relative w-full max-w-md aspect-[4/3]">
            <Image
              src={img(dimensionsImage)}
              alt="Product dimensions"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
      </AccordionSection>

      {/* Finishes */}
      <AccordionSection title={labels.finishes}>
        <FinishSwatches finishes={finishes} size="lg" />
      </AccordionSection>

      {/* Warranty */}
      <AccordionSection title={labels.warranty}>
        <p className="text-[13px] text-[var(--color-body)] leading-relaxed">
          {warrantyText}
        </p>
      </AccordionSection>
    </div>
  );
};

export default ProductAccordion;
