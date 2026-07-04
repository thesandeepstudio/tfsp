"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type OrderStatus = "new" | "confirmed" | "shipped" | "delivered" | "cancelled";

type AdminOrder = {
  docId: string;
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingZone: string;
  status: OrderStatus;
  customer: { name: string; phone: string; city: string; address: string; notes: string };
};

const statusOptions: OrderStatus[] = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-black text-white",
  confirmed: "bg-blue-600 text-white",
  shipped: "bg-amber-500 text-white",
  delivered: "bg-emerald-600 text-white",
  cancelled: "bg-red-600 text-white",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(
          snapshot.docs.map((d) => ({
            docId: d.id,
            ...(d.data() as Omit<AdminOrder, "docId">),
          }))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsubscribe();
  }, []);

  const updateStatus = async (docId: string, status: OrderStatus) => {
    await updateDoc(doc(db, "orders", docId), { status });
  };

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Orders</h1>
      <p className="mt-1 text-sm text-black/60">
        Orders placed through checkout, newest first.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-black/50">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-sm text-black/50">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.docId} className="border border-black/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-black/50">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <select
                  value={order.status ?? "new"}
                  onChange={(e) =>
                    updateStatus(order.docId, e.target.value as OrderStatus)
                  }
                  className={`px-2 py-1 text-xs font-semibold uppercase tracking-wide outline-none ${
                    statusStyles[order.status ?? "new"]
                  }`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s} className="bg-white text-black">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 divide-y divide-black/10 border-y border-black/10 text-sm">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      NPR {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap justify-between gap-4 text-xs text-black/70">
                <div>
                  <p className="font-semibold">{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  <p>
                    {order.customer.address}, {order.customer.city}
                  </p>
                  {order.customer.notes && <p>Notes: {order.customer.notes}</p>}
                </div>
                <div className="text-right">
                  <p>Shipping: {order.shippingZone}</p>
                  <p className="text-sm font-semibold text-black">
                    Total: NPR {order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
