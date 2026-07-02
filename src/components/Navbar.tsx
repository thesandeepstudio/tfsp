"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between gap-2 bg-black px-4 py-2 text-center text-xs font-medium text-white">
        <span className="hidden sm:block" />
        <p className="flex-1 text-center">
          Free shipping on orders over NPR 75 &nbsp;·&nbsp; 10% off your first order
        </p>
        <span className="hidden sm:block" />
      </div>

      <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 sm:px-8">
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>

        <Link
          href="/"
          className="font-display text-3xl tracking-widest"
        >
          TFSP
        </Link>

        <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wide md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:opacity-60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="hover:opacity-60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <button aria-label="Account" className="hidden hover:opacity-60 sm:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>
          <button aria-label="Bag" className="hover:opacity-60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l1 13H5L6 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
          </button>
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
