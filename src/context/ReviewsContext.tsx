"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

type ReviewsMap = Record<string, Review[]>;

type ReviewsContextValue = {
  getReviews: (slug: string) => Review[];
  getAverageRating: (slug: string) => number | null;
  addReview: (slug: string, review: Omit<Review, "id" | "date">) => void;
};

const ReviewsContext = createContext<ReviewsContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "tfsp-reviews";

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<ReviewsMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReviews(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews, hydrated]);

  const getReviews = (slug: string) => reviews[slug] ?? [];

  const getAverageRating = (slug: string) => {
    const list = reviews[slug];
    if (!list || list.length === 0) return null;
    return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  };

  const addReview: ReviewsContextValue["addReview"] = (slug, review) => {
    const newReview: Review = {
      ...review,
      id: `${Date.now()}`,
      date: new Date().toISOString(),
    };
    setReviews((prev) => ({
      ...prev,
      [slug]: [...(prev[slug] ?? []), newReview],
    }));
  };

  return (
    <ReviewsContext.Provider
      value={{ getReviews, getAverageRating, addReview }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}
