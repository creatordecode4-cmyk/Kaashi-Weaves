import Link from "next/link";
import SmartImage from "./SmartImage";
import { formatPrice } from "@/lib/config";
import { productImage, type Product } from "@/lib/products";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-dark">
        <SmartImage
          src={productImage(product.slug, 0)}
          alt={product.name}
          palette={product.palette}
          sizes="(min-width: 1024px) 25vw, 50vw"
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.mrp && (
          <span className="absolute left-2 top-2 bg-ivory px-2 py-0.5 text-[10px] uppercase tracking-widest text-wine">
            Festive price
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-[15px] leading-snug text-ink sm:text-base">{product.name}</h3>
        <p className="text-sm text-muted">
          <span className="text-wine">{formatPrice(product.price)}</span>
          {product.mrp && <span className="ml-2 text-xs line-through">{formatPrice(product.mrp)}</span>}
        </p>
      </div>
    </Link>
  );
}
