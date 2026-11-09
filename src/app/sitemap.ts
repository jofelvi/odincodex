import type { MetadataRoute } from "next";
import { systems } from "@/data/systems";
import { SITE_CONFIG } from "@/lib/constants";

// Evaluated once when the sitemap is statically generated (build time).
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const systemPages: MetadataRoute.Sitemap = systems
    .filter((system) => system.stage === "live")
    .map((system) => ({
      url: `${SITE_CONFIG.url}/sistemas/${system.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...systemPages,
  ];
}
