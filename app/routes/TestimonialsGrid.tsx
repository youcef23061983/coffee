import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "~/supabase_client";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
  featured: boolean;
  created_at: string;
}

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-80 h-96 mx-auto animate-pulse">
            <div className="flex justify-center text-gray-300 mb-6">
              {"★".repeat(5)}
            </div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-2 mt-12">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/testimonials.jpg')" }}
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
            What Our Community Says
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Hear from coffee lovers who have discovered their perfect brew
            through our curated selections and personalized recommendations.
          </motion.p>
        </div>
      </section>

      {/* Swiper Testimonials Section */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-6xl mx-auto px-4 w-full">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Voices of Satisfaction
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why coffee enthusiasts trust us for their daily brew
            </p>
          </motion.div>

          {/* Swiper Slider */}
          <div className="relative">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[EffectCards, Autoplay, Pagination, Navigation]}
              className="testimonial-swiper"
              style={{
                width: "100%",
                height: "500px",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    className="bg-white rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between border-2 border-amber-100 hover:border-amber-300 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Quote Icon */}
                    <div className="text-6xl text-amber-200 opacity-50 text-center mb-4">
                      "
                    </div>

                    {/* Star Rating */}
                    <div className="flex justify-center text-amber-400 mb-6 text-xl">
                      {"★".repeat(testimonial.rating)}
                      {"☆".repeat(5 - testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-gray-700 text-lg text-center leading-relaxed font-medium">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="text-center mt-8 pt-6 border-t border-amber-100">
                      <div className="font-bold text-gray-900 text-xl mb-1">
                        {testimonial.author}
                      </div>
                      <div className="text-amber-600 font-medium mb-2">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(testimonial.created_at)}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate("/addTestimonial")}
              className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
            >
              ✨ Share Your Experience
            </button>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .testimonial-swiper {
          --swiper-pagination-color: #f59e0b;
          --swiper-pagination-bullet-size: 12px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
          --swiper-pagination-bullet-inactive-color: #d1d5db;
          --swiper-pagination-bullet-inactive-opacity: 0.4;
          --swiper-navigation-color: #f59e0b;
          --swiper-navigation-size: 24px;
        }

        .testimonial-swiper .swiper-slide {
          width: 400px;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-swiper .swiper-slide-shadow-left,
        .testimonial-swiper .swiper-slide-shadow-right {
          background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0)
          ) !important;
        }

        @media (max-width: 768px) {
          .testimonial-swiper .swiper-slide {
            width: 320px;
            height: 420px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-swiper .swiper-slide {
            width: 280px;
            height: 400px;
          }
        }
      `}</style>
    </>
  );
}
