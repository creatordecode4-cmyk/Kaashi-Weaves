import Link from "next/link";
import Logo from "./Logo";
import { CATEGORIES, SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-24 bg-wine-dark text-ivory/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-ivory/60">{SITE.tagline}</p>
        </div>
        <div>
          <h3 className="eyebrow mb-4 font-sans">Shop</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-gold">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4 font-sans">House</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/lookbook" className="hover:text-gold">Lookbook</Link></li>
            <li><Link href="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/cart" className="hover:text-gold">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4 font-sans">Say Namaste</h3>
          <ul className="space-y-2 text-sm">
            <li>{SITE.instagram}</li>
            <li className="break-all">{SITE.email}</li>
            <li>Chowk, Varanasi, UP</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.name}. A fictional brand.</p>
          <p className="uppercase tracking-[0.2em] text-gold-light">Concept design project</p>
        </div>
      </div>
    </footer>
  );
}
