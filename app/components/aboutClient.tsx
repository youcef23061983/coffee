import { motion } from "framer-motion";
import {
  FaSeedling,
  FaGlobeAmericas,
  FaHeart,
  FaAward,
  FaHeadset,
} from "react-icons/fa";

const AboutClient = () => {
  const navigate = () => {
    window.location.href = "/products";
  };
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
            className="mrs-saint-delafield-regular text-4xl md:text-6xl font-bold mb-6"
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
      <div className="min-h-screen bg-linear-to-b from-amber-50/20 to-brown-900/10 py-12 px-4">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-brown-900 mb-6">
            Our <span className="text-amber-600">Story</span>
          </h1>
          <p className="text-xl text-brown-700 max-w-2xl mx-auto">
            From bean to brew, we're passionate about crafting your perfect
            coffee experience.
          </p>
        </motion.div>

        {/* Main Content with Staggered Paragraphs */}
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
            <p className="text-brown-800 text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 shadow-sm">
              Our journey began in 1991 with a simple yet profound realization:
              the world is filled with extraordinary coffee, but finding the
              perfect beans that resonate with your unique palate can feel like
              searching for treasure without a map. That's why we created{" "}
              <span className="text-amber-600 font-semibold">BrewTopia</span>
              —not just as a marketplace, but as your trusted guide in the vast
              universe of specialty coffee.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <p className="text-brown-800 text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 shadow-sm">
              We traverse the globe, from the misty highlands of Ethiopia where
              coffee was first discovered, to the volcanic soils of Guatemala,
              the lush mountains of Colombia, and the emerging terroirs of Papua
              New Guinea. Our team of coffee sommeliers and relationship
              managers work directly with{" "}
              <span className="text-amber-600 font-semibold">
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
            <p className="text-brown-800 text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 shadow-sm">
              But our mission extends beyond mere transactions. We're building a
              community of{" "}
              <span className="text-amber-600 font-semibold">
                50,000+ coffee enthusiasts
              </span>{" "}
              who share our passion for discovery. Through our personalized
              quiz, educational content, and curated selections, we help you
              understand not just what you like, but why you like
              it—transforming your morning ritual from a simple caffeine fix
              into a daily moment of mindfulness and appreciation for the craft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group"
          >
            <p className="text-brown-800 text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 shadow-sm">
              Every bag of coffee we deliver carries with it the stories of the
              hands that cultivated it, the land that nourished it, and the
              roaster who unlocked its potential. We believe that when you brew
              our coffee, you're not just making a drink—you're participating in
              a global tradition of craftsmanship that connects farmers,
              roasters, and coffee lovers in a beautiful, sustainable ecosystem.
            </p>
          </motion.div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-linear-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl border border-amber-200">
              <h3 className="text-2xl font-bold text-brown-900 mb-4 flex items-center gap-3">
                <FaHeart className="text-amber-600" /> Our Mission
              </h3>
              <p className="text-brown-700">
                To democratize specialty coffee by making world-class beans and
                professional-grade equipment accessible to every home, while
                fostering sustainable practices that support farmers and protect
                our planet.
              </p>
            </div>

            <div className="bg-linear-to-br from-brown-50 to-brown-100/50 p-8 rounded-2xl border border-brown-200">
              <h3 className="text-2xl font-bold text-brown-900 mb-4 flex items-center gap-3">
                <FaGlobeAmericas className="text-amber-600" /> Our Vision
              </h3>
              <p className="text-brown-700">
                A world where every coffee drinker becomes a conscious consumer,
                connected to the origin of their brew, equipped with the right
                tools, and inspired to make each cup a moment of genuine joy and
                connection.
              </p>
            </div>
          </div>
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
              icon: <FaHeart className="text-amber-500" />,
            },
            {
              number: "120+",
              label: "Artisan Partners",
              sublabel: "Across 25 Countries",
              icon: <FaSeedling className="text-amber-500" />,
            },
            {
              number: "1M+",
              label: "Cups Brewed",
              sublabel: "And Counting",
              icon: <FaAward className="text-amber-500" />,
            },
            {
              number: "99.8%",
              label: "Satisfaction",
              sublabel: "Customer Happiness",
              icon: <FaHeadset className="text-amber-500" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center p-6 bg-white/80 rounded-xl border border-white/20 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-amber-700 mb-2">
                {stat.number}
              </div>
              <div className="text-brown-800 font-medium text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-brown-600 text-xs">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-brown-900 mb-12">
            Why Choose <span className="text-amber-600">BrewTopia</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Curated Selection",
                description:
                  "Every product is tested and approved by our team of coffee experts.",
                icon: "☕",
              },
              {
                title: "Direct Trade",
                description:
                  "We work directly with farmers ensuring fair prices and premium quality.",
                icon: "🤝",
              },
              {
                title: "Freshness Guaranteed",
                description:
                  "All coffee is roasted to order and shipped within 48 hours.",
                icon: "⏱️",
              },
              {
                title: "Expert Support",
                description:
                  "Get brewing advice from our certified baristas via chat or call.",
                icon: "👨‍🍳",
              },
              {
                title: "Sustainable Packaging",
                description:
                  "100% compostable bags and eco-friendly shipping materials.",
                icon: "🌱",
              },
              {
                title: "Equipment Guides",
                description:
                  "Detailed tutorials to help you master your brewing equipment.",
                icon: "📚",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 transition-all duration-300 shadow-sm"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-brown-900 mb-2">{item.title}</h4>
                <p className="text-brown-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Elegant Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block">
            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: "#D97706",
                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
              onClick={() => navigate()}
            >
              Begin Your Coffee Journey
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-brown-600 mt-4 text-sm"
            >
              Your perfect brew is waiting to be discovered
            </motion.p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutClient;
