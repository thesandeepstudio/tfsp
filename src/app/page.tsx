import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import Lookbook from "@/components/Lookbook";
import StickerGallery from "@/components/StickerGallery";
import Newsletter from "@/components/Newsletter";
import { getProductsByCategory } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection
        id="merch"
        title="Merch Best Sellers"
        subtitle="All-time best sellers, restocked."
        products={getProductsByCategory("merch")}
        viewAllHref="/merch"
      />
      <FeaturedCollection
        id="posters"
        title="Posters Best Sellers"
        subtitle="All-time best sellers, restocked."
        products={getProductsByCategory("posters").slice(0, 12)}
        viewAllHref="/posters"
      />
      <FeaturedCollection
        id="badges"
        title="Badges"
        subtitle="Pin badges, sold individually or as sets."
        products={getProductsByCategory("badges")}
        viewAllHref="/badges"
      />
      <Lookbook />
      <StickerGallery />
      <Newsletter />
    </>
  );
}
