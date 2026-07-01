"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { categoryLabels, type Product } from "@/lib/products";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  New: "bg-black text-white",
  Sale: "bg-red-600 text-white",
  "Back in Stock": "bg-white text-black border border-black",
};

const views = ["Front", "Back", "Detail", "Worn"];

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-black/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-xs font-semibold uppercase tracking-wide"
      >
        {title}
        <span className="text-base leading-none">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <p className="pb-4 text-sm leading-6 text-black/70">{children}</p>
      )}
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [activeView, setActiveView] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors?.[0]?.name);
  const [activeSize, setActiveSize] = useState<string | undefined>(undefined);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [added, setAdded] = useState(false);

  const activeGradient =
    product.colors?.find((c) => c.name === activeColor)?.gradient ??
    product.gradient;

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [product.image]
        : [];
  const activeImage = images[activeView] ?? images[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <nav className="mb-6 text-xs uppercase tracking-wide text-black/50">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${product.category}`} className="hover:text-black">
          {categoryLabels[product.category]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[80px_1fr_380px] lg:gap-10">
        <div className="hidden gap-3 lg:flex lg:flex-col">
          {images.length > 0
            ? images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveView(i)}
                  aria-label={`View ${i + 1}`}
                  className={`relative aspect-square w-full overflow-hidden border ${
                    activeView === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image src={`${BASE_PATH}${src}`} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))
            : views.map((view, i) => (
                <button
                  key={view}
                  onClick={() => setActiveView(i)}
                  aria-label={view}
                  className={`aspect-square w-full overflow-hidden border bg-linear-to-br ${activeGradient} ${
                    activeView === i ? "border-black" : "border-transparent"
                  }`}
                />
              ))}
        </div>

        <div
          className={`relative aspect-4/5 w-full overflow-hidden ${activeImage ? "" : `bg-linear-to-br ${activeGradient}`}`}
        >
          {product.tag && (
            <span
              className={`absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${tagStyles[product.tag]}`}
            >
              {product.tag}
            </span>
          )}
          {activeImage && (
            <Image
              src={`${BASE_PATH}${activeImage}`}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-black/50">
            {categoryLabels[product.category]}
          </p>
          <h1 className="mt-1 text-2xl font-medium">{product.name}</h1>
          <p className="mt-1 text-base">
            NPR {product.price.toLocaleString()}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Select Color — {activeColor}
              </p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color.name)}
                    aria-label={color.name}
                    className={`h-14 w-11 bg-linear-to-br ${color.gradient} border ${
                      activeColor === color.name
                        ? "ring-2 ring-black ring-offset-2"
                        : "border-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Size
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`flex h-10 min-w-10 items-center justify-center px-3 text-sm ${
                      activeSize === size
                        ? "bg-black text-white"
                        : "border border-black/20 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-black/10">
            <AccordionItem
              title="Details"
              isOpen={openSection === "details"}
              onToggle={() =>
                setOpenSection(openSection === "details" ? null : "details")
              }
            >
              {product.description}
            </AccordionItem>
            <AccordionItem
              title="Shipping"
              isOpen={openSection === "shipping"}
              onToggle={() =>
                setOpenSection(openSection === "shipping" ? null : "shipping")
              }
            >
              Orders ship within 2-3 business days. See our shipping page for full details.
            </AccordionItem>
            <AccordionItem
              title="Size Guide"
              isOpen={openSection === "size-guide"}
              onToggle={() =>
                setOpenSection(openSection === "size-guide" ? null : "size-guide")
              }
            >
              Check the size guide before ordering — reach out if you need help choosing.
            </AccordionItem>
          </div>

          <button
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="mt-8 flex w-full items-center justify-between bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-black/85"
          >
            <span>{added ? "Added ✓" : "Add to Cart"}</span>
            <span>NPR {product.price.toLocaleString()}</span>
          </button>

          <Link
            href={`/${product.category}`}
            className="mt-4 block text-center text-sm underline hover:opacity-70"
          >
            Back to {categoryLabels[product.category]}
          </Link>

          <ul className="mt-8 space-y-1 text-xs text-black/60">
            <li>Ships across Nepal in 2-3 business days.</li>
            <li>Easy 14-day returns.</li>
            <li>Quality checked before dispatch.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
