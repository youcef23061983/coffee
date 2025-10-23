import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome";

// Define the props type for Welcome
type WelcomeProps = {
  data: any[]; // Remove undefined
};
import { supabase } from "~/supabase_client";
import { ClientOnly } from "~/components/ClientOnly";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "BrewTopia | Premium Specialty Coffee & Professional Brewing Equipment",
    },
    {
      name: "description",
      content:
        "Discover artisan coffees from 120+ world-class roasters and precision brewing equipment. Free shipping on orders over $50. Freshly roasted beans, expert-curated gear, sustainable sourcing.",
    },
    { name: "author", content: "BrewTopia" },
    {
      name: "keywords",
      content:
        "specialty coffee, coffee beans, brewing equipment, espresso machines, coffee grinders, pour over, fresh roasted coffee, barista tools, sustainable coffee",
    },

    // Open Graph
    {
      property: "og:title",
      content: "BrewTopia | Premium Specialty Coffee & Brewing Equipment ☕",
    },
    {
      property: "og:description",
      content:
        "Your destination for exceptional coffees from top roasters and professional brewing equipment. Expert curation, sustainable sourcing 🌱, free shipping over $50.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://coffee-khaki-seven.vercel.app" },
    {
      property: "og:image",
      content: "https://coffee-khaki-seven.vercel.app/back.jpg ",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "BrewTopia" },
    { property: "og:locale", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "BrewTopia | Premium Coffee & Brewing Equipment ☕",
    },
    {
      name: "twitter:description",
      content:
        "Discover exceptional coffees from world-class roasters 🌍 and precision brewing equipment. Free shipping, expert curation, sustainable sourcing 🌱",
    },
    {
      name: "twitter:image",
      content: "https://coffee-khaki-seven.vercel.app/2.jpg",
    },
    { name: "twitter:site", content: "@brewtpia" },
    { name: "twitter:creator", content: "@brewtpia" },

    // Additional Essential Meta
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#7C5434" },
    { name: "msapplication-TileColor", content: "#7C5434" },
    { name: "format-detection", content: "telephone=no" },

    // Ecommerce Specific
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "application-name", content: "BrewTopia" },
  ];
}
export async function loader() {
  const { data, error } = await supabase
    .from("brands")
    .select(
      `
    *,
    coffee_products(*),
    equipment_products(*)
  `
    )
    .order("name");

  if (error) {
    return { error: error.message };
  }

  // Transform data to include products count
  const brandsWithProductCount = data?.map((brand) => ({
    ...brand,
    products_count: brand.coffee_products?.length || 0,
  }));

  return { data: brandsWithProductCount };
}

// export default function Home() {
export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  return (
    <ClientOnly fallback={<p>Loading brands...</p>}>
      <Welcome data={data || []} />
    </ClientOnly>
  );
}
