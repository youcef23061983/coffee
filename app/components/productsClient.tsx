import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { supabase } from "~/supabase_client";

// Type definitions
interface CoffeeProduct {
  id: string;
  brand_id: string;
  name: string;
  description: string;
  roast_level: string;
  flavor_profile: string[] | null;
  origin_country: string;
  process_method: string;
  altitude: number | null;
  price: string;
  weight_grams: number;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  brands?: {
    name: string;
  };
}

interface EquipmentProduct {
  id: string;
  brand_id: string;
  category: string;
  name: string;
  description: string;
  specifications: any;
  price: string;
  in_stock: boolean;
  recommended_for: string[] | null;
  skill_level: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  brands?: {
    name: string;
  };
}

type Product =
  | (CoffeeProduct & { product_type: "coffee"; brand_name?: string })
  | (EquipmentProduct & { product_type: "equipment"; brand_name?: string });

interface Filters {
  productType: string | null;
  priceRange: string | null;
  inStock: boolean;
  roastLevel: string | null;
  originCountry: string | null;
  equipmentCategory: string | null;
  skillLevel: string | null;
  brand: string | null;
  sortBy: string;
}

// Type guards
const isCoffeeProduct = (
  product: Product
): product is CoffeeProduct & {
  product_type: "coffee";
  brand_name?: string;
} => {
  return product.product_type === "coffee";
};

const isEquipmentProduct = (
  product: Product
): product is EquipmentProduct & {
  product_type: "equipment";
  brand_name?: string;
} => {
  return product.product_type === "equipment";
};

const ProductsClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    productType: null,
    priceRange: null,
    inStock: true,
    roastLevel: null,
    originCountry: null,
    equipmentCategory: null,
    skillLevel: null,
    brand: null,
    sortBy: "name",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Refs for scroll animations
  const searchSectionRef = useRef(null);

  // Simple data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching products from Supabase...");

        // Fetch coffee products
        const { data: coffeeData, error: coffeeError } = await supabase
          .from("coffee_products")
          .select(`*, brands (name)`);

        if (coffeeError) {
          console.error("❌ Coffee fetch error:", coffeeError);
          throw coffeeError;
        }

        // Fetch equipment products
        const { data: equipmentData, error: equipmentError } = await supabase
          .from("equipment_products")
          .select(`*, brands (name)`);

        if (equipmentError) {
          console.error("❌ Equipment fetch error:", equipmentError);
          throw equipmentError;
        }

        console.log("📦 Coffee data:", coffeeData?.length || 0);
        console.log("📦 Equipment data:", equipmentData?.length || 0);

        // Combine and format products
        const combinedProducts: Product[] = [
          ...(coffeeData || []).map((product) => ({
            ...product,
            product_type: "coffee" as const,
            brand_name: product.brands?.name,
          })),
          ...(equipmentData || []).map((product) => ({
            ...product,
            product_type: "equipment" as const,
            brand_name: product.brands?.name,
          })),
        ];

        console.log("✅ Total products loaded:", combinedProducts.length);

        setProducts(combinedProducts);
        setFilteredProducts(combinedProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        // Set empty arrays on error
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // Simple filtering
  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];

      console.log("🔍 FILTERING DEBUG:");
      console.log("Initial products:", products.length);
      console.log("Current filters:", filters);
      console.log("Search query:", searchQuery);

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((product) => {
          const basicMatch =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.brand_name?.toLowerCase().includes(query);

          if (basicMatch) return true;

          // Coffee-specific searches
          if (isCoffeeProduct(product)) {
            return (
              product.roast_level.toLowerCase().includes(query) ||
              product.origin_country.toLowerCase().includes(query) ||
              product.process_method.toLowerCase().includes(query) ||
              product.flavor_profile?.some((flavor) =>
                flavor.toLowerCase().includes(query)
              ) ||
              false
            );
          }

          // Equipment-specific searches
          if (isEquipmentProduct(product)) {
            return (
              product.category.toLowerCase().includes(query) ||
              product.skill_level.toLowerCase().includes(query) ||
              product.recommended_for?.some((useCase) =>
                useCase.toLowerCase().includes(query)
              ) ||
              false
            );
          }

          return false;
        });
        console.log("After search:", filtered.length);
      }

      // Product type filter
      if (filters.productType) {
        filtered = filtered.filter(
          (product) => product.product_type === filters.productType
        );
        console.log("After product type:", filtered.length);
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        filtered = filtered.filter((product) => {
          const price = parseFloat(product.price);
          return price >= min && price <= max;
        });
        console.log("After price range:", filtered.length);
      }

      // In stock filter
      if (filters.inStock) {
        filtered = filtered.filter((product) => product.in_stock);
        console.log("After in stock:", filtered.length);
      }

      // Coffee-specific filters
      if (filters.productType === "coffee") {
        if (filters.roastLevel) {
          filtered = filtered.filter(
            (product) =>
              isCoffeeProduct(product) &&
              product.roast_level === filters.roastLevel
          );
          console.log("After roast level:", filtered.length);
        }
        if (filters.originCountry) {
          filtered = filtered.filter(
            (product) =>
              isCoffeeProduct(product) &&
              product.origin_country === filters.originCountry
          );
          console.log("After origin:", filtered.length);
        }
      }

      // Equipment-specific filters
      if (filters.productType === "equipment") {
        if (filters.equipmentCategory) {
          filtered = filtered.filter(
            (product) =>
              isEquipmentProduct(product) &&
              product.category === filters.equipmentCategory
          );
          console.log("After category:", filtered.length);
        }
        if (filters.skillLevel) {
          filtered = filtered.filter(
            (product) =>
              isEquipmentProduct(product) &&
              product.skill_level === filters.skillLevel
          );
          console.log("After skill level:", filtered.length);
        }
      }

      // Sort products
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return parseFloat(a.price) - parseFloat(b.price);
          case "price_desc":
            return parseFloat(b.price) - parseFloat(a.price);
          case "name":
          default:
            return a.name.localeCompare(b.name);
        }
      });

      console.log("Final filtered products:", filtered.length);
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filters, products, searchQuery]);
  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({
      productType: null,
      priceRange: null,
      inStock: true,
      roastLevel: null,
      originCountry: null,
      equipmentCategory: null,
      skillLevel: null,
      brand: null,
      sortBy: "name",
    });
  };

  const coffeeEmojiVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
      },
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
      },
    },
  };

  <motion.div
    className="text-8xl mb-6"
    variants={coffeeEmojiVariants}
    whileHover="hover"
  >
    ☕
  </motion.div>;
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ☕
          </motion.div>
          <p className="text-xl text-gray-600">Brewing your products...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/products.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
          >
            Find Your Coffee And Equipment
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8"
          >
            Discover the perfect blend of quality and craftsmanship
          </motion.p>

          {/* Enhanced Search in Hero - More Visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                🔍
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white text-sm opacity-70">Scroll to explore</div>
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full mx-auto mt-2 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section
        ref={searchSectionRef}
        className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-b border-amber-200"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <div>
                <motion.h2
                  className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"} Found
                </motion.h2>
                {searchQuery && (
                  <motion.p
                    className="text-amber-700 mt-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Search results for "
                    <span className="text-orange-600 font-semibold">
                      {searchQuery}
                    </span>
                    "
                  </motion.p>
                )}
              </div>

              {(searchQuery || filters.productType || filters.priceRange) && (
                <motion.button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕ Clear All Filters
                </motion.button>
              )}
            </div>

            {/* Main Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Product Type */}
              <motion.div
                className="filter-group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-amber-900 mb-3">
                  ☕ Product Type
                </label>
                <select
                  value={filters.productType || ""}
                  onChange={(e) =>
                    handleFilterChange("productType", e.target.value || null)
                  }
                  className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="">All Products</option>
                  <option value="coffee">Coffee Beans</option>
                  <option value="equipment">Brewing Equipment</option>
                </select>
              </motion.div>

              {/* Price Range */}
              <motion.div
                className="filter-group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-amber-900 mb-3">
                  💰 Price Range
                </label>
                <select
                  value={filters.priceRange || ""}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value || null)
                  }
                  className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="">Any Price</option>
                  <option value="0-20">Under $20</option>
                  <option value="20-40">$20 - $40</option>
                  <option value="40-100">$40 - $100</option>
                  <option value="100-1000">$100+</option>
                </select>
              </motion.div>

              {/* Sort By */}
              <motion.div
                className="filter-group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-amber-900 mb-3">
                  🔄 Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </motion.div>

              {/* In Stock Filter - WITH TITLE */}

              <motion.div
                className="filter-group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-amber-900 mb-3">
                  📦 Stock Status
                </label>
                <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.input
                    type="checkbox"
                    id="inStock"
                    checked={filters.inStock}
                    onChange={(e) =>
                      handleFilterChange("inStock", e.target.checked)
                    }
                    className="h-5 w-5 text-amber-600 focus:ring-amber-400 border-amber-300 rounded-lg"
                    whileTap={{ scale: 0.9 }}
                  />
                  <motion.label
                    htmlFor="inStock"
                    className="ml-3 text-sm font-semibold text-amber-900 cursor-pointer select-none"
                    whileHover={{ color: "#b45309" }}
                  >
                    In Stock Only
                  </motion.label>
                </div>
              </motion.div>
            </div>

            {/* Dynamic Filters with Smooth Animations */}
            <AnimatePresence mode="wait">
              {filters.productType === "coffee" && (
                <motion.div
                  key="coffee-filters"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-amber-200 shadow-2xl"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-amber-900 mb-3">
                      🔥 Roast Level
                    </label>
                    <select
                      value={filters.roastLevel || ""}
                      onChange={(e) =>
                        handleFilterChange("roastLevel", e.target.value || null)
                      }
                      className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <option value="">All Roasts</option>
                      <option value="light">Light Roast</option>
                      <option value="medium">Medium Roast</option>
                      <option value="dark">Dark Roast</option>
                      <option value="espresso">Espresso Roast</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-amber-900 mb-3">
                      🌎 Origin Country
                    </label>
                    <select
                      value={filters.originCountry || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "originCountry",
                          e.target.value || null
                        )
                      }
                      className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <option value="">All Origins</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Blend">Blend</option>
                    </select>
                  </motion.div>
                </motion.div>
              )}

              {filters.productType === "equipment" && (
                <motion.div
                  key="equipment-filters"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-amber-200 shadow-2xl"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-amber-900 mb-3">
                      ⚙️ Equipment Category
                    </label>
                    <select
                      value={filters.equipmentCategory || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "equipmentCategory",
                          e.target.value || null
                        )
                      }
                      className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <option value="">All Categories</option>
                      <option value="brewer">Coffee Brewers</option>
                      <option value="kettle">Pour-over Kettles</option>
                      <option value="grinder">Coffee Grinders</option>
                      <option value="espresso_machine">
                        Espresso Machines
                      </option>
                      <option value="accessory">Brewing Accessories</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-amber-900 mb-3">
                      🎯 Skill Level
                    </label>
                    <select
                      value={filters.skillLevel || ""}
                      onChange={(e) =>
                        handleFilterChange("skillLevel", e.target.value || null)
                      }
                      className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <option value="">Any Skill Level</option>
                      <option value="beginner">Beginner Friendly</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert Level</option>
                    </select>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Filters Indicator */}
            {(filters.productType ||
              filters.priceRange ||
              filters.roastLevel ||
              filters.originCountry ||
              filters.equipmentCategory ||
              filters.skillLevel) && (
              <motion.div
                className="mt-6 p-4 bg-amber-100/80 backdrop-blur-sm rounded-xl border border-amber-300 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  Active Filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {filters.productType && (
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-medium">
                      {filters.productType === "coffee"
                        ? "☕ Coffee"
                        : "⚙️ Equipment"}
                    </span>
                  )}
                  {filters.priceRange && (
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
                      💰 {filters.priceRange}
                    </span>
                  )}
                  {filters.roastLevel && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                      🔥 {filters.roastLevel}
                    </span>
                  )}
                  {filters.originCountry && (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                      🌎 {filters.originCountry}
                    </span>
                  )}
                  {filters.equipmentCategory && (
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                      ⚙️ {filters.equipmentCategory}
                    </span>
                  )}
                  {filters.skillLevel && (
                    <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
                      🎯 {filters.skillLevel}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ☕
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  No products found
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {searchQuery
                    ? `No results for "${searchQuery}". Try different keywords.`
                    : "No products match your current filters."}
                </motion.p>
                <motion.button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Optional: Results count with animation */}
                <motion.div
                  className="mb-8 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Showing {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </span>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  layout
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      }}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      {/* Product Image */}
                      <motion.div
                        className="h-48 bg-gray-200 overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src={product.image_url || "/placeholder-coffee.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log(
                              "Image failed to load for:",
                              product.name
                            );
                            (e.target as HTMLImageElement).src =
                              "/placeholder-coffee.jpg";
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Stock Badge */}
                        <motion.div
                          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                            product.in_stock
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.5 + index * 0.1,
                          }}
                        >
                          {product.in_stock ? "In Stock" : "Out of Stock"}
                        </motion.div>
                      </motion.div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <motion.h3
                            className="font-bold text-lg text-gray-900 line-clamp-1"
                            whileHover={{ color: "#d97706" }}
                            transition={{ duration: 0.2 }}
                          >
                            {product.name}
                          </motion.h3>
                        </div>

                        <motion.p
                          className="text-amber-600 font-medium text-sm mb-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {product.brand_name || "No brand"}
                        </motion.p>

                        <motion.p
                          className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {product.description}
                        </motion.p>

                        {/* Product-specific details */}
                        <motion.div
                          className="flex flex-wrap gap-1 mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {isCoffeeProduct(product) && (
                            <>
                              <motion.span
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "#3b82f6",
                                  color: "white",
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {product.roast_level}
                              </motion.span>
                              <motion.span
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "#10b981",
                                  color: "white",
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {product.origin_country}
                              </motion.span>
                            </>
                          )}

                          {isEquipmentProduct(product) && (
                            <>
                              <motion.span
                                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "#8b5cf6",
                                  color: "white",
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {product.category}
                              </motion.span>
                              <motion.span
                                className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "#f59e0b",
                                  color: "white",
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {product.skill_level}
                              </motion.span>
                            </>
                          )}
                        </motion.div>

                        <motion.div
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <motion.span
                            className="text-xl font-bold text-gray-900"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            ${product.price}
                          </motion.span>
                          <motion.button
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 5px 15px rgba(245, 158, 11, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            View Details
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default ProductsClient;
