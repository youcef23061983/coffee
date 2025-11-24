import { motion } from "framer-motion";
import { useCart } from "~/hooks/CartContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "~/utils/stripe";
import CheckoutForm from "~/components/checkoutForm";

const Payment = () => {
  const { total, amount, cart, shipping } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (!shipping || !shipping.fullName) {
      navigate("/shipping");
      return;
    }
  }, [shipping, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/payment.jpg')" }}
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
            Secure Payment
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Complete your coffee journey with confidence. Your payment
            information is protected with bank-level encryption, ensuring a safe
            and secure checkout experience.{" "}
          </motion.p>
        </div>
      </section>
      {/* Hero Section */}

      {/* Payment Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Payment Details
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your card information to complete your purchase
              </p>

              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </motion.div>

          {/* Order Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({amount})</span>
                  <span>{total.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-xl text-green-600">
                    {total.toFixed(2)} $
                  </span>
                </div>
              </div>

              {/* Shipping Address Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Shipping to:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-800">{shipping?.fullName}</p>
                  <p className="text-sm text-gray-600">{shipping?.address}</p>
                  <p className="text-sm text-gray-600">
                    {shipping?.city}, {shipping?.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{shipping?.country}</p>
                  <p className="text-sm text-gray-600">{shipping?.fullPhone}</p>
                </div>
              </div>
            </motion.div>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">🔒 Secure Payment</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-green-300">✓</span>
                  <span>Bank-level encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-300">✓</span>
                  <span>PCI DSS compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-300">✓</span>
                  <span>Your data is protected</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-300">✓</span>
                  <span>No card details stored</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
