export const SITE = {
  name: "Kaashi Weaves",
  tagline: "Banarasi heritage, woven for now.",
  description:
    "Kaashi Weaves — handwoven Banarasi ethnicwear and modern fusion for men, women and kids. Explore the Festive Edit 2026.",
  // Set NEXT_PUBLIC_SITE_URL on Vercel; falls back to Vercel's production URL
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  instagram: "@kaashiweaves",
  email: "hello@kaashiweaves.example",
};

/**
 * WhatsApp number for orders — country code + number, digits only.
 * PLACEHOLDER: replace before going live, e.g. "919876543210".
 */
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

/**
 * Flip to true once real photos are added under public/images/
 * (see README for the expected file names). Until then every image
 * renders as a soft gradient placeholder.
 */
export const USE_REAL_IMAGES = false;

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORIES = [
  { slug: "men", label: "Men" },
  { slug: "women", label: "Women" },
  { slug: "kids", label: "Kids" },
  { slug: "festive", label: "Festive" },
  { slug: "streetwear", label: "Streetwear" },
] as const;
export type Category = (typeof CATEGORIES)[number]["slug"];

export function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
