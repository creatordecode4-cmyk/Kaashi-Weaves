import Link from "next/link";
import Hero from "@/components/home/Hero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/config";
import { products } from "@/lib/products";

const CATEGORY_PALETTES: Record<string, [string, string]> = {
  men: ["#3d0f1c", "#a3824f"],
  women: ["#8c2a4a", "#e2b77a"],
  kids: ["#e8b7a0", "#b08d57"],
  festive: ["#5a1a2b", "#d4bc8f"],
  streetwear: ["#1e1a1d", "#7a5c3a"],
};

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

      {/* Categories */}
      <section className="container-x pt-20 sm:pt-28" aria-labelledby="cat-heading">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow">Shop by</p>
          <h2 id="cat-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Categories</h2>
        </Reveal>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 [scrollbar-width:none]">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="w-[42%] shrink-0 snap-start sm:w-auto">
              <Link href={`/shop?category=${c.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SmartImage
                    src={`/images/categories/${c.slug}.jpg`}
                    alt={`${c.label} collection`}
                    palette={CATEGORY_PALETTES[c.slug]}
                    sizes="(min-width: 640px) 20vw, 45vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                  <span className="absolute inset-x-0 bottom-4 text-center font-serif text-xl text-ivory">
                    {c.label}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

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
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lookbook teaser */}
      <section className="pt-20 sm:pt-28" aria-labelledby="lookbook-heading">
        <div className="relative isolate overflow-hidden bg-wine">
          <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <Reveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <SmartImage
                src="/images/lookbook/teaser.jpg"
                alt="Lookbook preview"
                palette={["#3d0f1c", "#d4bc8f"]}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
            <Reveal className="text-ivory">
              <p className="eyebrow">Lookbook · Festive 2026</p>
              <h2 id="lookbook-heading" className="mt-3 text-4xl leading-tight sm:text-5xl">
                Of ghats, <span className="italic text-gold-light">gold</span> &amp; the hour before dusk.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ivory/70">
                Shot along the river in Varanasi, our festive story pairs centuries-old weaves with silhouettes you
                will actually wear.
              </p>
              <Link href="/lookbook" className="btn-light mt-8">Explore the Lookbook</Link>
            </Reveal>
          </div>
        </div>
      </section>

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
