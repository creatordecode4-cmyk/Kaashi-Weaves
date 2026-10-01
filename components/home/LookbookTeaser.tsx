"use client";

import Link from "next/link";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Three-photo collage; each layer drifts at its own speed (data-speed, in px of travel). */
export default function LookbookTeaser() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: MOTION_OK, small: "(max-width: 767px)" },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const factor = ctx.conditions.small ? 0.5 : 1; // gentler on phones
          gsap.utils.toArray<HTMLElement>("[data-speed]", ref.current).forEach((el) => {
            const travel = Number(el.dataset.speed) * factor;
            gsap.fromTo(
              el,
              { y: travel },
              {
                y: -travel,
                ease: "none",
                scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="pt-20 sm:pt-28" aria-labelledby="lookbook-heading">
      <div className="relative isolate overflow-hidden bg-wine">
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-28">
          <div className="relative h-[400px] sm:h-[520px] md:order-2 md:h-[600px]">
            <div data-speed="40" className="absolute left-0 top-[8%] w-[68%] will-change-transform">
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                <SmartImage
                  real
                  src="/images/store-rack.jpg"
                  alt="A rail of Banarasi silk sarees and an ivory sherwani in the Kaashi Weaves store"
                  sizes="(min-width: 768px) 34vw, 68vw"
                />
              </div>
            </div>
            <div data-speed="100" className="absolute right-0 top-0 z-10 w-[42%] will-change-transform">
              <div className="relative aspect-square overflow-hidden border-4 border-wine shadow-2xl">
                <SmartImage
                  real
                  src="/images/store-bahar-2.jpg"
                  alt="The Kaashi Weaves storefront at dusk"
                  sizes="(min-width: 768px) 21vw, 42vw"
                />
              </div>
            </div>
            <div data-speed="70" className="absolute bottom-0 right-[6%] z-10 w-[38%] will-change-transform">
              <div className="relative aspect-[3/4] overflow-hidden border-4 border-wine shadow-2xl">
                <SmartImage
                  src="/images/lookbook/look-1.jpg"
                  alt="Lookbook: Subah-e-Banaras"
                  palette={["#efe6d6", "#b08d57"]}
                  sizes="(min-width: 768px) 19vw, 38vw"
                />
              </div>
            </div>
          </div>

          <div className="text-ivory">
            <p className="eyebrow">Lookbook · Festive 2026</p>
            <h2 id="lookbook-heading" className="mt-3 text-4xl leading-tight sm:text-5xl">
              Of ghats, <span className="italic text-gold-light">gold</span> &amp; the hour before dusk.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ivory/70">
              Shot along the river in Varanasi, our festive story pairs centuries-old weaves with silhouettes you
              will actually wear.
            </p>
            <Link href="/lookbook" className="btn-light mt-8">Explore the Lookbook</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
