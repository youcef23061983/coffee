import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/contact.jpg')" }}
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
          Contact Us
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Have questions about our products or need brewing advice? Our coffee
          experts are here to help you discover the perfect blend for your
          taste.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHeader;
