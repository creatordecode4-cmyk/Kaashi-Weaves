import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Kaashi Weaves — home" className="group inline-flex flex-col leading-none">
      <span className={`font-serif text-xl tracking-wide sm:text-2xl ${light ? "text-ivory" : "text-wine"}`}>
        Kaashi <span className="italic text-gold">Weaves</span>
      </span>
      <span className={`mt-1 text-[8px] uppercase tracking-[0.4em] ${light ? "text-ivory/60" : "text-muted"}`}>
        Varanasi · Est. 2026
      </span>
    </Link>
  );
}
