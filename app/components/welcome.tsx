import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import TestimonialsSection from "~/components/TestimonialsSection";
import { ClientOnly } from "./ClientOnly";
import RealCoffeeCategories, {
  CategoriesLoadingSkeleton,
} from "./RealCoffeeCategories";
import NewsdataArticles from "./NewsdataArticles";
// import TestAtricles from "./TestAtricles";
// import FetchNewsAPIArticles from "./FetchnewsAPIArticles";
interface WelcomeProps {
  data: any[]; // or use a more specific type
  brands?: any[]; // make it optional if needed
}
export function Welcome({ data, brands }: WelcomeProps) {
  console.log("data:", data);
  const navigate = useNavigate();

  async function goToBrandProducts(brandId: string) {
    // Navigate to products page with the specific brand data
    navigate(`/${brandId}`, {
      state: {
        brandId,
      },
    });
  }

  // Helper function to determine category based on content

  return (
    <>
      <section className="relative h-screen flex items-center justify-center  opacity-80">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/coffee.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
          >
            Discover Your Perfect Brew
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            From 50+ artisan roasters worldwide
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/quiz")}
            >
              Take Our 30-Second Quiz →
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Browse All Roasters
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex justify-center items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9/5</span>
            </div>
            <div>•</div>
            <div>10,000+ Happy Customers</div>
            <div>•</div>
            <div>50+ Artisan Roasters</div>
          </motion.div>
        </div>
      </section>

      <section
        className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
        style={{ backgroundImage: "url('/2.jpg')" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-600 mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-gray-600">
              Take our 30-second quiz and discover coffees perfectly matched to
              your taste
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                question: "How do you brew your coffee?",
                options: [
                  "Espresso",
                  "Pour Over",
                  "French Press",
                  "Drip",
                  "Cold Brew",
                ],
              },
              {
                step: "2",
                question: "What flavors do you enjoy?",
                options: [
                  "Chocolatey",
                  "Fruity",
                  "Nutty",
                  "Bright",
                  "Balanced",
                ],
              },
              {
                step: "3",
                question: "What's your experience level?",
                options: ["Newbie", "Enthusiast", "Expert", "Professional"],
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border"
              >
                <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {step.question}
                </h3>
                <div className="space-y-2">
                  {step.options.map((option) => (
                    <div
                      key={option}
                      className="text-sm text-gray-600 border rounded-lg px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105           
              cursor-pointer
            "
              onClick={() => navigate("/quiz")}
            >
              Start Quiz & Find Your Match →
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#b07d52]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-900 mb-4">
              Featured Artisan Roasters
            </h2>
            <p className="text-xl text-gray-900">
              Discover exceptional coffees from our curated selection of master
              roasters
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data?.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group border"
                style={{
                  backgroundImage: `url(/logo/${index}.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden bg-gray-100">
                  <img
                    alt="brand_logo"
                    src={brand.logo_url}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mb-2">
                  {brand.name}
                </h3>
                <p className="text-white text-sm mb-4 line-clamp-2">
                  {brand.description}
                </p>
                <div className="flex justify-center items-center gap-4 text-sm text-gray-50">
                  <span>★ {brand.sustainability_rating}/5</span>
                  <span>•</span>
                  <span>{brand.products_count} products</span>
                </div>
                <button
                  className="bg-white text-[#b07d52] cursor-pointer mt-2 px-3 py-1.5 rounded-lg border border-[#b07d52] hover:bg-[#b07d52] hover:text-white transition-all duration-300 ease-in-out"
                  onClick={() => goToBrandProducts(brand.id)}
                >
                  {`Go to ${brand.name}'s Products`}
                </button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer"
              onClick={() => navigate("/products")}
            >
              View All 50+ Roasters
            </button>
          </div>
        </div>
      </section>

      <section
        className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
        style={{ backgroundImage: "url('/4.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-300 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-300">
              Find exactly what you're looking for
            </p>
          </div>

          {/* <ClientOnly fallback={<CategoriesLoadingSkeleton />}> */}
          <RealCoffeeCategories />
          {/* </ClientOnly> */}
        </div>
      </section>
      <section className="py-20 bg-[#E5E4DF]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-900 mb-4">
              Join 10,000+ Coffee Lovers
            </h2>
            <p className="text-xl text-gray-900">
              Who found their perfect brew through us
            </p>
          </div>

          <TestimonialsSection />
        </div>
      </section>

      {/* <FetchNewsAPIArticles /> */}
      {/* <TestAtricles /> */}
      <NewsdataArticles />

      <section className="py-20 bg-linear-to-br from-[#8B4513] to-[#6B3410] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Join Our Coffee Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 text-gray-200"
          >
            Get weekly brewing tips, new roaster spotlights, and exclusive
            offers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
            />
            <button className="bg-white text-[#8B4513] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
              Subscribe
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-300 mt-4"
          >
            Unsubscribe anytime. We respect your privacy.
          </motion.p>
        </div>
      </section>
      {/* <section className="py-20 bg-[#FFF8F0]"> */}
      <section
        className="w-full py-20 relative bg-cover bg-center bg-no-repeat  contain-content flex justify-center items-center"
        style={{ backgroundImage: "url('/5.jpg')" }}
      >
        {" "}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Ready to Transform Your Coffee Routine?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join thousands of coffee lovers discovering better coffee every day
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/quiz")}
            >
              Find Your Perfect Match →
            </button>
            <button
              className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Browse All Coffees
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
