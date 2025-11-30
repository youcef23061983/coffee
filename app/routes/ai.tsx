import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface GeneratedPost {
  title: string;
  readTime: string;
  category: string;
  content: string;
  summary: string;
  keywords: string[];
}

// Fixed AnimatedText component with proper types
const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Fixed FloatingCoffeeElements with proper types
const FloatingCoffeeElements = () => {
  return (
    <>
      {/* Floating Coffee Beans */}
      <motion.div
        className="absolute top-1/4 left-10 w-6 h-3 bg-amber-900 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-4 h-2 bg-amber-800 rounded-full opacity-50"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Floating Coffee Cups */}
      <motion.div
        className="absolute bottom-1/4 left-20 w-8 h-8 border-2 border-amber-200 rounded-full opacity-40"
        animate={{
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Fixed AnimatedParticles with proper types
const AnimatedParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((i: number) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-linear-to-r from-amber-400 to-amber-600 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Fixed NeuralNetwork with proper types
const NeuralNetwork = () => {
  const lines = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-30">
      {lines.map((i: number) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-linear-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0"
          style={{
            top: `${20 + i * 10}%`,
            left: "10%",
            right: "10%",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1.2, 0.8],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Fixed Variants with proper Framer Motion types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function DeepseekBlogGenerator() {
  const resultsRef = useRef<HTMLDivElement>(null);

  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    null
  );
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";

  // Handle form submission response
  useEffect(() => {
    if (fetcher.data) {
      console.log("Fetcher data:", fetcher.data);

      if (fetcher.data.success) {
        setGeneratedPost(fetcher.data.blog);
        setError(null);

        setTimeout(() => {
          if (resultsRef.current) {
            const y = resultsRef.current.getBoundingClientRect().top;
            window.scrollTo({
              top: y,
              behavior: "smooth",
            });
          }
        }, 100);
      } else {
        setError(fetcher.data.message || "Failed to generate blog post");
        setGeneratedPost(null);
      }
    }
  }, [fetcher.data]);

  const copyToClipboard = async () => {
    if (generatedPost) {
      const formattedContent = `
# ${generatedPost.title}

**Read Time:** ${generatedPost.readTime}
**Category:** ${generatedPost.category}
**Keywords:** ${generatedPost.keywords.join(", ")}

## Summary
${generatedPost.summary}

## Content
${generatedPost.content}
      `.trim();

      try {
        await navigator.clipboard.writeText(formattedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Enhanced Background with multiple animations */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/ai.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Add all animation layers */}
        <AnimatedParticles />
        <NeuralNetwork />
        <FloatingCoffeeElements />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 w-full">
          {/* Enhanced Title Animation */}
          <AnimatedText
            text="Ask AI, Master Coffee: Your Personal Brewing Assistant"
            className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
          />

          {/* Enhanced Paragraph Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90 mb-8"
          >
            <AnimatedText text="Unlock the secrets of perfect coffee with our AI-powered knowledge hub. From espresso extraction to pour-over techniques, get instant expert answers about brewing methods, equipment selection, bean origins, and brewing science. Whether you're a beginner seeking basics or a pro exploring advanced methods, transform your coffee journey with personalized AI guidance." />
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Main Content with Staggered Animations */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border -mt-20 relative z-20 mb-7"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            AI Coffee Blog Generator
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600">
            Powered by DeepSeek - Create engaging coffee content in seconds
          </motion.p>
        </motion.div>

        {/* Rest of your form and content with enhanced animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <fetcher.Form method="post" action="/api/openrouter">
            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blog Topic *
              </label>
              <input
                id="topic"
                name="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., cold brew techniques, espresso basics, coffee roasting, arabica vs robusta..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                disabled={loading}
                maxLength={100}
                required
              />
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-500">
                  Enter a coffee-related topic for your blog post
                </p>
                <span className="text-sm text-gray-500">
                  {topic.length}/100
                </span>
              </div>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="w-full bg-[#8B4513] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#6B3410] disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative overflow-hidden"
              >
                <div className="flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                      <span>Generating with DeepSeek...</span>
                    </>
                  ) : (
                    "Generate Blog Post"
                  )}
                </div>

                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            </motion.div>
          </fetcher.Form>
        </motion.div>

        {/* Enhanced Results Animation */}
        {generatedPost && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="mt-8 p-6 bg-gray-50 rounded-lg border"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {generatedPost.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{generatedPost.readTime}</span>
                  <span className="px-2 py-1 bg-[#8B4513] text-white rounded-full text-xs">
                    {generatedPost.category}
                  </span>
                  <span className="text-xs text-gray-500">via DeepSeek</span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                {copied ? "✓ Copied!" : "Copy Content"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
                <p className="text-gray-700 leading-relaxed">
                  {generatedPost.summary}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedPost.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#8B4513] text-white text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Content</h4>
              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-lg border">
                {generatedPost.content}
              </div>
            </div>

            {/* Usage Stats */}
            {fetcher.data?.usage && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Tokens used: {fetcher.data.usage.total_tokens} (Prompt:{" "}
                  {fetcher.data.usage.prompt_tokens}, Completion:{" "}
                  {fetcher.data.usage.completion_tokens})
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
