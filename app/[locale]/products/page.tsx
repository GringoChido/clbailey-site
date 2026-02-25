import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { categories, getProductsByCategory, img } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "All Products | The C.L. Bailey Co.",
  description: "Browse our complete collection of pool tables, shuffleboards, game room furniture, and cue racks.",
};

export default async function ProductsPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {t("products.title")}
          </h1>
          <p className="text-gray-500 max-w-lg mb-16">
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
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={img(category.heroImage)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-1">
                  {category.name}
                  <span className="text-sm text-gray-400 ml-2">
                    {getProductsByCategory(category.slug).length}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
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
