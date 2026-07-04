"use client";

import { useState } from "react";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useProducts } from "@/context/ProductsContext";
import { categoryLabels, type Category, type Product } from "@/lib/products";

type TagValue = NonNullable<Product["tag"]> | "None";
const tagOptions: TagValue[] = ["None", "New", "Sale", "Back in Stock"];

function ProductRow({ product }: { product: Product }) {
  const [price, setPrice] = useState(String(product.price));
  const [compareAtPrice, setCompareAtPrice] = useState(
    product.compareAtPrice ? String(product.compareAtPrice) : ""
  );
  const [stockQuantity, setStockQuantity] = useState(
    product.stockQuantity !== undefined ? String(product.stockQuantity) : ""
  );
  const [tag, setTag] = useState<TagValue>(product.tag ?? "None");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const data = {
      price: Number(price) || 0,
      compareAtPrice: compareAtPrice.trim() ? Number(compareAtPrice) : deleteField(),
      stockQuantity: stockQuantity.trim() ? Number(stockQuantity) : deleteField(),
      tag: tag === "None" ? deleteField() : tag,
    };
    await setDoc(doc(db, "products", product.id), data, { merge: true });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <tr className="border-b border-black/10">
      <td className="py-2 pr-4 text-sm">{product.name}</td>
      <td className="py-2 pr-4 text-xs text-black/50">
        {categoryLabels[product.category]}
      </td>
      <td className="py-2 pr-4">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-20 border border-black/20 px-2 py-1 text-sm outline-none focus:border-black"
        />
      </td>
      <td className="py-2 pr-4">
        <input
          value={compareAtPrice}
          onChange={(e) => setCompareAtPrice(e.target.value)}
          placeholder="-"
          className="w-20 border border-black/20 px-2 py-1 text-sm outline-none focus:border-black"
        />
      </td>
      <td className="py-2 pr-4">
        <input
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          placeholder="unlimited"
          className="w-24 border border-black/20 px-2 py-1 text-sm outline-none focus:border-black"
        />
      </td>
      <td className="py-2 pr-4">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value as TagValue)}
          className="border border-black/20 px-2 py-1 text-sm outline-none focus:border-black"
        >
          {tagOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </td>
      <td className="py-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:bg-black/30"
        >
          {saving ? "..." : saved ? "Saved" : "Save"}
        </button>
      </td>
    </tr>
  );
}

export default function AdminProductsPage() {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = products.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Products</h1>
      <p className="mt-1 text-sm text-black/60">
        Changes save instantly and go live on the site immediately.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        >
          <option value="all">All Categories</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-black/50">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Compare-at</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Tag</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
