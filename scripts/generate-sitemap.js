// // scripts/generate-sitemap.js
// import { routes } from "../app/routes.js";

// export function generateSitemapFromRoutes(routes) {
//   const baseUrl = "https://coffee-khaki-seven.vercel.app";

//   return routes
//     .filter(
//       (route) =>
//         !route.path.includes("*") &&
//         !route.path.includes(":") && // exclude dynamic params
//         route.path !== undefined
//     )
//     .map((route) => ({
//       url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
//       lastmod: new Date().toISOString().split("T")[0],
//       changefreq: getChangeFrequency(route.path),
//       priority: route.path === "/" ? 1.0 : 0.8,
//     }));
// }

// function getChangeFrequency(path) {
//   if (path === "/") return "daily";
//   if (path.includes("/blog")) return "weekly";
//   return "monthly";
// }

// // Generate the XML
// function generateSitemapXML() {
//   const urls = generateSitemapFromRoutes(routes);

//   const urlEntries = urls
//     .map(
//       (url) => `
//     <url>
//       <loc>${url.url}</loc>
//       <lastmod>${url.lastmod}</lastmod>
//       <changefreq>${url.changefreq}</changefreq>
//       <priority>${url.priority}</priority>
//     </url>
//   `
//     )
//     .join("");

//   return `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   ${urlEntries}
// </urlset>`;
// }

// // Write to file (for build process)
// import { writeFileSync } from "fs";

// const sitemap = generateSitemapXML();
// writeFileSync("./public/sitemap.xml", sitemap);
// console.log("Sitemap generated!");

// app/routes/sitemap[.]xml.tsx
import { supabase } from "~/supabase_client";

export async function loader() {
  // Get all brands for sitemap
  const { data: brands, error } = await supabase
    .from("brands")
    .select("id, updated_at, name")
    .eq("active", true);

  if (error) {
    console.error("Error fetching brands:", error);
    // Still return a basic sitemap without brands
  }

  const baseUrl = "https://coffee-khaki-seven.vercel.app";

  const brandUrls =
    brands
      ?.map(
        (brand) => `
    <url>
      <loc>${baseUrl}/brands/${brand.id}</loc>
      <lastmod>${new Date(brand.updated_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
      )
      .join("") || "";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/classes</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/workout</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/testimonials</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${brandUrls}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400", // 24 hours cache
    },
  });
}

// No default export needed for XML routes
