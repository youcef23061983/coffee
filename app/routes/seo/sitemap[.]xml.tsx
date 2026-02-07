// // app/routes/sitemap[.]xml.tsx
// import { supabase } from "~/supabase_client";

// export async function loader() {
//   // Remove the .eq('active', true) filter since the column doesn't exist
//   const { data: brands, error } = await supabase
//     .from("brands")
//     .select("id, updated_at, name")
//     .limit(490);

//   if (error) {
//     console.error("Error fetching brands:", error);
//     // Still return a basic sitemap without brands
//   }
//   const brandCount = brands?.length || 0;
//   const staticPagesCount = 10; // Your static pages
//   const totalUrls = brandCount + staticPagesCount;

//   console.log(
//     `Sitemap stats: ${brandCount} brands + ${staticPagesCount} static = ${totalUrls} total URLs`
//   );
//   const baseUrl = "https://coffee-khaki-seven.vercel.app";
//   const currentDate = new Date().toISOString();

//   const brandUrls =
//     brands
//       ?.map(
//         (brand) => `
//     <url>
//       <loc>${baseUrl}/${brand.id}</loc>
//       <lastmod>${new Date(brand.updated_at).toISOString()}</lastmod>
//       <changefreq>weekly</changefreq>
//       <priority>0.8</priority>
//     </url>
//   `
//       )
//       .join("") || "";

//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <!-- Static Pages -->
//   <url>
//     <loc>${baseUrl}/</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>1.0</priority>
//   </url>
//   <url>
//     <loc>${baseUrl}/products</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.9</priority>
//   </url>
//   <url>
//     <loc>${baseUrl}/quiz</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>${baseUrl}/results</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>${baseUrl}/testimonials</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>

//   <!-- Brand Pages -->
//   ${brandUrls}
// </urlset>`;

//   return new Response(sitemap, {
//     status: 200,
//     headers: {
//       "Content-Type": "application/xml",
//       "Cache-Control": "public, max-age=86400",
//     },
//   });
// }

// app/routes/sitemap[.]xml.tsx

export async function loader() {
  const baseUrl = "https://coffee-khaki-seven.vercel.app";
  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/quiz</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/results</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/testimonials</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>  
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
