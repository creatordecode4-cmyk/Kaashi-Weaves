import type { Category, Size } from "./config";

export type Product = {
  slug: string;
  name: string;
  price: number;
  /** Original price, shown struck-through when present */
  mrp?: number;
  category: Category;
  /** Extra categories the product also appears under (e.g. festive) */
  tags?: Category[];
  sizes: Size[];
  fabric: string;
  description: string;
  /** Two colours used for the gradient placeholder */
  palette: [string, string];
  featured?: boolean;
  /** Number of gallery images (files: /images/products/<slug>-1.jpg … -N.jpg) */
  imageCount: number;
};

export const products: Product[] = [
  {
    slug: "zari-noor-silk-saree",
    name: "Zari Noor Silk Saree",
    price: 18900,
    mrp: 22500,
    category: "women",
    tags: ["festive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Pure Katan silk, real zari",
    description:
      "A deep wine Katan silk saree with an all-over jaal of gold zari buttis and a heavy kadhua pallu. Woven over 21 days on a pit loom in Varanasi.",
    palette: ["#5a1a2b", "#b08d57"],
    featured: true,
    imageCount: 5,
  },
  {
    slug: "ganga-ghat-kurta-set",
    name: "Ganga Ghat Kurta Set",
    price: 6490,
    category: "men",
    tags: ["festive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Banarasi silk-cotton blend",
    description:
      "Ivory straight kurta with tonal brocade yoke, paired with tapered churidar. Light enough for a long evening, rich enough for the wedding.",
    palette: ["#efe6d6", "#c9a96e"],
    featured: true,
    imageCount: 5,
  },
  {
    slug: "meenakari-lehenga",
    name: "Meenakari Lehenga",
    price: 32500,
    mrp: 36000,
    category: "women",
    tags: ["festive"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Silk brocade with meenakari weave",
    description:
      "Rani pink and gold lehenga with multicolour meenakari motifs, a scalloped hem and a sheer organza dupatta.",
    palette: ["#8c2a4a", "#e2b77a"],
    featured: true,
    imageCount: 5,
  },
  {
    slug: "kaashi-bomber-jacket",
    name: "Kaashi Brocade Bomber",
    price: 7990,
    category: "streetwear",
    tags: ["men"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Brocade shell, cotton lining",
    description:
      "A classic bomber cut in black Banarasi brocade with ribbed cuffs. Heritage weave, everyday silhouette.",
    palette: ["#1e1a1d", "#7a5c3a"],
    featured: true,
    imageCount: 4,
  },
  {
    slug: "chandni-anarkali",
    name: "Chandni Anarkali",
    price: 11200,
    category: "women",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Tissue silk",
    description:
      "Floor-length ivory tissue anarkali with a gota-patti border and a soft flare that moves beautifully.",
    palette: ["#f3ecdf", "#d7c3a0"],
    imageCount: 4,
  },
  {
    slug: "rajwada-nehru-jacket",
    name: "Rajwada Nehru Jacket",
    price: 4590,
    category: "men",
    tags: ["festive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Jamawar brocade",
    description:
      "Muted gold jamawar Nehru jacket with antique buttons. Layer over any kurta to finish the look.",
    palette: ["#a3824f", "#5a1a2b"],
    featured: true,
    imageCount: 4,
  },
  {
    slug: "chhota-nawab-kurta",
    name: "Chhota Nawab Kurta Set",
    price: 2890,
    category: "kids",
    tags: ["festive"],
    sizes: ["S", "M", "L"],
    fabric: "Silk-cotton",
    description:
      "Wine silk-cotton kurta with a brocade placket and matching pyjama — comfortable enough for a full day of celebrations.",
    palette: ["#6b2236", "#d4b27c"],
    imageCount: 4,
  },
  {
    slug: "gudiya-lehenga",
    name: "Gudiya Lehenga",
    price: 3490,
    category: "kids",
    sizes: ["S", "M", "L"],
    fabric: "Brocade & net",
    description:
      "A twirl-ready mini lehenga in peach brocade with a soft net dupatta and cotton lining for all-day wear.",
    palette: ["#e8b7a0", "#f5e6d0"],
    imageCount: 4,
  },
  {
    slug: "loom-logo-hoodie",
    name: "Loom Logo Hoodie",
    price: 3290,
    category: "streetwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Heavyweight cotton fleece",
    description:
      "Oversized ivory hoodie with a woven brocade patch pocket and a tonal Kaashi Weaves logo.",
    palette: ["#e9e1d3", "#8f7a5a"],
    featured: true,
    imageCount: 4,
  },
  {
    slug: "butidar-co-ord-set",
    name: "Butidar Co-ord Set",
    price: 5890,
    category: "streetwear",
    tags: ["women"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Banarasi cotton",
    description:
      "Boxy shirt and wide-leg trousers in a small-butti Banarasi cotton weave. Fusion that works from brunch to the office.",
    palette: ["#3c2a35", "#b9955f"],
    featured: true,
    imageCount: 5,
  },
  {
    slug: "shahi-sherwani",
    name: "Shahi Sherwani",
    price: 24900,
    mrp: 27500,
    category: "men",
    tags: ["festive"],
    sizes: ["M", "L", "XL", "XXL"],
    fabric: "Silk brocade, hand embroidery",
    description:
      "Deep wine brocade sherwani with zardozi on the collar and cuffs. Made to be photographed.",
    palette: ["#4a1424", "#c6a15b"],
    featured: true,
    imageCount: 5,
  },
  {
    slug: "tanchoi-dupatta",
    name: "Tanchoi Silk Dupatta",
    price: 4290,
    category: "festive",
    tags: ["women"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Tanchoi silk",
    description:
      "Free-size tanchoi silk dupatta with a self-woven paisley ground. Drape it over anything to make it an occasion.",
    palette: ["#7d3045", "#e7d3b0"],
    imageCount: 4,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function inCategory(p: Product, c: Category) {
  return p.category === c || (p.tags?.includes(c) ?? false);
}

export function getRelated(p: Product, limit = 4) {
  const cats = [p.category, ...(p.tags ?? [])];
  const scored = products
    .filter((q) => q.slug !== p.slug)
    .map((q) => ({
      q,
      score: cats.filter((c) => inCategory(q, c)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.q);
}

export function productImage(slug: string, index: number) {
  return `/images/products/${slug}-${index + 1}.jpg`;
}
