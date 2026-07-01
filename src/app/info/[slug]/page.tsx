import { notFound } from "next/navigation";
import { getInfoPage, infoPages } from "@/lib/info-pages";

export function generateStaticParams() {
  return infoPages.map((page) => ({ slug: page.slug }));
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getInfoPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide">{page.title}</h1>
      <p className="mt-4 text-sm leading-6 text-black/70">{page.content}</p>
    </section>
  );
}
