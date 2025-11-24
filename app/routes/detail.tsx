// import { supabase } from "~/supabase_client";
// import type { Route } from "./+types/detail";
// import ProductDetail from "~/components/ProductDetail";
// import { ClientOnly } from "~/components/ClientOnly";
// export function meta({ loaderData }: Route.MetaArgs) {
//   // Handle loading/error states
//   if (!loaderData || loaderData.error || !loaderData.product) {
//     return [
//       { title: "Product Not Found | BrewTopia" },
//       {
//         name: "description",
//         content:
//           "This product could not be found. Browse our collection of premium coffees and brewing equipment.",
//       },
//     ];
//   }

//   const { product, type } = loaderData;
//   const brandName = product.brands?.name || "BrewTopia";

//   // Dynamic meta based on product type
//   if (type === "coffee") {
//     return [
//       { title: `${product.name} | ${brandName} Coffee Beans | BrewTopia` },
//       {
//         name: "description",
//         content: `Discover ${product.name} ${product.roast_level} roast coffee from ${brandName}. ${product.origin_country} origin, ${product.process_method} process. ${product.description?.substring(0, 150)}...`,
//       },
//       { name: "author", content: brandName },
//       {
//         name: "keywords",
//         content: `${product.name}, ${brandName}, ${product.roast_level} roast, ${product.origin_country} coffee, ${product.process_method} process, specialty coffee beans`,
//       },

//       // Open Graph
//       {
//         property: "og:title",
//         content: `${product.name} | ${brandName} Coffee ☕`,
//       },
//       {
//         property: "og:description",
//         content: `${product.roast_level} roast from ${product.origin_country}. ${product.description?.substring(0, 100)}...`,
//       },
//       { property: "og:type", content: "product" },
//       {
//         property: "og:url",
//         content: `https://coffee-khaki-seven.vercel.app/products/${product.id}`,
//       },
//       {
//         property: "og:image",
//         content:
//           product.image_url ||
//           "https://coffee-khaki-seven.vercel.app/products.jpg",
//       },
//       { property: "og:site_name", content: "BrewTopia" },
//       { property: "product:price:amount", content: product.price },
//       { property: "product:price:currency", content: "USD" },

//       // Twitter Card
//       { name: "twitter:card", content: "summary_large_image" },
//       {
//         name: "twitter:title",
//         content: `${product.name} | ${brandName} Coffee`,
//       },
//       {
//         name: "twitter:description",
//         content: `${product.roast_level} roast from ${product.origin_country}. Discover this exceptional coffee! ☕`,
//       },
//       {
//         name: "twitter:image",
//         content:
//           product.image_url ||
//           "https://coffee-khaki-seven.vercel.app/products.jpg",
//       },

//       // Essential Meta
//       { name: "robots", content: "index, follow" },
//     ];
//   } else {
//     // Equipment product meta
//     return [
//       {
//         title: `${product.name} | ${brandName} ${product.category} | BrewTopia`,
//       },
//       {
//         name: "description",
//         content: `Shop ${product.name} ${product.category} from ${brandName}. ${product.skill_level} level equipment. ${product.description?.substring(0, 150)}...`,
//       },
//       { name: "author", content: brandName },
//       {
//         name: "keywords",
//         content: `${product.name}, ${brandName}, ${product.category}, ${product.skill_level} equipment, coffee gear, brewing tools`,
//       },

//       // Open Graph
//       {
//         property: "og:title",
//         content: `${product.name} | ${brandName} ${product.category} ⚙️`,
//       },
//       {
//         property: "og:description",
//         content: `${product.skill_level} level ${product.category}. ${product.description?.substring(0, 100)}...`,
//       },
//       { property: "og:type", content: "product" },
//       {
//         property: "og:url",
//         content: `https://coffee-khaki-seven.vercel.app/products/${product.id}`,
//       },
//       {
//         property: "og:image",
//         content:
//           product.image_url ||
//           "https://coffee-khaki-seven.vercel.app/products.jpg",
//       },
//       { property: "og:site_name", content: "BrewTopia" },
//       { property: "product:price:amount", content: product.price },
//       { property: "product:price:currency", content: "USD" },

