"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
        <h1 className="font-display text-4xl tracking-wide">Wishlist</h1>
        <p className="mt-3 text-sm text-black/60">
          You haven&apos;t saved anything yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Wishlist</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.productId} className="group">
            <Link href={`/products/${item.slug}`} className="block">
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                <Image
                  src={`${BASE_PATH}${item.image}`}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="mt-2 flex items-start justify-between gap-2">
              <Link href={`/products/${item.slug}`} className="text-sm">
                {item.name}
              </Link>
              <span className="whitespace-nowrap text-sm">
                NPR {item.price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="mt-1 text-xs uppercase tracking-wide text-black/50 underline hover:text-black"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
