import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";

const seasons = [
  {
    id: "fw25",
    label: "FW25",
    title: "Fall / Winter 2025",
    image: "/Banners/banner_001.png",
  },
  {
    id: "ss26",
    label: "SS26",
    title: "Spring / Summer 2026",
    image: "/Banners/banner_002.png",
  },
];

export default function Lookbook() {
  return (
    <section id="lookbook" className="px-4 py-16 sm:px-8">
      <div className="mb-8">
        <h2 className="font-display text-4xl tracking-wide">
          Lookbooks
        </h2>
        <p className="mt-1 text-sm text-black/60">New drops every week.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {seasons.map((season) => (
          <div
            key={season.id}
            className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-sm p-6 sm:aspect-16/10"
          >
            <Image
              src={`${BASE_PATH}${season.image}`}
              alt={season.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {season.label}
            </span>
            <h3 className="relative text-2xl font-semibold text-white">{season.title}</h3>
            <Link
              href="/merch"
              className="relative mt-3 inline-block w-fit border-b border-white text-sm font-medium text-white transition group-hover:opacity-70"
            >
              View Lookbook
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
