import React from "react";
import { ClientOnly } from "~/components/ClientOnly";
import CoffeeQuizPage from "~/components/quizClient";
import type { Route } from "./+types/quiz";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find Your Perfect Coffee Match | BrewTopia Coffee Quiz" },
    {
      name: "description",
      content:
        "Take our 2-minute coffee quiz and get personalized coffee & equipment recommendations. Discover beans that match your taste, brew method, and experience level. No more guessing!",
    },
    { name: "author", content: "BrewTopia" },
    {
      name: "keywords",
      content:
        "coffee quiz, coffee recommendations, personalized coffee, find my coffee, brew method quiz, coffee taste test, bean recommendation",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Find Your Perfect Coffee Match | BrewTopia Quiz ☕",
    },
    {
      property: "og:description",
      content:
        "Stop guessing, start enjoying! Our 2-minute quiz matches you with perfect coffees and equipment based on your unique taste preferences. Get personalized results instantly.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://coffee-khaki-seven.vercel.app/quiz",
    },
    {
      property: "og:image",
      content: "https://coffee-khaki-seven.vercel.app/quiz.jpg",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "BrewTopia" },
    { property: "og:locale", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Find Your Coffee Soulmate ☕ | BrewTopia Quiz",
    },
    {
      name: "twitter:description",
      content:
        "2 minutes = Your perfect coffee match! Take our quiz and discover beans & equipment tailored to your taste. No more coffee disappointment! ✨",
    },
    {
      name: "twitter:image",
      content: "https://coffee-khaki-seven.vercel.app/quiz.jpg",
    },
    { name: "twitter:site", content: "@brewtpia" },
    { name: "twitter:creator", content: "@brewtpia" },

    // Essential Meta
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#7C5434" },
  ];
}

const About = () => {
  return (
    <>
      <ClientOnly fallback={<p>Loading client...</p>}>
        <CoffeeQuizPage />
      </ClientOnly>
    </>
  );
};

export default About;
