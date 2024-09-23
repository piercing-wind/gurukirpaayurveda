import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow : ['/admin', '/api', '/myaccount']
      },
    ],
    sitemap: `${process.env.WEBSITE_URL}/sitemap.xml`,
  };
}