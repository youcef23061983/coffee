// import React from "react";
// import { ClientOnly } from "~/components/ClientOnly";
// import ProductsClient from "~/components/productsClient";
// import type { Route } from "./+types/products";
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Curated Coffee Roasters & Brewing Gear | BrewTopia Collection" },
//     {
//       name: "description",
//       content:
//         "Blue Bottle, Intelligentsia, Stumptown, Method Coffee roasters + Baratza, Fellow, Breville, Hario, Chemex equipment. Complete coffee setup from top brands. Fresh roasted weekly.",
//     },
//     { name: "author", content: "BrewTopia" },

//     // Open Graph
//     {
//       property: "og:title",
//       content: "Top Coffee Brands & Equipment | BrewTopia Collection",
//     },
//     {
//       property: "og:description",
//       content:
//         "From Blue Bottle beans to Baratza grinders - we've curated the perfect coffee ecosystem. Shop premium roasters & professional equipment in one trusted destination.",
//     },
//     { property: "og:type", content: "website" },
//     {
//       property: "og:url",
//       content: "https://coffee-khaki-seven.vercel.app/products",
//     },
//     {
//       property: "og:image",
//       content: "https://coffee-khaki-seven.vercel.app/products.jpg",
//     },
//     { property: "og:site_name", content: "BrewTopia" },

//     // Twitter
//     { name: "twitter:card", content: "summary_large_image" },
//     {
//       name: "twitter:title",
//       content: "Coffee Brands & Equipment Collection | BrewTopia",
//     },
//     {
//       name: "twitter:description",
//       content:
//         "Blue Bottle ☕ Baratza ⚙️ Fellow ♨️ - All your favorite coffee brands in one place! Complete setups from bean to brew. 🌟",
//     },
//     {
//       name: "twitter:image",
//       content: "https://coffee-khaki-seven.vercel.app/products.jpg",
//     },
//     { name: "twitter:site", content: "@brewtpia" },
//   ];
// }

// const Products = () => {
//   return (
//     <>
//       <ClientOnly fallback={<p>Loading client...</p>}>
//         <ProductsClient />
//       </ClientOnly>
//     </>
//   );
// };

// export default Products;

// ::::::::::::::::::::::serach console url solution1:

// import { ClientOnly } from "~/components/ClientOnly";
// import ProductsClient from "~/components/productsClient";
// import type { Route } from "./+types/products";
// import { supabase } from "~/supabase_client";

// // REACT ROUTER v7 CORRECT IMPORTS
// import { useLoaderData } from "react-router";

// // For TypeScript, define types locally
// type CoffeeProduct = {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   image_url: string | null;
//   roast_level: string;
//   origin_country: string;
// };

// type EquipmentProduct = {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   image_url: string | null;
//   category: string;
// };

// type LoaderData = {
//   coffeeProducts: CoffeeProduct[];
//   equipmentProducts: EquipmentProduct[];
//   totalProducts: number;
//   serverRendered: boolean;
// };

// // REACT ROUTER v7 LOADER (no json import needed)
// export async function loader() {
//   try {
//     const { data: coffeeData } = await supabase
//       .from("coffee_products")
//       .select(
//         "id, name, description, price, image_url, roast_level, origin_country"
//       )
//       .limit(6);

//     const { data: equipmentData } = await supabase
//       .from("equipment_products")
//       .select("id, name, description, price, image_url, category")
//       .limit(6);

