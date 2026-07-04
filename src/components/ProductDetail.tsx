"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import {
  categoryLabels,
  isInStock,
  type PosterFormat,
  type Product,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useProduct, useProducts } from "@/context/ProductsContext";
import { useWishlist } from "@/context/WishlistContext";
import { useReviews } from "@/context/ReviewsContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  New: "bg-black text-white",
  Sale: "bg-red-600 text-white",
  "Back in Stock": "bg-white text-black border border-black",
};

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

function StarRating({
  rating,
  onChange,
  size = 16,
}: {
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={n <= rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-black"
          >
            <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProductDetail({ product: initialProduct }: { product: Product }) {
  const { product: liveProduct } = useProduct(initialProduct.id);
  const { products: allProducts } = useProducts();
  const product = liveProduct ?? initialProduct;
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
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { getReviews, getAverageRating, addReview } = useReviews();
  const reviews = getReviews(product.slug);
  const averageRating = getAverageRating(product.slug);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { items: recentlyViewed, addViewed } = useRecentlyViewed();

  useEffect(() => {
    addViewed({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image ?? "",
      price: product.price,
      gradient: product.gradient,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

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
  const maxQuantity = product.stockQuantity ?? Infinity;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentlyViewedFiltered = recentlyViewed.filter(
    (item) => item.productId !== product.id
  );

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [product.image]
        : [];
  const activeImage = images[activeView] ?? images[0];

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageScroll = () => {
    const el = imageContainerRef.current;
    if (!el || el.clientHeight === 0) return;
    setActiveView(Math.round(el.scrollTop / el.clientHeight));
  };

  const animateScrollTop = (el: HTMLElement, target: number, duration = 400) => {
    const start = el.scrollTop;
    const change = target - start;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.scrollTop = start + change * eased;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollToImage = (i: number) => {
    const el = imageContainerRef.current;
    if (el) {
      animateScrollTop(el, i * el.clientHeight);
    }
    setActiveView(i);
  };

  const imageCount = images.length;
  const wheelCooldownRef = useRef(false);

  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || imageCount <= 1) return;

    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) {
        e.preventDefault();
        return;
      }

      const current = Math.round(el.scrollTop / el.clientHeight);
      const next =
        e.deltaY > 0
          ? Math.min(imageCount - 1, current + 1)
          : Math.max(0, current - 1);

      // Already at the first/last image — let the page scroll normally
      // instead of trapping the scroll gesture.
      if (next === current) return;

      e.preventDefault();
      wheelCooldownRef.current = true;
      animateScrollTop(el, next * el.clientHeight);
      setActiveView(next);
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 500);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [imageCount]);

  const accordion = (
    <div className="border-t border-black/10">
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
  );

  const trustBadges = (
    <ul className="mt-6 space-y-1.5 text-xs text-black/60">
      <li>Cash on delivery, anywhere in Nepal.</li>
      <li>Easy returns — see our returns policy.</li>
      <li>Quality checked before it ships.</li>
    </ul>
  );

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
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

      <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1.3fr)_380px] lg:gap-10">
        <div className="hidden lg:block">
          {accordion}
          {trustBadges}
        </div>

        <div className="lg:px-6">
        <div
          className={`relative aspect-4/5 w-full overflow-hidden ${activeImage ? "" : `bg-linear-to-br ${activeGradient}`}`}
        >
          {!isInStock(product) ? (
            <span className="absolute left-3 top-3 z-10 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
              Out of Stock
            </span>
          ) : (
            product.tag && (
              <span
                className={`absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${tagStyles[product.tag]}`}
              >
                {product.tag}
              </span>
            )
          )}

          <div
            ref={imageContainerRef}
            onScroll={handleImageScroll}
            className="no-scrollbar h-full w-full snap-y snap-mandatory overflow-y-scroll"
          >
            {images.map((src, i) => (
              <div key={src} className="relative h-full w-full shrink-0 snap-start">
                <Image
                  src={`${BASE_PATH}${src}`}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 opacity-60">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => scrollToImage(i)}
                  aria-label={`View ${i + 1}`}
                  className={`relative h-14 w-14 overflow-hidden border-2 bg-white ${
                    activeView === i ? "border-black" : "border-white"
                  }`}
                >
                  <Image src={`${BASE_PATH}${src}`} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-black/50">
            {categoryLabels[product.category]}
          </p>
          <div className="mt-1 flex items-start justify-between gap-2">
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <button
              onClick={() =>
                toggleWishlist({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.image ?? "",
                  price: product.price,
                })
              }
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/20"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                className={wishlisted ? "text-red-600" : "text-black"}
              >
                <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 6 5c2 0 3.6 1.2 6 3.6C14.4 6.2 16 5 18 5c3.7 0 5.5 3.4 4 6.9-2.5 4.5-10 9.1-10 9.1z" />
              </svg>
            </button>
          </div>
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

          <div className="mt-8 lg:hidden">{accordion}</div>

          {isInStock(product) && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-black/60">
                Quantity
              </p>
              <div className="mt-2 flex h-10 w-fit items-center border border-black/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-full w-10 items-center justify-center hover:bg-black/5"
                >
                  −
                </button>
                <span className="flex h-full w-12 items-center justify-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-full w-10 items-center justify-center hover:bg-black/5"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            disabled={!isInStock(product)}
            onClick={() => {
              const variantParts = [
                selectedFormat && product.formats && product.formats.length > 1
                  ? selectedFormat.name
                  : undefined,
                selectedPaperOption?.name,
                frameChecked ? "Framed" : undefined,
              ].filter(Boolean) as string[];

              addItem(
                {
                  id: [
                    product.id,
                    activeColor,
                    activeSize,
                    activeFormatSize,
                    activePaper,
                    frameChecked ? "framed" : undefined,
                  ]
                    .filter(Boolean)
                    .join("-"),
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: activeImage ?? product.image ?? "",
                  price: currentPrice,
                  size: activeFormatSize ?? activeSize,
                  color: activeColor,
                  variantLabel:
                    variantParts.length > 0 ? variantParts.join(" · ") : undefined,
                },
                quantity
              );

              setAdded(true);
              setQuantity(1);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="mt-6 flex w-full items-center justify-between bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/30"
          >
            <span>
              {!isInStock(product)
                ? "Out of Stock"
                : added
                  ? "Added ✓"
                  : "Add to Cart"}
            </span>
            {isInStock(product) && (
              <span>NPR {(currentPrice * quantity).toLocaleString()}</span>
            )}
          </button>
          {isInStock(product) &&
            product.stockQuantity !== undefined &&
            product.stockQuantity <= 5 && (
              <p className="mt-2 text-center text-xs text-red-600">
                Only {product.stockQuantity} left in stock
              </p>
            )}

          <Link
            href="/checkout"
            className="mt-3 block border border-black/20 px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide hover:border-black"
          >
            Go to Checkout
          </Link>

          <div className="lg:hidden">{trustBadges}</div>

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

      {recentlyViewedFiltered.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-10">
          <h2 className="font-display text-2xl tracking-wide">
            Recently Viewed
          </h2>
          <div className="no-scrollbar mt-6 flex gap-4 overflow-x-auto">
            {recentlyViewedFiltered.map((item) => (
              <Link
                key={item.productId}
                href={`/products/${item.slug}`}
                className="w-32 shrink-0"
              >
                <div
                  className={`relative aspect-4/5 w-full overflow-hidden bg-linear-to-br ${item.gradient}`}
                >
                  {item.image && (
                    <Image
                      src={`${BASE_PATH}${item.image}`}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="mt-1.5 truncate text-xs">{item.name}</p>
                <p className="text-xs text-black/60">
                  NPR {item.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 border-t border-black/10 pt-10">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl tracking-wide">Reviews</h2>
          {averageRating !== null && (
            <>
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-black/60">
                {averageRating.toFixed(1)} ({reviews.length})
              </span>
            </>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="mt-6 space-y-6 divide-y divide-black/10">
            {reviews.map((review) => (
              <div key={review.id} className="pt-6 first:pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{review.name}</p>
                  <StarRating rating={review.rating} size={13} />
                </div>
                <p className="mt-2 text-sm text-black/70">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-black/50">
            No reviews yet — be the first to leave one.
          </p>
        )}

        <div className="mt-8 max-w-md border-t border-black/10 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Write a Review
          </h3>
          <div className="mt-3">
            <StarRating rating={reviewRating} onChange={setReviewRating} size={22} />
          </div>
          <input
            type="text"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            placeholder="Your name"
            className="mt-3 w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your thoughts"
            rows={3}
            className="mt-3 w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <button
            onClick={() => {
              if (!reviewName.trim() || !reviewComment.trim() || reviewRating === 0)
                return;
              addReview(product.slug, {
                name: reviewName,
                rating: reviewRating,
                comment: reviewComment,
              });
              setReviewName("");
              setReviewRating(0);
              setReviewComment("");
            }}
            disabled={!reviewName.trim() || !reviewComment.trim() || reviewRating === 0}
            className="mt-3 bg-black px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/30"
          >
            Submit Review
          </button>
        </div>
      </div>
    </section>
  );
}
