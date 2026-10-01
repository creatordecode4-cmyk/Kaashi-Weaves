"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { CATEGORIES, SIZES, type Category, type Size } from "@/lib/config";
import { inCategory, products } from "@/lib/products";

const PRICE_RANGES = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "u5", label: "Under ₹5,000", min: 0, max: 5000 },
  { id: "5-15", label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { id: "15p", label: "Above ₹15,000", min: 15000, max: Infinity },
] as const;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name: A–Z" },
] as const;

type PriceId = (typeof PRICE_RANGES)[number]["id"];
type SortId = (typeof SORTS)[number]["id"];

export default function ShopView({ initialCategory }: { initialCategory: Category | null }) {
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [price, setPrice] = useState<PriceId>("all");
  const [sizes, setSizes] = useState<Size[]>([]);
  const [sort, setSort] = useState<SortId>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === price)!;
    const out = products.filter(
      (p) =>
        (!category || inCategory(p, category)) &&
        p.price >= range.min &&
        p.price < range.max &&
        (sizes.length === 0 || sizes.some((s) => p.sizes.includes(s))),
    );
    switch (sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      case "name":
        return [...out].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
  }, [category, price, sizes, sort]);

  const activeCount = (category ? 1 : 0) + (price !== "all" ? 1 : 0) + sizes.length;

  const reset = () => {
    setCategory(null);
    setPrice("all");
    setSizes([]);
  };

  const chip = (active: boolean) =>
    `min-h-9 border px-3 text-xs uppercase tracking-[0.12em] transition-colors ${
      active ? "border-wine bg-wine text-ivory" : "border-wine/20 text-ink hover:border-wine"
    }`;

  const filters = (
    <div className="space-y-7">
      <fieldset>
        <legend className="eyebrow mb-3">Category</legend>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(!category)} onClick={() => setCategory(null)}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              className={chip(category === c.slug)}
              onClick={() => setCategory(category === c.slug ? null : c.slug)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Price</legend>
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex min-h-9 cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                name="price"
                value={r.id}
                checked={price === r.id}
                onChange={() => setPrice(r.id)}
                className="size-4 accent-wine"
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const on = sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                className={`${chip(on)} min-w-11`}
                onClick={() => setSizes(on ? sizes.filter((x) => x !== s) : [...sizes, s])}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button type="button" onClick={reset} className="text-xs uppercase tracking-[0.2em] text-wine underline underline-offset-4">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-24">{filters}</div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-3 border-y border-wine/10 py-3">
          <button
            type="button"
            className="flex min-h-10 items-center gap-2 text-xs uppercase tracking-[0.18em] text-wine lg:hidden"
            aria-expanded={filtersOpen}
            aria-controls="mobile-filters"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <p className="hidden text-sm text-muted lg:block" aria-live="polite">
            {list.length} {list.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="flex items-center gap-2 text-xs text-muted">
            <span className="sr-only sm:not-sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="min-h-10 max-w-[170px] border border-wine/20 bg-transparent px-2 text-xs text-ink focus:border-wine"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Mobile filters */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              id="mobile-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="pb-8">{filters}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mb-4 text-sm text-muted lg:hidden" aria-live="polite">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-wine">Nothing matches — yet.</p>
            <button type="button" onClick={reset} className="btn-outline mt-6">Clear filters</button>
          </div>
        ) : (
          <motion.ul layout className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProductCard product={p} priority={i < 4} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
