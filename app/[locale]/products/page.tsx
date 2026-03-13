import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { categories, getProductsByCategory, img } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "All Products | The C.L. Bailey Co.",
  description: "Browse our complete collection of pool tables, shuffleboards, game room furniture, and cue racks.",
  openGraph: {
    title: "All Products | C.L. Bailey & Co.",
    description:
      "Browse our complete collection of pool tables, shuffleboards, game room furniture, and cue racks.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/products",
    languages: {
      en: "https://clbailey.com/en/products",
      es: "https://clbailey.com/es/products",
    },
  },
};

export default async function ProductsPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label mb-3">
            {t("museum.portfolioLabel")}
          </p>
          <h1 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] mb-4">
            {t("products.title")}
          </h1>
          <p className="text-base text-[var(--color-body)] max-w-lg mb-16">
            {t("products.description")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <ScrollReveal key={category.slug} delay={index + 1}>
              <Link
                href={`/products/${category.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-off-white)] border border-[var(--color-cloud)] mb-4">
                  <Image
                    src={img(category.heroImage)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h2 className="heading-card mb-1">
                  {category.name}
                  <span className="text-sm text-[var(--color-mid-gray)] ml-2">
                    {getProductsByCategory(category.slug).length}
                  </span>
                </h2>
                <p className="text-sm text-[var(--color-body)]">
                  {category.description}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
