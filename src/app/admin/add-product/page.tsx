"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminAddProductPage from "@/components/admin/AdminAddProductPage";

export default function AdminAddProductRoute() {
  return (
    <AdminGuard>
      <AdminAddProductPage />
    </AdminGuard>
  );
}
