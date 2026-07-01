import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedCollection({
  id,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  id?: string;
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref: string;
}) {
  return (
    <section id={id} className="px-4 py-16 sm:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-4xl tracking-wide">
            {title}
          </h2>
          <p className="mt-1 text-sm text-black/60">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="hidden text-sm font-semibold uppercase tracking-wide underline sm:block"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
