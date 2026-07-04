"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "@/components/SearchOverlay";

const links = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Merch", href: "/merch" },
  { label: "Posters", href: "/posters" },
  { label: "Stickers", href: "/stickers" },
  { label: "Badges", href: "/badges" },
  { label: "Lookbook", href: "/#lookbook" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between gap-2 bg-black px-4 py-2 text-center text-xs font-medium text-white">
        <span className="hidden sm:block" />
        <p className="flex-1 text-center">
          Free shipping on orders over NPR 75 &nbsp;·&nbsp; 10% off your first order
        </p>
        <span className="hidden sm:block" />
      </div>

      <div className="flex items-center justify-between border-b border-black/10 px-4 py-0.5 sm:px-8">
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>

        <Link href="/" aria-label="TFSP home" className="shrink-0">
          <Image
            src={`${BASE_PATH}/logo/RED.png`}
            alt="TFSP"
            width={64}
            height={64}
            className="h-16 w-16"
            priority
          />
        </Link>

        <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wide md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:opacity-60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <SearchOverlay />
          <button aria-label="Account" className="hidden hover:opacity-60 sm:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden hover:opacity-60 sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 6 5c2 0 3.6 1.2 6 3.6C14.4 6.2 16 5 18 5c3.7 0 5.5 3.4 4 6.9-2.5 4.5-10 9.1-10 9.1z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Bag" className="relative hover:opacity-60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l1 13H5L6 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-b border-black/10 bg-white px-4 py-6 text-sm font-medium uppercase tracking-wide md:hidden">
          {links.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
