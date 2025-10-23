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
        "Blue Bottle, Intelligentsia, Stumptown, Method Coffee roasters + Baratza, Fellow, Breville, Hario, Chemex equipment. Complete coffee setup from top brands. Fresh roasted weekly.",
    },
    { name: "author", content: "BrewTopia" },

    // Open Graph
    {
      property: "og:title",
      content: "Top Coffee Brands & Equipment | BrewTopia Collection",
    },
    {
      property: "og:description",
      content:
        "From Blue Bottle beans to Baratza grinders - we've curated the perfect coffee ecosystem. Shop premium roasters & professional equipment in one trusted destination.",
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

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Coffee Brands & Equipment Collection | BrewTopia",
    },
    {
      name: "twitter:description",
      content:
        "Blue Bottle ☕ Baratza ⚙️ Fellow ♨️ - All your favorite coffee brands in one place! Complete setups from bean to brew. 🌟",
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
      <ClientOnly fallback={<p>Loading client...</p>}>
        <ProductsClient />
      </ClientOnly>
    </>
  );
};

export default Products;
