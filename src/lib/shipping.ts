export type ShippingZone = {
  id: string;
  label: string;
  price: number;
};

// Placeholder flat rates by zone — exact per-location pricing to be
// refined later.
export const shippingZones: ShippingZone[] = [
  { id: "inside-valley", label: "Inside Valley (Kathmandu)", price: 100 },
  { id: "outside-valley", label: "Outside Valley", price: 175 },
];

// Keywords that indicate an address is inside the Kathmandu Valley.
const insideValleyKeywords = [
  "kathmandu",
  "ktm",
  "lalitpur",
  "patan",
  "bhaktapur",
  "kirtipur",
  "valley",
];

export function detectShippingZone(address: string): ShippingZone {
  const normalized = address.trim().toLowerCase();
  if (normalized.length === 0) return shippingZones[0];
  const isInsideValley = insideValleyKeywords.some((keyword) =>
    normalized.includes(keyword)
  );
  return isInsideValley ? shippingZones[0] : shippingZones[1];
}
