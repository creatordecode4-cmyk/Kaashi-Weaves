"use client";

import Link from "next/link";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import { gsap, useGSAP, HEADER_OFFSET, MOTION_OK } from "@/lib/gsap";

export type Look = {
  n: string;
  title: string;
  text: string;
  palette: [string, string];
  product: string;
};

/**
 * Pinned, full-screen lookbook: every look sits on the same stage and the
 * next one cross-fades in with a slow zoom as you scroll.
 * Without motion the looks are simply stacked full-screen sections.
 */
export default function LookbookStage({ looks }: { looks: Look[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        root.classList.add("kw-stage");
        const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]", root);
        const img = (el: HTMLElement) => el.querySelector("[data-img]");
        const txt = (el: HTMLElement) => el.querySelector("[data-text]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", root);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            pin: true,
            start: `top top+=${HEADER_OFFSET}`,
            end: () => `+=${window.innerHeight * (scenes.length - 0.4)}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(scenes.slice(1), { autoAlpha: 0 });
        gsap.set(dots.slice(1), { opacity: 0.35 });
        // First look: slow push-in while it holds
        tl.fromTo(img(scenes[0]), { scale: 1.12 }, { scale: 1, duration: 1 }, 0);

        scenes.forEach((scene, i) => {
          if (i === 0) return;
          const prev = scenes[i - 1];
          const at = i; // one timeline unit per look
          tl.to(txt(prev), { autoAlpha: 0, y: -40, duration: 0.25, ease: "power2.in" }, at - 0.35)
            .to(img(prev), { scale: 1.08, duration: 0.6 }, at - 0.35)
            .to(scene, { autoAlpha: 1, duration: 0.45, ease: "power1.inOut" }, at - 0.2)
            .fromTo(img(scene), { scale: 1.18 }, { scale: 1, duration: 1 }, at - 0.2)
            .fromTo(txt(scene), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, at + 0.05)
            .to(dots[i - 1], { opacity: 0.35, duration: 0.2 }, at - 0.1)
            .to(dots[i], { opacity: 1, duration: 0.2 }, at - 0.1);
        });
        tl.to({}, { duration: 0.4 }); // hold on the last look

        return () => root.classList.remove("kw-stage");
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative bg-wine-dark [&.kw-stage]:h-[calc(100svh-4rem)] [&.kw-stage]:overflow-hidden"
      aria-label="Lookbook"
    >
      {looks.map((look, i) => (
        <article
          key={look.n}
          data-scene
          className="relative h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden in-[.kw-stage]:absolute in-[.kw-stage]:inset-0 in-[.kw-stage]:h-auto in-[.kw-stage]:min-h-0"
        >
          <div data-img className="absolute inset-0 will-change-transform">
            <SmartImage
              src={`/images/lookbook/look-${i + 1}.jpg`}
              alt={look.title}
              palette={look.palette}
              label={`lookbook/look-${i + 1}.jpg`}
              priority={i === 0}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10 md:bg-gradient-to-r md:from-black/65 md:via-black/20 md:to-transparent" />
          <div data-text className="container-x relative flex h-full items-end pb-20 md:items-center md:pb-0">
            <div className="max-w-md text-ivory">
              <p className="font-serif text-5xl italic text-gold-light/80 sm:text-7xl">{look.n}</p>
              <h2 className="mt-2 text-4xl leading-tight sm:text-5xl">{look.title}</h2>
              <p className="mt-3 max-w-sm leading-relaxed text-ivory/80">{look.text}</p>
              <Link
                href={`/product/${look.product}`}
                className="mt-6 inline-block border-b border-gold-light pb-0.5 text-xs uppercase tracking-[0.2em] text-gold-light"
              >
                Shop this look
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center gap-2 in-[.kw-stage]:flex"
        aria-hidden
      >
        {looks.map((look) => (
          <span key={look.n} data-dot className="h-1 w-8 bg-ivory" />
        ))}
      </div>
    </section>
  );
}
