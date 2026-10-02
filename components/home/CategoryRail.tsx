"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../SmartImage";

type Item = { slug: string; label: string; palette: [string, string] };

/**
 * Vertical scroll drives a horizontal track: the section is pinned while the
 * category cards slide sideways, with a gold progress line underneath.
 */
export default function CategoryRail({ items }: { items: Item[] }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const maxX = useRef(0);
  const [height, setHeight] = useState<number | null>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, (v) => -v * maxX.current);
  const bar = useTransform(p, [0, 1], [0, 1]);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      const box = pin.current;
      if (!t || !box) return;
      const viewport = window.innerWidth;
      maxX.current = Math.max(0, t.scrollWidth - viewport);
      // pinned scroll distance = horizontal travel; section = content height + that travel
      setHeight(box.offsetHeight + maxX.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="cat-heading"
      style={{ height: height ?? "250svh" }}
      className="relative mt-20 sm:mt-28"
    >
      <div ref={pin} className="sticky top-20 flex flex-col overflow-hidden py-6">
        <div className="container-x mb-8 text-center">
          <p className="eyebrow">Shop by</p>
          <h2 id="cat-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Categories</h2>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-4 px-4 will-change-transform sm:gap-6 sm:px-10">
          {items.map((c, i) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="group relative block w-[68vw] shrink-0 sm:w-[36vw] lg:w-[24vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <SmartImage
                  src={`/images/categories/${c.slug}.jpg`}
                  alt={`${c.label} collection`}
                  palette={c.palette}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 36vw, 68vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />
                <span className="absolute left-4 top-3 font-serif text-5xl italic text-ivory/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-5 text-center font-serif text-2xl text-ivory">{c.label}</span>
              </div>
            </Link>
          ))}
        </motion.div>
        <div className="container-x mt-8">
          <div className="h-px w-full bg-wine/15">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
