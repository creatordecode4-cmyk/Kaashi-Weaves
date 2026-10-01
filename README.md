# Kaashi Weaves

Concept e-commerce site for **Kaashi Weaves**, a fictional Banarasi ethnic + modern fusion clothing brand.
*Concept design project. The brand, products and prices are all made up.*

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis smooth scroll

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
```

## Pages

| Route | What's there |
|---|---|
| `/` | Hero (Festive Edit 2026), categories, featured products, lookbook teaser, Instagram grid |
| `/shop` | Product grid, filters (category / price / size), sort. `?category=men` works as a deep link |
| `/product/[slug]` | 4–5 image gallery with zoom, size select, size chart modal, quantity, add to cart, related |
| `/cart` | Quantity change, remove, total, **Order on WhatsApp** (pre-filled summary, no payment gateway) |
| `/lookbook` | Cinematic parallax scroll |
| `/about`, `/contact` | Brand story; contact form that hands off to WhatsApp |

## Things you need to fill in

All of these live in **`lib/config.ts`**:

- `WHATSAPP_NUMBER`: currently the placeholder `91XXXXXXXXXX`. Use the country code + number, digits only (e.g. `919876543210`).
- `USE_REAL_IMAGES`: set this to `true` after you add photos (see below).
- `SITE.email`, `SITE.instagram`: placeholders.
- On Vercel, set the env var **`NEXT_PUBLIC_SITE_URL`** (e.g. `https://kaashi-weaves.vercel.app`). OG tags, the sitemap and canonical URLs use it.

Products are in **`lib/products.ts`**: name, price, MRP, sizes, fabric, description, gradient palette.

## Images: file names

Until `USE_REAL_IMAGES = true`, every image renders as a soft gradient placeholder.
Add JPGs at these paths under `public/`. Portrait 3:4 works best for products, around 1200×1600px, compressed under 300 KB.

```
public/images/
├── hero/hero-festive-2026.jpg          # full-width, landscape ~2400×1600 (cropped to fill on mobile)
├── categories/men.jpg, women.jpg, kids.jpg, festive.jpg, streetwear.jpg   # 3:4
├── lookbook/teaser.jpg                 # 4:5, home page lookbook block
├── lookbook/look-1.jpg … look-4.jpg    # big, ~2400px wide, used full-bleed with parallax
├── instagram/insta-1.jpg … insta-6.jpg # square
├── about/weaver.jpg                    # 4:5
└── products/<slug>-<n>.jpg             # 3:4, see table
```

| Product slug | Files |
|---|---|
| `zari-noor-silk-saree` | `zari-noor-silk-saree-1.jpg` … `zari-noor-silk-saree-5.jpg` |
| `ganga-ghat-kurta-set` | `ganga-ghat-kurta-set-1.jpg` … `ganga-ghat-kurta-set-5.jpg` |
| `meenakari-lehenga` | `meenakari-lehenga-1.jpg` … `meenakari-lehenga-5.jpg` |
| `kaashi-bomber-jacket` | `kaashi-bomber-jacket-1.jpg` … `kaashi-bomber-jacket-4.jpg` |
| `chandni-anarkali` | `chandni-anarkali-1.jpg` … `chandni-anarkali-4.jpg` |
| `rajwada-nehru-jacket` | `rajwada-nehru-jacket-1.jpg` … `rajwada-nehru-jacket-4.jpg` |
| `chhota-nawab-kurta` | `chhota-nawab-kurta-1.jpg` … `chhota-nawab-kurta-4.jpg` |
| `gudiya-lehenga` | `gudiya-lehenga-1.jpg` … `gudiya-lehenga-4.jpg` |
| `loom-logo-hoodie` | `loom-logo-hoodie-1.jpg` … `loom-logo-hoodie-4.jpg` |
| `butidar-co-ord-set` | `butidar-co-ord-set-1.jpg` … `butidar-co-ord-set-5.jpg` |
| `shahi-sherwani` | `shahi-sherwani-1.jpg` … `shahi-sherwani-5.jpg` |
| `tanchoi-dupatta` | `tanchoi-dupatta-1.jpg` … `tanchoi-dupatta-4.jpg` |

The OG / social share image is generated in code (`app/opengraph-image.tsx`), so you don't need a file for it.

## Deploy (Vercel)

Import the repo in Vercel. It detects Next.js automatically, so there's no extra config. Add `NEXT_PUBLIC_SITE_URL` under Environment Variables.
