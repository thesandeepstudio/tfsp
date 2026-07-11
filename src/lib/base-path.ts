// Must match `basePath` in next.config.ts. Unoptimized next/image doesn't
// auto-prefix basePath onto src, so image paths need it added manually.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/tfsp" : "";

// Live site origin, used anywhere an absolute URL is required (Open Graph
// tags, WhatsApp message links, etc).
export const SITE_URL = "https://thesandeepstudio.github.io/tfsp";
