"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";

const navLinks = [
  { href: "/admin", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/coupons", label: "Coupons" },
];

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-black/60">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide ${
                pathname === link.href
                  ? "text-black underline"
                  : "text-black/50 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => logout()}
          className="text-xs font-semibold uppercase tracking-wide text-black/50 hover:text-black"
        >
          Log out
        </button>
      </div>
      {children}
    </div>
  );
}
