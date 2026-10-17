import type { MetadataRoute } from "next";

import { SITE_URL as siteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projectPages = PORTFOLIO_CONTENT.filter(
    (item) => item.slug && item.video
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...projectPages.map((item) => ({
      url: `${siteUrl}/projects/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
