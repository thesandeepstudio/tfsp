"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminOrdersPage from "@/components/admin/AdminOrdersPage";

export default function AdminOrdersRoute() {
  return (
    <AdminGuard>
      <AdminOrdersPage />
    </AdminGuard>
  );
}
