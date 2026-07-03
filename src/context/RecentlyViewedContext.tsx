"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type RecentlyViewedItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  gradient: string;
};

type RecentlyViewedContextValue = {
  items: RecentlyViewedItem[];
  addViewed: (item: RecentlyViewedItem) => void;
};

const RecentlyViewedContext = createContext<
  RecentlyViewedContextValue | undefined
>(undefined);

const STORAGE_KEY = "tfsp-recently-viewed";
const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addViewed = (item: RecentlyViewedItem) => {
    setItems((prev) => {
      const withoutCurrent = prev.filter((i) => i.productId !== item.productId);
      return [item, ...withoutCurrent].slice(0, MAX_ITEMS);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ items, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx)
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider"
    );
  return ctx;
}
