// Must match `basePath` in next.config.ts. Unoptimized next/image doesn't
// auto-prefix basePath onto src, so image paths need it added manually.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/tfsp" : "";
