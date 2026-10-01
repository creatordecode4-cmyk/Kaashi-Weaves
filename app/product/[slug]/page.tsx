import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import RevealGrid from "@/components/RevealGrid";
import { CATEGORIES, SITE, formatPrice } from "@/lib/config";
import { getProduct, getRelated, productImage, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} — ${p.fabric}. ${p.description}`.slice(0, 160),
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.name} · ${SITE.name}`, description: p.description },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const categoryLabel = CATEGORIES.find((c) => c.slug === product.category)?.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    material: product.fabric,
    brand: { "@type": "Brand", name: SITE.name },
    image: Array.from({ length: product.imageCount }, (_, i) => `${SITE.url}${productImage(product.slug, i)}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x pt-6 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/shop" className="hover:text-wine">Shop</Link></li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/shop?category=${product.category}`} className="hover:text-wine">{categoryLabel}</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <ProductGallery product={product} />

          <div className="min-w-0 md:sticky md:top-24 md:self-start">
            <p className="eyebrow">{categoryLabel}</p>
            <h1 className="mt-2 text-3xl leading-tight text-wine sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-xl text-ink">
              {formatPrice(product.price)}
              {product.mrp && (
                <>
                  <span className="ml-3 text-sm text-muted line-through">{formatPrice(product.mrp)}</span>
                  <span className="ml-2 text-xs uppercase tracking-wider text-gold">
                    {Math.round((1 - product.price / product.mrp) * 100)}% off
                  </span>
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>

            <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>

            <ProductActions product={product} />

            <dl className="mt-8 divide-y divide-wine/10 border-y border-wine/10 text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Fabric</dt>
                <dd className="text-right">{product.fabric}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Care</dt>
                <dd className="text-right">Dry clean only</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Made in</dt>
                <dd className="text-right">Varanasi, India</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="pt-20" aria-labelledby="related-heading">
          <Reveal className="mb-8">
            <p className="eyebrow">Complete the look</p>
            <h2 id="related-heading" className="mt-2 text-3xl text-wine">You may also like</h2>
          </Reveal>
          <RevealGrid className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </RevealGrid>
        </section>
      </div>
    </>
  );
}