//       // Twitter Card
//       { name: "twitter:card", content: "summary_large_image" },
//       {
//         name: "twitter:title",
//         content: `${product.name} | ${brandName} Equipment`,
//       },
//       {
//         name: "twitter:description",
//         content: `${product.skill_level} level ${product.category}. Perfect for your brewing setup! ⚙️`,
//       },
//       {
//         name: "twitter:image",
//         content:
//           product.image_url ||
//           "https://coffee-khaki-seven.vercel.app/products.jpg",
//       },

//       // Essential Meta
//       { name: "robots", content: "index, follow" },
//     ];
//   }
// }

// export async function loader({ params }: Route.LoaderArgs) {
//   const { id } = params;

//   if (!id) {
//     return { error: "Product not found." };
//   }

//   // Try to find product in both tables
//   const [coffeeResult, equipmentResult] = await Promise.all([
//     supabase
//       .from("coffee_products")
//       .select(`*, brands (name, description)`)
//       .eq("id", id)
//       .single(),
//     supabase
//       .from("equipment_products")
//       .select(`*, brands (name, description)`)
//       .eq("id", id)
//       .single(),
//   ]);

//   let product = null;
//   let type = null;

//   if (coffeeResult.data) {
//     product = coffeeResult.data;
//     type = "coffee";
//   } else if (equipmentResult.data) {
//     product = equipmentResult.data;
//     type = "equipment";
//   } else {
//     return { error: "Product not found in database." };
//   }

//   return {
//     product,
//     type,
//   };
// }

// export default function ProductDetailPage({
//   loaderData,
// }: Route.ComponentProps) {
//   // Add proper error handling and default values
//   if (!loaderData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-amber-50">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😔</div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Product Not Found
//           </h1>
//         </div>
//       </div>
//     );
//   }

//   // Ensure we have valid data before spreading
//   const { product, type, error } = loaderData;

//   if (error || !product || !type) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-amber-50">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😔</div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Product Not Found
//           </h1>
//           <p className="text-gray-600">
//             {error || "The product could not be loaded."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Now we can safely spread the data
//   return (
//     <ClientOnly fallback={<p>Loading product...</p>}>
//       <ProductDetail
//         product={product}
//         type={type as "coffee" | "equipment"}
//         error={error}
//       />
//     </ClientOnly>
//   );
// }

import { supabase } from "~/supabase_client";
import type { Route } from "./+types/detail";
import ProductDetail from "~/components/ProductDetail";
import { ClientOnly } from "~/components/ClientOnly";

