"use client";

import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductsContext";

export default function MerchPage() {
  const { products } = useProducts();
  const merchProducts = products.filter((p) => p.category === "merch");

  return (
    <section className="px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Merch</h1>
      <p className="mt-1 text-sm text-black/60">
        Apparel and everyday essentials.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {merchProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
