import React from "react";
import { ClientOnly } from "~/components/ClientOnly";
import ProductsClient from "~/components/productsClient";
import type { Route } from "./+types/products";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Curated Coffee Roasters & Brewing Gear | BrewTopia Collection" },
    {
      name: "description",
      content: "Blue Bottle, Intelligentsia, Stumptown...",
    },
    { name: "author", content: "BrewTopia" },

    // Robots with all optimizations
    {
      name: "robots",
      content:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },

    // Additional SEO
    {
      name: "keywords",
      content: "coffee, roasters, equipment, Blue Bottle, Baratza",
    },
    {
      name: "canonical",
      content: "https://coffee-khaki-seven.vercel.app/products",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Top Coffee Brands & Equipment | BrewTopia Collection",
    },
    {
      property: "og:description",
      content: "From Blue Bottle beans to Baratza grinders...",
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
    { property: "og:site_name", content: "BrewTopia" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Coffee Brands & Equipment Collection | BrewTopia",
    },
    {
      name: "twitter:description",
      content: "Blue Bottle ☕ Baratza ⚙️ Fellow ♨️...",
    },
    {
      name: "twitter:image",
      content: "https://coffee-khaki-seven.vercel.app/products.jpg",
    },
    { name: "twitter:site", content: "@brewtpia" },
    { name: "twitter:creator", content: "@brewtpia" },
  ];
}

const Products = () => {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <h1>Prew Topia Premium Coffee Products Collection</h1>
        <p>
          Discover specialty coffee beans from Blue Bottle, Intelligentsia,
          Stumptown, Method Coffee and professional brewing equipment from
          Baratza, Fellow, Breville, Hario, Chemex.
        </p>
        <h2>Coffee Beans</h2>
        <p>
          Single-origin, blends, espresso, light to dark roast. Fresh roasted
          weekly.
        </p>
        <ul>
          <li>Blue Bottle Coffee - Ethiopian single-origin - $29.99</li>
          <li>Intelligentsia - Black Cat Espresso - $26.99</li>
          <li>Stumptown - Hair Bender Blend - $28.99</li>
        </ul>
        <h2>Brewing Equipment</h2>
        <p>Grinders, kettles, brewers, scales & accessories from top brands.</p>
        <ul>
          <li>Encore Conical Burr Grinder - $169.99</li>
          <li>Fellow Stagg Kettle - $5.99</li>
          <li>Hario V60 Dripper - $28.99</li>
        </ul>
      </div>
      <ClientOnly
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl animate-pulse mb-4">☕</div>
              <p className="text-amber-600">
                Preparing your coffee experience...
              </p>
            </div>
          </div>
        }
      >
        <ProductsClient />
      </ClientOnly>
    </>
  );
};

export default Products;
