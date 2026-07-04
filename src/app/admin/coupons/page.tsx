"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminCouponsPage from "@/components/admin/AdminCouponsPage";

export default function AdminCouponsRoute() {
  return (
    <AdminGuard>
      <AdminCouponsPage />
    </AdminGuard>
  );
}
