"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type WishlistItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

type WishlistContextValue = {
  items: WishlistItem[];
  itemCount: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "tfsp-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
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

  const isWishlisted = (productId: string) =>
    items.some((i) => i.productId === productId);

  const toggleWishlist = (item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.productId === item.productId)
        ? prev.filter((i) => i.productId !== item.productId)
        : [...prev, item]
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        isWishlisted,
        toggleWishlist,
        removeItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
