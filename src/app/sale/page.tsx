import ProductCard from "@/components/ProductCard";
import { getProductsByTag } from "@/lib/products";

export default function SalePage() {
  const saleProducts = getProductsByTag("Sale");

  return (
    <section className="px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Sale</h1>
      <p className="mt-1 text-sm text-black/60">Discounted picks while they last.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
