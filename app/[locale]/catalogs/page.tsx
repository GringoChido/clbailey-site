import type { Metadata } from "next";
import LeadModal from "@/components/ui/LeadModal";
import { products, pdf } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Catalogs & Downloads | The C.L. Bailey Co.",
  description: "Download specification sheets and product catalogs for all C.L. Bailey pool tables, shuffleboards, and game room furniture.",
};

/* Group products that have PDFs by category */
const productsWithPdfs = products.filter((p) => p.pdf);
const grouped = productsWithPdfs.reduce(
  (acc, p) => {
    const cat = p.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  },
  {} as Record<string, typeof productsWithPdfs>,
);

const categoryLabels: Record<string, string> = {
  "pool-tables": "Pool Tables",
  shuffleboards: "Shuffleboards",
  "game-room-furniture": "Game Room Furniture",
  "cue-racks": "Cue Racks",
};

export default function CatalogsPage() {
  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            Catalogs &amp; Downloads
          </h1>
          <p className="text-gray-500 max-w-lg mb-16">
            Download detailed specification sheets for any product. Dimensions,
            finishes, features — everything you need to make the right choice.
          </p>
        </ScrollReveal>

        {Object.entries(grouped).map(([category, prods], idx) => (
          <ScrollReveal key={category} delay={idx + 1} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {categoryLabels[category] || category}
            </p>
            <div className="h-px bg-gray-200 mb-6" />
            <div className="space-y-4">
              {prods.map((product) => (
                <div
                  key={product.slug}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.tagline}</p>
                  </div>
                  <LeadModal
                    productName={product.name}
                    pdfUrl={pdf(product.pdf)}
                  >
                    <button className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0 ml-4">
                      Download PDF
                    </button>
                  </LeadModal>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
