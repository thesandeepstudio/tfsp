import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import type { Product } from "@/lib/products";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  New: "bg-black text-white",
  Sale: "bg-red-600 text-white",
  "Back in Stock": "bg-white text-black border border-black",
};

const tagLabels: Record<NonNullable<Product["tag"]>, string> = {
  New: "New In",
  Sale: "Sale",
  "Back in Stock": "Back in Stock",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className={`relative aspect-4/5 w-full overflow-hidden bg-linear-to-br ${product.gradient}`}
      >
        {product.tag && (
          <span
            className={`absolute left-2 top-2 z-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${tagStyles[product.tag]}`}
          >
            {tagLabels[product.tag]}
          </span>
        )}
        {product.image ? (
          <Image
            src={`${BASE_PATH}${product.image}`}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 16vw, 45vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/20 transition-transform duration-300 group-hover:scale-105">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M3 7l2-4h14l2 4M3 7v13a1 1 0 001 1h16a1 1 0 001-1V7M3 7h18M9 11a3 3 0 006 0" />
            </svg>
          </div>
        )}
        <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-base leading-none text-black shadow transition group-hover:bg-black group-hover:text-white">
          +
        </span>
      </div>

      {product.colors && product.colors.length > 0 && (
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className={`h-3.5 w-3.5 rounded-full border border-black/20 bg-linear-to-br ${color.gradient}`}
            />
          ))}
        </div>
      )}

      <div className="mt-2 flex items-start justify-between gap-2">
        <h3 className="text-sm text-black">{product.name}</h3>
        <span className="whitespace-nowrap text-sm text-black">
          {product.compareAtPrice && (
            <span className="mr-1.5 text-black/40 line-through">
              NPR {product.compareAtPrice.toLocaleString()}
            </span>
          )}
          NPR {product.price.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
