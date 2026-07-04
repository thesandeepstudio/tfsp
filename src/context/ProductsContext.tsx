"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { products as staticProducts, type Product } from "@/lib/products";

export type ProductOverride = Partial<
  Pick<Product, "price" | "compareAtPrice" | "stockQuantity" | "tag">
>;

type ProductsContextValue = {
  products: Product[];
  overridesLoaded: boolean;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>(
    {}
  );
  const [overridesLoaded, setOverridesLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const next: Record<string, ProductOverride> = {};
        snapshot.forEach((doc) => {
          next[doc.id] = doc.data() as ProductOverride;
        });
        setOverrides(next);
        setOverridesLoaded(true);
      },
      () => {
        // Offline or rules issue — fall back to static catalog silently.
        setOverridesLoaded(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const products = useMemo(
    () =>
      staticProducts.map((product) => {
        const override = overrides[product.id];
        return override ? { ...product, ...override } : product;
      }),
    [overrides]
  );

  return (
    <ProductsContext.Provider value={{ products, overridesLoaded }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}

export function useProduct(id: string) {
  const { products, overridesLoaded } = useProducts();
  const product = products.find((p) => p.id === id);
  return { product, overridesLoaded };
}
