import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { SITE_URL } from "@/lib/base-path";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const title = "TFSP | Streetwear & Footwear";
const description =
  "TFSP — contemporary streetwear, footwear and accessories. New drops weekly.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "TFSP",
    images: [{ url: "/logo/RED.png", width: 1080, height: 1080, alt: "TFSP" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo/RED.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <ReviewsProvider>
                <RecentlyViewedProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </RecentlyViewedProvider>
              </ReviewsProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
