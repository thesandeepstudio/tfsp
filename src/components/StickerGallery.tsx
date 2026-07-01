import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function StickerGallery() {
  const stickers = getProductsByCategory("stickers");

  return (
    <section id="stickers" className="bg-neutral-50 px-4 py-16 sm:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-4xl tracking-wide">Stickers</h2>
          <p className="mt-1 text-sm text-black/60">Nine styles, stick anywhere.</p>
        </div>
        <Link
          href="/stickers"
          className="hidden text-sm font-semibold uppercase tracking-wide underline sm:block"
        >
          View All
        </Link>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-9">
        {stickers.map((sticker) => (
          <div key={sticker.id} className="w-40 shrink-0 sm:w-auto">
            <ProductCard product={sticker} />
          </div>
        ))}
      </div>
    </section>
  );
}
