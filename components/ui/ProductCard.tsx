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
      <div className="aspect-[4/3] relative overflow-hidden bg-cream-dark mb-4">
        <Image
          src={img(product.images.hero)}
          alt={product.name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <h3 className="font-serif text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-brown/60 mb-2 line-clamp-1">{product.tagline}</p>
      <span className="text-xs uppercase tracking-wider text-brown/40 group-hover:text-brown transition-colors">
        View Details
      </span>
    </Link>
  );
}
