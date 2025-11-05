import { motion } from "framer-motion";
import { useCart } from "~/hooks/CartContext";

const Shipping = () => {
  const { cart, total, amount } = useCart();
  console.log("cart in shipping", cart);
  console.log("total in shipping", total);
  console.log("amount in shipping", amount);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/shipping.png')" }}
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
            Fast & Secure Shipping{" "}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8"
          >
            Your coffee journey is just a delivery away! We carefully pack and
            swiftly ship your order to ensure maximum freshness. Track your
            package every step of the way with real-time updates.{" "}
          </motion.p>

          {/* Enhanced Search in Hero - More Visible */}
        </div>
      </section>
    </>
  );
};

export default Shipping;
