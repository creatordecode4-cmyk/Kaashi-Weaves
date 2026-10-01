"use client";

import Link from "next/link";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import { gsap, useGSAP, HEADER_OFFSET, MOTION_OK } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: `top top+=${HEADER_OFFSET}`,
            end: "bottom top",
            scrub: true,
          },
        });
        tl.to("[data-hero-media]", { scale: 1.18 }, 0)
          .to("[data-hero-content]", { y: -140, autoAlpha: 0, duration: 0.6 }, 0)
          .to("[data-hero-shade]", { opacity: 0.85, duration: 1 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-wine-dark">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <SmartImage
          src="/images/hero/hero-festive-2026.jpg"
          alt="Festive Edit 2026 — model in a wine Banarasi silk saree"
          palette={["#3d0f1c", "#b08d57"]}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
      <div data-hero-shade className="absolute inset-0 bg-wine-dark opacity-0" />

      <div
        data-hero-content
        className="container-x relative flex h-full flex-col items-start justify-end pb-16 text-ivory sm:pb-24"
      >
        <p className="eyebrow kw-rise text-gold-light">New Season</p>
        <h1 className="kw-rise mt-3 text-[44px] leading-[1.02] [animation-delay:120ms] sm:text-7xl lg:text-8xl">
          Festive Edit <span className="italic text-gold-light">2026</span>
        </h1>
        <p className="kw-rise mt-4 max-w-md text-[15px] leading-relaxed text-ivory/80 [animation-delay:280ms] sm:text-base">
          Handwoven Banarasi silks, reimagined for celebrations — and everything after.
        </p>
        <div className="kw-rise mt-8 flex w-full flex-col gap-3 [animation-delay:420ms] min-[400px]:w-auto min-[400px]:flex-row">
          <Link href="/shop" className="btn-light">Shop Now</Link>
          <Link href="/lookbook" className="btn border border-ivory/60 text-ivory hover:bg-ivory/10">
            View Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