//     // React Router v7 automatically handles plain objects
//     return {
//       coffeeProducts: coffeeData || [],
//       equipmentProducts: equipmentData || [],
//       totalProducts: (coffeeData?.length || 0) + (equipmentData?.length || 0),
//       serverRendered: true,
//     };
//   } catch (error) {
//     return {
//       coffeeProducts: [],
//       equipmentProducts: [],
//       totalProducts: 0,
//       serverRendered: true,
//     };
//   }
// }

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Curated Coffee Roasters & Brewing Gear | BrewTopia Collection" },
//     {
//       name: "description",
//       content:
//         "Blue Bottle, Intelligentsia, Stumptown, Method Coffee roasters + Baratza, Fellow, Breville, Hario, Chemex equipment. Complete coffee setup from top brands.",
//     },
//     { name: "author", content: "BrewTopia" },
//     {
//       property: "og:title",
//       content: "Top Coffee Brands & Equipment | BrewTopia Collection",
//     },
//     {
//       property: "og:description",
//       content:
//         "From Blue Bottle beans to Baratza grinders - we've curated the perfect coffee ecosystem. Shop premium roasters & professional equipment in one trusted destination.",
//     },
//     { property: "og:type", content: "website" },
//     {
//       property: "og:url",
//       content: "https://coffee-khaki-seven.vercel.app/products",
//     },
//     {
//       property: "og:image",
//       content: "https://coffee-khaki-seven.vercel.app/products.jpg",
//     },
//     { property: "og:site_name", content: "BrewTopia" },
//     { name: "twitter:card", content: "summary_large_image" },
//     {
//       name: "twitter:title",
//       content: "Coffee Brands & Equipment Collection | BrewTopia",
//     },
//     {
//       name: "twitter:description",
//       content:
//         "Blue Bottle ☕ Baratza ⚙️ Fellow ♨️ - All your favorite coffee brands in one place! Complete setups from bean to brew. 🌟",
//     },
//     {
//       name: "twitter:image",
//       content: "https://coffee-khaki-seven.vercel.app/products.jpg",
//     },
//     { name: "twitter:site", content: "@brewtpia" },
//   ];
// }

// const Products = () => {
//   // Type assertion for loader data
//   const loaderData = useLoaderData() as LoaderData;
//   const { coffeeProducts, equipmentProducts, totalProducts } = loaderData;

//   return (
//     <>
//       <main>
//         {/* Hero Section - Server Rendered */}
//         <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
//           <div
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
//             style={{ backgroundImage: "url('/products.jpg')" }}
//           />
//           <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
//             <h1 className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6">
//               Find Your Coffee And Equipment
//             </h1>
//             <p className="text-xl md:text-2xl opacity-90 mb-8">
//               Discover the perfect blend of quality and craftsmanship
//             </p>

//             {/* Basic Product Stats - Server Rendered */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
//               <div className="flex gap-8 justify-center">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold">
//                     {coffeeProducts.length}+
//                   </div>
//                   <div className="text-sm opacity-80">Coffee Varieties</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold">
//                     {equipmentProducts.length}+
//                   </div>
//                   <div className="text-sm opacity-80">Equipment Items</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold">{totalProducts}</div>
//                   <div className="text-sm opacity-80">Total Products</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Basic Product Showcase - Server Rendered */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
//               Premium Coffee Collection
//             </h2>

