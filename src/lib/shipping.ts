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
