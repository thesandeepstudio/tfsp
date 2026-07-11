"use client";

import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type OrderStatus = "new" | "confirmed" | "shipped" | "delivered" | "cancelled";

type TrackedOrder = {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingZone: string;
  deliveryTime: string;
  status: OrderStatus;
  customer: { name: string; phone: string; city: string; address: string };
};

const statusLabels: Record<OrderStatus, string> = {
  new: "Order Received",
  confirmed: "Confirmed",
  shipped: "On Its Way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-black text-white",
  confirmed: "bg-blue-600 text-white",
  shipped: "bg-amber-500 text-white",
  delivered: "bg-emerald-600 text-white",
  cancelled: "bg-red-600 text-white",
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrder(null);

    if (!orderId.trim() || !phone.trim()) {
      setError("Enter your order ID and phone number.");
      return;
    }

    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "orders", orderId.trim()));
      if (!snap.exists()) {
        setError("No order found with that ID. Double-check and try again.");
        return;
      }
      const data = snap.data() as TrackedOrder;
      if (data.customer.phone.trim() !== phone.trim()) {
        setError("That phone number doesn't match this order.");
        return;
      }
      setOrder(data);
    } catch (err) {
      console.error("Failed to look up order:", err);
      setError("Something went wrong looking up your order. Try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Track Your Order</h1>
      <p className="mt-2 text-sm text-black/60">
        Enter the order ID from your confirmation and the phone number you
        checked out with.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID (e.g. TFSP-1735600000000)"
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:bg-black/30"
        >
          {loading ? "Looking up..." : "Track Order"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {order && (
        <div className="mt-8 border border-black/10 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{order.id}</p>
            <span
              className={`px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[order.status]}`}
            >
              {statusLabels[order.status]}
            </span>
          </div>
          <p className="mt-1 text-xs text-black/50">
            Placed {new Date(order.date).toLocaleDateString()}
          </p>

          <div className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>NPR {order.total.toLocaleString()}</span>
          </div>

          <div className="mt-3 text-xs text-black/60">
            <p>Delivering to {order.customer.city}</p>
            <p>Estimated delivery: {order.deliveryTime}</p>
          </div>
        </div>
      )}
    </section>
  );
}
