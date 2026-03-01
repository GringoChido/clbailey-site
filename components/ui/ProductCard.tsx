import Image from "next/image";
import Link from "next/link";
import { img, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-off-white)] border border-[var(--color-cloud)] mb-4">
        <Image
          src={img(product.images.hero)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <h3 className="heading-card mb-1">{product.name}</h3>
      <p className="text-sm text-[var(--color-body)] line-clamp-1 mb-2">{product.tagline}</p>
      {product.finishes.length > 0 && product.finishes[0] !== "Various" && (
        <p className="text-xs text-[var(--color-mid-gray)]">
          {product.finishes.join(" / ")}
        </p>
      )}
      <p className="metadata mt-2">
        Dealer Exclusive
      </p>
    </Link>
  );
}