//             {/* Featured Coffees */}
//             {coffeeProducts.length > 0 && (
//               <div className="mb-16">
//                 <h3 className="text-2xl font-semibold mb-8 text-amber-800 flex items-center gap-2">
//                   <span>☕</span> Featured Coffees
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {coffeeProducts.slice(0, 3).map((product: CoffeeProduct) => (
//                     <div
//                       key={product.id}
//                       className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
//                         {product.image_url ? (
//                           <img
//                             src={product.image_url}
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                           />
//                         ) : (
//                           <div className="text-gray-400 text-center">
//                             <div className="text-4xl mb-2">☕</div>
//                             <div className="text-sm">Coffee Image</div>
//                           </div>
//                         )}
//                       </div>
//                       <h3 className="text-xl font-semibold mb-2">
//                         {product.name}
//                       </h3>
//                       <p className="text-gray-600 mb-3 line-clamp-2">
//                         {product.description}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <span className="text-lg font-bold text-[#b07d52]">
//                             ${product.price}
//                           </span>
//                           <div className="flex gap-2 mt-2">
//                             <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                               {product.roast_level}
//                             </span>
//                             <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//                               {product.origin_country}
//                             </span>
//                           </div>
//                         </div>
//                         <button className="px-4 py-2 bg-[#b07d52] text-white rounded-lg hover:bg-[#946743] transition">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Featured Equipment */}
//             {equipmentProducts.length > 0 && (
//               <div>
//                 <h3 className="text-2xl font-semibold mb-8 text-amber-800 flex items-center gap-2">
//                   <span>⚙️</span> Featured Equipment
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {equipmentProducts
//                     .slice(0, 3)
//                     .map((product: EquipmentProduct) => (
//                       <div
//                         key={product.id}
//                         className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
//                           {product.image_url ? (
//                             <img
//                               src={product.image_url}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div className="text-gray-400 text-center">
//                               <div className="text-4xl mb-2">⚙️</div>
//                               <div className="text-sm">Equipment Image</div>
//                             </div>
//                           )}
//                         </div>
//                         <h3 className="text-xl font-semibold mb-2">
//                           {product.name}
//                         </h3>
//                         <p className="text-gray-600 mb-3 line-clamp-2">
//                           {product.description}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <span className="text-lg font-bold text-[#b07d52]">
//                               ${product.price}
//                             </span>
//                             <div className="mt-2">
//                               <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
//                                 {product.category}
//                               </span>
//                             </div>
//                           </div>
//                           <button className="px-4 py-2 bg-[#b07d52] text-white rounded-lg hover:bg-[#946743] transition">
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* If no data loaded, show static content for Google */}
//             {coffeeProducts.length === 0 && equipmentProducts.length === 0 && (
//               <div className="mb-12">
//                 <h3 className="text-2xl font-semibold mb-6">
//                   Our Product Collection
//                 </h3>
//                 <div className="space-y-4">
//                   <p>
//                     Discover premium coffee beans from top roasters worldwide
//                     and professional brewing equipment for every skill level.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="border rounded-lg p-6">
//                       <h4 className="text-lg font-semibold mb-3">
//                         Coffee Beans
//                       </h4>
//                       <ul className="space-y-2 text-gray-600">
//                         <li>
//                           • Blue Bottle - Ethiopian single-origin - $24.99
//                         </li>
//                         <li>• Intelligentsia - Black Cat Espresso - $22.99</li>
//                         <li>• Stumptown - Hair Bender Blend - $21.99</li>
//                         <li>• Method Coffee - Colombia Huila - $23.99</li>
//                       </ul>
//                     </div>
//                     <div className="border rounded-lg p-6">
//                       <h4 className="text-lg font-semibold mb-3">
//                         Brewing Equipment
//                       </h4>
//                       <ul className="space-y-2 text-gray-600">
//                         <li>• Baratza Encore Grinder - $169.99</li>
//                         <li>• Fellow Stagg Kettle - $89.99</li>
//                         <li>• Breville Bambino Plus - $499.99</li>
//                         <li>• Hario V60 - $24.99</li>
//                         <li>• Chemex Brewer - $49.99</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Call to Action */}
//             <div className="text-center mt-16 pt-8 border-t">
//               <h3 className="text-2xl font-bold mb-4 text-gray-900">
//                 Ready to Explore Our Full Collection?
//               </h3>
//               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                 Browse our complete selection with advanced filters, search, and
//                 interactive features below.
//               </p>
//               <div className="text-sm text-gray-500 mb-2">
//                 ↓ Interactive catalog loads below ↓
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CLIENT-ONLY INTERACTIVE CATALOG */}
//         <section className="border-t">
//           <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
//               Interactive Product Catalog
//             </h2>
//             <p className="text-gray-600 text-center mb-8">
//               Use filters, search, and sorting to find your perfect products
//             </p>

//             <ClientOnly
//               fallback={
//                 <div className="text-center py-12">
//                   <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b07d52] mb-4"></div>
//                   <p className="text-gray-600">
//                     Loading interactive catalog...
//                   </p>
//                 </div>
//               }
//             >
//               <ProductsClient />
//             </ClientOnly>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Products;

///////////////////////////////serach google solution2:
import React from "react";
import { ClientOnly } from "~/components/ClientOnly";
import ProductsClient from "~/components/productsClient";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Curated Coffee Roasters & Brewing Gear | BrewTopia Collection" },
    {
      name: "description",
      content:
        "Blue Bottle, Intelligentsia, Stumptown, Method Coffee roasters + Baratza, Fellow, Breville, Hario, Chemex equipment. Complete coffee setup from top brands.",
    },
    { name: "author", content: "BrewTopia" },

    // Open Graph - YOUR IMAGE WORKS!
    {
      property: "og:title",
      content: "Top Coffee Brands & Equipment | BrewTopia Collection",
    },
    {
      property: "og:description",
      content:
        "From Blue Bottle beans to Baratza grinders - we've curated the perfect coffee ecosystem.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://coffee-khaki-seven.vercel.app/products",
    },
    {
      property: "og:image",
      content: "https://coffee-khaki-seven.vercel.app/products.jpg",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "BrewTopia" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Coffee Brands & Equipment Collection | BrewTopia",
    },
    {
      name: "twitter:description",
      content:
        "Blue Bottle ☕ Baratza ⚙️ Fellow ♨️ - All your favorite coffee brands in one place!",
    },
    {
      name: "twitter:image",
      content: "https://coffee-khaki-seven.vercel.app/products.jpg",
    },
    { name: "twitter:site", content: "@brewtpia" },
  ];
}

