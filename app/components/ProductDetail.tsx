// app/components/ProductDetail.tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductDetailProps {
  product: any;
  type: "coffee" | "equipment";
  error?: string;
}

export default function ProductDetail({
  product,
  type,
  error,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ☕
          </motion.div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const isCoffee = type === "coffee";
  const images = product.image_url
    ? [product.image_url]
    : ["/placeholder-coffee.jpg"];

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-amber-900 to-orange-900">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/detail.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mrs-saint-delafield-regular text-4xl md:text-6xl font-bold mb-4"
          >
            {product.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90"
          >
            {product.brands?.name || "Premium Quality"}
          </motion.p>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.in_stock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Out of Stock
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-amber-500"
                          : "border-gray-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Brand & Price */}
              <div>
                <h2 className="text-2xl font-bold text-amber-800 mb-2">
                  {product.brands?.name}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.in_stock ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      In Stock ✓
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Specific Details */}
              {isCoffee ? (
                <CoffeeDetails product={product} />
              ) : (
                <EquipmentDetails product={product} />
              )}

              {/* Add to Cart Section */}
              {product.in_stock && (
                <AddToCartSection
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  onAddToCart={handleAddToCart}
                />
              )}

              {/* Additional Info */}
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <span>🚚 Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>↩️ 30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞 Customer support available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Coffee-specific details component
function CoffeeDetails({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 gap-4 p-6 bg-white/80 rounded-xl border border-amber-200"
    >
      <div>
        <h4 className="font-semibold text-amber-900 mb-2">☕ Coffee Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Roast Level:</span>
            <span className="font-semibold capitalize">
              {product.roast_level}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Origin:</span>
            <span className="font-semibold">{product.origin_country}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Process:</span>
            <span className="font-semibold capitalize">
              {product.process_method}
            </span>
          </div>
          {product.altitude && (
            <div className="flex justify-between">
              <span className="text-gray-600">Altitude:</span>
              <span className="font-semibold">{product.altitude}m</span>
            </div>
          )}
        </div>
      </div>

      {product.flavor_profile && product.flavor_profile.length > 0 && (
        <div>
          <h4 className="font-semibold text-amber-900 mb-2">
            🎯 Flavor Profile
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.flavor_profile.map((flavor: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
              >
                {flavor}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Equipment-specific details component
function EquipmentDetails({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 gap-4 p-6 bg-white/80 rounded-xl border border-amber-200"
    >
      <div>
        <h4 className="font-semibold text-amber-900 mb-2">
          ⚙️ Equipment Details
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-semibold capitalize">{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Skill Level:</span>
            <span className="font-semibold capitalize">
              {product.skill_level}
            </span>
          </div>
        </div>
      </div>

      {product.recommended_for && product.recommended_for.length > 0 && (
        <div>
          <h4 className="font-semibold text-amber-900 mb-2">
            🎯 Recommended For
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.recommended_for.map((useCase: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Add to Cart component
function AddToCartSection({
  product,
  quantity,
  setQuantity,
  onAddToCart,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-6 bg-white/80 rounded-xl border border-amber-200 space-y-4"
    >
      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-900">Quantity:</label>
        <div className="flex items-center gap-2">
          <motion.button
            className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </motion.button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <motion.button
            className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </motion.button>
        </div>
      </div>

      <motion.button
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-lg shadow-lg"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddToCart}
      >
        Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
      </motion.button>
    </motion.div>
  );
}
