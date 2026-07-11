"use client";

import type { SortOption } from "@/hooks/useCategoryFilters";

export default function CategoryToolbar({
  query,
  setQuery,
  sort,
  setSort,
  resultCount,
}: {
  query: string;
  setQuery: (q: string) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  resultCount: number;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-black/10 py-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search this category…"
        className="w-full max-w-xs border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
      />
      <div className="flex items-center gap-3">
        <span className="text-xs text-black/50">
          {resultCount} {resultCount === 1 ? "item" : "items"}
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}
