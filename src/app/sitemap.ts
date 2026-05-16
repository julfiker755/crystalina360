import { envs } from "@/lib";
import type { MetadataRoute } from "next";

const url = envs.app_url as string

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url,
      priority: 1,
    },
    {
      url: url + "/operator",
      priority: 2,
    },
    {
      url: url + "/blog",
      priority: 3,
    },
    {
      url: url + "/podcast",
      priority: 4,
    },
    {
      url: url + "/partnership",
      priority: 5,
    },
  ];
}
