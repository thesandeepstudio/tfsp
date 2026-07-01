export type InfoPage = {
  slug: string;
  title: string;
  content: string;
};

export const infoPages: InfoPage[] = [
  {
    slug: "shipping",
    title: "Shipping",
    content: "Orders ship within 2-3 business days. Delivery timelines vary by location and will be confirmed at checkout.",
  },
  {
    slug: "returns",
    title: "Returns",
    content: "Unused items in original condition can be returned within 14 days of delivery. Contact us to start a return.",
  },
  {
    slug: "size-guide",
    title: "Size Guide",
    content: "Apparel sizing details and poster dimensions are listed on each product page. Reach out if you need help choosing a size.",
  },
  {
    slug: "contact",
    title: "Contact Us",
    content: "Questions about an order or a product? Email us and we'll get back to you as soon as we can.",
  },
  {
    slug: "about",
    title: "About",
    content: "TFSP makes merch, posters, and stickers for people who like to carry their favorite things with them.",
  },
  {
    slug: "careers",
    title: "Careers",
    content: "We're not currently hiring, but check back soon — open roles will be posted here.",
  },
  {
    slug: "stores",
    title: "Stores",
    content: "TFSP is currently online-only. Physical store locations will be announced here when available.",
  },
  {
    slug: "sustainability",
    title: "Sustainability",
    content: "We're working on sourcing lower-impact materials and packaging. Details on our progress will be shared here.",
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}
