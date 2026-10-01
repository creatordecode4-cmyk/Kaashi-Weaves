"use client";

import Link from "next/link";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import { gsap, useGSAP, HEADER_OFFSET, MOTION_OK } from "@/lib/gsap";

const STEPS = [
  {
    word: "Dhaaga",
    en: "The thread",
    text: "Pure mulberry silk is dyed in small batches and wound onto bobbins by hand. The colour is set before a single thread is woven.",
  },
  {
    word: "Bunai",
    en: "The weave",
    text: "On a pit loom the weaver lifts the warp with a jacquard of punched cards and passes the shuttle through, one line at a time.",
  },
  {
    word: "Zari",
    en: "The gold",
    text: "Silver-gilt zari is woven into the pattern to raise each motif. It's the shimmer that makes a Banarasi a Banarasi.",
  },
];

/**
 * "Handcrafted in Varanasi": the weaver photo pins while the three steps
 * cross-fade with scroll. Without motion, all steps are listed.
 */
export default function CraftSteps() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        root.classList.add("kw-steps");
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
        const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root);

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "[data-pin]",
            pin: true,
            start: `top top+=${HEADER_OFFSET}`,
            end: () => `+=${window.innerHeight * 2.2}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(steps.slice(1), { autoAlpha: 0, y: 28 });
        tl.fromTo("[data-craft-img]", { scale: 1.18 }, { scale: 1, ease: "none", duration: 3 }, 0);
        tl.fromTo(bars[0], { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
        steps.forEach((step, i) => {
          if (i === 0) return;
          const at = i; // each step owns one unit of the timeline
          tl.to(steps[i - 1], { autoAlpha: 0, y: -28, duration: 0.3 }, at - 0.15)
            .to(step, { autoAlpha: 1, y: 0, duration: 0.3 }, at)
            .fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, at);
        });

        return () => root.classList.remove("kw-steps");
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="pt-20 sm:pt-28" aria-labelledby="store-heading">
      <div
        data-pin
        className="container-x grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-14 in-[.kw-steps]:h-[calc(100svh-4rem)] in-[.kw-steps]:content-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden in-[.kw-steps]:max-h-[42svh] in-[.kw-steps]:w-full md:in-[.kw-steps]:max-h-none">
          <div data-craft-img className="absolute inset-0 will-change-transform">
            <SmartImage
              real
              src="/images/store-craft.jpg"
              alt="A weaver's hands working gold zari into wine silk on a handloom"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <div>
          <p className="eyebrow">Our Store</p>
          <h2 id="store-heading" className="mt-2 text-3xl leading-tight text-wine sm:text-4xl">
            Handcrafted in <span className="italic text-gold">Varanasi</span>
          </h2>

          <div className="mt-4 hidden gap-2 in-[.kw-steps]:flex" aria-hidden>
            {STEPS.map((s) => (
              <div key={s.word} className="h-0.5 flex-1 bg-wine/15">
                <div data-bar className="h-full origin-left bg-gold" />
              </div>
            ))}
          </div>

          <ol className="mt-5 space-y-6 in-[.kw-steps]:grid in-[.kw-steps]:space-y-0">
            {STEPS.map((s, i) => (
              <li key={s.word} data-step className="max-w-md in-[.kw-steps]:[grid-area:1/1]">
                <p className="font-serif text-sm italic text-gold">0{i + 1} · {s.en}</p>
                <h3 className="mt-1 text-2xl text-wine sm:text-3xl">{s.word}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{s.text}</p>
              </li>
            ))}
          </ol>

          <Link href="/about" className="btn-outline mt-6 sm:mt-8">Visit the store</Link>
        </div>
      </div>
    </section>
  );
}
