"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminProductsPage from "@/components/admin/AdminProductsPage";

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <AdminProductsPage />
    </AdminGuard>
  );
}
