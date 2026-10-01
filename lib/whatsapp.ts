import { SITE, WHATSAPP_NUMBER, formatPrice } from "./config";
import type { CartItem } from "./cart";
import { getProduct } from "./products";

export function buildOrderMessage(items: CartItem[]) {
  const lines = items.map((item, i) => {
    const p = getProduct(item.slug);
    if (!p) return "";
    return `${i + 1}. ${p.name}\n   Size: ${item.size} | Qty: ${item.qty} | ${formatPrice(p.price * item.qty)}`;
  });
  const total = items.reduce((n, i) => n + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);
  return [
    `Namaste ${SITE.name}! I'd like to place an order:`,
    "",
    ...lines.filter(Boolean),
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Name:",
    "Delivery address:",
    "Pincode:",
  ].join("\n");
}

/** Returns null when no WhatsApp number is configured (concept mode). */
export function whatsappLink(message: string) {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
