"use client";

import Link from "next/link";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import { CATEGORIES } from "@/lib/config";
import { gsap, useGSAP, HEADER_OFFSET, MOTION_OK } from "@/lib/gsap";

const PALETTES: Record<string, [string, string]> = {
  men: ["#3d0f1c", "#a3824f"],
  women: ["#8c2a4a", "#e2b77a"],
  kids: ["#e8b7a0", "#b08d57"],
  festive: ["#5a1a2b", "#d4bc8f"],
  streetwear: ["#1e1a1d", "#7a5c3a"],
};

/**
 * Pinned horizontal scroll: the section pins and the card track slides
 * sideways, each card easing in from the right as it arrives.
 * Without motion it's a plain swipeable row.
 */
export default function CategoryScroller() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        root.classList.add("kw-hscroll");
        const pin = root.querySelector<HTMLElement>("[data-pin]")!;
        const track = root.querySelector<HTMLElement>("[data-track]")!;
        // Measure from layout (offsetLeft), not scrollWidth: the cards' entrance
        // transforms would otherwise inflate the scroll distance.
        const end = track.lastElementChild as HTMLElement;
        const distance = () => Math.max(0, end.offsetLeft + end.offsetWidth - pin.clientWidth);

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: `center center+=${HEADER_OFFSET / 2}`,
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-card]", root).forEach((card) => {
          gsap.from(card, {
            xPercent: 35,
            autoAlpha: 0,
            rotate: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: slide,
              start: "left 100%",
              end: "left 80%",
              scrub: true,
            },
          });
        });

        gsap.from("[data-progress]", {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: pin, start: `center center+=${HEADER_OFFSET / 2}`, end: () => `+=${distance()}`, scrub: true },
        });

        return () => root.classList.remove("kw-hscroll");
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="overflow-hidden pt-20 sm:pt-28" aria-labelledby="cat-heading">
      <div data-pin className="py-6">
        <div className="container-x mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="eyebrow">Shop by</p>
            <h2 id="cat-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Categories</h2>
          </div>
          <div className="hidden h-px w-32 bg-wine/15 in-[.kw-hscroll]:block sm:w-48" aria-hidden>
            <div data-progress className="h-full origin-left bg-gold" />
          </div>
        </div>
        <ul
          data-track
          className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] in-[.kw-hscroll]:snap-none in-[.kw-hscroll]:overflow-visible sm:gap-5 sm:px-6 lg:px-10"
        >
          {CATEGORIES.map((c, i) => (
            <li key={c.slug} data-card className="w-[68vw] shrink-0 snap-start sm:w-[40vw] lg:w-[26vw]">
              <Link href={`/shop?category=${c.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SmartImage
                    src={`/images/categories/${c.slug}.jpg`}
                    alt={`${c.label} collection`}
                    palette={PALETTES[c.slug]}
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 68vw"
                    className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />
                  <span className="absolute left-4 top-4 font-serif text-sm italic text-ivory/80">0{i + 1}</span>
                  <span className="absolute inset-x-4 bottom-4 font-serif text-2xl text-ivory">{c.label}</span>
                </div>
              </Link>
            </li>
          ))}
          {/* End spacer so the last card stops at the same inset as the first */}
          <li aria-hidden className="w-1 shrink-0 lg:w-5" />
        </ul>
      </div>
    </section>
  );
}
