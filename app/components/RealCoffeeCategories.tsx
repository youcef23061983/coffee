// components/RealCoffeeCategories.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "~/supabase_client";

interface CoffeeCategory {
  name: string;
  count: number;
  color: string;
  description?: string;
}

export default function RealCoffeeCategories() {
  const [categories, setCategories] = useState<CoffeeCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoffeeCategories();
  }, []);

  const fetchCoffeeCategories = async () => {
    try {
      // Fetch coffee products with their roast levels and origins
      const { data: coffeeProducts, error } = await supabase
        .from("coffee_products")
        .select("roast_level, origin_country, process_method, flavor_profile")
        .eq("in_stock", true);

      if (error) throw error;

      // Analyze and categorize the coffee data
      const analyzedCategories = analyzeCoffeeData(coffeeProducts || []);
      setCategories(analyzedCategories);
    } catch (error) {
      console.error("Error fetching coffee categories:", error);
      // Fallback to default categories if there's an error
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const analyzeCoffeeData = (coffees: any[]): CoffeeCategory[] => {
    const categories: CoffeeCategory[] = [];

    // Count by roast level
    const roastCounts: { [key: string]: number } = {};
    const originCounts: { [key: string]: number } = {};
    const processCounts: { [key: string]: number } = {};
    const flavorCounts: { [key: string]: number } = {};

    coffees.forEach((coffee) => {
      // Roast levels
      roastCounts[coffee.roast_level] =
        (roastCounts[coffee.roast_level] || 0) + 1;

      // Origins (group similar ones)
      if (coffee.origin_country && coffee.origin_country !== "Blend") {
        originCounts[coffee.origin_country] =
          (originCounts[coffee.origin_country] || 0) + 1;
      }

      // Process methods
      if (coffee.process_method) {
        processCounts[coffee.process_method] =
          (processCounts[coffee.process_method] || 0) + 1;
      }

      // Flavor profiles
      if (coffee.flavor_profile) {
        coffee.flavor_profile.forEach((flavor: string) => {
          flavorCounts[flavor] = (flavorCounts[flavor] || 0) + 1;
        });
      }
    });

    // Create categories based on actual data
    if (Object.keys(roastCounts).length > 0) {
      Object.entries(roastCounts).forEach(([roast, count]) => {
        const color = getRoastColor(roast);
        categories.push({
          name: `${roast.charAt(0).toUpperCase() + roast.slice(1)} Roast`,
          count,
          color,
          description: getRoastDescription(roast),
        });
      });
    }

    // Add top origins
    const topOrigins = Object.entries(originCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);

    topOrigins.forEach(([origin, count]) => {
      categories.push({
        name: `${origin} Origin`,
        count,
        color: "from-amber-500 to-orange-600",
        description: `Single-origin from ${origin}`,
      });
    });

    // Add top process methods
    const topProcesses = Object.entries(processCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);

    topProcesses.forEach(([process, count]) => {
      categories.push({
        name: `${process.charAt(0).toUpperCase() + process.slice(1)} Process`,
        count,
        color: "from-green-500 to-emerald-600",
        description: `${process} processed beans`,
      });
    });

    // Add popular flavor profiles
    const topFlavors = Object.entries(flavorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);

    topFlavors.forEach(([flavor, count]) => {
      categories.push({
        name: `${flavor.charAt(0).toUpperCase() + flavor.slice(1)} Notes`,
        count,
        color: "from-purple-500 to-pink-600",
        description: `Featuring ${flavor} flavor notes`,
      });
    });

    return categories.slice(0, 6); // Limit to 6 categories
  };

  const getRoastColor = (roast: string): string => {
    const colors: { [key: string]: string } = {
      light: "from-yellow-400 to-amber-500",
      medium: "from-amber-500 to-orange-500",
      dark: "from-brown-600 to-gray-800",
      espresso: "from-gray-700 to-gray-900",
    };
    return colors[roast] || "from-blue-500 to-blue-600";
  };

  const getRoastDescription = (roast: string): string => {
    const descriptions: { [key: string]: string } = {
      light: "Bright & complex",
      medium: "Balanced & sweet",
      dark: "Bold & intense",
      espresso: "Rich & creamy",
    };
    return descriptions[roast] || "Specialty coffee";
  };

  const getDefaultCategories = (): CoffeeCategory[] => {
    return [
      {
        name: "Light Roast",
        count: 25,
        color: "from-yellow-400 to-amber-500",
        description: "Bright & complex",
      },
      {
        name: "Medium Roast",
        count: 45,
        color: "from-amber-500 to-orange-500",
        description: "Balanced & sweet",
      },
      {
        name: "Dark Roast",
        count: 30,
        color: "from-brown-600 to-gray-800",
        description: "Bold & intense",
      },
      {
        name: "Ethiopian Origin",
        count: 15,
        color: "from-amber-500 to-orange-600",
        description: "Floral & fruity",
      },
      {
        name: "Washed Process",
        count: 60,
        color: "from-green-500 to-emerald-600",
        description: "Clean & bright",
      },
      {
        name: "Chocolate Notes",
        count: 35,
        color: "from-purple-500 to-pink-600",
        description: "Rich & smooth",
      },
    ];
  };

  if (loading) {
    return <CategoriesLoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`bg-linear-to-br ${category.color} text-white rounded-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}
        >
          <h3 className="font-bold text-lg mb-2">{category.name}</h3>
          <p className="text-2xl font-bold mb-1">{category.count}+</p>
          <p className="text-xs opacity-90">{category.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Loading skeleton component
export function CategoriesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded-xl p-6 text-center animate-pulse"
        >
          <div className="h-6 bg-gray-400 rounded mb-2"></div>
          <div className="h-8 bg-gray-400 rounded mb-1"></div>
          <div className="h-4 bg-gray-400 rounded"></div>
        </div>
      ))}
    </div>
  );
}
