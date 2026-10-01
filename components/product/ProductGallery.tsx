"use client";

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "../SmartImage";
import { productImage, type Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const images = Array.from({ length: product.imageCount }, (_, i) => productImage(product.slug, i));
  // Shift the gradient a little per image so placeholders look distinct
  const paletteFor = (i: number): [string, string] =>
    i % 2 === 0 ? product.palette : [product.palette[1], product.palette[0]];

  const updateOrigin = (e: MouseEvent) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  const go = (dir: number) => {
    setZoom(false);
    setActive((a) => (a + dir + images.length) % images.length);
  };

  return (
    <div className="flex min-w-0 flex-col-reverse gap-3 md:flex-row">
      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2 md:flex md:flex-col" role="tablist" aria-label="Product images">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Image ${i + 1}`}
            onClick={() => {
              setActive(i);
              setZoom(false);
            }}
            className={`relative aspect-[3/4] w-full shrink-0 overflow-hidden border transition-opacity md:w-20 ${
              active === i ? "border-wine opacity-100" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <SmartImage src={src} alt="" palette={paletteFor(i)} sizes="80px" />
          </button>
        ))}
      </div>

      {/* Main image with zoom */}
      <div className="relative min-w-0 flex-1">
        <div
          ref={frameRef}
          className={`relative aspect-[3/4] overflow-hidden bg-ivory-dark ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={(e) => {
            updateOrigin(e);
            setZoom((z) => !z);
          }}
          onPointerMove={(e) => {
            if (zoom || e.pointerType === "mouse") updateOrigin(e);
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setZoom(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setZoom(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (zoom || touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          style={{ touchAction: zoom ? "none" : "pan-y" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{ transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: origin }}
              >
                <SmartImage
                  src={images[active]}
                  alt={`${product.name} — view ${active + 1}`}
                  palette={paletteFor(active)}
                  label={images[active].replace("/images/", "")}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  priority={active === 0}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden">
          {images.map((src, i) => (
            <span key={src} className={`h-1 rounded-full transition-all ${active === i ? "w-5 bg-ivory" : "w-1.5 bg-ivory/50"}`} />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted md:text-left">
          <span className="md:hidden">Swipe to browse · tap to zoom</span>
          <span className="hidden md:inline">Hover to zoom</span>
        </p>
      </div>
    </div>
  );
}
