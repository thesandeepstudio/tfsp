export type Category = "merch" | "posters" | "stickers" | "badges";

export type ColorOption = {
  name: string;
  gradient: string;
};

export type PaperOption = {
  name: string;
  prices: { size: string; price: number }[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  tag?: "New" | "Sale" | "Back in Stock";
  gradient: string;
  description: string;
  colors?: ColorOption[];
  sizes?: string[];
  paperOptions?: PaperOption[];
  image?: string;
  gallery?: string[];
};

export const categoryLabels: Record<Category, string> = {
  merch: "Merch",
  posters: "Posters",
  stickers: "Stickers",
  badges: "Badges",
};

const gradients = [
  "from-stone-300 to-stone-100",
  "from-orange-200 to-amber-100",
  "from-slate-300 to-slate-100",
  "from-emerald-200 to-emerald-50",
  "from-rose-200 to-rose-50",
  "from-sky-200 to-sky-50",
  "from-zinc-300 to-zinc-100",
  "from-lime-200 to-lime-50",
  "from-neutral-300 to-neutral-100",
];

const paperOptions: PaperOption[] = [
  {
    name: "300 GSM Artboard Paper",
    prices: [
      { size: "A4", price: 100 },
      { size: "A3", price: 150 },
    ],
  },
  {
    name: "300 GSM Ivory Paper",
    prices: [
      { size: "A4", price: 150 },
      { size: "A3", price: 199 },
    ],
  },
];

export const products: Product[] = [
  // Merch
  {
    id: "m7",
    slug: "birth-of-star-tee",
    name: "Birth of Star",
    price: 1599,
    compareAtPrice: 1800,
    category: "merch",
    tag: "New",
    gradient: gradients[0],
    description: "An Exhibit A graphic tee with the Birth of Star print on the back.",
    image: "/products/exhibit-a/birth-of-star-gray-back.jpg",
    colors: [
      { name: "Charcoal", gradient: "from-neutral-700 to-neutral-500" },
      { name: "White", gradient: gradients[0] },
    ],
    gallery: [
      "/products/exhibit-a/birth-of-star-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
      "/products/exhibit-a/birth-of-star-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m8",
    slug: "star-tee",
    name: "Star",
    price: 1599,
    compareAtPrice: 1800,
    category: "merch",
    tag: "New",
    gradient: gradients[2],
    description: "An Exhibit A graphic tee with the Star print on the back.",
    image: "/products/exhibit-a/star-white-back.jpg",
    colors: [
      { name: "White", gradient: gradients[0] },
      { name: "Charcoal", gradient: "from-neutral-700 to-neutral-500" },
    ],
    gallery: [
      "/products/exhibit-a/star-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
      "/products/exhibit-a/star-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m9",
    slug: "the-crow-tee",
    name: "The Crow",
    price: 1599,
    compareAtPrice: 1800,
    category: "merch",
    tag: "New",
    gradient: gradients[6],
    description: "An Exhibit A graphic tee with the The Crow print on the back.",
    image: "/products/exhibit-a/the-crow-gray-back.jpg",
    colors: [
      { name: "Charcoal", gradient: "from-neutral-700 to-neutral-500" },
      { name: "White", gradient: gradients[0] },
    ],
    gallery: [
      "/products/exhibit-a/the-crow-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
      "/products/exhibit-a/the-crow-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m10",
    slug: "the-ritual-tee",
    name: "The Ritual",
    price: 1599,
    compareAtPrice: 1800,
    category: "merch",
    tag: "New",
    gradient: gradients[8],
    description: "An Exhibit A graphic tee with the The Ritual print on the back.",
    image: "/products/exhibit-a/the-ritual-white-back.jpg",
    colors: [
      { name: "White", gradient: gradients[0] },
      { name: "Charcoal", gradient: "from-neutral-700 to-neutral-500" },
    ],
    gallery: [
      "/products/exhibit-a/the-ritual-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
      "/products/exhibit-a/the-ritual-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },

  // Badges
  {
    id: "b1",
    slug: "eye-badge",
    name: "Eye Badge",
    price: 100,
    compareAtPrice: 150,
    category: "badges",
    tag: "New",
    gradient: gradients[7],
    description: "A single pin badge from the collection.",
    image: "/products/badge/1.png",
    sizes: ["44mm", "58mm"],
  },
  {
    id: "b2",
    slug: "mascot-badge",
    name: "Mascot Badge",
    price: 100,
    compareAtPrice: 150,
    category: "badges",
    gradient: gradients[1],
    description: "A single pin badge from the collection.",
    image: "/products/badge/2.png",
    sizes: ["44mm", "58mm"],
  },
  {
    id: "b3",
    slug: "headphones-badge",
    name: "Headphones Badge",
    price: 100,
    compareAtPrice: 150,
    category: "badges",
    gradient: gradients[4],
    description: "A single pin badge from the collection.",
    image: "/products/badge/3.png",
    sizes: ["44mm", "58mm"],
  },
  {
    id: "b4",
    slug: "sketch-badge",
    name: "Sketch Badge",
    price: 100,
    compareAtPrice: 150,
    category: "badges",
    gradient: gradients[6],
    description: "A single pin badge from the collection.",
    image: "/products/badge/4.png",
    sizes: ["44mm", "58mm"],
  },
  {
    id: "b5",
    slug: "badge-set",
    name: "Badge Set",
    price: 100, // TODO: bundle price likely higher than a single badge — confirm
    compareAtPrice: 150,
    category: "badges",
    tag: "New",
    gradient: gradients[0],
    description: "The full set of four pin badges, sold together.",
    image: "/products/badge/main.png",
    gallery: [
      "/products/badge/main.png",
      "/products/badge/1.png",
      "/products/badge/2.png",
      "/products/badge/3.png",
      "/products/badge/4.png",
    ],
  },

  // Posters
  {
    id: "p1",
    slug: "skyline-print-poster",
    name: "Skyline Print Poster",
    price: 100,
    category: "posters",
    tag: "New",
    gradient: gradients[6],
    description: "A matte print on heavyweight paper, ready to frame.",
    paperOptions,
  },
  {
    id: "p2",
    slug: "retro-wave-poster",
    name: "Retro Wave Poster",
    price: 100,
    category: "posters",
    gradient: gradients[7],
    description: "A gradient print with a soft-touch finish, printed on demand.",
    paperOptions,
  },
  {
    id: "p3",
    slug: "minimal-line-art-poster",
    name: "Minimal Line Art Poster",
    price: 100,
    category: "posters",
    tag: "Back in Stock",
    gradient: gradients[8],
    description: "A minimalist single-line illustration printed on archival-quality paper.",
    paperOptions,
  },
  {
    id: "p4",
    slug: "tour-dates-poster",
    name: "Tour Dates Poster",
    price: 100,
    category: "posters",
    gradient: gradients[0],
    description: "A large-format print listing this year's stops, printed in limited numbers.",
    paperOptions,
  },
  {
    id: "p5",
    slug: "neon-glow-poster",
    name: "Neon Glow Poster",
    price: 100,
    category: "posters",
    tag: "Sale",
    gradient: gradients[1],
    description: "A vivid gradient print designed to pop under warm or cool lighting alike.",
    paperOptions,
  },
  {
    id: "p6",
    slug: "framed-photo-print",
    name: "Framed Photo Print",
    price: 1400,
    category: "posters",
    gradient: gradients[2],
    description: "A ready-to-hang framed print with a slim black wood frame and shatter-resistant glazing.",
  },

  // Stickers
  {
    id: "s1",
    slug: "logo-die-cut-sticker",
    name: "Logo Die-Cut Sticker",
    price: 100,
    category: "stickers",
    tag: "New",
    gradient: gradients[3],
    description: "A weatherproof die-cut vinyl sticker, sized for laptops and water bottles.",
  },
  {
    id: "s2",
    slug: "holographic-sticker-pack",
    name: "Holographic Sticker Pack",
    price: 250,
    category: "stickers",
    gradient: gradients[4],
    description: "A pack of five holographic stickers that shift color as the light moves.",
  },
  {
    id: "s3",
    slug: "sticker-sheet-vol-1",
    name: "Sticker Sheet Vol. 1",
    price: 180,
    category: "stickers",
    gradient: gradients[5],
    description: "A full A5 sheet of mixed icon stickers, matte finish, easy peel backing.",
  },
  {
    id: "s4",
    slug: "mini-icon-pack",
    name: "Mini Icon Pack",
    price: 150,
    category: "stickers",
    tag: "Back in Stock",
    gradient: gradients[6],
    description: "A set of eight small icon stickers, perfect for notebooks and phone cases.",
  },
  {
    id: "s5",
    slug: "glow-in-dark-sticker",
    name: "Glow-in-the-Dark Sticker",
    price: 200,
    category: "stickers",
    gradient: gradients[7],
    description: "A single glow-in-the-dark vinyl sticker that charges under any light source.",
  },
  {
    id: "s6",
    slug: "vinyl-bumper-sticker",
    name: "Vinyl Bumper Sticker",
    price: 220,
    category: "stickers",
    tag: "Sale",
    gradient: gradients[8],
    description: "A durable outdoor-rated bumper sticker built to survive sun and rain.",
  },
  {
    id: "s7",
    slug: "washi-sticker-roll",
    name: "Washi Sticker Roll",
    price: 300,
    category: "stickers",
    gradient: gradients[0],
    description: "A roll of 50 washi-paper stickers for journaling and planners.",
  },
  {
    id: "s8",
    slug: "enamel-look-sticker-combo",
    name: "Enamel-Look Sticker Combo",
    price: 280,
    category: "stickers",
    gradient: gradients[1],
    description: "A combo pack pairing a glossy enamel-look sticker with two matte companions.",
  },
  {
    id: "s9",
    slug: "sticker-bomb-pack",
    name: "Sticker Bomb Pack",
    price: 350,
    category: "stickers",
    tag: "New",
    gradient: gradients[2],
    description: "A dense 20-sticker bomb pack for covering laptops, boards, and cases edge to edge.",
  },
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByTag(tag: NonNullable<Product["tag"]>): Product[] {
  return products.filter((product) => product.tag === tag);
}
