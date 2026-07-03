export type Coupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
};

// Add more codes here as needed.
export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percent", value: 10 },
];

export function findCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  return coupon.type === "percent"
    ? Math.round(subtotal * (coupon.value / 100))
    : Math.min(coupon.value, subtotal);
}
