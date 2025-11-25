import { supabase } from "~/supabase_client";
import type { Route } from "./+types/brands";
import { ClientOnly } from "~/components/ClientOnly";
import BrandsClient from "~/components/brandsClient";
export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.brand) {
    return [
      { title: "Brand Not Found | BrewTopia" },
      { name: "robots", content: "noindex" },
    ];
  }

  const { brand, coffeeProducts, equipmentProducts } = loaderData;
  const totalProducts = coffeeProducts.length + equipmentProducts.length;

  return [
    {
      title: `Shop ${brand.name} | ${totalProducts} Premium Coffee Products | BrewTopia`,
    },
    {
      name: "description",
      content: `Discover ${brand.name}'s complete collection - ${coffeeProducts.length} artisan coffees and ${equipmentProducts.length} brewing equipment items. ${brand.description} ${brand.sustainability_rating ? `Sustainability rating: ${brand.sustainability_rating}/5.` : ""} Free shipping available.`,
    },
    { name: "author", content: brand.name },

    // Open Graph
    { property: "og:title", content: `${brand.name} Collection | BrewTopia` },
    {
      property: "og:description",
      content: `Your complete ${brand.name} coffee experience. ${coffeeProducts.length > 0 ? `${coffeeProducts.length} premium beans` : ""}${coffeeProducts.length > 0 && equipmentProducts.length > 0 ? " & " : ""}${equipmentProducts.length > 0 ? `${equipmentProducts.length} brewing tools` : ""}. Fresh roasted, expertly curated.`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://coffee-khaki-seven.vercel.app/brands/${brand.id}`,
    },
    {
      property: "og:image",
      content:
        brand.logo_url || "https://coffee-khaki-seven.vercel.app/brands.jpg",
    },
    { property: "og:site_name", content: "BrewTopia" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${brand.name} | Complete Collection` },
    {
      name: "twitter:description",
      content: `Explore ${totalProducts} premium products from ${brand.name}. ${coffeeProducts.length} coffees ☕ ${equipmentProducts.length > 0 ? `& ${equipmentProducts.length} equipment items ⚙️` : ""}. Shop now!`,
    },
    {
      name: "twitter:image",
      content:
        brand.logo_url || "https://coffee-khaki-seven.vercel.app/brands.jpg",
    },
    { name: "twitter:site", content: "@brewtpia" },

    { name: "robots", content: "index, follow" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { brandId } = params;

  if (!brandId) {
    return { error: "Brand ID is required" };
  }

  try {
    const { data: brandData, error } = await supabase
      .from("brands")
      .select(
        `
        *,
        coffee_products(*),
        equipment_products(*)
      `
      )
      .eq("id", brandId)
      .single();

    if (error) {
      return { error: "Brand not found" };
    }

    return {
      brand: brandData,
      coffeeProducts: brandData.coffee_products || [],
      equipmentProducts: brandData.equipment_products || [],
    };
  } catch (error) {
    return { error: "Failed to load brand data" };
  }
}
export default function brands({ loaderData }: Route.ComponentProps) {
  const { brand, coffeeProducts, equipmentProducts, error } = loaderData;

  if (error || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Brand Not Found</h1>
          <p className="text-gray-600">
            {error || "This brand does not exist."}
          </p>
        </div>
      </div>
    );
  }

  // Use ClientOnly wrapper for the interactive component
  return (
    <ClientOnly fallback={<BrandsLoadingSkeleton />}>
      <BrandsClient
        brand={brand}
        coffeeProducts={coffeeProducts}
        equipmentProducts={equipmentProducts}
      />
    </ClientOnly>
  );
}

// Simple loading skeleton
function BrandsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
