import { MetadataRoute } from "next";
import { products } from "@/products/data";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const currentDate = new Date().toISOString();
   const website = process.env.WEBSITE_URL ;

   const product : MetadataRoute.Sitemap = products.map(({id})=> (
      {
         url : `${process.env.WEBSITE_URL}/${id}`,
         changeFrequency : 'weekly',
      }
   ))

   return [
    {
      url: `${website}/`,
      lastModified: new Date(currentDate),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${website}/shop`,
      lastModified: new Date(currentDate),
      priority : 0.8,
    },
    {
      url: `${website}/about`,
      lastModified: new Date(currentDate),
      priority : 0.9,
    },
    {
      url: `${website}/contact`,
      lastModified: new Date(currentDate),
      priority : 0.7,
    },
    {
      url: `${website}/terms-and-conditions`,
      lastModified: new Date(currentDate),
      priority : 0.6,
    },
    {
      url : `${website}/privacy-policy`,
      lastModified: new Date(currentDate),
    },
    {
      url : `${website}/shipping-policy`,
      lastModified: new Date(currentDate),
    }
    ,{
      url : `${website}/refund-policy`,
      lastModified: new Date(currentDate),
      priority : 0.4,
    },
    ...product
  ];
}
