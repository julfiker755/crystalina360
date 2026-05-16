import { envs } from "@/lib";
import type { MetadataRoute } from "next";

const url = envs.app_url as string;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/"
        ],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  };
}
