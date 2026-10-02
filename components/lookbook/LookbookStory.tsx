"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import SmartImage from "../SmartImage";

export type Scene = {
  n: string;
  title: string;
  text: string;
  palette: [string, string];
  align: "left" | "right";
  product: string;
};

function Slide({ scene, i, total, p }: { scene: Scene; i: number; total: number; p: MotionValue<number> }) {
  const start = i / total;
  const end = (i + 1) / total;
  const f = 0.07; // cross-fade width

  // first slide starts visible, last slide stays visible
  const inputs = i === 0 ? [end - f, end + f] : i === total - 1 ? [start - f, start + f] : [start - f, start + f, end - f, end + f];
  const outputs = i === 0 ? [1, 0] : i === total - 1 ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(p, inputs, outputs);
  const scale = useTransform(p, [start - 0.1, end + 0.1], [1.02, 1.22]);
  const imgY = useTransform(p, [start - 0.1, end + 0.1], ["-4%", "4%"]);
  const textY = useTransform(p, [start, start + 0.1], i === 0 ? [0, 0] : [50, 0]);
  const num = useTransform(p, [start - 0.1, end + 0.1], [30, -30]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden={false}>
      <motion.div style={{ scale, y: imgY }} className="absolute inset-0 will-change-transform">
        <SmartImage
          src={`/images/lookbook/look-${i + 1}.jpg`}
          alt={scene.title}
          palette={scene.palette}
          label={`lookbook/look-${i + 1}.jpg`}
        />
      </motion.div>
      <div
        className={`absolute inset-0 ${
          scene.align === "left"
            ? "bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:bg-gradient-to-r sm:from-black/65"
            : "bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:bg-gradient-to-l sm:from-black/65"
        }`}
      />
      <div
        className={`container-x relative flex h-full items-end pb-24 sm:items-center sm:pb-0 ${
          scene.align === "right" ? "sm:justify-end" : ""
        }`}
      >
        <motion.div style={{ y: textY }} className="max-w-md">
          <motion.p style={{ y: num }} className="font-serif text-7xl italic text-gold-light/80 sm:text-9xl">
            {scene.n}
          </motion.p>
          <h2 className="mt-2 text-4xl leading-tight sm:text-5xl">{scene.title}</h2>
          <p className="mt-4 leading-relaxed text-ivory/80">{scene.text}</p>
          <Link
            href={`/product/${scene.product}`}
            className="mt-6 inline-block border-b border-gold-light pb-0.5 text-xs uppercase tracking-[0.2em] text-gold-light"
          >
            Shop this look
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** One pinned screen; each look cross-fades into the next as you scroll. */
export default function LookbookStory({ scenes }: { scenes: Scene[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => setActive(Math.min(scenes.length - 1, Math.max(0, Math.floor(v * scenes.length)))));
  const bar = useTransform(p, [0, 1], [0, 1]);

  return (
    <section ref={ref} style={{ height: `${scenes.length * 120}svh` }} className="relative" aria-label="Lookbook story">
      <div className="sticky top-16 h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden">
        {scenes.map((s, i) => (
          <Slide key={s.n} scene={s} i={i} total={scenes.length} p={p} />
        ))}

        <div aria-hidden className="pointer-events-none absolute bottom-6 left-0 right-0">
          <div className="container-x flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-ivory/80">
            <span>{String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
            <div className="h-px flex-1 bg-ivory/25">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold-light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
