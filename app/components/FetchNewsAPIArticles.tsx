//////////////////////////////////// when we use https://newsapi.org/\\\\\\\\\\\\\\\\\\\\\\\\\\\
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CoffeeArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  readTime: string;
  category: string;
  image?: string;
}

// REMOVED "async" from function name - this was the problem!
export default function FetchnewsApiarticles() {
  const [articles, setArticles] = useState<CoffeeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const articlesSectionRef = useRef<HTMLDivElement>(null);
  const toggleShowAll = () => {
    const wasShowingAll = showAll;
    setShowAll(!showAll);

    // If we're EXPANDING (showing more articles)
    if (!wasShowingAll) {
      setTimeout(() => {
        if (articlesSectionRef.current) {
          const yOffset = 200; // Scroll down a bit to see new articles
          const y =
            articlesSectionRef.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 150); // Slightly longer delay to ensure DOM updates
    }
    // If we're COLLAPSING (showing less articles), optional scroll up
    else {
      setTimeout(() => {
        // Scroll up a bit to keep the button in view
        window.scrollBy({
          top: -300,
          behavior: "smooth",
        });
      }, 50);
    }
  };
  const determineCategory = (title: string, description: string): string => {
    const content = (title + " " + description).toLowerCase();

    // EQUIPMENT CATEGORIES (updated for your equipment focus)
    if (
      content.includes("grinder") ||
      content.includes("grind") ||
      content.includes("burr")
    ) {
      return "Coffee Grinders";
    } else if (
      content.includes("espresso machine") ||
      content.includes("espresso maker")
    ) {
      return "Espresso Machines";
    } else if (
      content.includes("pour over") ||
      content.includes("v60") ||
      content.includes("chemex")
    ) {
      return "Pour Over Brewers";
    } else if (
      content.includes("french press") ||
      content.includes("cafetiere")
    ) {
      return "French Press";
    } else if (
      content.includes("cold brew") ||
      content.includes("toddy") ||
      content.includes("nitro")
    ) {
      return "Cold Brew Equipment";
    } else if (
      content.includes("aero press") ||
      content.includes("aeropress")
    ) {
      return "AeroPress";
    } else if (content.includes("moka pot") || content.includes("brikka")) {
      return "Stovetop Brewers";
    } else if (
      content.includes("drip coffee") ||
      content.includes("drip machine")
    ) {
      return "Drip Coffee Makers";
    } else if (content.includes("scale") || content.includes("timer")) {
      return "Brewing Accessories";
    } else if (content.includes("kettle") || content.includes("gooseneck")) {
      return "Brewing Kettles";
    } else if (content.includes("filter") || content.includes("paper filter")) {
      return "Brewing Filters";
    } else if (
      content.includes("tamper") ||
      content.includes("portafilter") ||
      content.includes("frother")
    ) {
      return "Espresso Accessories";
    }

    // COFFEE BEAN CATEGORIES
    else if (
      content.includes("bean") ||
      content.includes("roast") ||
      content.includes("arabica") ||
      content.includes("robusta")
    ) {
      if (
        content.includes("light roast") ||
        content.includes("lightly roasted")
      ) {
        return "Light Roast Coffee";
      } else if (
        content.includes("medium roast") ||
        content.includes("medium roasted")
      ) {
        return "Medium Roast Coffee";
      } else if (
        content.includes("dark roast") ||
        content.includes("dark roasted")
      ) {
        return "Dark Roast Coffee";
      } else if (
        content.includes("espresso roast") ||
        content.includes("espresso blend")
      ) {
        return "Espresso Coffee";
      }
      return "Coffee Beans";
    }

    // BREWING METHODS
    else if (
      content.includes("brewing method") ||
      content.includes("how to brew")
    ) {
      if (content.includes("pour over") || content.includes("manual brew")) {
        return "Pour Over Guide";
      } else if (content.includes("espresso") || content.includes("shot")) {
        return "Espresso Guide";
      } else if (
        content.includes("french press") ||
        content.includes("immersion")
      ) {
        return "French Press Guide";
      } else if (
        content.includes("cold brew") ||
        content.includes("iced coffee")
      ) {
        return "Cold Brew Guide";
      }
      return "Brewing Guides";
    }

    // GENERAL CATEGORIES
    else if (
      content.includes("review") ||
      content.includes("buyer") ||
      content.includes("best") ||
      content.includes("top")
    ) {
      if (content.includes("machine") || content.includes("equipment")) {
        return "Equipment Reviews";
      } else if (content.includes("coffee") || content.includes("beans")) {
        return "Coffee Reviews";
      }
      return "Product Reviews";
    } else if (
      content.includes("technique") ||
      content.includes("tutorial") ||
      content.includes("how to") ||
      content.includes("guide")
    ) {
      return "Brewing Techniques";
    } else if (
      content.includes("maintenance") ||
      content.includes("clean") ||
      content.includes("care")
    ) {
      return "Equipment Maintenance";
    } else if (
      content.includes("comparison") ||
      content.includes("vs") ||
      content.includes("versus")
    ) {
      return "Product Comparisons";
    }

    // DEFAULT
    return "Coffee & Equipment";
  };
  useEffect(() => {
    fetchCoffeeArticles();
  }, []);

  const fetchCoffeeArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        // `https://newsapi.org/v2/everything?q=(coffee+OR+espresso)+AND+(equipment+OR+grinder+OR+machine+OR+brewer+OR+accessories)&language=en&pageSize=6&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`
        `https://newsapi.org/v2/everything?q=(coffee+OR+espresso)+AND+(equipment+OR+grinder+OR+machine+OR+brewer+OR+accessories)&language=en&pageSize=6&apiKey=c2c97e21245c403b8613575f1e24995f`
      );
      const data = await response.json();

      const articlesData = data?.articles?.map((article: any) => ({
        title: article.title,
        description:
          article.description || "Coffee equipment or brewing related article",
        url: article.url,
        source: article.source.name,
        readTime: `${Math.ceil(article.content?.length / 500) || 3} min read`,
        category: determineCategory(article.title, article.description),
        image: article.urlToImage,
      }));
      console.log(
        "articles imges:",
        articlesData.map((article: any) => article.image)
      );

      setArticles(articlesData);
      setError(null);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenArticle = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
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
            Expert tips, brewing guides, and coffee education from top sources
          </p>
        </div>
        <div ref={articlesSectionRef}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-300">
              <p>{error}</p>
              <button
                onClick={fetchCoffeeArticles}
                className="mt-4 bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6B3410] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {(showAll ? articles : articles?.slice(0, 3)).map(
                (article, index) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => handleOpenArticle(article.url)}
                  >
                    <div
                      className="h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${article.image || "/fallback-image.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Overlay for better text visibility */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

                      {/* Content on top of image */}
                      <div className="relative z-10 text-white text-center p-4">
                        <span className="text-2xl font-bold drop-shadow-lg">
                          {article.source}
                        </span>
                        <p className="mt-2 text-sm opacity-90 drop-shadow-md">
                          External Article
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-[#8B4513] font-semibold">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        {article.description}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>{article.readTime}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {article.source}
                          </span>
                        </div>
                        <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </div>

        {/* Show toggle button - changes text based on state */}
        {articles.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShowAll}
              className="bg-transparent border-2 border-gray-200 text-gray-200 px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {showAll ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  View All {articles.length} Articles
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
