"use client";

import { useState } from "react";
import { categoryLabels, type Category } from "@/lib/products";

type CustomProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  gradient: string;
  description: string;
  stockQuantity: number;
  image?: string;
};

const PLACEHOLDER_GRADIENT = "from-neutral-300 to-neutral-100";

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminAddProductPage() {
  const [rootHandle, setRootHandle] = useState<FileSystemDirectoryHandle | null>(
    null
  );
  const [folderName, setFolderName] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState<Category>("merch");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supported =
    typeof window !== "undefined" && "showDirectoryPicker" in window;

  const handleSelectFolder = async () => {
    setError(null);
    try {
      const handle = await (
        window as unknown as {
          showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
        }
      ).showDirectoryPicker();
      setRootHandle(handle);
      setFolderName(handle.name);
    } catch {
      // User cancelled the picker — not an error.
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setStockQuantity("");
    setDescription("");
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!rootHandle) {
      setError("Select your project folder first.");
      return;
    }
    if (!name.trim() || !price.trim() || !stockQuantity.trim()) {
      setError("Name, price, and stock are required.");
      return;
    }

    const slug = slugify(name);
    if (!slug) {
      setError("That name doesn't produce a valid product slug.");
      return;
    }

    setSaving(true);
    try {
      let imagePath: string | undefined;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const publicDir = await rootHandle.getDirectoryHandle("public");
        const productsDir = await publicDir.getDirectoryHandle("products");
        const customDir = await productsDir.getDirectoryHandle("custom", {
          create: true,
        });
        const fileHandle = await customDir.getFileHandle(`${slug}.${ext}`, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write(await imageFile.arrayBuffer());
        await writable.close();
        imagePath = `/products/custom/${slug}.${ext}`;
      }

      const srcDir = await rootHandle.getDirectoryHandle("src");
      const libDir = await srcDir.getDirectoryHandle("lib");
      const jsonHandle = await libDir.getFileHandle("custom-products.json", {
        create: true,
      });
      const file = await jsonHandle.getFile();
      const text = await file.text();
      const existing: CustomProduct[] = text.trim() ? JSON.parse(text) : [];

      if (existing.some((p) => p.slug === slug)) {
        setError(`A product with the slug "${slug}" already exists.`);
        setSaving(false);
        return;
      }

      const newProduct: CustomProduct = {
        id: `custom-${slug}`,
        slug,
        name: name.trim(),
        price: Number(price),
        category,
        gradient: PLACEHOLDER_GRADIENT,
        description: description.trim(),
        stockQuantity: Number(stockQuantity),
        ...(imagePath ? { image: imagePath } : {}),
      };

      const updated = [...existing, newProduct];
      const writable = await jsonHandle.createWritable();
      await writable.write(JSON.stringify(updated, null, 2) + "\n");
      await writable.close();

      setMessage(
        `Added "${name}". Commit and push to deploy it — until then it only shows on your local dev server.`
      );
      resetForm();
    } catch (err) {
      console.error("Failed to add product:", err);
      setError(
        "Couldn't write the files. Make sure you picked your TFSP project folder (the one with package.json)."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!supported) {
    return (
      <div>
        <h1 className="font-display text-3xl tracking-wide">Add Product</h1>
        <p className="mt-4 text-sm text-red-600">
          Your browser doesn&apos;t support the File System Access API needed
          for this tool. Use Chrome, Edge, or Brave, and run the site locally
          (<code>npm run dev</code>) — this won&apos;t work in Firefox/Safari
          or on the live deployed site.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Add Product</h1>
      <p className="mt-1 text-sm text-black/60">
        Writes directly to your local project files. Commit and push
        afterward to make it live — this only works running the site locally.
      </p>

      <div className="mt-6 border border-black/10 p-4">
        {folderName ? (
          <p className="text-sm">
            Project folder: <span className="font-semibold">{folderName}</span>{" "}
            <button
              onClick={handleSelectFolder}
              className="ml-2 text-xs underline hover:opacity-70"
            >
              Change
            </button>
          </p>
        ) : (
          <button
            onClick={handleSelectFolder}
            className="bg-black px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
          >
            Select Project Folder
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <div className="flex gap-3">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (NPR)"
            inputMode="numeric"
            className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <input
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="Stock quantity"
            inputMode="numeric"
            className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        >
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <div>
          <label className="block text-xs uppercase tracking-wide text-black/60">
            Photo (optional — shows a placeholder color box without one)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-1 text-sm"
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        {message && <p className="text-xs text-emerald-700">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85 disabled:bg-black/30"
        >
          {saving ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
