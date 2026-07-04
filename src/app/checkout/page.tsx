"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { deliveryLocations, getDeliveryRate } from "@/lib/shipping";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, coupon, discount, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const rate = getDeliveryRate(city);
  const shippingCost = rate?.price ?? 0;
  const grandTotal = total + shippingCost;

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

  const placeOrder = async () => {
    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim() || !rate)
      return;

    setPlacing(true);

    const order = {
      id: `TFSP-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      subtotal,
      discount,
      couponCode: coupon?.code ?? null,
      shippingZone: rate.location,
      shippingCost: rate.price,
      deliveryTime: rate.deliveryTime,
      total: grandTotal,
      customer: { name, phone, city, address, notes },
    };

    try {
      // Firestore rejects `undefined` field values, which optional cart
      // item fields (size/color/variantLabel) can have — strip them.
      const firestoreSafeOrder = JSON.parse(JSON.stringify(order));
      await addDoc(collection(db, "orders"), {
        ...firestoreSafeOrder,
        status: "new",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      // Order log is best-effort — don't block checkout if it fails.
      console.error("Failed to log order to Firestore:", err);
    }

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
              <input
                type="text"
                list="delivery-cities"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Delivery city (e.g. Kathmandu)"
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <datalist id="delivery-cities">
                {deliveryLocations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
              {city.trim().length > 0 && (
                <p className="mt-1 text-xs text-black/50">
                  {rate
                    ? `NPR ${rate.price.toLocaleString()} · ${rate.deliveryTime}`
                    : "City not found — please pick one from the list."}
                </p>
              )}
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address / landmark"
              rows={3}
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
            />
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
            disabled={
              placing ||
              !name.trim() ||
              !phone.trim() ||
              !city.trim() ||
              !address.trim() ||
              !rate
            }
            className="mt-6 w-full bg-black px-5 py-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/30"
          >
            {placing ? "Placing Order..." : "Place Order"}
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
              <span>Shipping{rate ? ` (${rate.location})` : ""}</span>
              <span>NPR {shippingCost.toLocaleString()}</span>
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
