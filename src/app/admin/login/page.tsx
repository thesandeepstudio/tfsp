"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const { user, loading, login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || user) return null;

  return (
    <section className="mx-auto max-w-sm px-4 py-24 sm:px-8">
      <h1 className="font-display text-3xl tracking-wide">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:bg-black/30"
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </section>
  );
}
