"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type CouponDoc = {
  code: string;
  type: "percent" | "flat";
  value: number;
  active: boolean;
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "flat">("percent");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "coupons"),
      (snapshot) => {
        setCoupons(
          snapshot.docs.map((d) => ({
            code: d.id,
            ...(d.data() as Omit<CouponDoc, "code">),
          }))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = code.trim().toUpperCase();
    const numericValue = Number(value);
    if (!normalized) {
      setError("Enter a code.");
      return;
    }
    if (!numericValue || numericValue <= 0) {
      setError("Enter a valid discount value.");
      return;
    }
    try {
      await setDoc(doc(db, "coupons", normalized), {
        type,
        value: numericValue,
        active: true,
      });
      setCode("");
      setValue("");
    } catch (err) {
      console.error("Failed to add coupon:", err);
      setError("Save failed — try logging out and back in.");
    }
  };

  const toggleActive = async (couponCode: string, active: boolean) => {
    try {
      await updateDoc(doc(db, "coupons", couponCode), { active: !active });
    } catch (err) {
      console.error("Failed to update coupon:", err);
      setError("Update failed — try logging out and back in.");
    }
  };

  const handleDelete = async (couponCode: string) => {
    try {
      await deleteDoc(doc(db, "coupons", couponCode));
    } catch (err) {
      console.error("Failed to delete coupon:", err);
      setError("Delete failed — try logging out and back in.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Coupons</h1>
      <p className="mt-1 text-sm text-black/60">
        Codes customers can apply at checkout.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-6 flex flex-wrap items-end gap-3 border border-black/10 p-4"
      >
        <div>
          <label className="block text-xs uppercase tracking-wide text-black/50">
            Code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="WELCOME10"
            className="mt-1 border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-black/50">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "percent" | "flat")}
            className="mt-1 border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          >
            <option value="percent">Percent off</option>
            <option value="flat">Flat NPR off</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-black/50">
            Value
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type === "percent" ? "10" : "200"}
            className="mt-1 w-24 border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
        <button
          type="submit"
          className="bg-black px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
        >
          Add Coupon
        </button>
        {error && <p className="w-full text-xs text-red-600">{error}</p>}
      </form>

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-black/50">Loading...</p>
        ) : coupons.length === 0 ? (
          <p className="text-sm text-black/50">No coupons yet.</p>
        ) : (
          <table className="w-full max-w-xl text-left">
            <thead>
              <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-black/50">
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Discount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code} className="border-b border-black/10">
                  <td className="py-2 pr-4 text-sm font-semibold">{c.code}</td>
                  <td className="py-2 pr-4 text-sm">
                    {c.type === "percent" ? `${c.value}%` : `NPR ${c.value}`}
                  </td>
                  <td className="py-2 pr-4">
                    <button
                      onClick={() => toggleActive(c.code, c.active)}
                      className={`px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                        c.active
                          ? "bg-emerald-600 text-white"
                          : "bg-black/10 text-black/50"
                      }`}
                    >
                      {c.active ? "Active" : "Disabled"}
                    </button>
                  </td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => handleDelete(c.code)}
                      className="text-xs font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
