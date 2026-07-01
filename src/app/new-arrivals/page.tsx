import ProductCard from "@/components/ProductCard";
import { getProductsByTag } from "@/lib/products";

export default function NewArrivalsPage() {
  const newProducts = getProductsByTag("New");

  return (
    <section className="px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">New Arrivals</h1>
      <p className="mt-1 text-sm text-black/60">The latest drops, across every category.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
