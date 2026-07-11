"use client";

import ProductCard from "@/components/ProductCard";
import CategoryToolbar from "@/components/CategoryToolbar";
import { useProducts } from "@/context/ProductsContext";
import { useCategoryFilters } from "@/hooks/useCategoryFilters";
import { STICKER_MINIMUM_ORDER_QUANTITY } from "@/lib/products";

export default function StickersPage() {
  const { products } = useProducts();
  const stickerProducts = products.filter((p) => p.category === "stickers");
  const { query, setQuery, sort, setSort, results } =
    useCategoryFilters(stickerProducts);

  return (
    <section className="px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Stickers</h1>
      <p className="mt-1 text-sm text-black/60">
        Vinyl, holographic, and sheet packs.
      </p>
      <p className="mt-1 text-xs text-black/50">
        Minimum order: {STICKER_MINIMUM_ORDER_QUANTITY} stickers total — mix and
        match designs.
      </p>
      <CategoryToolbar
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        resultCount={results.length}
      />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
