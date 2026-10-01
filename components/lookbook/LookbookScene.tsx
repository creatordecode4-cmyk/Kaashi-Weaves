"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../SmartImage";

type Props = {
  n: string;
  title: string;
  text: string;
  palette: [string, string];
  align: "left" | "right";
  product: string;
  index: number;
};

export default function LookbookScene({ n, title, text, palette, align, product, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);

  return (
    <section ref={ref} className="relative h-[110svh] min-h-[560px] overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <SmartImage
          src={`/images/lookbook/look-${index + 1}.jpg`}
          alt={title}
          palette={palette}
          label={`lookbook/look-${index + 1}.jpg`}
        />
      </motion.div>
      <div
        className={`absolute inset-0 ${
          align === "left"
            ? "bg-gradient-to-r from-black/60 via-black/20 to-transparent"
            : "bg-gradient-to-l from-black/60 via-black/20 to-transparent"
        }`}
      />
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className={`container-x relative flex h-full items-end pb-24 sm:items-center sm:pb-0 ${
          align === "right" ? "sm:justify-end" : ""
        }`}
      >
        <div className="max-w-md">
          <p className="font-serif text-6xl italic text-gold-light/80 sm:text-8xl">{n}</p>
          <h2 className="mt-2 text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-ivory/80">{text}</p>
          <Link
            href={`/product/${product}`}
            className="mt-6 inline-block border-b border-gold-light pb-0.5 text-xs uppercase tracking-[0.2em] text-gold-light"
          >
            Shop this look
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
