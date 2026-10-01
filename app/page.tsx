import Link from "next/link";
import Hero from "@/components/home/Hero";
import CategoryScroller from "@/components/home/CategoryScroller";
import CraftSteps from "@/components/home/CraftSteps";
import LookbookTeaser from "@/components/home/LookbookTeaser";
import Reveal from "@/components/Reveal";
import RevealGrid from "@/components/RevealGrid";
import SmartImage from "@/components/SmartImage";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const INSTA: [string, string][] = [
  ["#5a1a2b", "#d4bc8f"],
  ["#efe6d6", "#b08d57"],
  ["#1e1a1d", "#8f7a5a"],
  ["#8c2a4a", "#f3ecdf"],
  ["#a3824f", "#3d0f1c"],
  ["#e8b7a0", "#5a1a2b"],
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <Hero />

      <CategoryScroller />

      {/* Featured */}
      <section className="container-x pt-20 sm:pt-28" aria-labelledby="featured-heading">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Handpicked</p>
            <h2 id="featured-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Featured Pieces</h2>
          </div>
          <Link href="/shop" className="shrink-0 border-b border-wine pb-0.5 text-xs uppercase tracking-[0.2em] text-wine">
            View all
          </Link>
        </Reveal>
        <RevealGrid className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </RevealGrid>
      </section>

      <LookbookTeaser />

      <CraftSteps />

      {/* Instagram grid */}
      <section className="container-x pt-20 sm:pt-28" aria-labelledby="insta-heading">
        <Reveal className="mb-8 text-center">
          <p className="eyebrow">@kaashiweaves</p>
          <h2 id="insta-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Worn by you</h2>
        </Reveal>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-6">
          {INSTA.map((pal, i) => (
            <Reveal key={i} delay={i * 0.05} className="group relative aspect-square overflow-hidden">
              <SmartImage
                src={`/images/instagram/insta-${i + 1}.jpg`}
                alt={`Customer photo ${i + 1}`}
                palette={pal}
                sizes="(min-width: 1024px) 16vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-wine/0 transition-colors group-hover:bg-wine/40">
                <svg className="size-6 text-ivory opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
