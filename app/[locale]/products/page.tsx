import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { categories, getProductsByCategory, img } from "@/lib/products";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "All Products | The C.L. Bailey Co.",
  description: "Browse our complete collection of pool tables, shuffleboards, game room furniture, and cue racks.",
};

export default async function ProductsPage() {
  const t = await getTranslations();

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-6 animate-fade-up">
          {t("products.title")}
        </h1>
        <p className="text-brown/60 max-w-lg mb-16 animate-fade-up animate-delay-1">
          {t("products.description")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("common.browse")} />
          <div className="border-t border-brown/20 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <div
                  key={category.slug}
                  className={`animate-fade-up animate-delay-${Math.min(index + 1, 6)}`}
                >
                  <Link
                    href={`/products/${category.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden mb-4">
                      <Image
                        src={img(category.heroImage)}
                        alt={category.name}
                        fill
                        className="object-cover img-zoom"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h2 className="font-serif text-2xl mb-1">
                      {category.name}
                      <span className="text-sm text-brown/40 ml-2 align-super">
                        {getProductsByCategory(category.slug).length}
                      </span>
                    </h2>
                    <p className="text-sm text-brown/60 mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs uppercase tracking-wider text-brown/40 group-hover:text-brown transition-colors">
                      {t("common.viewCollection")} &rarr;
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
