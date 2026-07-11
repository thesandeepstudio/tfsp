export type Category = "merch" | "posters" | "stickers" | "badges";

export type ColorOption = {
  name: string;
  gradient: string;
  image?: string;
};

export type PaperOption = {
  name: string;
  prices: { size: string; price: number }[];
};

export type PosterFormat = {
  name: string;
  paperOptions?: PaperOption[];
  sizes?: { size: string; price: number }[];
  framePrices?: { size: string; price: number }[];
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
  formats?: PosterFormat[];
  finishes?: string[];
  image?: string;
  gallery?: string[];
  stockQuantity?: number;
};

export function isInStock(product: Product): boolean {
  return product.stockQuantity === undefined || product.stockQuantity > 0;
}

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

const posterFormats: PosterFormat[] = [
  {
    name: "Standard",
    paperOptions: [
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
    ],
    framePrices: [
      { size: "A4", price: 800 },
      { size: "A3", price: 1600 },
    ],
  },
  {
    name: "Round",
    paperOptions: [
      {
        name: "300 GSM Artboard Paper",
        prices: [
          { size: "8×8 In", price: 150 },
          { size: "10×10 In", price: 200 },
        ],
      },
      {
        name: "300 GSM Ivory Paper",
        prices: [
          { size: "8×8 In", price: 200 },
          { size: "10×10 In", price: 250 },
        ],
      },
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
      {
        name: "Charcoal",
        gradient: "from-neutral-700 to-neutral-500",
        image: "/products/exhibit-a/birth-of-star-gray-back.jpg",
      },
      {
        name: "White",
        gradient: gradients[0],
        image: "/products/exhibit-a/birth-of-star-white-back.jpg",
      },
    ],
    gallery: [
      "/products/exhibit-a/birth-of-star-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
      "/products/exhibit-a/birth-of-star-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
    ],
    sizes: ["S", "M", "L"],
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
      {
        name: "White",
        gradient: gradients[0],
        image: "/products/exhibit-a/star-white-back.jpg",
      },
      {
        name: "Charcoal",
        gradient: "from-neutral-700 to-neutral-500",
        image: "/products/exhibit-a/star-gray-back.jpg",
      },
    ],
    gallery: [
      "/products/exhibit-a/star-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
      "/products/exhibit-a/star-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
    ],
    sizes: ["S", "M", "L"],
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
      {
        name: "Charcoal",
        gradient: "from-neutral-700 to-neutral-500",
        image: "/products/exhibit-a/the-crow-gray-back.jpg",
      },
      {
        name: "White",
        gradient: gradients[0],
        image: "/products/exhibit-a/the-crow-white-back.jpg",
      },
    ],
    gallery: [
      "/products/exhibit-a/the-crow-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
      "/products/exhibit-a/the-crow-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
    ],
    sizes: ["S", "M", "L"],
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
      {
        name: "White",
        gradient: gradients[0],
        image: "/products/exhibit-a/the-ritual-white-back.jpg",
      },
      {
        name: "Charcoal",
        gradient: "from-neutral-700 to-neutral-500",
        image: "/products/exhibit-a/the-ritual-gray-back.jpg",
      },
    ],
    gallery: [
      "/products/exhibit-a/the-ritual-white-back.jpg",
      "/products/exhibit-a/white-front.jpg",
      "/products/exhibit-a/the-ritual-gray-back.jpg",
      "/products/exhibit-a/gray-front.jpg",
    ],
    sizes: ["S", "M", "L"],
  },
  {
    id: "m11",
    slug: "origin",
    name: "Origin",
    price: 1599,
    compareAtPrice: 1800,
    category: "merch",
    gradient: gradients[0],
    description: "A plain, no-print tee — same fit and fabric as the Exhibit A collection.",
    image: "/products/exhibit-a/gray-front.jpg",
    colors: [
      {
        name: "Charcoal",
        gradient: "from-neutral-700 to-neutral-500",
        image: "/products/exhibit-a/gray-front.jpg",
      },
      {
        name: "White",
        gradient: gradients[0],
        image: "/products/exhibit-a/white-front.jpg",
      },
    ],
    gallery: [
      "/products/exhibit-a/gray-front.jpg",
      "/products/Tee/gray-back.jpg",
      "/products/exhibit-a/white-front.jpg",
      "/products/Tee/white-back.png",
    ],
    sizes: ["S", "M", "L"],
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
    price: 350,
    compareAtPrice: 450,
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
    id: "p7",
    slug: "the-sick-evolution",
    name: "The Sick Evolution",
    price: 100,
    category: "posters",
    tag: "New",
    gradient: gradients[3],
    description: "An original TFSP graphic poster print.",
    image: "/products/Posters/the-sick-evolution.png",
    formats: posterFormats,
  },
  {
    id: "p8",
    slug: "do-it-for-the-plot",
    name: "Do It for the Plot!",
    price: 100,
    category: "posters",
    tag: "New",
    gradient: gradients[4],
    description: "An original TFSP graphic poster print.",
    image: "/products/Posters/do-it-for-the-plot.png",
    formats: posterFormats,
  },
  {
    id: "p9",
    slug: "bageko-bagai",
    name: "Bageko Bagai — Chumbak",
    price: 100,
    category: "posters",
    gradient: gradients[5],
    description: "Album cover print for Chumbak's \"Bageko Bagai.\"",
    image: "/products/Posters/chumbak-bageko-bagai.png",
    formats: posterFormats,
  },
  {
    id: "p10",
    slug: "jo-jaas-sanga-sambandhit-chha",
    name: "Jo Jaas Sanga Sambandhit Chha — Albatross",
    price: 100,
    category: "posters",
    gradient: gradients[6],
    description: "Album cover print for Albatross's \"Jo Jaas Sanga Sambandhit Chha.\"",
    image: "/products/Posters/albatross-jo-jaas-sanga-sambandhit-chha.png",
    formats: posterFormats,
  },
  {
    id: "p11",
    slug: "ma-ra-malai",
    name: "Ma Ra Malai — Albatross",
    price: 100,
    category: "posters",
    gradient: gradients[7],
    description: "Album cover print for Albatross's \"Ma Ra Malai.\"",
    image: "/products/Posters/albatross-ma-ra-malai.png",
    formats: posterFormats,
  },
  {
    id: "p12",
    slug: "monkey-temple-nepal",
    name: "Monkey Temple Nepal",
    price: 100,
    category: "posters",
    gradient: gradients[8],
    description: "Album cover print for Monkey Temple Nepal's self-titled release.",
    image: "/products/Posters/monkey-temple-nepal.png",
    formats: posterFormats,
  },
  {
    id: "p13",
    slug: "dhanyabad",
    name: "Dhanyabad — Sabin Rai & The Pharaoh",
    price: 100,
    category: "posters",
    gradient: gradients[0],
    description: "Album cover print for Sabin Rai & The Pharaoh's \"Dhanyabad.\"",
    image: "/products/Posters/sabin-rai-dhanyabad.png",
    formats: posterFormats,
  },
  {
    id: "p14",
    slug: "roka-yo-samay",
    name: "Roka Yo Samay — Tribal Rain",
    price: 100,
    category: "posters",
    gradient: gradients[1],
    description: "Album cover print for Tribal Rain's \"Roka Yo Samay.\"",
    image: "/products/Posters/tribal-rain-roka-yo-samay.png",
    formats: posterFormats,
  },
  {
    id: "p15",
    slug: "asap-rocky-testing",
    name: "Testing — A$AP Rocky",
    price: 100,
    category: "posters",
    gradient: gradients[2],
    description: "Album cover print for A$AP Rocky's \"Testing.\"",
    image: "/products/Posters/asap-rocky-testing.png",
    formats: posterFormats,
  },
  {
    id: "p16",
    slug: "igor",
    name: "IGOR — Tyler, The Creator",
    price: 100,
    category: "posters",
    gradient: gradients[3],
    description: "Album cover print for Tyler, The Creator's \"IGOR.\"",
    image: "/products/Posters/tyler-the-creator-igor.png",
    formats: posterFormats,
  },
  {
    id: "p17",
    slug: "starboy",
    name: "Starboy — The Weeknd",
    price: 100,
    category: "posters",
    gradient: gradients[4],
    description: "Album cover print for The Weeknd's \"Starboy.\"",
    image: "/products/Posters/the-weeknd-starboy.png",
    formats: posterFormats,
  },
  {
    id: "p18",
    slug: "astroworld",
    name: "Astroworld — Travis Scott",
    price: 100,
    category: "posters",
    gradient: gradients[5],
    description: "Album cover print for Travis Scott's \"Astroworld.\"",
    image: "/products/Posters/travis-scott-astroworld.png",
    formats: posterFormats,
  },
  {
    id: "p19",
    slug: "mbdtf",
    name: "MBDTF — Kanye West",
    price: 100,
    category: "posters",
    gradient: gradients[6],
    description: "Album cover print for Kanye West's \"My Beautiful Dark Twisted Fantasy.\"",
    image: "/products/Posters/kanye-west-mbdtf.png",
    formats: posterFormats,
  },
  {
    id: "p20",
    slug: "savage-mode",
    name: "Savage Mode — 21 Savage & Metro Boomin",
    price: 100,
    category: "posters",
    gradient: gradients[7],
    description: "Album cover print for 21 Savage & Metro Boomin's \"Savage Mode.\"",
    image: "/products/Posters/21-savage-savage-mode.png",
    formats: posterFormats,
  },
  {
    id: "p21",
    slug: "blonde",
    name: "Blonde — Frank Ocean",
    price: 100,
    category: "posters",
    gradient: gradients[8],
    description: "Album cover print for Frank Ocean's \"Blonde.\"",
    image: "/products/Posters/frank-ocean-blonde.png",
    formats: posterFormats,
  },
  {
    id: "p22",
    slug: "binaashkaari",
    name: "Binaashkaari — Binaash",
    price: 100,
    category: "posters",
    gradient: gradients[0],
    description: "Album cover print for Binaash's \"Binaashkaari.\"",
    image: "/products/Posters/binaash-binaashkaari.png",
    formats: posterFormats,
  },
  {
    id: "p23",
    slug: "underside-nepal-wild",
    name: "Wild — Underside Nepal",
    price: 100,
    category: "posters",
    gradient: gradients[1],
    description: "Cover print for Underside Nepal's \"Wild.\"",
    image: "/products/Posters/underside-nepal-wild.png",
    formats: posterFormats,
  },
  {
    id: "p24",
    slug: "forever-winter",
    name: "Forever Winter — Antim Grahan",
    price: 100,
    category: "posters",
    gradient: gradients[2],
    description: "Album cover print for Antim Grahan's \"Forever Winter.\"",
    image: "/products/Posters/antim-grahan-forever-winter.png",
    formats: posterFormats,
  },
  {
    id: "p25",
    slug: "goat-legion",
    name: "Goat Legion — Antim Grahan",
    price: 100,
    category: "posters",
    gradient: gradients[3],
    description: "Album cover print for Antim Grahan's \"Goat Legion.\"",
    image: "/products/Posters/antim-grahan-goat-legion.png",
    formats: posterFormats,
  },
  {
    id: "p26",
    slug: "corrupted-society",
    name: "Corrupted Society — Screaming Marionette",
    price: 100,
    category: "posters",
    gradient: gradients[4],
    description: "Album cover print for Screaming Marionette's \"Corrupted Society.\"",
    image: "/products/Posters/screaming-marionette-corrupted-society.png",
    formats: posterFormats,
  },
  {
    id: "p27",
    slug: "satan-in-your-stereo",
    name: "Satan in Your Stereo — Underside",
    price: 100,
    category: "posters",
    gradient: gradients[5],
    description: "Album cover print for Underside's \"Satan in Your Stereo.\"",
    image: "/products/Posters/underside-satan-in-your-stereo.png",
    formats: posterFormats,
  },
  {
    id: "p28",
    slug: "atti-bhayo",
    name: "Atti Bhayo — Albatross",
    price: 100,
    category: "posters",
    gradient: gradients[6],
    description: "Album cover print for Albatross's \"Atti Bhayo.\"",
    image: "/products/Posters/albatross-atti-bhayo.png",
    formats: posterFormats,
  },
  {
    id: "p29",
    slug: "chumbak-self-titled",
    name: "Chumbak — Chumbak",
    price: 100,
    category: "posters",
    gradient: gradients[7],
    description: "Album cover print for Chumbak's self-titled release.",
    image: "/products/Posters/chumbak-self-titled.png",
    formats: posterFormats,
  },

  // Stickers
  {
    id: "s14",
    slug: "football-players-sticker-pack",
    name: "Football Players Pack",
    price: 400,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    tag: "New",
    gradient: gradients[7],
    description: "A set of six football moment stickers for the die-hard fans.",
    image: "/products/Sticker/football-players-pack.png",
  },
  {
    id: "s15",
    slug: "celebrity-faces-sticker-pack",
    name: "Celebrity Faces Pack",
    price: 400,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    tag: "New",
    gradient: gradients[8],
    description: "A set of six icon face-cutout stickers.",
    image: "/products/Sticker/celebrity-faces-pack.png",
  },
  {
    id: "s13",
    slug: "cartoon-character-sticker-pack",
    name: "Cartoon Character Sticker Pack",
    price: 400,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[6],
    description: "A set of six original hand-drawn character face stickers.",
    image: "/products/Sticker/cartoon-character-heads-pack.png",
  },
  {
    id: "s1",
    slug: "trust-me-graphic-designer-sticker",
    name: "Trust Me I'm a Graphic Designer",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[3],
    description: "A hand-drawn die-cut sticker for anyone who's heard that line before.",
    image: "/products/Sticker/trust-me-graphic-designer-pile.png",
  },
  {
    id: "s2",
    slug: "worlds-best-graphic-designer-sticker",
    name: "World's Best Graphic Designer",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[4],
    description: "A simple stamp-style sticker declaring exactly what it says.",
    image: "/products/Sticker/worlds-best-graphic-designer-pile.png",
  },
  {
    id: "s3",
    slug: "reach-for-stars-sticker",
    name: "Reach for Stars",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[5],
    description: "\"If you fall, you land on the clouds\" — a hand-lettered motivational sticker.",
    image: "/products/Sticker/reach-for-stars-pile.png",
  },
  {
    id: "s4",
    slug: "malai-balta-sticker",
    name: "Malai Balta",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[6],
    description: "A bold two-tone sticker with a bit of local flavor.",
    image: "/products/Sticker/malai-balta-pile.png",
  },
  {
    id: "s5",
    slug: "bad-decisions-good-stories-sticker",
    name: "Bad Decisions Make Good Stories",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    tag: "New",
    gradient: gradients[7],
    description: "A bold black-and-white statement sticker for your laptop or bottle.",
    image: "/products/Sticker/bad-decisions-good-stories-pile-1.png",
    gallery: [
      "/products/Sticker/bad-decisions-good-stories-pile-1.png",
      "/products/Sticker/bad-decisions-good-stories-pile-2.png",
    ],
  },
  {
    id: "s6",
    slug: "too-creative-nine-to-five-sticker",
    name: "I Am Too Creative for a 9 to 5",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[8],
    description: "A bold typographic sticker for the freelancers and dreamers.",
    image: "/products/Sticker/too-creative-nine-to-five-pile.jpg",
  },
  {
    id: "s7",
    slug: "daddy-chill-sticker",
    name: "Daddy Chill",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[0],
    description: "A punchy two-tone sticker, hand-lettered on top of a bold fill.",
    image: "/products/Sticker/daddy-chill-pile.png",
  },
  {
    id: "s8",
    slug: "suck-it-sticker",
    name: "Suck It!",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[1],
    description: "A cheeky pointing-hand sticker that doesn't hold back.",
    image: "/products/Sticker/suck-it-pile.png",
  },
  {
    id: "s9",
    slug: "no-risk-no-story-sticker",
    name: "No Risk No Story",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[2],
    description: "A bold red-and-black statement sticker for laptops and boards.",
    image: "/products/Sticker/no-risk-no-story-pile.png",
  },
  {
    id: "s10",
    slug: "fact-check-sticker",
    name: "Fact Check",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[3],
    description: "A serif-and-script sticker with a hand-drawn circle underline.",
    image: "/products/Sticker/fact-check-pile.png",
  },
  {
    id: "s11",
    slug: "caution-no-filter-sticker",
    name: "Caution: I Have No Filter",
    price: 30,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    gradient: gradients[4],
    description: "A caution-sign style sticker, black and yellow, straight to the point.",
    image: "/products/Sticker/caution-no-filter-pile.png",
  },
  {
    id: "s12",
    slug: "good-thing-takes-time-sticker",
    name: "Good Thing Takes Time",
    price: 40,
    category: "stickers",
    finishes: ["Matte", "Glossy"],
    tag: "New",
    gradient: gradients[5],
    description: "A colorful mixed-type sticker with a little clock icon for good measure.",
    image: "/products/Sticker/good-thing-takes-time-pile.png",
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

export const STICKER_MINIMUM_ORDER_QUANTITY = 15;

export function getStickerQuantity(
  items: { productId: string; quantity: number }[],
  allProducts: Product[]
): number {
  const stickerIds = new Set(
    allProducts.filter((p) => p.category === "stickers").map((p) => p.id)
  );
  return items.reduce(
    (sum, item) => (stickerIds.has(item.productId) ? sum + item.quantity : sum),
    0
  );
}
