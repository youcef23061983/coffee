import { motion } from "framer-motion";

const Cart = () => {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/cart.jpg')" }}
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
            Cart
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Your coffee journey awaits! Review your selected beans, adjust
            quantities, and prepare for a delightful brewing experience. Every
            bag in your cart is freshly roasted and carefully sourced to bring
            exceptional flavor to your cup.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Cart;
