"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import {
  categoryLabels,
  getProductsByCategory,
  type PosterFormat,
  type Product,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  New: "bg-black text-white",
  Sale: "bg-red-600 text-white",
  "Back in Stock": "bg-white text-black border border-black",
};

const views = ["Front", "Back", "Detail", "Worn"];
const FRAME_PRICE = 300;

function firstSizeFor(format: PosterFormat) {
  return format.paperOptions
    ? format.paperOptions[0]?.prices[0]?.size
    : format.sizes?.[0]?.size;
}

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
  const [activeFormat, setActiveFormat] = useState(product.formats?.[0]?.name);
  const [activePaper, setActivePaper] = useState(
    product.formats?.[0]?.paperOptions?.[0]?.name
  );
  const [activeFormatSize, setActiveFormatSize] = useState(
    product.formats?.[0] ? firstSizeFor(product.formats[0]) : undefined
  );
  const [frameChecked, setFrameChecked] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [added, setAdded] = useState(false);

  const activeGradient =
    product.colors?.find((c) => c.name === activeColor)?.gradient ??
    product.gradient;

  const selectedFormat = product.formats?.find((f) => f.name === activeFormat);
  const selectedPaperOption = selectedFormat?.paperOptions?.find(
    (paper) => paper.name === activePaper
  );
  const formatSizePrices = selectedPaperOption?.prices ?? selectedFormat?.sizes;
  const basePrice =
    formatSizePrices?.find((p) => p.size === activeFormatSize)?.price ??
    product.price;
  const framedPrice = selectedFormat?.framePrices?.find(
    (p) => p.size === activeFormatSize
  )?.price;
  const currentPrice = frameChecked
    ? (framedPrice ?? basePrice + FRAME_PRICE)
    : basePrice;

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

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
          <p className="mt-1 flex items-center gap-2 text-base">
            {product.compareAtPrice && (
              <span className="text-black/40 line-through">
                NPR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
            NPR {currentPrice.toLocaleString()}
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
                    onClick={() => {
                      setActiveColor(color.name);
                      if (color.image) {
                        const idx = images.indexOf(color.image);
                        if (idx !== -1) setActiveView(idx);
                      }
                    }}
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

          {product.formats && product.formats.length > 1 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Format
              </p>
              <div className="mt-2 flex gap-4">
                {product.formats.map((format) => (
                  <button
                    key={format.name}
                    onClick={() => {
                      setActiveFormat(format.name);
                      setActivePaper(format.paperOptions?.[0]?.name);
                      setActiveFormatSize(firstSizeFor(format));
                      setFrameChecked(false);
                    }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full border ${
                        activeFormat === format.name
                          ? "border-black bg-black"
                          : "border-black/40"
                      }`}
                    />
                    {format.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {formatSizePrices && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Size
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {formatSizePrices.map(({ size }) => (
                  <button
                    key={size}
                    onClick={() => setActiveFormatSize(size)}
                    className={`flex h-10 min-w-10 items-center justify-center px-3 text-sm ${
                      activeFormatSize === size
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

          {selectedFormat?.paperOptions && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Paper
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {selectedFormat.paperOptions.map((paper) => (
                  <button
                    key={paper.name}
                    onClick={() => setActivePaper(paper.name)}
                    className="flex items-center gap-2 text-left text-sm"
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full border ${
                        activePaper === paper.name
                          ? "border-black bg-black"
                          : "border-black/40"
                      }`}
                    />
                    {paper.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedFormat?.framePrices && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Frame
              </p>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={frameChecked}
                  onChange={(e) => setFrameChecked(e.target.checked)}
                  className="h-4 w-4"
                />
                Add Frame
                {framedPrice
                  ? ` (NPR ${framedPrice.toLocaleString()})`
                  : ` (+NPR ${FRAME_PRICE})`}
              </label>
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
            <span>NPR {currentPrice.toLocaleString()}</span>
          </button>

          <Link
            href={`/${product.category}`}
            className="mt-4 block text-center text-sm underline hover:opacity-70"
          >
            Back to {categoryLabels[product.category]}
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-10">
          <h2 className="font-display text-2xl tracking-wide">
            You Might Also Like
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
