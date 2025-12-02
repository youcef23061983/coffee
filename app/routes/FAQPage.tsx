import React, { useState } from "react";
import { motion } from "framer-motion";

// Define the FAQ item type
interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: "ordering" | "shipping" | "coffee" | "account";
}

// FAQ data
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How does BrewTopia work?",
    answer: (
      <>
        We are a curated marketplace and guide for specialty coffee. You can
        shop individual coffees or take our{" "}
        <a
          href="/quiz"
          className="text-amber-700 hover:text-amber-800 font-medium"
        >
          personalized coffee quiz
        </a>{" "}
        to receive tailored recommendations. Our subscription service is
        flexible, allowing you to discover new coffees or have your favorites
        delivered on a schedule that fits your life.
      </>
    ),
    category: "ordering",
  },
  {
    id: 2,
    question: "Can I order coffee without a subscription?",
    answer:
      "Absolutely. All coffees in our marketplace are available for one-time purchase. Subscriptions are optional and offer perks like free shipping, exclusive releases, and discounts.",
    category: "ordering",
  },
  {
    id: 3,
    question: "How do I manage or cancel my subscription?",
    answer:
      'You have full control. Log into your account on our website, navigate to "My Subscriptions," where you can pause, modify (change frequency, coffee, or quantity), or cancel your subscription at any time. There are no commitments or hidden fees.',
    category: "account",
  },
  {
    id: 4,
    question: "What shipping options do you offer?",
    answer:
      "We offer free standard shipping (3-5 business days) on all subscription orders and orders over $35. Expedited shipping (2 business days) is available at checkout for a flat rate.",
    category: "shipping",
  },
  {
    id: 5,
    question: "How fresh is the coffee?",
    answer:
      "We work directly with roasters who roast-to-order. All coffee is shipped within 48 hours of roasting, ensuring peak freshness when it arrives at your door.",
    category: "coffee",
  },
  {
    id: 6,
    question: "What is your sourcing philosophy?",
    answer:
      "We partner directly with over 120 family-owned farms and artisan roasters. Every bean must meet our rigorous standards for quality, sustainability, and ethical sourcing. We prioritize transparent trade practices and sustainable farming methods.",
    category: "coffee",
  },
  {
    id: 7,
    question: "How do you personalize recommendations?",
    answer:
      "Our quiz analyzes your flavor preferences (like chocolatey, fruity, or bright), brewing method, roast level preference, and caffeine tolerance. Our algorithm and coffee experts then match you with coffees from our curated selection.",
    category: "ordering",
  },
];

// Category data for filtering
const categories = [
  { id: "all", label: "All Questions" },
  { id: "ordering", label: "Ordering & Subscription" },
  { id: "shipping", label: "Shipping & Delivery" },
  { id: "coffee", label: "Our Coffee & Sourcing" },
  { id: "account", label: "Account & Support" },
];

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItemId, setOpenItemId] = useState<number | null>(1); // Open first item by default

  // Filter FAQs based on active category
  const filteredFAQs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  // Toggle FAQ item open/close
  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url('/faq.jpg')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </section>
      <div className="max-w-4xl mx-auto mt-7 mb-7">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to our most common questions about coffee,
            subscriptions, and shipping. Need more help? Contact our team at{" "}
            <a
              href="mailto:support@brewtopicoffee.com"
              className="text-amber-700 font-medium hover:text-amber-800"
            >
              support@brewtopicoffee.com
            </a>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">50K+</div>
              <div className="text-sm text-gray-600">Coffee Enthusiasts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">120+</div>
              <div className="text-sm text-gray-600">Artisan Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">1M+</div>
              <div className="text-sm text-gray-600">Cups Brewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">99.8%</div>
              <div className="text-sm text-gray-600">Customer Happiness</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-amber-800 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItemId === item.id}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <span className="flex-shrink-0 ml-2">
                  <svg
                    className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
                      openItemId === item.id ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openItemId === item.id ? "pb-5 max-h-96" : "max-h-0"
                }`}
              >
                <div className="text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl border border-amber-200">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our coffee sommeliers and customer care team are here to help you
            find your perfect brew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-amber-800 hover:bg-amber-900 transition-colors"
            >
              Email Our Support Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
