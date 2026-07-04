// Business WhatsApp number (digits only, country code first, no "+").
export const BUSINESS_WHATSAPP_NUMBER = "9779749355345";

// Live site origin, used to turn relative image paths into absolute
// URLs WhatsApp can preview in the chat.
const SITE_URL = "https://thesandeepstudio.github.io/tfsp";

type OrderForMessage = {
  id: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
    size?: string;
    color?: string;
    variantLabel?: string;
  }[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingZone: string;
  shippingCost: number;
  total: number;
  customer: { name: string; phone: string; city: string; address: string; notes: string };
};

export function buildOrderWhatsAppLink(order: OrderForMessage): string {
  const lines = [
    `New order ${order.id}`,
    "",
    ...order.items.flatMap((item) => {
      const variant = [item.color, item.size, item.variantLabel]
        .filter(Boolean)
        .join(", ");
      const variantSuffix = variant ? ` (${variant})` : "";
      const line = `${item.name}${variantSuffix} x${item.quantity} - NPR ${(item.price * item.quantity).toLocaleString()}`;
      const imageLine = item.image ? `${SITE_URL}${item.image}` : null;
      return imageLine ? [line, imageLine] : [line];
    }),
    "",
    `Subtotal: NPR ${order.subtotal.toLocaleString()}`,
  ];

  if (order.discount > 0) {
    lines.push(
      `Discount${order.couponCode ? ` (${order.couponCode})` : ""}: -NPR ${order.discount.toLocaleString()}`
    );
  }

  lines.push(
    `Shipping (${order.shippingZone}): NPR ${order.shippingCost.toLocaleString()}`,
    `Total: NPR ${order.total.toLocaleString()}`,
    "",
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `City: ${order.customer.city}`,
    `Address: ${order.customer.address}`
  );

  if (order.customer.notes.trim()) {
    lines.push(`Notes: ${order.customer.notes}`);
  }

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`;
}