export function meta({ loaderData }: Route.MetaArgs) {
  // Handle loading/error states
  if (!loaderData || loaderData.error || !loaderData.product) {
    return [
      { title: "Product Not Found | BrewTopia" },
      {
        name: "description",
        content:
          "This product could not be found. Browse our collection of premium coffees and brewing equipment.",
      },
    ];
  }

  const { product, type } = loaderData;
  const brandName = product.brands?.name || "BrewTopia";

  // Dynamic meta based on product type
  if (type === "coffee") {
    return [
      { title: `${product.name} | ${brandName} Coffee Beans | BrewTopia` },
      {
        name: "description",
        content: `Discover ${product.name} ${product.roast_level} roast coffee from ${brandName}. ${product.origin_country} origin, ${product.process_method} process. ${product.description?.substring(0, 150)}...`,
      },
      { name: "author", content: brandName },
      {
        name: "keywords",
        content: `${product.name}, ${brandName}, ${product.roast_level} roast, ${product.origin_country} coffee, ${product.process_method} process, specialty coffee beans`,
      },

      // Open Graph
      {
        property: "og:title",
        content: `${product.name} | ${brandName} Coffee ☕`,
      },
      {
        property: "og:description",
        content: `${product.roast_level} roast from ${product.origin_country}. ${product.description?.substring(0, 100)}...`,
      },
      { property: "og:type", content: "product" },
      {
        property: "og:url",
        content: `https://coffee-khaki-seven.vercel.app/products/${product.id}`,
      },
      {
        property: "og:image",
        content:
          product.image_url ||
          "https://coffee-khaki-seven.vercel.app/products.jpg",
      },
      { property: "og:site_name", content: "BrewTopia" },
      { property: "product:price:amount", content: product.price },
      { property: "product:price:currency", content: "USD" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${product.name} | ${brandName} Coffee`,
      },
      {
        name: "twitter:description",
        content: `${product.roast_level} roast from ${product.origin_country}. Discover this exceptional coffee! ☕`,
      },
      {
        name: "twitter:image",
        content:
          product.image_url ||
          "https://coffee-khaki-seven.vercel.app/products.jpg",
      },

      // Essential Meta
      { name: "robots", content: "index, follow" },
    ];
  } else {
    // Equipment product meta
    return [
      {
        title: `${product.name} | ${brandName} ${product.category} | BrewTopia`,
      },
      {
        name: "description",
        content: `Shop ${product.name} ${product.category} from ${brandName}. ${product.skill_level} level equipment. ${product.description?.substring(0, 150)}...`,
      },
      { name: "author", content: brandName },
      {
        name: "keywords",
        content: `${product.name}, ${brandName}, ${product.category}, ${product.skill_level} equipment, coffee gear, brewing tools`,
      },

      // Open Graph
      {
        property: "og:title",
        content: `${product.name} | ${brandName} ${product.category} ⚙️`,
      },
      {
        property: "og:description",
        content: `${product.skill_level} level ${product.category}. ${product.description?.substring(0, 100)}...`,
      },
      { property: "og:type", content: "product" },
      {
        property: "og:url",
        content: `https://coffee-khaki-seven.vercel.app/products/${product.id}`,
      },
      {
        property: "og:image",
        content:
          product.image_url ||
          "https://coffee-khaki-seven.vercel.app/products.jpg",
      },
      { property: "og:site_name", content: "BrewTopia" },
      { property: "product:price:amount", content: product.price },
      { property: "product:price:currency", content: "USD" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${product.name} | ${brandName} Equipment`,
      },
      {
        name: "twitter:description",
        content: `${product.skill_level} level ${product.category}. Perfect for your brewing setup! ⚙️`,
      },
      {
        name: "twitter:image",
        content:
          product.image_url ||
          "https://coffee-khaki-seven.vercel.app/products.jpg",
      },

      // Essential Meta
      { name: "robots", content: "index, follow" },
    ];
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    return { error: "Product not found." };
  }

  // Try to find product in both tables
  const [coffeeResult, equipmentResult] = await Promise.all([
    supabase
      .from("coffee_products")
      .select(`*, brands (name, description)`)
      .eq("id", id)
      .single(),
    supabase
      .from("equipment_products")
      .select(`*, brands (name, description)`)
      .eq("id", id)
      .single(),
  ]);

  let product = null;
  let type = null;

  if (coffeeResult.data) {
    // Add product_type to coffee product
    product = {
      ...coffeeResult.data,
      product_type: "coffee" as const,
    };
    type = "coffee";
  } else if (equipmentResult.data) {
    // Add product_type to equipment product
    product = {
      ...equipmentResult.data,
      product_type: "equipment" as const,
    };
    type = "equipment";
  } else {
    return { error: "Product not found in database." };
  }

  return {
    product,
    type,
  };
}

export default function ProductDetailPage({
  loaderData,
}: Route.ComponentProps) {
  // Add proper error handling and default values
  if (!loaderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  // Ensure we have valid data before spreading
  const { product, type, error } = loaderData;

  if (error || !product || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            {error || "The product could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  // Now we can safely spread the data
  return (
    <ClientOnly fallback={<p>Loading product...</p>}>
      <ProductDetail
        product={product}
        type={type as "coffee" | "equipment"}
        error={error}
      />
    </ClientOnly>
  );
}
