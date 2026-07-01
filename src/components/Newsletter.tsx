"use client";

export default function Newsletter() {
  return (
    <section className="bg-black px-4 py-20 text-center text-white sm:px-8">
      <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
        GET 10% OFF
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
        Sign up for restock alerts, early access to drops, and members-only
        pricing.
      </p>
      <form
        className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 border border-white/30 bg-transparent px-4 py-3 text-sm placeholder:text-white/50 focus:border-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white/90"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
