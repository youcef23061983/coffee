import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "~/hooks/CartContext";
import { Link } from "react-router";

const Cart = () => {
  const { cart, total, amount, increase, decrease, remove, clearCart } =
    useCart();

  console.log("this is cart amount :", amount);
  console.log("this is cart :", cart);

  // Animation variants with proper TypeScript types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const delayedFloatingAnimation = (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative  h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/cart.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating coffee beans */}
        <motion.div
          className="absolute top-10 left-10 text-2xl opacity-70"
          animate={floatingAnimation}
        >
          ☕
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-xl opacity-60"
          animate={delayedFloatingAnimation(1)}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-1/4 text-lg opacity-50"
          animate={delayedFloatingAnimation(2)}
        >
          ✨
        </motion.div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
          >
            Your Cart
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Your coffee journey awaits! Review your selected beans, adjust
            quantities, and prepare for a delightful brewing experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="bg-amber-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-300/30">
              <span className="text-amber-200 font-semibold">
                {amount} {amount === 1 ? "Item" : "Items"}
              </span>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-300/30">
              <span className="text-green-200 font-semibold">
                {total.toFixed(2)} $
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-6"
            >
              ☕
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your coffee journey by exploring our premium selection of
              beans and equipment.
            </p>
            <Link
              to="/products"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Discover Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100"
                    >
                      <div className="p-6 flex items-center space-x-6">
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex-shrink-0 w-24 h-24 bg-amber-50 rounded-xl overflow-hidden border border-amber-200"
                        >
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-400 text-2xl">
                              ☕
                            </div>
                          )}
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-2xl font-bold text-amber-600 mb-4">
                            {(
                              (item.newPrice || item.price) * item.amount
                            ).toFixed(2)}{" "}
                            $
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => decrease(item.id)}
                              className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors"
                            >
                              −
                            </motion.button>

                            <motion.span
                              key={item.amount}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="text-lg font-semibold text-gray-700 min-w-8 text-center"
                            >
                              {item.amount}
                            </motion.span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => increase(item.id)}
                              className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-colors"
                            >
                              +
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => remove(item.id)}
                              className="ml-auto px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Clear Cart Button */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCart}
                    className="px-6 py-3 border border-red-300 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors"
                  >
                    Clear Cart
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-amber-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-amber-100">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({amount})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-800 pt-4 border-t border-amber-100">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-2xl text-amber-600"
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/shipping"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block text-center"
                  >
                    Proceed to Shipping
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-gray-500 text-sm mt-4"
                >
                  🚀 Free shipping on all orders
                </motion.p>
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
