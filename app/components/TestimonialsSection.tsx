import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "~/supabase_client";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
  created_at: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLastThreeTestimonials();
  }, []);

  const fetchLastThreeTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
          >
            <div className="flex text-gray-300 mb-4">{"★".repeat(5)}</div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Star Rating */}
          <div className="flex text-yellow-400 mb-4">
            {"★".repeat(testimonial.rating)}
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 mb-6 italic leading-relaxed">
            "{testimonial.text}"
          </p>

          {/* Author Info with Date */}
          <div className="flex justify-between items-end">
            <div>
              <div className="font-semibold text-gray-900">
                {testimonial.author}
              </div>
              <div className="text-sm text-gray-600">{testimonial.role}</div>
            </div>
            <div className="text-xs text-gray-500">
              {formatDate(testimonial.created_at)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