const Products = () => {
  return (
    <>
      {/* ========== CONTENT FOR GOOGLE ========== */}
      {/* This renders on server, Google sees it immediately */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Premium Coffee Products Collection
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover specialty coffee beans from world-renowned roasters and
          professional brewing equipment for every skill level.
        </p>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">☕</span> Coffee Beans
            </h2>
            <p className="text-gray-600 mb-4">
              Single-origin, blends, espresso, light to dark roast. Fresh
              roasted weekly.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Blue Bottle Coffee</span>
                <span className="text-[#b07d52] font-bold">$24.99</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Intelligentsia Black Cat</span>
                <span className="text-[#b07d52] font-bold">$22.99</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Stumptown Hair Bender</span>
                <span className="text-[#b07d52] font-bold">$21.99</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> Brewing Equipment
            </h2>
            <p className="text-gray-600 mb-4">
              Grinders, kettles, brewers, scales & accessories from top brands.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Baratza Encore Grinder</span>
                <span className="text-[#b07d52] font-bold">$169.99</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Fellow Stagg Kettle</span>
                <span className="text-[#b07d52] font-bold">$89.99</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Hario V60 Dripper</span>
                <span className="text-[#b07d52] font-bold">$24.99</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Why Choose BrewTopia?</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Fresh roasted coffee beans delivered weekly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Professional equipment with manufacturer warranties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Worldwide shipping available</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Expert advice and brewing guides included</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 text-center">
          Price range: $15 - $500. All products available for shipping
          worldwide.
        </p>
      </main>
      {/* ========== END CONTENT FOR GOOGLE ========== */}

      {/* ========== INTERACTIVE SECTION ========== */}
      {/* This loads client-side only, Google won't index it */}
      <section className="border-t mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Interactive Product Catalog
            </h2>
            <p className="text-gray-600">
              Use filters, search, and sorting to explore our full collection
            </p>
          </div>

          <ClientOnly
            fallback={
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b07d52] mb-4"></div>
                <p className="text-gray-600">Loading interactive catalog...</p>
              </div>
            }
          >
            <ProductsClient />
          </ClientOnly>
        </div>
      </section>
    </>
  );
};

export default Products;
