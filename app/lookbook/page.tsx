import type { Metadata } from "next";
import Link from "next/link";
import LookbookStage, { type Look } from "@/components/lookbook/LookbookStage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Lookbook — Festive 2026",
  description: "Of ghats, gold and the hour before dusk — the Kaashi Weaves Festive 2026 lookbook, shot in Varanasi.",
  alternates: { canonical: "/lookbook" },
};

const LOOKS: Look[] = [
  {
    n: "01",
    title: "Subah-e-Banaras",
    text: "First light on the ghats. Ivory tissue, a whisper of gold — dressed for the hour when the city is still waking.",
    palette: ["#efe6d6", "#b08d57"],
    product: "chandni-anarkali",
  },
  {
    n: "02",
    title: "The Weaver's Lane",
    text: "Inside the karkhanas of Madanpura, a single saree takes three weeks. Every thread, a decision.",
    palette: ["#3d0f1c", "#a3824f"],
    product: "zari-noor-silk-saree",
  },
  {
    n: "03",
    title: "Brocade, Unbuttoned",
    text: "Heritage jacquards cut into bombers and co-ords. The loom meets the street — and neither blinks.",
    palette: ["#1e1a1d", "#8f7a5a"],
    product: "kaashi-bomber-jacket",
  },
  {
    n: "04",
    title: "Godhuli",
    text: "Cow-dust hour. Lamps on the water, wine silk catching the last of the sun. The festive season begins.",
    palette: ["#5a1a2b", "#d4bc8f"],
    product: "shahi-sherwani",
  },
];

export default function LookbookPage() {
  return (
    <div className="-mb-24 bg-wine-dark text-ivory">
      <section className="container-x flex min-h-[70svh] flex-col justify-center py-20 text-center">
        <Reveal>
          <p className="eyebrow text-gold-light">Lookbook · Festive 2026</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
            Of ghats, <span className="italic text-gold-light">gold</span> &amp; the hour before dusk
          </h1>
          <p className="mx-auto mt-6 max-w-md text-ivory/60">Scroll to walk through the looks.</p>
        </Reveal>
      </section>

      <LookbookStage looks={LOOKS} />

      <section className="container-x py-28 text-center">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">Wear the story.</h2>
          <Link href="/shop?category=festive" className="btn-light mt-8">Shop the Festive Edit</Link>
        </Reveal>
      </section>
    </div>
  );
}
