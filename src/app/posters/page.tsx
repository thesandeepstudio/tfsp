"use client";

import ProductCard from "@/components/ProductCard";
import CategoryToolbar from "@/components/CategoryToolbar";
import { useProducts } from "@/context/ProductsContext";
import { useCategoryFilters } from "@/hooks/useCategoryFilters";

export default function PostersPage() {
  const { products } = useProducts();
  const posterProducts = products.filter((p) => p.category === "posters");
  const { query, setQuery, sort, setSort, results } =
    useCategoryFilters(posterProducts);

  return (
    <section className="px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Posters</h1>
      <p className="mt-1 text-sm text-black/60">
        Prints and framed art, ready to hang.
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
