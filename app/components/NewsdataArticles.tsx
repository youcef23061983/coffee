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

// Cache configuration
const CACHE_KEY = "coffee_news_cache_v3";
const CACHE_DURATION_API = 15 * 24 * 60 * 60 * 1000; // 15 days for API data
const CACHE_DURATION_MOCK = 15 * 60 * 60 * 1000; // 15 hours for mock data

// Cache data interface
interface CacheData {
  articles: CoffeeArticle[];
  timestamp: number;
  isAPIData: boolean; // Track if it's API or mock data
}

const NewsdataArticles = () => {
  const [articles, setArticles] = useState<CoffeeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const articlesSectionRef = useRef<HTMLDivElement>(null);

  // Scroll handling
  const toggleShowAll = () => {
    const wasShowingAll = showAll;
    setShowAll(!showAll);

    if (!wasShowingAll) {
      setTimeout(() => {
        if (articlesSectionRef.current) {
          const yOffset = 200;
          const y =
            articlesSectionRef.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
    } else {
      setTimeout(() => {
        window.scrollBy({
          top: -300,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  // LESS STRICT coffee-related filter
  const isCoffeeRelated = (title: string, description: string): boolean => {
    const content = (title + " " + description).toLowerCase();

    // Broad coffee keywords
    const coffeeKeywords = [
      "coffee",
      "espresso",
      "brew",
      "barista",
      "roast",
      "grinder",
      "bean",
      "caffeine",
      "latte",
      "cappuccino",
      "mocha",
      "arabica",
      "robusta",
      "specialty coffee",
      "coffee shop",
      "coffee industry",
      "coffee machine",
      "coffee maker",
      "cold brew",
      "pour over",
      "french press",
      "aeropress",
      "drip coffee",
    ];

    // Check for any coffee keyword
    const hasCoffeeKeyword = coffeeKeywords.some((keyword) =>
      content.includes(keyword),
    );

    // Also allow articles from known coffee sources
    const coffeeSources = [
      "sprudge",
      "daily coffee",
      "coffee news",
      "barista",
      "perfect daily grind",
    ];
    const titleLower = title.toLowerCase();
    const fromCoffeeSource = coffeeSources.some(
      (source) =>
        titleLower.includes(source) ||
        description.toLowerCase().includes(source),
    );

    return hasCoffeeKeyword || fromCoffeeSource;
  };

  // Simpler category determination
  const determineCategory = (title: string, description: string): string => {
    const content = (title + " " + description).toLowerCase();

    if (content.includes("grinder")) return "Coffee Grinders";
    if (content.includes("espresso machine") || content.includes("espresso"))
      return "Espresso";
    if (
      content.includes("pour over") ||
      content.includes("v60") ||
      content.includes("chemex")
    )
      return "Pour Over";
    if (content.includes("french press")) return "French Press";
    if (content.includes("cold brew")) return "Cold Brew";
    if (content.includes("aeropress")) return "AeroPress";
    if (content.includes("drip coffee") || content.includes("drip machine"))
      return "Drip Coffee";
    if (
      content.includes("scale") ||
      content.includes("kettle") ||
      content.includes("timer")
    )
      return "Accessories";
    if (content.includes("bean") || content.includes("roast"))
      return "Coffee Beans";
    if (
      content.includes("how to") ||
      content.includes("guide") ||
      content.includes("technique")
    )
      return "Brewing Guide";
    if (content.includes("review") || content.includes("best"))
      return "Product Review";

    return "Coffee News";
  };

  const getMockArticles = (): CoffeeArticle[] => [
    {
      title: "Coffee Preparation Methods",
      description:
        "Comprehensive guide to various coffee brewing techniques from around the world.",
      url: "https://colipsecoffee.com/blogs/coffee/brewing-methods",
      source: "Colipse Coffee",
      readTime: "12 min read",
      category: "Brewing Techniques",
      image:
        "https://colipsecoffee.com/cdn/shop/articles/coffee-brewing-methods_a747246a-a481-4698-9105-67dc59ab1a0d.jpg?format=webp&amp;quality=80&amp;v=1755016564&amp;width=1200",
    },
    {
      title: "Espresso Machine Technology",
      description:
        "How espresso machines work and the different types available.",
      url: "https://kaapimachines.com/understanding-espresso-machines",
      source: "Kaapi Machines",
      readTime: "9 min read",
      category: "Espresso Machines",
      image:
        "https://kaapimachines.com/wp-content/uploads/2024/09/La-Marzocco-webp.webp",
    },
    {
      title: "Coffee Grinder Types",
      description:
        "Understanding burr grinders, blade grinders, and their impact on coffee quality.",
      url: "https://kaapimachines.com/understanding-coffee-grinders",
      source: "Kaapi Machines",
      readTime: "7 min read",
      category: "Coffee Grinders",
      image:
        "https://kaapimachines.com/wp-content/uploads/2024/09/HeyCafe-HC880-Lab-Shop-Grinder.webp",
    },
    {
      title: "French Press Brewing",
      description:
        "History and technique of the French press coffee brewing method.",
      url: "https://perfectdailygrind.com/2020/03/french-press-to-pour-over-how-to-make-coffee-at-home/",
      source: "Perfect Daily Grind",
      readTime: "5 min read",
      category: "French Press",
      image:
        "https://perfectdailygrind.com/wp-content/uploads/2020/04/Home-Brewing-1.png",
    },
    {
      title: "Cold Brew Coffee",
      description: "The science and method behind cold brew coffee extraction.",
      url: "https://hardtank.com/2025/05/06/science-of-cold-brew-extraction",
      source: "Hard Tank",
      readTime: "6 min read",
      category: "Cold Brew",
      image: "http://hardtank.com/wp-content/uploads/2025/04/Science1.jpg",
    },
    {
      title: "Coffee Roasting Process",
      description:
        "How coffee beans are roasted and how it affects flavor profiles.",
      url: "https://colipsecoffee.com/blogs/coffee/roast-levels",
      source: "Colipse Coffee",
      readTime: "8 min read",
      category: "Coffee Beans",
      image:
        "https://colipsecoffee.com/cdn/shop/articles/coffee-roast-levels-explained.webp?quality=80&v=1764152459&width=768",
    },
  ];
  // Get cached articles with appropriate duration
  const getCachedArticles = (): CoffeeArticle[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { articles, timestamp, isAPIData }: CacheData =
          JSON.parse(cached);

        // Use different durations based on data source
        const cacheDuration = isAPIData
          ? CACHE_DURATION_API
          : CACHE_DURATION_MOCK;

        if (Date.now() - timestamp < cacheDuration) {
          console.log(`Using cached ${isAPIData ? "API" : "mock"} articles`);
          return articles;
        }
      }
    } catch (err) {
      console.warn("Failed to read cache:", err);
    }
    return null;
  };

  // Save articles to cache with source info
  const cacheArticles = (articles: CoffeeArticle[], isAPIData: boolean) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          articles,
          timestamp: Date.now(),
          isAPIData,
        }),
      );
    } catch (err) {
      console.warn("Failed to cache articles:", err);
    }
  };

  // Check if cache is stale enough to refresh
  const shouldRefreshInBackground = (): boolean => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, isAPIData }: CacheData = JSON.parse(cached);

        // Refresh API cache if older than 6 hours
        if (isAPIData && Date.now() - timestamp > 6 * 60 * 60 * 1000) {
          return true;
        }

        // Refresh mock cache if older than 1 hour
        if (!isAPIData && Date.now() - timestamp > 60 * 60 * 1000) {
          return true;
        }
      }
    } catch (err) {
      console.warn("Failed to check cache age:", err);
    }
    return false;
  };

  // Background refresh for stale cache
  const refreshArticlesInBackground = async () => {
    try {
      console.log("Background refresh started...");
      const apiArticles = await fetchFromNewsData();

      if (apiArticles.length > 0) {
        console.log(`Background refresh got ${apiArticles.length} articles`);
        setArticles(apiArticles); // Update UI
        cacheArticles(apiArticles, true); // Cache fresh API data
      }
    } catch (err) {
      console.log("Background refresh failed");
    }
  };

  // Process NewsData.io articles - LESS strict
  const processNewsDataArticles = (apiArticles: any[]): CoffeeArticle[] => {
    if (!apiArticles || !Array.isArray(apiArticles)) {
      return [];
    }

    // Filter for coffee-related articles
    const coffeeArticles = apiArticles.filter((article) => {
      const title = article.title || "";
      const description = article.description || "";
      return isCoffeeRelated(title, description);
    });

    console.log(
      `API: ${apiArticles.length} total, ${coffeeArticles.length} coffee-related`,
    );

    // Return whatever we get, even if just 1-2 articles
    return coffeeArticles.slice(0, 6).map((article) => ({
      title: article.title || "Coffee News",
      description: article.description || "Latest coffee updates",
      url: article.link || "#",
      source: article.source_id || "News Source",
      readTime: `${Math.ceil((article.description?.length || 300) / 200)} min read`,
      category: determineCategory(
        article.title || "",
        article.description || "",
      ),
      image: article.image_url,
    }));
  };

  // Fetch from NewsData.io
  const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
    try {
      const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

      if (!apiKey) {
        console.log("No API key found");
        return [];
      }

      // Use broader coffee queries
      const coffeeQueries = [
        "coffee",
        "espresso",
        "coffee brewing",
        "coffee equipment",
        "specialty coffee",
      ];

      const query =
        coffeeQueries[Math.floor(Math.random() * coffeeQueries.length)];
      console.log(`Fetching coffee news with query: "${query}"`);

      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&size=5`,
      );

      if (!response.ok) {
        console.warn(`API responded with status: ${response.status}`);
        return [];
      }

      const data = await response.json();

      if (
        data.status === "success" &&
        data.results &&
        data.results.length > 0
      ) {
        return processNewsDataArticles(data.results);
      }

      return [];
    } catch (err) {
      console.error("NewsData API failed:", err);
      return [];
    }
  };

  // Main fetch function with smart cache refresh
  const fetchCoffeeArticles = async () => {
    try {
      setLoading(true);

      // 1. Check cache first
      // const cached = getCachedArticles();
      // if (cached && cached.length > 0) {
      //   setArticles(cached);
      //   setLoading(false);

      //   // If cache is stale, refresh in background
      //   if (shouldRefreshInBackground()) {
      //     refreshArticlesInBackground();
      //   }
      //   return;
      // }

      // 2. Show mock data immediately
      const mockArticles = getMockArticles();
      setArticles(mockArticles);

      // 3. Try API
      // const apiArticles = await fetchFromNewsData();

      // if (apiArticles.length > 0) {
      //   console.log(`✅ Got ${apiArticles.length} fresh API articles`);
      //   setArticles(apiArticles);
      //   cacheArticles(apiArticles, true); // Cache as API data (24h)
      // } else {
      //   console.log("❌ API returned no articles");
      //   cacheArticles(mockArticles, false); // Cache as mock data (2h only)
      // }
    } catch (err) {
      console.error("Error:", err);
      const mockArticles = getMockArticles();
      setArticles(mockArticles);
      cacheArticles(mockArticles, false); // Cache as mock
    } finally {
      setLoading(false);
    }
  };

  // Initialize
  useEffect(() => {
    fetchCoffeeArticles();
  }, []);

  // Handle article click
  const handleOpenArticle = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Refresh with cache clear
  const handleRetry = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchCoffeeArticles();
  };

  // Display articles
  const displayArticles = showAll ? articles : articles.slice(0, 3);

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
          {/* <button
            onClick={handleRetry}
            className="mt-4 text-sm text-gray-300 hover:text-white"
            title="Get fresh articles"
          >
            Refresh Articles
          </button> */}
        </div>

        <div ref={articlesSectionRef}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              {articles.length === 0 ? (
                <div className="text-center text-gray-200 py-12">
                  <p className="text-lg mb-4">No coffee articles available.</p>
                  <button
                    onClick={handleRetry}
                    className="bg-transparent border-2 border-gray-200 text-gray-200 px-6 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-8">
                    {displayArticles.map((article, index) => (
                      <motion.div
                        key={`${article.title}-${index}`}
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
                          }}
                        >
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                          <div className="relative z-10 text-white text-center p-4">
                            <span className="text-2xl font-bold drop-shadow-lg">
                              {article.source}
                            </span>
                            <p className="mt-2 text-sm opacity-90 drop-shadow-md">
                              {article.category}
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <span className="text-sm text-[#8B4513] font-semibold">
                            {article.category}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                            {article.description}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span>{article.readTime}</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[100px]">
                                {article.source}
                              </span>
                            </div>
                            <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
                              Read →
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsdataArticles;
