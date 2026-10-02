"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../SmartImage";

/**
 * Pinned cinematic hero. The section is 3 screens tall; the visual stays
 * stuck while scroll drives: zoom into the festive shot -> the headline lifts
 * away -> we "walk through the door" into the real Varanasi store.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Layer 1: festive shot, slow push-in then fades out
  const scale1 = useTransform(p, [0, 0.5], [1.05, 1.5]);
  const fade1 = useTransform(p, [0.35, 0.6], [1, 0]);
  // Layer 2: the store, settles from a big zoom to rest
  const scale2 = useTransform(p, [0.3, 1], [1.45, 1.05]);
  const fade2 = useTransform(p, [0.3, 0.6], [0, 1]);
  // Headline lifts away
  const headOpacity = useTransform(p, [0, 0.25], [1, 0]);
  const headY = useTransform(p, [0, 0.25], [0, -70]);
  // Second caption arrives
  const capOpacity = useTransform(p, [0.55, 0.72, 0.95, 1], [0, 1, 1, 0.9]);
  const capY = useTransform(p, [0.55, 0.72], [40, 0]);
  const hint = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section ref={ref} className="relative h-[300svh] motion-reduce:h-[calc(100svh-4rem)]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-wine-dark">
        <motion.div style={{ scale: scale1, opacity: fade1 }} className="absolute inset-0 will-change-transform">
          <SmartImage
            src="/images/hero/hero-festive-2026.jpg"
            alt="Festive Edit 2026 — model in a wine Banarasi silk saree"
            palette={["#3d0f1c", "#b08d57"]}
            priority
          />
        </motion.div>
        <motion.div style={{ scale: scale2, opacity: fade2 }} className="absolute inset-0 will-change-transform">
          <SmartImage
            real
            src="/images/store-bahar.jpg"
            alt="The Kaashi Weaves store front in Varanasi"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/25" />

        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="container-x relative flex h-full flex-col items-start justify-end pb-16 text-ivory sm:pb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow text-gold-light"
          >
            New Season
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-[44px] leading-[1.02] sm:text-7xl lg:text-8xl"
          >
            Festive Edit <span className="italic text-gold-light">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/80 sm:text-base"
          >
            Handwoven Banarasi silks, reimagined for celebrations — and everything after.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex w-full flex-col gap-3 min-[400px]:w-auto min-[400px]:flex-row"
          >
            <Link href="/shop" className="btn-light">Shop Now</Link>
            <Link href="/lookbook" className="btn border border-ivory/60 text-ivory hover:bg-ivory/10">
              View Lookbook
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: capOpacity, y: capY }}
          className="container-x pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-20 text-center text-ivory sm:pb-28"
        >
          <p className="eyebrow text-gold-light">Chowk · Varanasi</p>
          <p className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">
            Step <span className="italic text-gold-light">inside</span>
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: hint }}
          aria-hidden
          className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/70 sm:right-10"
        >
          Scroll
          <span className="block h-8 w-px animate-pulse bg-ivory/60" />
        </motion.div>
      </div>
    </section>
  );
}
