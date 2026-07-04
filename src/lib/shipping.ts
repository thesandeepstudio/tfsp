import rawRates from "./delivery-rates.json";

export type DeliveryRate = {
  location: string;
  price: number;
  deliveryTime: string;
};

export const deliveryRates: DeliveryRate[] = rawRates;

export const deliveryLocations: string[] = deliveryRates.map(
  (r) => r.location
);

const FALLBACK_RATE: DeliveryRate = {
  location: "Other",
  price: 200,
  deliveryTime: "2-4 days",
};

export function getDeliveryRate(location: string): DeliveryRate | undefined {
  const normalized = location.trim().toLowerCase();
  if (!normalized) return undefined;
  return deliveryRates.find((r) => r.location.toLowerCase() === normalized);
}

export function getDeliveryRateOrFallback(location: string): DeliveryRate {
  return getDeliveryRate(location) ?? FALLBACK_RATE;
}
