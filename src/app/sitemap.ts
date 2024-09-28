import { MetadataRoute } from "next";
import { products } from "@/products/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  const website = process.env.WEBSITE_URL;

  const product: MetadataRoute.Sitemap = products.map(({ id }) => ({
      url: `${website}/shop/${id}`,
      changeFrequency: 'weekly',
      lastModified: currentDate,
      priority: 0.5,
  }));

  return [
    {
      url: `${website}/`,
      lastModified: currentDate,
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${website}/shop`,
      lastModified: currentDate,
      priority: 0.8,
    },
    {
      url: `${website}/about`,
      lastModified: currentDate,
      priority: 0.9,
    },
    {
      url: `${website}/contact`,
      lastModified: currentDate,
      priority: 0.7,
    },
    {
      url: `${website}/terms-and-conditions`,
      lastModified: currentDate,
      priority: 0.6,
    },
    {
      url: `${website}/privacy-policy`,
      lastModified: currentDate,
    },
    {
      url: `${website}/shipping-policy`,
      lastModified: currentDate,
    },
    {
      url: `${website}/refund-policy`,
      lastModified: currentDate,
      priority: 0.4,
    },
    ...product,
  ];
}
