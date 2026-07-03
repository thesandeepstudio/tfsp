"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { products } from "@/lib/products";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results =
    query.trim().length > 0
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 6)
      : [];

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        aria-label="Search"
        className="hover:opacity-60"
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-100 bg-black/40" onClick={close}>
          <div
            className="mx-auto mt-0 max-w-2xl bg-white p-4 sm:mt-20 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-black/20 pb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-black/50">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full text-base outline-none"
              />
              <button
                aria-label="Close search"
                onClick={close}
                className="text-sm text-black/50 hover:text-black"
              >
                Esc
              </button>
            </div>

            {query.trim().length > 0 && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <ul className="divide-y divide-black/10">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={close}
                          className="flex items-center gap-3 py-3"
                        >
                          <div
                            className={`relative h-14 w-11 shrink-0 overflow-hidden bg-linear-to-br ${product.gradient}`}
                          >
                            {product.image && (
                              <Image
                                src={`${BASE_PATH}${product.image}`}
                                alt={product.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{product.name}</p>
                            <p className="text-xs text-black/50">
                              NPR {product.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-6 text-center text-sm text-black/50">
                    No products found for &quot;{query}&quot;.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
