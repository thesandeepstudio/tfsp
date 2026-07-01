import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Merch", href: "/merch" },
      { label: "Posters", href: "/posters" },
      { label: "Stickers", href: "/stickers" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/info/shipping" },
      { label: "Returns", href: "/info/returns" },
      { label: "Size Guide", href: "/info/size-guide" },
      { label: "Contact Us", href: "/info/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/info/about" },
      { label: "Careers", href: "/info/careers" },
      { label: "Stores", href: "/info/stores" },
      { label: "Sustainability", href: "/info/sustainability" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white px-4 py-12 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl tracking-widest">
            TFSP
          </p>
          <p className="mt-2 max-w-xs text-sm text-black/60">
            Merch, posters, and stickers, dropped weekly.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-black/60">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-black">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-black/50 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} TFSP. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-black">Instagram</a>
          <a href="#" className="hover:text-black">TikTok</a>
          <a href="#" className="hover:text-black">X</a>
        </div>
      </div>
    </footer>
  );
}
