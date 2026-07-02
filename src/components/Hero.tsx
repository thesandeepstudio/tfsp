import HeroVideo from "@/components/HeroVideo";

export default function Hero() {
  return (
    <section className="relative flex aspect-video items-end overflow-hidden bg-neutral-800 px-4 pb-16 pt-32 sm:px-8">
      <HeroVideo />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-xl text-white">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          FW25 Collection
        </p>
        <h1 className="font-display text-6xl leading-none tracking-wide sm:text-8xl">
          BUILT FOR
          <br />
          THE STREET
        </h1>
        <p className="mt-4 max-w-sm text-sm text-white/80">
          Weekly drops of streetwear essentials, footwear and accessories —
          designed for everyday movement.
        </p>
        <a
          href="#new-arrivals"
          className="mt-6 inline-block bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white/90"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
