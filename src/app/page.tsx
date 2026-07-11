"use client";

import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import Lookbook from "@/components/Lookbook";
import StickerGallery from "@/components/StickerGallery";
import Newsletter from "@/components/Newsletter";
import { useProducts } from "@/context/ProductsContext";

export default function Home() {
  const { products } = useProducts();

  return (
    <>
      <Hero />
      <FeaturedCollection
        id="merch"
        title="Merch Best Sellers"
        subtitle="All-time best sellers, restocked."
        products={products.filter((p) => p.category === "merch")}
        viewAllHref="/merch"
      />
      <FeaturedCollection
        id="posters"
        title="Posters Best Sellers"
        subtitle="All-time best sellers, restocked."
        products={products.filter((p) => p.category === "posters").slice(0, 12)}
        viewAllHref="/posters"
      />
      <FeaturedCollection
        id="badges"
        title="Badges"
        subtitle="Pin badges, sold individually or as sets."
        products={products.filter((p) => p.category === "badges")}
        viewAllHref="/badges"
      />
      <StickerGallery />
      <Lookbook />
      <Newsletter />
    </>
  );
}
