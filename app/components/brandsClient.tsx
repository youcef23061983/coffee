// import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// // Define proper TypeScript interfaces
// interface Brand {
//   id: string;
//   name: string;
//   description: string;
//   logo_url?: string;
//   sustainability_rating?: number;
//   location?: string;
//   established?: string;
// }

// interface CoffeeProduct {
//   id: string;
//   name: string;
//   description: string;
//   image_url?: string;
//   price: number;
//   featured?: boolean;
//   roast_level?: string;
//   flavor_profile?: string[];
//   brand_id: string;
//   in_stock?: boolean;
// }

// interface EquipmentProduct {
//   id: string;
//   name: string;
//   description: string;
//   image_url?: string;
//   price: number;
//   featured?: boolean;
//   category?: string;
//   skill_level?: string;
//   brand_id: string;
//   in_stock?: boolean;
// }

// interface BrandsClientProps {
//   brand: Brand;
//   coffeeProducts: CoffeeProduct[];
//   equipmentProducts: EquipmentProduct[];
// }

// export default function BrandsClient({
//   brand,
//   coffeeProducts,
//   equipmentProducts,
// }: BrandsClientProps) {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("coffee");
//   const [products, setProducts] = useState<
//     (CoffeeProduct | EquipmentProduct)[]
//   >([]);
//   const [loading, setLoading] = useState(false);

//   // Update products when tab changes
//   useEffect(() => {
//     updateProductsForActiveTab();
//   }, [activeTab, coffeeProducts, equipmentProducts]);

//   const updateProductsForActiveTab = () => {
//     setLoading(true);
//     try {
//       if (activeTab === "coffee") {
//         // Use the coffee products from props, filtered for in_stock
//         const filteredCoffeeProducts = coffeeProducts.filter(
//           (product) => product.in_stock !== false
//         );
//         console.log("Filtered coffee products:", filteredCoffeeProducts);
//         setProducts(filteredCoffeeProducts);
//       } else {
//         // Use the equipment products from props, filtered for in_stock
//         const filteredEquipmentProducts = equipmentProducts.filter(
//           (product) => product.in_stock !== false
//         );
//         console.log("Filtered equipment products:", filteredEquipmentProducts);
//         setProducts(filteredEquipmentProducts);
//       }
//     } catch (error) {
//       console.error("Error updating products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate product counts from the props
//   const coffeeCount = coffeeProducts.filter(
//     (product) => product.in_stock !== false
//   ).length;

//   const equipmentCount = equipmentProducts.filter(
//     (product) => product.in_stock !== false
//   ).length;

//   // Type guard for CoffeeProduct
//   function isCoffeeProduct(
//     product: CoffeeProduct | EquipmentProduct
//   ): product is CoffeeProduct {
//     return (product as CoffeeProduct).roast_level !== undefined;
//   }

//   // Type guard for EquipmentProduct
//   function isEquipmentProduct(
//     product: CoffeeProduct | EquipmentProduct
//   ): product is EquipmentProduct {
//     return (product as EquipmentProduct).category !== undefined;
//   }

//   return (
//     <>
//       <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
//           style={{ backgroundImage: "url('/brands.jpg')" }}
//           initial={{ scale: 1.2 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5 }}
//         />
//         <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
//           <motion.h3
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.3 }}
//             className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
//           >
//             {brand.name}
//           </motion.h3>
//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed"
//           >
//             {brand.description}
//           </motion.p>
//         </div>
//       </section>

