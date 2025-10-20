import { motion } from "framer-motion";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Navigate, useNavigate } from "react-router";
interface WelcomeProps {
  data: any[]; // or use a more specific type
  brands?: any[]; // make it optional if needed
}
// interface Products {
//   data: any[]; // or use a more specific type
//   brands?: any[]; // make it optional if needed
// }
export function Welcome({ data, brands }: WelcomeProps) {
  console.log("data:", data);
  const navigate = useNavigate();

  async function goToBrandProducts(brandId: string) {
    // Navigate to products page with the specific brand data
    navigate("/products", {
      state: {
        brandId,
      },
    });
  }
  return (
    <>
      <section className="relative h-screen flex items-center justify-center  opacity-80">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover  "
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
              onClick={() => navigate("/roasters")}
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
                    alt=""
                    src={brand.logo_url}
                    className="w-full h-full object-cover"
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
            <button className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer">
              View All 50+ Roasters
            </button>
          </div>
        </div>
      </section>
      {/* <section className="py-20 bg-[#d1c0a3]"> */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: "Single-Origin",
                count: "150+",
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "Espresso Blends",
                count: "80+",
                color: "from-red-500 to-red-600",
              },
              {
                name: "Subscription Boxes",
                count: "25+",
                color: "from-green-500 to-green-600",
              },
              {
                name: "Decaf Options",
                count: "40+",
                color: "from-purple-500 to-purple-600",
              },
              {
                name: "Cold Brew",
                count: "35+",
                color: "from-cyan-500 to-cyan-600",
              },
              {
                name: "Tea & Wellness",
                count: "60+",
                color: "from-emerald-500 to-emerald-600",
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${category.color} text-white rounded-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform shadow-lg`}
              >
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count}</p>
              </motion.div>
            ))}
          </div>
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "I finally found coffee I actually look forward to every morning! The personalized quiz matched me with three amazing roasters I'd never have discovered otherwise.",
                author: "Sarah K.",
                role: "Coffee Enthusiast",
                rating: 5,
              },
              {
                text: "As a barista, I'm picky about my beans. BrewTopia introduced me to incredible small-batch roasters that supply my cafe now. Game changer!",
                author: "Marcus T.",
                role: "Professional Barista",
                rating: 5,
              },
              {
                text: "The flexibility to skip or modify my subscription makes this perfect for my unpredictable schedule. And the coffee is exceptional every time.",
                author: "Jessica L.",
                role: "Busy Professional",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex text-yellow-400 mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="py-20 bg-white"> */}
      <section
        className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
        style={{ backgroundImage: "url('/back.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-200 mb-4">
              From The Brew Guide
            </h2>
            <p className="text-xl text-gray-200">
              Expert tips, brewing guides, and coffee education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Choose Your First Coffee Grinder",
                image: "/blog-grinder-guide.jpg",
                readTime: "5 min read",
                category: "Equipment Guide",
              },
              {
                title: "Understanding Coffee Roast Levels",
                image: "/blog-roast-guide.jpg",
                readTime: "4 min read",
                category: "Education",
              },
              {
                title: "Brewing the Perfect Pour Over at Home",
                image: "/blog-pour-over.jpg",
                readTime: "7 min read",
                category: "Brewing Guide",
              },
            ].map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="h-48 bg-gray-200 group-hover:scale-105 transition-transform"></div>
                <div className="p-6">
                  <span className="text-sm text-[#8B4513] font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{post.readTime}</span>
                    <span className="text-[#8B4513] font-semibold">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-[#8B4513] to-[#6B3410] text-white">
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
            <button className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer">
              Find Your Perfect Match →
            </button>
            <button className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all cursor-pointer">
              Browse All Coffees
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// const resources = [
//   {
//     href: "https://reactrouter.com/docs",
//     text: "React Router Docs",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="20"
//         viewBox="0 0 20 20"
//         fill="none"
//         className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
//       >
//         <path
//           d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     href: "https://rmx.as/discord",
//     text: "Join Discord",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="20"
//         viewBox="0 0 24 20"
//         fill="none"
//         className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
//       >
//         <path
//           d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
//           strokeWidth="1.5"
//         />
//       </svg>
//     ),
//   },
// ];
