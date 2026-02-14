import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import LeadModal from "@/components/ui/LeadModal";
import { products, pdf } from "@/lib/products";

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
  {} as Record<string, typeof productsWithPdfs>
);

const categoryLabels: Record<string, string> = {
  "pool-tables": "Pool Tables",
  shuffleboards: "Shuffleboards",
  "game-room-furniture": "Game Room Furniture",
  "cue-racks": "Cue Racks",
};

export default function CatalogsPage() {
  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-6 animate-fade-up">
          Catalogs &amp; Downloads
        </h1>
        <p className="text-brown/60 max-w-lg mb-16 animate-fade-up animate-delay-1">
          Download detailed specification sheets for any product. Dimensions,
          finishes, features — everything you need to make the right choice.
        </p>

        {Object.entries(grouped).map(([category, prods]) => (
          <div
            key={category}
            className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-16"
          >
            <SectionLabel label={categoryLabels[category] || category} />
            <div className="border-t border-brown/20 pt-4">
              <div className="space-y-4">
                {prods.map((product) => (
                  <div
                    key={product.slug}
                    className="flex items-center justify-between border-b border-brown/10 pb-4"
                  >
                    <div>
                      <h3 className="font-serif text-lg">{product.name}</h3>
                      <p className="text-sm text-brown/50">{product.tagline}</p>
                    </div>
                    <LeadModal
                      productName={product.name}
                      pdfUrl={pdf(product.pdf)}
                    >
                      <button className="heritage-label text-brown/50 hover:text-forest transition-colors flex-shrink-0 ml-4">
                        Download PDF
                      </button>
                    </LeadModal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
