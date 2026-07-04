"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CartItem } from "@/context/CartContext";
import { buildOrderWhatsAppLink } from "@/lib/whatsapp";

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingZone: string;
  shippingCost: number;
  deliveryTime: string;
  total: number;
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes: string;
  };
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tfsp-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setChecked(true);
  }, []);

  if (checked && !order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
        <h1 className="font-display text-4xl tracking-wide">No Recent Order</h1>
        <p className="mt-3 text-sm text-black/60">
          We couldn&apos;t find a recent order on this device.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  if (!order) return null;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Thank You!</h1>
      <p className="mt-3 text-sm text-black/60">
        Your order has been placed. We&apos;ll be in touch at {order.customer.phone}{" "}
        to confirm delivery.
      </p>
      <p className="mt-1 text-xs text-black/50">Order #{order.id}</p>

      <div className="mt-8 divide-y divide-black/10 border-y border-black/10 text-left">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between py-3 text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-left text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>NPR {order.subtotal.toLocaleString()}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-black/60">
            <span>Discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
            <span>−NPR {order.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping ({order.shippingZone})</span>
          <span>NPR {order.shippingCost.toLocaleString()}</span>
        </div>
        {order.deliveryTime && (
          <p className="pt-1 text-xs text-black/50">
            Estimated delivery: {order.deliveryTime}
          </p>
        )}
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>NPR {order.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 text-left text-xs text-black/60">
        <p className="font-semibold uppercase tracking-wide text-black/40">
          Delivering to
        </p>
        <p className="mt-1">{order.customer.name}</p>
        <p>{order.customer.address}</p>
        <p>{order.customer.city}</p>
        <p>{order.customer.phone}</p>
      </div>

      <a
        href={buildOrderWhatsAppLink(order)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block bg-[#25D366] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#1ebe57]"
      >
        Send Order via WhatsApp
      </a>
      <p className="mt-2 text-xs text-black/50">
        Please tap this so we receive your order — it opens WhatsApp with your
        order details pre-filled.
      </p>

      <Link
        href="/"
        className="mt-4 inline-block border border-black/20 px-8 py-3 text-sm font-semibold uppercase tracking-wide hover:border-black"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
