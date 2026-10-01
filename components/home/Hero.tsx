"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../SmartImage";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-wine-dark">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <SmartImage
          src="/images/hero/hero-festive-2026.jpg"
          alt="Festive Edit 2026 — model in a wine Banarasi silk saree"
          palette={["#3d0f1c", "#b08d57"]}
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      <motion.div
        style={{ opacity: fade }}
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
    </section>
  );
}