//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Brand Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl p-8 mb-8 shadow-sm border"
//           >
//             <div className="flex items-center gap-6">
//               <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
//                 {brand.logo_url ? (
//                   <img
//                     src={brand.logo_url}
//                     alt={brand.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-linear-to-br from-amber-200 to-orange-300 flex items-center justify-center text-white text-2xl font-bold">
//                     {brand.name.charAt(0)}
//                   </div>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                   {brand.name}
//                 </h1>
//                 <p className="text-gray-600 text-lg mb-4">
//                   {brand.description}
//                 </p>
//                 <div className="flex items-center gap-6 text-sm text-gray-500">
//                   <span>
//                     ★ {brand.sustainability_rating || "N/A"}/5 Sustainability
//                   </span>
//                   {brand.location && (
//                     <>
//                       <span>•</span>
//                       <span>{brand.location}</span>
//                     </>
//                   )}
//                   {brand.established && (
//                     <>
//                       <span>•</span>
//                       <span>Est. {brand.established}</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Products Tabs */}
//           <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border">
//             <div className="flex gap-4 border-b">
//               <button
//                 onClick={() => setActiveTab("coffee")}
//                 className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
//                   activeTab === "coffee"
//                     ? "border-[#8B4513] text-[#8B4513]"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Coffee Products ({coffeeCount})
//               </button>
//               <button
//                 onClick={() => setActiveTab("equipment")}
//                 className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
//                   activeTab === "equipment"
//                     ? "border-[#8B4513] text-[#8B4513]"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Equipment ({equipmentCount})
//               </button>
//             </div>
//           </div>

//           {/* Products Grid */}
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto"></div>
//               <p className="text-gray-600 mt-4">Loading products...</p>
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               {products.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all"
//                 >
//                   {/* Product Image */}
//                   <div className="h-48 bg-linear-to-br from-amber-100 to-orange-200 relative">
//                     {product.image_url ? (
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400">
//                         <span className="text-4xl">
//                           {activeTab === "coffee" ? "☕" : "⚙️"}
//                         </span>
//                       </div>
//                     )}
//                     {product.featured && (
//                       <div className="absolute top-4 left-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#8B4513] text-white">
//                           Featured
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-6">
//                     <h3 className="font-bold text-gray-900 text-lg mb-2">
//                       {product.name}
//                     </h3>

//                     {activeTab === "coffee" && isCoffeeProduct(product) && (
//                       <div className="flex items-center gap-2 mb-4">
//                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                           {product.roast_level || "Medium"} Roast
//                         </span>
//                         {product.flavor_profile?.slice(0, 2).map((flavor) => (
//                           <span
//                             key={flavor}
//                             className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize"
//                           >
//                             {flavor}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {activeTab === "equipment" &&
//                       isEquipmentProduct(product) && (
//                         <div className="flex items-center gap-2 mb-4">
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                             {product.category || "Accessory"}
//                           </span>
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {product.skill_level || "All Levels"}
//                           </span>
//                         </div>
//                       )}

//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {product.description}
//                     </p>

//                     {/* Price and Action */}
//                     <div className="flex items-center justify-between">
//                       <div className="text-2xl font-bold text-gray-900">
//                         ${product.price}
//                       </div>
//                       <button
//                         className="bg-[#8B4513] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6B3410] transition-colors"
//                         onClick={() => navigate(`/products/${product.id}`)}
//                       >
//                         Go To Detail
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {/* Empty State */}
//           {!loading && products.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-2xl">
//               <div className="text-6xl mb-4">
//                 {activeTab === "coffee" ? "☕" : "⚙️"}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No {activeTab} products found
//               </h3>
//               <p className="text-gray-600">
//                 {brand.name} doesn't have any {activeTab} products available
//                 yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// In brandsClient.tsx
// TypeScript: no declaration file for './AdvancedQRCodeGenerator' (JSX module),
// use ts-ignore to suppress the implicit any module error until a proper .d.ts is added.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No type declarations for module
import AdvancedQRCodeGenerator from "./AdvancedQRCodeGenerator";
// or if you used the simple version:
// import SimpleQRCodeGenerator from './SimpleQRCodeGenerator';
// Define proper TypeScript interfaces
interface Brand {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  sustainability_rating?: number;
  location?: string;
  established?: string;
}

interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  price: number;
  featured?: boolean;
  roast_level?: string;
  flavor_profile?: string[];
  brand_id: string;
  in_stock?: boolean;
}

interface EquipmentProduct {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  price: number;
  featured?: boolean;
  category?: string;
  skill_level?: string;
  brand_id: string;
  in_stock?: boolean;
}

interface BrandsClientProps {
  brand: Brand;
  coffeeProducts: CoffeeProduct[];
  equipmentProducts: EquipmentProduct[];
}

