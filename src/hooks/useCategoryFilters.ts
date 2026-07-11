"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export function useCategoryFilters(products: Product[]) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const results = useMemo(() => {
    const filtered = query.trim()
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase())
        )
      : products;

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, query, sort]);

  return { query, setQuery, sort, setSort, results };
}
