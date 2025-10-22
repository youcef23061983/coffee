import { motion } from "framer-motion";
const About = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/about.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to BrewTopia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl opacity-90 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            Your journey to extraordinary coffee begins here. We're more than a
            marketplace – we're your partner in discovering the world's finest
            beans and brewing equipment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg opacity-80 space-y-2"
          >
            <p>
              📍 Based in Portland, Oregon • Serving coffee lovers worldwide
            </p>
            <p>🌱 100% Sustainable Sourcing • 🤝 120+ Partner Roasters</p>
            <p>⭐ 50,000+ Customers • 🚚 Free Shipping Over $50</p>
          </motion.div>
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.3 }}
        className="space-y-8 max-w-4xl mx-auto mt-3"
      >
        {/* Paragraphs with clean animations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="group"
        >
          <p className="text-brown text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300">
            Our journey began in 2018 with a simple yet profound realization:
            the world is filled with extraordinary coffee, but finding the
            perfect beans that resonate with your unique palate can feel like
            searching for treasure without a map. That's why we created{" "}
            <span className="text-amber-300 font-semibold">BrewTopia</span>—not
            just as a marketplace, but as your trusted guide in the vast
            universe of specialty coffee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group"
        >
          <p className="text-brown text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300">
            We traverse the globe, from the misty highlands of Ethiopia where
            coffee was first discovered, to the volcanic soils of Guatemala, the
            lush mountains of Colombia, and the emerging terroirs of Papua New
            Guinea. Our team of coffee sommeliers and relationship managers work
            directly with{" "}
            <span className="text-amber-300 font-semibold">
              over 120 family-owned farms and artisanal roasters
            </span>
            , ensuring every bean meets our rigorous standards for quality,
            sustainability, and ethical sourcing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group"
        >
          <p className="text-brown text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300">
            But our mission extends beyond mere transactions. We're building a
            community of{" "}
            <span className="text-amber-300 font-semibold">
              50,000+ coffee enthusiasts
            </span>{" "}
            who share our passion for discovery. Through our personalized quiz,
            educational content, and curated selections, we help you understand
            not just what you like, but why you like it—transforming your
            morning ritual from a simple caffeine fix into a daily moment of
            mindfulness and appreciation for the craft.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="group"
        >
          <p className="text-brown text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300">
            Every bag of coffee we deliver carries with it the stories of the
            hands that cultivated it, the land that nourished it, and the
            roaster who unlocked its potential. We believe that when you brew
            our coffee, you're not just making a drink—you're participating in a
            global tradition of craftsmanship that connects farmers, roasters,
            and coffee lovers in a beautiful, sustainable ecosystem.
          </p>
        </motion.div>
      </motion.div>

      {/* Clean Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
      >
        {[
          {
            number: "50K+",
            label: "Coffee Enthusiasts",
            sublabel: "Joined Our Journey",
          },
          {
            number: "120+",
            label: "Artisan Partners",
            sublabel: "Across 25 Countries",
          },
          { number: "1M+", label: "Cups Brewed", sublabel: "And Counting" },
          {
            number: "99.8%",
            label: "Satisfaction",
            sublabel: "Customer Happiness",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.number}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl md:text-3xl font-bold text-amber-300 mb-2">
              {stat.number}
            </div>
            <div className="text-brown font-medium text-sm mb-1">
              {stat.label}
            </div>
            <div className="text-brown/60 text-xs">{stat.sublabel}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Elegant Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-block">
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(245, 158, 11, 0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
          >
            Begin Your Coffee Journey
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-white/70 mt-4 text-sm"
          >
            Your perfect brew is waiting to be discovered
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default About;