export default function BrandsClient({
  brand,
  coffeeProducts,
  equipmentProducts,
}: BrandsClientProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("coffee");
  const [products, setProducts] = useState<
    (CoffeeProduct | EquipmentProduct)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // Read tab parameter from URL on component mount
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "coffee" || tabParam === "equipment") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL with tab parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", tab);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  // Update products when tab changes
  useEffect(() => {
    updateProductsForActiveTab();
  }, [activeTab, coffeeProducts, equipmentProducts]);

  const updateProductsForActiveTab = () => {
    setLoading(true);
    try {
      if (activeTab === "coffee") {
        // Use the coffee products from props, filtered for in_stock
        const filteredCoffeeProducts = coffeeProducts.filter(
          (product) => product.in_stock !== false
        );
        console.log("Filtered coffee products:", filteredCoffeeProducts);
        setProducts(filteredCoffeeProducts);
      } else {
        // Use the equipment products from props, filtered for in_stock
        const filteredEquipmentProducts = equipmentProducts.filter(
          (product) => product.in_stock !== false
        );
        console.log("Filtered equipment products:", filteredEquipmentProducts);
        setProducts(filteredEquipmentProducts);
      }
    } catch (error) {
      console.error("Error updating products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate product counts from the props
  const coffeeCount = coffeeProducts.filter(
    (product) => product.in_stock !== false
  ).length;

  const equipmentCount = equipmentProducts.filter(
    (product) => product.in_stock !== false
  ).length;

  // Type guard for CoffeeProduct
  function isCoffeeProduct(
    product: CoffeeProduct | EquipmentProduct
  ): product is CoffeeProduct {
    return (product as CoffeeProduct).roast_level !== undefined;
  }

  // Type guard for EquipmentProduct
  function isEquipmentProduct(
    product: CoffeeProduct | EquipmentProduct
  ): product is EquipmentProduct {
    return (product as EquipmentProduct).category !== undefined;
  }

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/brands.jpg')" }}
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
            {brand.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {brand.description}
          </motion.p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 mb-8 shadow-sm border"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {brand.logo_url ? (
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-amber-200 to-orange-300 flex items-center justify-center text-white text-2xl font-bold">
                    {brand.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {brand.name}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {brand.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span>
                    ★ {brand.sustainability_rating || "N/A"}/5 Sustainability
                  </span>
                  {brand.location && (
                    <>
                      <span>•</span>
                      <span>{brand.location}</span>
                    </>
                  )}
                  {brand.established && (
                    <>
                      <span>•</span>
                      <span>Est. {brand.established}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <AdvancedQRCodeGenerator
                  brand={brand}
                  coffeeProducts={coffeeProducts}
                  equipmentProducts={equipmentProducts}
                />
              </div>
            </div>
          </motion.div>

          {/* Products Tabs */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border">
            <div className="flex gap-4 border-b">
              <button
                // onClick={() => setActiveTab("coffee")}
                onClick={() => handleTabChange("coffee")}
                className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === "coffee"
                    ? "border-[#8B4513] text-[#8B4513]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Coffee Products ({coffeeCount})
              </button>
              <button
                // onClick={() => setActiveTab("equipment")}
                onClick={() => handleTabChange("equipment")}
                className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === "equipment"
                    ? "border-[#8B4513] text-[#8B4513]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Equipment ({equipmentCount})
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-linear-to-br from-amber-100 to-orange-200 relative">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl">
                          {activeTab === "coffee" ? "☕" : "⚙️"}
                        </span>
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#8B4513] text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {product.name}
                    </h3>

                    {activeTab === "coffee" && isCoffeeProduct(product) && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.roast_level || "Medium"} Roast
                        </span>
                        {product.flavor_profile?.slice(0, 2).map((flavor) => (
                          <span
                            key={flavor}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>
                    )}

                    {activeTab === "equipment" &&
                      isEquipmentProduct(product) && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category || "Accessory"}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {product.skill_level || "All Levels"}
                          </span>
                        </div>
                      )}

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </div>
                      <button
                        className="bg-[#8B4513] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6B3410] transition-colors"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        Go To Detail
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <div className="text-6xl mb-4">
                {activeTab === "coffee" ? "☕" : "⚙️"}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No {activeTab} products found
              </h3>
              <p className="text-gray-600">
                {brand.name} doesn't have any {activeTab} products available
                yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
