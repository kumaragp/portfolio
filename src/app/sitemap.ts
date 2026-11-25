import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) {
    return [];
  }

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((project) => project.visibility === "public")
      .map((project) => ({
        url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
