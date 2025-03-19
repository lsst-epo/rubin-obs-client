import { env } from "@/env";
import { MetadataRoute } from "next";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap_index.xml`,
  };
}
