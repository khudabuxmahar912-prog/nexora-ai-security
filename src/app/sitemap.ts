import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "",
  "/about",
  "/ai-security",
  "/ai-software",
  "/internships",
  "/projects",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
  "/security",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}