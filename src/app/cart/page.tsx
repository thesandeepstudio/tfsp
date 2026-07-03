"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    subtotal,
    coupon,
    discount,
    total,
    couponError,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
        <h1 className="font-display text-4xl tracking-wide">Your Cart</h1>
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

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">Your Cart</h1>

      <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-6">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-neutral-100">
              <Image
                src={`${BASE_PATH}${item.image}`}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-medium">{item.name}</h2>
                  <span className="whitespace-nowrap text-sm font-medium">
                    NPR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-black/60">
                  {[item.color, item.size, item.variantLabel]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center border border-black/20">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center hover:bg-black/5"
                  >
                    −
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs uppercase tracking-wide underline hover:opacity-70"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Discount code"
          className="flex-1 border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        {coupon ? (
          <button
            onClick={removeCoupon}
            className="border border-black/20 px-4 py-2 text-sm uppercase tracking-wide hover:border-black"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => applyCoupon(couponInput)}
            className="bg-black px-4 py-2 text-sm uppercase tracking-wide text-white hover:bg-black/85"
          >
            Apply
          </button>
        )}
      </div>
      {couponError && (
        <p className="mt-1 text-xs text-red-600">{couponError}</p>
      )}
      {coupon && (
        <p className="mt-1 text-xs text-black/60">
          Code &quot;{coupon.code}&quot; applied.
        </p>
      )}

      <div className="mt-6 space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>NPR {subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-black/60">
            <span>Discount</span>
            <span>−NPR {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>NPR {total.toLocaleString()}</span>
        </div>
      </div>
      <p className="mt-1 text-xs text-black/50">
        Shipping is calculated at checkout.
      </p>

      <Link
        href="/checkout"
        className="mt-6 block bg-black px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/"
        className="mt-4 block text-center text-sm underline hover:opacity-70"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
