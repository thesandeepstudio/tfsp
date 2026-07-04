import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export type Coupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
};

export async function findCoupon(code: string): Promise<Coupon | undefined> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return undefined;

  try {
    const snap = await getDoc(doc(db, "coupons", normalized));
    if (!snap.exists()) return undefined;
    const data = snap.data() as {
      type: "percent" | "flat";
      value: number;
      active?: boolean;
    };
    if (data.active === false) return undefined;
    return { code: normalized, type: data.type, value: data.value };
  } catch {
    return undefined;
  }
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  return coupon.type === "percent"
    ? Math.round(subtotal * (coupon.value / 100))
    : Math.min(coupon.value, subtotal);
}
