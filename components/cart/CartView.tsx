"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal";
import SmartImage from "../SmartImage";
import QuantityStepper from "../QuantityStepper";
import { MAX_QTY, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/config";
import { getProduct, productImage } from "@/lib/products";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

export default function CartView() {
  const { items, subtotal, count, ready, setQty, remove, clear } = useCart();
  const [conceptOpen, setConceptOpen] = useState(false);
  const closeConcept = useCallback(() => setConceptOpen(false), []);

  if (!ready) return <div className="h-64" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-3xl text-wine">Your cart is empty.</p>
        <p className="mt-3 text-muted">Something handwoven is waiting for you.</p>
        <Link href="/shop" className="btn-primary mt-8">Continue shopping</Link>
      </div>
    );
  }

  // null when NEXT_PUBLIC_WHATSAPP_NUMBER isn't set → concept-store modal instead
  const href = whatsappLink(buildOrderMessage(items));

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
      <div>
        <ul className="divide-y divide-wine/10 border-y border-wine/10">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const p = getProduct(item.slug);
              if (!p) return null;
              return (
                <motion.li
                  key={`${item.slug}-${item.size}`}
                  layout
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 overflow-hidden py-5"
                >
                  <Link href={`/product/${p.slug}`} className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden sm:w-24">
                    <SmartImage src={productImage(p.slug, 0)} alt={p.name} palette={p.palette} sizes="96px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/product/${p.slug}`} className="font-serif text-base leading-snug text-ink hover:text-wine sm:text-lg">
                          {p.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          Size {item.size} · {formatPrice(p.price)}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-wine">{formatPrice(p.price * item.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <QuantityStepper
                        size="sm"
                        value={item.qty}
                        min={1}
                        max={MAX_QTY}
                        label={`Quantity for ${p.name}`}
                        onChange={(n) => setQty(item.slug, item.size, n)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(item.slug, item.size)}
                        className="min-h-9 text-xs uppercase tracking-[0.15em] text-muted underline-offset-4 hover:text-wine hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        <div className="mt-4 flex justify-between text-xs">
          <Link href="/shop" className="uppercase tracking-[0.15em] text-wine underline underline-offset-4">
            Continue shopping
          </Link>
          <button type="button" onClick={clear} className="uppercase tracking-[0.15em] text-muted hover:text-wine">
            Clear cart
          </button>
        </div>
      </div>

      <aside className="h-fit bg-ivory-dark p-5 sm:p-7 lg:sticky lg:top-24" aria-label="Order summary">
        <h2 className="text-2xl text-wine">Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Items</dt>
            <dd>{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd>Confirmed on WhatsApp</dd>
          </div>
          <div className="flex justify-between border-t border-wine/15 pt-3 text-base">
            <dt className="font-medium">Total</dt>
            <dd className="font-medium text-wine">{formatPrice(subtotal)}</dd>
          </div>
        </dl>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={WA_BUTTON}>
            <WhatsAppIcon />
            Order on WhatsApp
          </a>
        ) : (
          <button type="button" onClick={() => setConceptOpen(true)} className={WA_BUTTON}>
            <WhatsAppIcon />
            Order on WhatsApp
          </button>
        )}
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          No online payment — we confirm availability, shipping &amp; payment with you directly on WhatsApp.
        </p>
      </aside>

      <Modal open={conceptOpen} onClose={closeConcept} title="Concept store">
        <p className="text-sm leading-relaxed text-ink/80">
          This is a concept store — ordering is disabled. Your cart summary:
        </p>
        <ul className="mt-5 divide-y divide-wine/10 border-y border-wine/10 text-sm">
          {items.map((item) => {
            const p = getProduct(item.slug);
            if (!p) return null;
            return (
              <li key={`${item.slug}-${item.size}`} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="font-serif text-base text-ink">{p.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    Size {item.size} · Qty {item.qty}
                  </p>
                </div>
                <p className="shrink-0 text-wine">{formatPrice(p.price * item.qty)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-between text-base font-medium">
          <span>Total</span>
          <span className="text-wine">{formatPrice(subtotal)}</span>
        </div>
        <button type="button" onClick={closeConcept} className="btn-primary mt-6 w-full">
          Got it
        </button>
      </Modal>
    </div>
  );
}

const WA_BUTTON = "btn mt-6 w-full bg-[#1f7a4d] text-white hover:bg-[#17603c]";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
