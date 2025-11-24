import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, amount, items, shipping } = location.state || {};

  console.log("🎉 Order Success Page Loaded:", { orderId, amount, items });

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/order.webp')" }}
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
            Coffee Bean Aging & Freshness Guide
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            At BrewTopia, we understand that coffee bean age significantly
            impacts flavor profile and quality. Our beans are carefully sourced
            and roasted to ensure optimal freshness. Most specialty coffees
            reach their peak flavor 3-14 days post-roasting, developing complex
            aromas while maintaining vibrant characteristics. We recommend
            consuming within 4 weeks of roast date for the best experience, as
            coffee gradually loses its nuanced flavors over time. Each product
            includes roast date information so you can make informed decisions
            about your coffee's ideal consumption window.
          </motion.p>
        </div>
      </section>
      <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-6xl mb-6 text-green-500"
          >
            ✅
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your coffee is being prepared and will
            be shipped soon.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order ID: {orderId}</p>
              <p className="text-lg font-semibold text-gray-800">
                ${amount?.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">{items} items</p>
            </div>
          )}

          <div className="space-y-4">
            <Link
              to="/products"
              className="block w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default OrderSuccess;
