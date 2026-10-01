"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal";
import QuantityStepper from "../QuantityStepper";
import { SIZES, type Size } from "@/lib/config";
import { MAX_QTY, useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

const SIZE_CHART: { size: Size; chest: string; waist: string; length: string }[] = [
  { size: "S", chest: "36", waist: "30", length: "40" },
  { size: "M", chest: "38", waist: "32", length: "41" },
  { size: "L", chest: "40", waist: "34", length: "42" },
  { size: "XL", chest: "42", waist: "36", length: "43" },
  { size: "XXL", chest: "44", waist: "38", length: "44" },
];

export default function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [chartOpen, setChartOpen] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 3500);
    return () => clearTimeout(t);
  }, [added]);

  const closeChart = useCallback(() => setChartOpen(false), []);

  const onAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    add({ slug: product.slug, size, qty });
    setAdded(true);
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow" id="size-label">Select size</span>
          <button type="button" onClick={() => setChartOpen(true)} className="text-xs text-wine underline underline-offset-4">
            Size chart
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-labelledby="size-label">
          {SIZES.map((s) => {
            const available = product.sizes.includes(s);
            const on = size === s;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={!available}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={`min-h-11 border text-sm transition-colors ${
                  on
                    ? "border-wine bg-wine text-ivory"
                    : available
                      ? "border-wine/25 hover:border-wine"
                      : "cursor-not-allowed border-wine/10 text-muted/50 line-through"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {error && (
          <p className="mt-2 text-xs text-wine" role="alert">Please choose a size first.</p>
        )}
      </div>

      <div className="flex gap-3">
        <QuantityStepper value={qty} onChange={setQty} min={1} max={MAX_QTY} />
        <button type="button" onClick={onAdd} className="btn-primary flex-1">
          Add to cart
        </button>
      </div>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center justify-between gap-3 border border-gold/40 bg-gold/10 px-4 py-3 text-sm"
          >
            <span>Added to your cart.</span>
            <Link href="/cart" className="text-xs uppercase tracking-[0.15em] text-wine underline underline-offset-4">
              View cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={chartOpen} onClose={closeChart} title="Size Chart">
        <p className="mb-4 text-sm text-muted">Body measurements in inches. Between sizes? Size up for a relaxed fit.</p>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-wine/20 text-xs uppercase tracking-wider text-muted">
              <th className="py-2 font-medium">Size</th>
              <th className="py-2 font-medium">Chest</th>
              <th className="py-2 font-medium">Waist</th>
              <th className="py-2 font-medium">Length</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map((r) => (
              <tr key={r.size} className={`border-b border-wine/10 ${size === r.size ? "bg-gold/10" : ""}`}>
                <td className="py-2.5 font-medium text-wine">{r.size}</td>
                <td className="py-2.5">{r.chest}</td>
                <td className="py-2.5">{r.waist}</td>
                <td className="py-2.5">{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-muted">Sarees &amp; dupattas are free size; blouse is unstitched with extra margin.</p>
      </Modal>
    </div>
  );
}
