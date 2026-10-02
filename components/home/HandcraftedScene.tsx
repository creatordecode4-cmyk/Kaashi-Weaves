"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import SmartImage from "../SmartImage";

/**
 * Pinned "Handcrafted in Varanasi" scene: the loom photo opens from a small
 * window to full-bleed, then the story lines arrive one by one.
 */
export default function HandcraftedScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const insetY = useTransform(p, [0, 0.4], [22, 0]);
  const insetX = useTransform(p, [0, 0.4], [26, 0]);
  const clip = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}%)`;
  const scale = useTransform(p, [0, 1], [1.35, 1.02]);
  const shade = useTransform(p, [0.3, 0.6], [0, 0.55]);

  const eyebrowO = useTransform(p, [0.35, 0.48], [0, 1]);
  const headO = useTransform(p, [0.42, 0.58], [0, 1]);
  const headY = useTransform(p, [0.42, 0.58], [36, 0]);
  const bodyO = useTransform(p, [0.58, 0.72], [0, 1]);
  const bodyY = useTransform(p, [0.58, 0.72], [28, 0]);
  const ctaO = useTransform(p, [0.74, 0.86], [0, 1]);
  const line = useTransform(p, [0.4, 0.9], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="store-heading" className="relative mt-20 h-[280svh] sm:mt-28 motion-reduce:h-auto">
      <div className="sticky top-16 h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-ivory">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-wine-dark">
          <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
            <SmartImage
              real
              src="/images/store-craft.jpg"
              alt="A weaver's hands working gold zari into wine silk on a handloom"
              sizes="100vw"
            />
          </motion.div>
          <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-black" />
        </motion.div>

        <div className="container-x relative flex h-full flex-col items-start justify-center text-ivory">
          <motion.p style={{ opacity: eyebrowO }} className="eyebrow text-gold-light">Our Store</motion.p>
          <motion.h2
            id="store-heading"
            style={{ opacity: headO, y: headY }}
            className="mt-3 max-w-xl text-4xl leading-tight sm:text-6xl"
          >
            Handcrafted in <span className="italic text-gold-light">Varanasi</span>
          </motion.h2>
          <motion.div style={{ scaleX: line }} className="mt-6 h-px w-24 origin-left bg-gold-light" />
          <motion.p style={{ opacity: bodyO, y: bodyY }} className="mt-6 max-w-md leading-relaxed text-ivory/85">
            Every Kaashi Weaves silk starts on a handloom a few lanes from our store, where master weavers pass gold
            zari through the warp one thread at a time. Visit us in Chowk to see the craft up close.
          </motion.p>
          <motion.div style={{ opacity: ctaO }} className="mt-8">
            <Link href="/about" className="btn-light">Visit the store</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
