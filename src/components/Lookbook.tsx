import Link from "next/link";

const seasons = [
  {
    id: "fw25",
    label: "FW25",
    title: "Fall / Winter 2025",
    gradient: "from-neutral-900 to-neutral-600",
  },
  {
    id: "ss26",
    label: "SS26",
    title: "Spring / Summer 2026",
    gradient: "from-amber-200 to-orange-100",
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
            className={`group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-sm bg-linear-to-br ${season.gradient} p-6 sm:aspect-16/10`}
          >
            <span className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {season.label}
            </span>
            <h3 className="text-2xl font-semibold text-white">{season.title}</h3>
            <Link
              href="/merch"
              className="mt-3 inline-block w-fit border-b border-white text-sm font-medium text-white transition group-hover:opacity-70"
            >
              View Lookbook
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
