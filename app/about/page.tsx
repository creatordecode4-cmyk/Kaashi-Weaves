import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "About",
  description: "Kaashi Weaves brings Varanasi's handloom heritage to modern wardrobes — working directly with weaver families in Banaras.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Handloom first", text: "Every silk piece is woven on a handloom by artisans in and around Varanasi." },
  { title: "Fair to the loom", text: "We work directly with weaver families — no middlemen, fair and timely pay." },
  { title: "Made to last", text: "Real zari, natural fibres and silhouettes designed to outlive trends." },
];

export default function AboutPage() {
  return (
    <div className="pt-10 sm:pt-14">
      <section className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 text-4xl leading-tight text-wine sm:text-6xl">
            Woven in Kaashi. <span className="italic text-gold">Worn everywhere.</span>
          </h1>
          <p className="mt-6 leading-relaxed text-ink/80">
            Kaashi Weaves began in the narrow lanes of Varanasi, where the clack of the handloom has been the
            city&apos;s heartbeat for centuries. We set out to carry that craft into the way people dress today — a
            Banarasi saree for the wedding, yes, but also a brocade bomber for the Tuesday after.
          </p>
          <p className="mt-4 leading-relaxed text-ink/80">
            Each collection is designed in-house and woven by master artisans we know by name.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            real
            src="/images/store-bahar.jpg"
            alt="The Kaashi Weaves storefront on the ghats of Varanasi at dusk"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </Reveal>
      </section>

      <section className="container-x pt-20 sm:pt-28" aria-labelledby="store-heading">
        <Reveal className="mb-8 max-w-xl">
          <p className="eyebrow">The Store</p>
          <h2 id="store-heading" className="mt-2 text-3xl text-wine sm:text-4xl">Step inside the Chowk flagship</h2>
          <p className="mt-4 leading-relaxed text-ink/80">
            Silks folded floor to ceiling, brocades on brass rails and a quiet corner to try them on. Come by for a
            cup of chai and let us drape a saree for you.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <SmartImage
            real
            src="/images/store-andar.jpg"
            alt="Inside the Kaashi Weaves store: silk sarees on shelves and rails, a display table and seating"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </Reveal>
      </section>

      <section className="container-x pt-20 sm:pt-28">
        <div className="grid gap-8 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="border-t border-gold/50 pt-6">
              <p className="font-serif text-3xl italic text-gold">0{i + 1}</p>
              <h2 className="mt-3 text-2xl text-wine">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pt-20 text-center sm:pt-28">
        <Reveal>
          <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-wine sm:text-3xl">
            &ldquo;A Banarasi isn&apos;t bought. It&apos;s inherited — we just make sure it&apos;s worth
            inheriting.&rdquo;
          </blockquote>
          <Link href="/shop" className="btn-outline mt-10">Explore the collection</Link>
        </Reveal>
      </section>
    </div>
  );
}
