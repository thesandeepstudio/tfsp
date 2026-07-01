export type Category = "merch" | "posters" | "stickers";

export type ColorOption = {
  name: string;
  gradient: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  tag?: "New" | "Sale" | "Back in Stock";
  gradient: string;
  description: string;
  colors?: ColorOption[];
  sizes?: string[];
  image?: string;
  gallery?: string[];
};

export const categoryLabels: Record<Category, string> = {
  merch: "Merch",
  posters: "Posters",
  stickers: "Stickers",
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

export const products: Product[] = [
  // Merch
  {
    id: "m1",
    slug: "badge",
    name: "Badge",
    price: 1600,
    category: "merch",
    tag: "New",
    gradient: gradients[0],
    description: "A relaxed, boxy-fit tee in heavyweight cotton jersey. Built to hold its shape wash after wash.",
    image: "/products/product1.png",
    colors: [
      { name: "Ecru", gradient: gradients[0] },
      { name: "Charcoal", gradient: "from-neutral-700 to-neutral-500" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m2",
    slug: "oversized-hoodie",
    name: "Oversized Hoodie",
    price: 2900,
    category: "merch",
    gradient: gradients[1],
    description: "A brushed-fleece hoodie with a dropped shoulder and kangaroo pocket for everyday layering.",
    image: "/products/product1.png",
    colors: [
      { name: "Sand", gradient: gradients[1] },
      { name: "Slate", gradient: gradients[2] },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m3",
    slug: "logo-snapback-cap",
    name: "Logo Snapback Cap",
    price: 900,
    category: "merch",
    tag: "New",
    gradient: gradients[2],
    description: "A structured six-panel cap with an embroidered logo and an adjustable snapback closure.",
    image: "/products/product1.png",
    sizes: ["One Size"],
  },
  {
    id: "m4",
    slug: "canvas-tote-bag",
    name: "Canvas Tote Bag",
    price: 650,
    category: "merch",
    gradient: gradients[3],
    description: "A heavy-duty canvas tote with reinforced handles, sized for everyday carry.",
    image: "/products/product1.png",
    sizes: ["One Size"],
  },
  {
    id: "m5",
    slug: "crewneck-sweatshirt",
    name: "Crewneck Sweatshirt",
    price: 1800,
    category: "merch",
    tag: "Sale",
    gradient: gradients[4],
    description: "A midweight crewneck sweatshirt with a soft interior fleece and ribbed cuffs.",
    image: "/products/product1.png",
    colors: [
      { name: "Rose", gradient: gradients[4] },
      { name: "Stone", gradient: gradients[0] },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m6",
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    price: 450,
    category: "merch",
    gradient: gradients[5],
    description: "A set of three hard-enamel pins with polished metal plating and a rubber pin back.",
    image: "/products/product1.png",
    sizes: ["One Size"],
  },

  // Posters
  {
    id: "p1",
    slug: "skyline-print-poster",
    name: "Skyline Print Poster",
    price: 850,
    category: "posters",
    tag: "New",
    gradient: gradients[6],
    description: "An 18x24 matte print on heavyweight paper, ready to frame.",
    image: "/products/product1.png",
    sizes: ["A4", "A3", "A2"],
  },
  {
    id: "p2",
    slug: "retro-wave-poster",
    name: "Retro Wave Poster",
    price: 750,
    category: "posters",
    gradient: gradients[7],
    description: "A 12x18 gradient print with a soft-touch finish, printed on demand.",
    image: "/products/product1.png",
    sizes: ["A4", "A3", "A2"],
  },
  {
    id: "p3",
    slug: "minimal-line-art-poster",
    name: "Minimal Line Art Poster",
    price: 700,
    category: "posters",
    tag: "Back in Stock",
    gradient: gradients[8],
    description: "A minimalist single-line illustration printed on archival-quality paper.",
    image: "/products/product1.png",
    sizes: ["A4", "A3", "A2"],
  },
  {
    id: "p4",
    slug: "tour-dates-poster",
    name: "Tour Dates Poster",
    price: 950,
    category: "posters",
    gradient: gradients[0],
    description: "A large-format 24x36 print listing this year's stops, printed in limited numbers.",
    image: "/products/product1.png",
    sizes: ["A3", "A2", "A1"],
  },
  {
    id: "p5",
    slug: "neon-glow-poster",
    name: "Neon Glow Poster",
    price: 800,
    category: "posters",
    tag: "Sale",
    gradient: gradients[1],
    description: "A vivid gradient print designed to pop under warm or cool lighting alike.",
    image: "/products/product1.png",
    sizes: ["A4", "A3", "A2"],
  },
  {
    id: "p6",
    slug: "framed-photo-print",
    name: "Framed Photo Print",
    price: 1400,
    category: "posters",
    gradient: gradients[2],
    description: "A ready-to-hang framed print with a slim black wood frame and shatter-resistant glazing.",
    image: "/products/product1.png",
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
    image: "/products/product1.png",
  },
  {
    id: "s2",
    slug: "holographic-sticker-pack",
    name: "Holographic Sticker Pack",
    price: 250,
    category: "stickers",
    gradient: gradients[4],
    description: "A pack of five holographic stickers that shift color as the light moves.",
    image: "/products/product1.png",
  },
  {
    id: "s3",
    slug: "sticker-sheet-vol-1",
    name: "Sticker Sheet Vol. 1",
    price: 180,
    category: "stickers",
    gradient: gradients[5],
    description: "A full A5 sheet of mixed icon stickers, matte finish, easy peel backing.",
    image: "/products/product1.png",
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
    image: "/products/product1.png",
  },
  {
    id: "s5",
    slug: "glow-in-dark-sticker",
    name: "Glow-in-the-Dark Sticker",
    price: 200,
    category: "stickers",
    gradient: gradients[7],
    description: "A single glow-in-the-dark vinyl sticker that charges under any light source.",
    image: "/products/product1.png",
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
    image: "/products/product1.png",
  },
  {
    id: "s7",
    slug: "washi-sticker-roll",
    name: "Washi Sticker Roll",
    price: 300,
    category: "stickers",
    gradient: gradients[0],
    description: "A roll of 50 washi-paper stickers for journaling and planners.",
    image: "/products/product1.png",
  },
  {
    id: "s8",
    slug: "enamel-look-sticker-combo",
    name: "Enamel-Look Sticker Combo",
    price: 280,
    category: "stickers",
    gradient: gradients[1],
    description: "A combo pack pairing a glossy enamel-look sticker with two matte companions.",
    image: "/products/product1.png",
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
    image: "/products/product1.png",
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
