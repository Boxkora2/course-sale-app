import type { MetadataRoute } from "next";

const BASE_URL = "https://nexlearn.dev";
const LAST_MOD  = new Date("2026-02-28");

// Static course slugs — TODO: Replace with API call
const courseSlugs = [
  "advanced-react-nextjs",
  "machine-learning-a-z",
  "ui-ux-design-mastery",
  "data-science-bootcamp",
  "cloud-architecture-mastery",
  "ethical-hacking-pentesting",
  "react-native-mobile-development",
  "python-for-beginners-free",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:          BASE_URL,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority:     1.0,
    },
    {
      url:          `${BASE_URL}/courses`,
      lastModified: LAST_MOD,
      changeFrequency: "daily",
      priority:     0.9,
    },
    {
      url:          `${BASE_URL}/search`,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority:     0.6,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url:          `${BASE_URL}/courses/${slug}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly" as const,
    priority:     0.8,
  }));

  return [...staticPages, ...coursePages];
}
