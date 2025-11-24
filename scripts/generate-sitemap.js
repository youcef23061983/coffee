// scripts/generate-sitemap.js
import { routes } from "../app/routes.js";

export function generateSitemapFromRoutes(routes) {
  const baseUrl = "https://yoursite.com";

  return routes
    .filter(
      (route) =>
        !route.path.includes("*") &&
        !route.path.includes(":") && // exclude dynamic params
        route.path !== undefined
    )
    .map((route) => ({
      url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: getChangeFrequency(route.path),
      priority: route.path === "/" ? 1.0 : 0.8,
    }));
}

function getChangeFrequency(path) {
  if (path === "/") return "daily";
  if (path.includes("/blog")) return "weekly";
  return "monthly";
}

// Generate the XML
function generateSitemapXML() {
  const urls = generateSitemapFromRoutes(routes);

  const urlEntries = urls
    .map(
      (url) => `
    <url>
      <loc>${url.url}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`;
}

// Write to file (for build process)
import { writeFileSync } from "fs";

const sitemap = generateSitemapXML();
writeFileSync("./public/sitemap.xml", sitemap);
console.log("Sitemap generated!");
