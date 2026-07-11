import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-8">
      <Image
        src={`${BASE_PATH}/logo/RED.png`}
        alt="TFSP"
        width={96}
        height={96}
        className="h-24 w-24 opacity-80"
      />
      <h1 className="mt-8 font-display text-6xl tracking-wide">404</h1>
      <p className="mt-3 text-lg font-medium">This page doesn&apos;t exist.</p>
      <p className="mt-2 text-sm text-black/60">
        The link might be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-black/85"
      >
        Back to Home
      </Link>
    </section>
  );
}
