// app/components/AddTestimonial.tsx
import { useState } from "react";
import { supabase } from "~/supabase_client";
import { motion } from "framer-motion";
export default function AddTestimonial() {
  const [formData, setFormData] = useState({
    text: "",
    author: "",
    role: "",
    rating: 5,
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("testimonials").insert([formData]);

    if (error) {
      console.error("Error adding testimonial:", error);
    } else {
      alert("Testimonial added successfully!");
      setFormData({
        text: "",
        author: "",
        role: "",
        rating: 5,
        featured: false,
      });
    }
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/addTestimonial.jpg')" }}
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
            Inspire Fellow Coffee Lovers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Your authentic review could be the guiding light for someone's next
            favorite coffee discovery. Share your story in just 2 minutes and
            make a difference in our growing community.
          </motion.p>
        </div>
      </section>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="space-y-6 max-w-lg mx-auto p-8 bg-gradient-to-br from-amber-900/90 to-amber-800/80 backdrop-blur-sm rounded-2xl border border-amber-600/30 shadow-2xl mt-3.5 mb-3.5"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-bold text-amber-100 text-center mb-2"
        >
          Share Your Coffee Journey
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-amber-200/80 text-center text-sm mb-6"
        >
          Your story inspires our community of coffee lovers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-amber-200 font-medium mb-2 text-sm">
            Your Experience *
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02, borderColor: "#d97706" }}
            placeholder="Tell us about your coffee journey..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full p-4 bg-amber-950/50 border-2 border-amber-700/50 rounded-xl text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 resize-none"
            rows={4}
            required
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <label className="block text-amber-200 font-medium mb-2 text-sm">
              Your Name *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#d97706" }}
              type="text"
              placeholder="John Doe"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full p-3 bg-amber-950/50 border-2 border-amber-700/50 rounded-xl text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <label className="block text-amber-200 font-medium mb-2 text-sm">
              Your Role *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#d97706" }}
              type="text"
              placeholder="Coffee Enthusiast"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-3 bg-amber-950/50 border-2 border-amber-700/50 rounded-xl text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <label className="block text-amber-200 font-medium mb-2 text-sm">
            Your Rating *
          </label>
          <motion.select
            whileFocus={{ scale: 1.02, borderColor: "#d97706" }}
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: parseInt(e.target.value) })
            }
            className="w-full p-3 bg-amber-950/50 border-2 border-amber-700/50 rounded-xl text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option
                key={num}
                value={num}
                className="bg-amber-900 text-amber-100"
              >
                {"⭐".repeat(num)} {num} Star{num !== 1 ? "s" : ""}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, #d97706, #b45309)",
              boxShadow: "0 10px 30px rgba(217, 119, 6, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 font-semibold text-lg rounded-xl shadow-lg transition-all duration-300"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center justify-center gap-2"
            >
              ✨ Share Your Story
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-amber-400/60 text-center text-xs mt-4"
        >
          Your testimonial will help inspire our growing coffee community
        </motion.p>
      </motion.form>
    </>
  );
}
