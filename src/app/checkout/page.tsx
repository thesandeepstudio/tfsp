"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { detectShippingZone } from "@/lib/shipping";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, coupon, discount, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const zone = detectShippingZone(address);
  const grandTotal = total + zone.price;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
        <h1 className="font-display text-4xl tracking-wide">Checkout</h1>
        <p className="mt-3 text-sm text-black/60">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  const placeOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    const order = {
      id: `TFSP-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      subtotal,
      discount,
      couponCode: coupon?.code ?? null,
      shippingZone: zone.label,
      shippingCost: zone.price,
      total: grandTotal,
      customer: { name, phone, address, notes },
    };

    localStorage.setItem("tfsp-last-order", JSON.stringify(order));
    clearCart();
    router.push("/order-confirmation");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Delivery Details
          </h2>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address"
                rows={3}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
              />
              {address.trim().length > 0 && (
                <p className="mt-1 text-xs text-black/50">
                  Delivery zone: {zone.label} — NPR {zone.price.toLocaleString()}
                </p>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Order notes (optional)"
              rows={2}
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <button
            onClick={placeOrder}
            disabled={!name.trim() || !phone.trim() || !address.trim()}
            className="mt-6 w-full bg-black px-5 py-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/30"
          >
            Place Order
          </button>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Order Summary
          </h2>
          <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-3 text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>NPR {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-black/60">
                <span>Discount</span>
                <span>−NPR {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({zone.label})</span>
              <span>NPR {zone.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>NPR {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
