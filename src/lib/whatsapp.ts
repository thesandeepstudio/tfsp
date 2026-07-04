// Business WhatsApp number (digits only, country code first, no "+").
export const BUSINESS_WHATSAPP_NUMBER = "9779749355345";

type OrderForMessage = {
  id: string;
  items: { name: string; quantity: number; price: number }[];
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
    ...order.items.map(
      (item) =>
        `${item.name} x${item.quantity} - NPR ${(item.price * item.quantity).toLocaleString()}`
    ),
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
