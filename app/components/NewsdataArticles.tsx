// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// interface CoffeeArticle {
//   title: string;
//   description: string;
//   url: string;
//   source: string;
//   readTime: string;
//   category: string;
//   image?: string;
// }

// // Cache configuration
// const CACHE_KEY = "coffee_news_cache_v3";
// const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

// const NewsdataArticles = () => {
//   const [articles, setArticles] = useState<CoffeeArticle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const articlesSectionRef = useRef<HTMLDivElement>(null);

//   // Scroll handling
//   const toggleShowAll = () => {
//     const wasShowingAll = showAll;
//     setShowAll(!showAll);

//     if (!wasShowingAll) {
//       setTimeout(() => {
//         if (articlesSectionRef.current) {
//           const yOffset = 200;
//           const y =
//             articlesSectionRef.current.getBoundingClientRect().top +
//             window.pageYOffset +
//             yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//         }
//       }, 150);
//     } else {
//       setTimeout(() => {
//         // Scroll up a bit to keep the button in view
//         window.scrollBy({
//           top: -300,
//           behavior: "smooth",
//         });
//       }, 50);
//     }
//   };

//   // STRICT coffee-related filter
//   const isCoffeeRelated = (title: string, description: string): boolean => {
//     const content = (title + " " + description).toLowerCase();

//     const coffeeKeywords = [
//       "coffee",
//       "espresso",
//       "brew",
//       "barista",
//       "roast",
//       "grinder",
//       "beans",
//       "arabica",
//       "robusta",
//       "caffeine",
//       "latte",
//       "cappuccino",
//       "pour over",
//       "french press",
//       "cold brew",
//       "aeropress",
//       "moka pot",
//       "drip coffee",
//       "coffee machine",
//       "coffee maker",
//       "specialty coffee",
//       "coffee shop",
//       "coffee industry",
//       "coffee farm",
//       "coffee harvest",
//     ];

//     return coffeeKeywords.some((keyword) => content.includes(keyword));
//   };

//   // Category determination - STRICTER
//   const determineCategory = (title: string, description: string): string => {
//     const content = (title + " " + description).toLowerCase();

//     if (content.includes("grinder") || content.includes("burr grinder")) {
//       return "Coffee Grinders";
//     } else if (
//       content.includes("espresso machine") ||
//       content.includes("espresso maker")
//     ) {
//       return "Espresso Machines";
//     } else if (
//       content.includes("pour over") ||
//       content.includes("v60") ||
//       content.includes("chemex")
//     ) {
//       return "Pour Over Brewers";
//     } else if (
//       content.includes("french press") ||
//       content.includes("cafetiere")
//     ) {
//       return "French Press";
//     } else if (content.includes("cold brew")) {
//       return "Cold Brew Equipment";
//     } else if (content.includes("aeropress")) {
//       return "AeroPress";
//     } else if (content.includes("moka pot") || content.includes("stovetop")) {
//       return "Stovetop Brewers";
//     } else if (
//       content.includes("drip coffee") ||
//       content.includes("drip machine")
//     ) {
//       return "Drip Coffee Makers";
//     } else if (
//       content.includes("scale") ||
//       content.includes("timer") ||
//       content.includes("kettle")
//     ) {
//       return "Brewing Accessories";
//     } else if (content.includes("bean") || content.includes("roast")) {
//       if (content.includes("light roast")) return "Light Roast Coffee";
//       if (content.includes("medium roast")) return "Medium Roast Coffee";
//       if (content.includes("dark roast")) return "Dark Roast Coffee";
//       return "Coffee Beans";
//     } else if (
//       content.includes("technique") ||
//       content.includes("how to") ||
//       content.includes("guide")
//     ) {
//       return "Brewing Techniques";
//     } else if (
//       content.includes("review") ||
//       content.includes("best") ||
//       content.includes("top")
//     ) {
//       return "Product Reviews";
//     }

//     return "Coffee Industry News";
//   };

//   // Curated coffee-specific mock articles
//   const getMockArticles = (): CoffeeArticle[] => [
//     {
//       title: "The Ultimate Guide to Choosing a Coffee Grinder",
//       description:
//         "Learn about burr vs blade grinders and find the perfect one for your brewing method.",
//       url: "https://example.com/coffee-grinder-guide",
//       source: "Coffee Gear Experts",
//       readTime: "7 min read",
//       category: "Coffee Grinders",
//       image:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Espresso Machine Maintenance: Essential Tips",
//       description:
//         "Keep your espresso machine in perfect condition with these maintenance routines.",
//       url: "https://example.com/espresso-maintenance",
//       source: "Home Barista",
//       readTime: "5 min read",
//       category: "Espresso Machines",
//       image:
//         "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Mastering Pour Over Coffee: Champion Techniques",
//       description:
//         "Step-by-step guide to perfect pour over coffee from world champion baristas.",
//       url: "https://example.com/pour-over-mastery",
//       source: "Brewing Champions",
//       readTime: "8 min read",
//       category: "Pour Over Brewers",
//       image:
//         "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "French Press vs AeroPress: Complete Comparison",
//       description:
//         "Detailed comparison of two popular immersion brewing methods to help you choose.",
//       url: "https://example.com/immersion-comparison",
//       source: "Brewing Methods",
//       readTime: "6 min read",
//       category: "Product Comparisons",
//       image:
//         "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Cold Brew Coffee: Equipment & Techniques Guide",
//       description:
//         "Everything you need to make perfect cold brew coffee at home.",
//       url: "https://example.com/cold-brew-guide",
//       source: "Cold Brew Specialists",
//       readTime: "5 min read",
//       category: "Cold Brew Equipment",
//       image:
//         "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Smart Coffee Scales: Precision Brewing Technology",
//       description:
//         "How digital scales with timers are revolutionizing home coffee brewing accuracy.",
//       url: "https://example.com/smart-scales",
//       source: "Precision Brewing",
//       readTime: "4 min read",
//       category: "Brewing Accessories",
//       image:
//         "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center",
//     },
//   ];

//   // Get cached articles
//   const getCachedArticles = (): CoffeeArticle[] | null => {
//     try {
//       const cached = localStorage.getItem(CACHE_KEY);
//       if (cached) {
//         const { articles, timestamp } = JSON.parse(cached);
//         if (Date.now() - timestamp < CACHE_DURATION) {
//           return articles;
//         }
//       }
//     } catch (err) {
//       console.warn("Failed to read cache:", err);
//     }
//     return null;
//   };

//   // Save articles to cache
//   const cacheArticles = (articles: CoffeeArticle[]) => {
//     try {
//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           articles,
//           timestamp: Date.now(),
//         })
//       );
//     } catch (err) {
//       console.warn("Failed to cache articles:", err);
//     }
//   };

//   // Filter and process NewsData.io articles
//   const processNewsDataArticles = (apiArticles: any[]): CoffeeArticle[] => {
//     if (!apiArticles || !Array.isArray(apiArticles)) {
//       return [];
//     }

//     // Filter for coffee-related articles ONLY
//     const coffeeArticles = apiArticles.filter((article) => {
//       const title = article.title || "";
//       const description = article.description || "";
//       return isCoffeeRelated(title, description);
//     });

//     // If we have at least 3 coffee articles, use them
//     if (coffeeArticles.length >= 3) {
//       return coffeeArticles.slice(0, 6).map((article, index) => ({
//         title: article.title || "Coffee News",
//         description:
//           article.description || "Latest in coffee equipment and brewing",
//         url: article.link || "#",
//         source: article.source_id || "Coffee News Source",
//         readTime: `${Math.ceil((article.description?.length || 500) / 200)} min read`,
//         category: determineCategory(
//           article.title || "",
//           article.description || ""
//         ),
//         image: article.image_url || getMockArticles()[index]?.image,
//       }));
//     }

//     return []; // Not enough coffee articles
//   };

//   // Fetch from NewsData.io with BETTER coffee-specific search
//   const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
//     try {
//       const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

//       if (
//         !apiKey ||
//         apiKey === "your_api_key_here" ||
//         apiKey.includes("your_api_key")
//       ) {
//         console.log("No valid NewsData API key found, using mock data");
//         return getMockArticles(); // Return mock data immediately
//       }

//       // BETTER coffee-specific queries
//       const coffeeQueries = [
//         "coffee equipment review",
//         "espresso machine technology",
//         "coffee grinder comparison",
//         "specialty coffee brewing",
//         "barista tools accessories",
//         "coffee roasting techniques",
//       ];

//       const query =
//         coffeeQueries[Math.floor(Math.random() * coffeeQueries.length)];

//       console.log(`Fetching with query: "${query}"`);

//       const response = await fetch(
//         `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&category=technology,food`
//       );

//       if (!response.ok) {
//         throw new Error(`NewsData API error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (
//         data.status === "success" &&
//         data.results &&
//         data.results.length > 0
//       ) {
//         console.log(`Raw API results: ${data.results.length} articles`);
//         const processed = processNewsDataArticles(data.results);
//         console.log(`After coffee filter: ${processed.length} articles`);
//         return processed;
//       }

//       throw new Error("No articles found in API response");
//     } catch (err) {
//       console.error("NewsData API fetch failed:", err);
//       throw err;
//     }
//   };

//   // Main fetch function - SIMPLIFIED
//   const fetchCoffeeArticles = async () => {
//     try {
//       setLoading(true);

//       // 1. Check cache first
//       const cached = getCachedArticles();
//       if (cached && cached.length >= 3) {
//         console.log("Using cached articles");
//         setArticles(cached);
//         return;
//       }

//       // 2. Try to fetch from NewsData.io
//       console.log("Attempting to fetch from NewsData.io...");
//       const newsDataArticles = await fetchFromNewsData();

//       if (newsDataArticles.length >= 3) {
//         console.log(
//           `Success! Got ${newsDataArticles.length} coffee articles from API`
//         );
//         setArticles(newsDataArticles);
//         cacheArticles(newsDataArticles);
//         return;
//       }

//       // 3. Fallback to curated mock data
//       console.log("Using curated mock coffee articles");
//       const mockArticles = getMockArticles();
//       setArticles(mockArticles);
//       cacheArticles(mockArticles);
//     } catch (err) {
//       console.error("Error fetching articles:", err);

//       // 4. Ultimate fallback to mock data
//       const mockArticles = getMockArticles();
//       setArticles(mockArticles);
//       cacheArticles(mockArticles);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize
//   useEffect(() => {
//     fetchCoffeeArticles();
//   }, []);

//   // Handle article click
//   const handleOpenArticle = (url: string) => {
//     if (url && url !== "#") {
//       window.open(url, "_blank", "noopener,noreferrer");
//     }
//   };

//   // Refresh articles
//   const handleRetry = () => {
//     localStorage.removeItem(CACHE_KEY);
//     fetchCoffeeArticles();
//   };

//   // Display articles (ALWAYS show all if we have them)
//   const displayArticles = showAll ? articles : articles.slice(0, 3);

//   return (
//     <section
//       className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
//       style={{ backgroundImage: "url('/back.jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-200 mb-4">
//             From The Brew Guide
//           </h2>
//           <p className="text-xl text-gray-200">
//             Expert tips, brewing guides, and coffee education from top sources
//           </p>
//         </div>

//         <div ref={articlesSectionRef}>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//             </div>
//           ) : (
//             <>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {displayArticles.map((article, index) => (
//                   <motion.div
//                     key={`${article.title}-${index}`}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.2 }}
//                     className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
//                     onClick={() => handleOpenArticle(article.url)}
//                   >
//                     <div
//                       className="h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative overflow-hidden"
//                       style={{
//                         backgroundImage: `url(${article.image || "/fallback-image.jpg"})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
//                       <div className="relative z-10 text-white text-center p-4">
//                         <span className="text-2xl font-bold drop-shadow-lg">
//                           {article.source}
//                         </span>
//                         <p className="mt-2 text-sm opacity-90 drop-shadow-md">
//                           Coffee Article
//                         </p>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <span className="text-sm text-[#8B4513] font-semibold">
//                         {article.category}
//                       </span>
//                       <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
//                         {article.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 text-sm line-clamp-3">
//                         {article.description}
//                       </p>
//                       <div className="flex justify-between items-center text-sm text-gray-600">
//                         <div className="flex items-center gap-4">
//                           <span>{article.readTime}</span>
//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[100px]">
//                             {article.source}
//                           </span>
//                         </div>
//                         <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
//                           Read Article →
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Show toggle button ONLY if we have more than 3 articles */}
//               {articles.length > 3 && (
//                 <div className="text-center mt-12">
//                   <button
//                     onClick={toggleShowAll}
//                     className="bg-transparent border-2 border-gray-200 text-gray-200 px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
//                   >
//                     {showAll ? (
//                       <>
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 15l7-7 7 7"
//                           />
//                         </svg>
//                         Show Less (First 3)
//                       </>
//                     ) : (
//                       <>
//                         View All {articles.length} Articles
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsdataArticles;
// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// interface CoffeeArticle {
//   title: string;
//   description: string;
//   url: string;
//   source: string;
//   readTime: string;
//   category: string;
//   image?: string;
// }

// const NewsdataArticles = () => {
//   const [articles, setArticles] = useState<CoffeeArticle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const articlesSectionRef = useRef<HTMLDivElement>(null);

//   // Scroll handling
//   const toggleShowAll = () => {
//     const wasShowingAll = showAll;
//     setShowAll(!showAll);

//     if (!wasShowingAll) {
//       setTimeout(() => {
//         if (articlesSectionRef.current) {
//           const yOffset = 200;
//           const y =
//             articlesSectionRef.current.getBoundingClientRect().top +
//             window.pageYOffset +
//             yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//         }
//       }, 150);
//     } else {
//       setTimeout(() => {
//         // Scroll up a bit to keep the button in view
//         window.scrollBy({
//           top: -300,
//           behavior: "smooth",
//         });
//       }, 50);
//     }
//   };

//   // STRICT coffee-related filter
//   const isCoffeeRelated = (title: string, description: string): boolean => {
//     const content = (title + " " + description).toLowerCase();

//     const coffeeKeywords = [
//       "coffee",
//       "espresso",
//       "brew",
//       "barista",
//       "roast",
//       "grinder",
//       "beans",
//       "arabica",
//       "robusta",
//       "caffeine",
//       "latte",
//       "cappuccino",
//       "pour over",
//       "french press",
//       "cold brew",
//       "aeropress",
//       "moka pot",
//       "drip coffee",
//       "coffee machine",
//       "coffee maker",
//       "specialty coffee",
//       "coffee shop",
//       "coffee industry",
//       "coffee farm",
//       "coffee harvest",
//     ];

//     return coffeeKeywords.some((keyword) => content.includes(keyword));
//   };

//   // Category determination - STRICTER
//   const determineCategory = (title: string, description: string): string => {
//     const content = (title + " " + description).toLowerCase();

//     if (content.includes("grinder") || content.includes("burr grinder")) {
//       return "Coffee Grinders";
//     } else if (
//       content.includes("espresso machine") ||
//       content.includes("espresso maker")
//     ) {
//       return "Espresso Machines";
//     } else if (
//       content.includes("pour over") ||
//       content.includes("v60") ||
//       content.includes("chemex")
//     ) {
//       return "Pour Over Brewers";
//     } else if (
//       content.includes("french press") ||
//       content.includes("cafetiere")
//     ) {
//       return "French Press";
//     } else if (content.includes("cold brew")) {
//       return "Cold Brew Equipment";
//     } else if (content.includes("aeropress")) {
//       return "AeroPress";
//     } else if (content.includes("moka pot") || content.includes("stovetop")) {
//       return "Stovetop Brewers";
//     } else if (
//       content.includes("drip coffee") ||
//       content.includes("drip machine")
//     ) {
//       return "Drip Coffee Makers";
//     } else if (
//       content.includes("scale") ||
//       content.includes("timer") ||
//       content.includes("kettle")
//     ) {
//       return "Brewing Accessories";
//     } else if (content.includes("bean") || content.includes("roast")) {
//       if (content.includes("light roast")) return "Light Roast Coffee";
//       if (content.includes("medium roast")) return "Medium Roast Coffee";
//       if (content.includes("dark roast")) return "Dark Roast Coffee";
//       return "Coffee Beans";
//     } else if (
//       content.includes("technique") ||
//       content.includes("how to") ||
//       content.includes("guide")
//     ) {
//       return "Brewing Techniques";
//     } else if (
//       content.includes("review") ||
//       content.includes("best") ||
//       content.includes("top")
//     ) {
//       return "Product Reviews";
//     }

//     return "Coffee Industry News";
//   };

//   // Minimal fallback articles (3 only, not 6)
//   const getMinimalFallbackArticles = (): CoffeeArticle[] => [
//     {
//       title: "Coffee Grinder Buying Guide: Burr vs Blade",
//       description:
//         "Essential guide to choosing the right coffee grinder for your brewing needs.",
//       url: "https://coffeegeek.com/grinder-buying-guide",
//       source: "Coffee Geek",
//       readTime: "5 min read",
//       category: "Coffee Grinders",
//       image:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Espresso Machine Maintenance Tips",
//       description:
//         "How to keep your espresso machine in top condition for perfect shots.",
//       url: "https://homebarista.com/maintenance",
//       source: "Home Barista",
//       readTime: "4 min read",
//       category: "Espresso Machines",
//       image:
//         "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Mastering Pour Over Coffee Techniques",
//       description: "Step-by-step guide to perfect pour over coffee every time.",
//       url: "https://brewmethods.com/pour-over",
//       source: "Brew Methods",
//       readTime: "6 min read",
//       category: "Pour Over Brewers",
//       image:
//         "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center",
//     },
//   ];

//   // Filter and process NewsData.io articles
//   const processNewsDataArticles = (apiArticles: any[]): CoffeeArticle[] => {
//     if (!apiArticles || !Array.isArray(apiArticles)) {
//       return [];
//     }

//     // Filter for coffee-related articles ONLY
//     const coffeeArticles = apiArticles.filter((article) => {
//       const title = article.title || "";
//       const description = article.description || "";
//       return isCoffeeRelated(title, description);
//     });

//     // If we have coffee articles, use them (even if less than 3)
//     if (coffeeArticles.length > 0) {
//       return coffeeArticles.slice(0, 6).map((article, index) => ({
//         title: article.title || "Coffee News",
//         description:
//           article.description || "Latest in coffee equipment and brewing",
//         url: article.link || "#",
//         source: article.source_id || "Coffee News Source",
//         readTime: `${Math.ceil((article.description?.length || 500) / 200)} min read`,
//         category: determineCategory(
//           article.title || "",
//           article.description || ""
//         ),
//         image: article.image_url,
//       }));
//     }

//     return []; // No coffee articles
//   };

//   // Fetch from NewsData.io with BETTER coffee-specific search
//   const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
//     try {
//       const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

//       if (
//         !apiKey ||
//         apiKey === "your_api_key_here" ||
//         apiKey.includes("your_api_key")
//       ) {
//         console.log("No valid NewsData API key found");
//         return [];
//       }

//       // BETTER coffee-specific queries
//       const coffeeQueries = [
//         "coffee equipment review",
//         "espresso machine technology",
//         "coffee grinder comparison",
//         "specialty coffee brewing",
//         "barista tools accessories",
//         "coffee roasting techniques",
//       ];

//       const query =
//         coffeeQueries[Math.floor(Math.random() * coffeeQueries.length)];

//       console.log(`Fetching with query: "${query}"`);

//       const response = await fetch(
//         `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&category=technology,food`
//       );

//       if (!response.ok) {
//         throw new Error(`NewsData API error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (
//         data.status === "success" &&
//         data.results &&
//         data.results.length > 0
//       ) {
//         console.log(`Raw API results: ${data.results.length} articles`);
//         const processed = processNewsDataArticles(data.results);
//         console.log(`After coffee filter: ${processed.length} articles`);
//         return processed;
//       }

//       throw new Error("No articles found in API response");
//     } catch (err) {
//       console.error("NewsData API fetch failed:", err);
//       throw err;
//     }
//   };

//   // Main fetch function
//   const fetchCoffeeArticles = async () => {
//     try {
//       setLoading(true);

//       // Try to fetch from NewsData.io
//       console.log("Fetching from NewsData.io...");
//       const newsDataArticles = await fetchFromNewsData();

//       // Use API articles if we got any, otherwise use fallback
//       if (newsDataArticles.length > 0) {
//         console.log(
//           `Success! Got ${newsDataArticles.length} coffee articles from API`
//         );
//         setArticles(newsDataArticles);
//       } else {
//         // Use minimal fallback
//         console.log("Using minimal fallback articles");
//         const fallbackArticles = getMinimalFallbackArticles();
//         setArticles(fallbackArticles);
//       }
//     } catch (err) {
//       console.error("Error fetching articles:", err);

//       // Use fallback on error
//       const fallbackArticles = getMinimalFallbackArticles();
//       setArticles(fallbackArticles);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Main fetch function - API ONLY (no fallback)
//   // const fetchCoffeeArticles = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const newsDataArticles = await fetchFromNewsData();
//   //     setArticles(newsDataArticles); // Set whatever we get (could be empty)
//   //   } catch (err) {
//   //     console.error("Error fetching articles:", err);
//   //     setArticles([]); // Set empty array on error
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   // Initialize - fetch on component mount
//   useEffect(() => {
//     fetchCoffeeArticles();
//   }, []);

//   // Handle article click
//   const handleOpenArticle = (url: string) => {
//     if (url && url !== "#") {
//       window.open(url, "_blank", "noopener,noreferrer");
//     }
//   };

//   // Refresh articles
//   const handleRetry = () => {
//     fetchCoffeeArticles();
//   };

//   // Display articles
//   const displayArticles = showAll ? articles : articles.slice(0, 3);

//   return (
//     <section
//       className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
//       style={{ backgroundImage: "url('/back.jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-200 mb-4">
//             From The Brew Guide
//           </h2>
//           <p className="text-xl text-gray-200">
//             Expert tips, brewing guides, and coffee education from top sources
//           </p>
//         </div>

//         <div ref={articlesSectionRef}>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//             </div>
//           ) : (
//             <>
//               {articles.length === 0 ? (
//                 <div className="text-center text-gray-200 py-12">
//                   <p className="text-lg mb-4">
//                     No coffee articles available at the moment.
//                   </p>
//                   <button
//                     onClick={handleRetry}
//                     className="bg-transparent border-2 border-gray-200 text-gray-200 px-6 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid md:grid-cols-3 gap-8">
//                     {displayArticles.map((article, index) => (
//                       <motion.div
//                         key={`${article.title}-${index}`}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: index * 0.2 }}
//                         className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
//                         onClick={() => handleOpenArticle(article.url)}
//                       >
//                         <div
//                           className="h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative overflow-hidden"
//                           style={{
//                             backgroundImage: `url(${article.image || "/fallback-image.jpg"})`,
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                             backgroundRepeat: "no-repeat",
//                           }}
//                         >
//                           <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
//                           <div className="relative z-10 text-white text-center p-4">
//                             <span className="text-2xl font-bold drop-shadow-lg">
//                               {article.source}
//                             </span>
//                             <p className="mt-2 text-sm opacity-90 drop-shadow-md">
//                               Coffee Article
//                             </p>
//                           </div>
//                         </div>
//                         <div className="p-6">
//                           <span className="text-sm text-[#8B4513] font-semibold">
//                             {article.category}
//                           </span>
//                           <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
//                             {article.title}
//                           </h3>
//                           <p className="text-gray-600 mb-4 text-sm line-clamp-3">
//                             {article.description}
//                           </p>
//                           <div className="flex justify-between items-center text-sm text-gray-600">
//                             <div className="flex items-center gap-4">
//                               <span>{article.readTime}</span>
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[100px]">
//                                 {article.source}
//                               </span>
//                             </div>
//                             <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
//                               Read Article →
//                             </span>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Show toggle button ONLY if we have more than 3 articles */}
//                   {articles.length > 3 && (
//                     <div className="text-center mt-12">
//                       <button
//                         onClick={toggleShowAll}
//                         className="bg-transparent border-2 border-gray-200 text-gray-200 px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
//                       >
//                         {showAll ? (
//                           <>
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M5 15l7-7 7 7"
//                               />
//                             </svg>
//                             Show Less (First 3)
//                           </>
//                         ) : (
//                           <>
//                             View All {articles.length} Articles
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 9l-7 7-7-7"
//                               />
//                             </svg>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsdataArticles;

// //////////////////////////////////Here's the optimized version with less strict filtering, cache, and mock data fallback:

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
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours (shorter for freshness)

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
      content.includes(keyword)
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
        description.toLowerCase().includes(source)
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

  // Minimal mock articles (only 3)
  const getMockArticles = (): CoffeeArticle[] => [
    {
      title: "Coffee Grinder Buying Guide",
      description:
        "Essential guide to choosing the right coffee grinder for your brewing needs.",
      url: "https://coffeegeek.com/grinder-guide",
      source: "Coffee Geek",
      readTime: "5 min read",
      category: "Coffee Grinders",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Espresso Machine Maintenance Tips",
      description:
        "How to keep your espresso machine in top condition for perfect shots.",
      url: "https://homebarista.com/maintenance",
      source: "Home Barista",
      readTime: "4 min read",
      category: "Espresso Machines",
      image:
        "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Mastering Pour Over Coffee",
      description: "Step-by-step guide to perfect pour over coffee every time.",
      url: "https://brewmethods.com/pour-over",
      source: "Brew Methods",
      readTime: "6 min read",
      category: "Pour Over Brewers",
      image:
        "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center",
    },
  ];

  // Get cached articles
  const getCachedArticles = (): CoffeeArticle[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { articles, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log("Using cached articles");
          return articles;
        }
      }
    } catch (err) {
      console.warn("Failed to read cache:", err);
    }
    return null;
  };

  // Save articles to cache
  const cacheArticles = (articles: CoffeeArticle[]) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          articles,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.warn("Failed to cache articles:", err);
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
      `API: ${apiArticles.length} total, ${coffeeArticles.length} coffee-related`
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
        article.description || ""
      ),
      image: article.image_url,
    }));
  };

  // Fetch from NewsData.io
  const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
    try {
      const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

      if (!apiKey || apiKey === "your_api_key_here") {
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
        `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&size=10`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
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

  // Main fetch function with cache and fallback
  // const fetchCoffeeArticles = async () => {
  //   try {
  //     setLoading(true);

  //     // 1. Check cache first
  //     const cached = getCachedArticles();
  //     if (cached && cached.length > 0) {
  //       setArticles(cached);
  //       setLoading(false);
  //       return;
  //     }

  //     // 2. Try to fetch from API
  //     console.log("Fetching fresh articles from API...");
  //     const apiArticles = await fetchFromNewsData();

  //     // 3. If we got API articles, use and cache them
  //     if (apiArticles.length > 0) {
  //       console.log(`Got ${apiArticles.length} articles from API`);
  //       setArticles(apiArticles);
  //       cacheArticles(apiArticles);
  //       return;
  //     }

  //     // 4. Fallback to mock data if API returns nothing
  //     console.log("API returned no articles, using mock data");
  //     const mockArticles = getMockArticles();
  //     setArticles(mockArticles);
  //     cacheArticles(mockArticles); // Cache mock data too
  //   } catch (err) {
  //     console.error("Error in fetch:", err);

  //     // 5. Ultimate fallback to mock data on error
  //     const mockArticles = getMockArticles();
  //     setArticles(mockArticles);
  //     cacheArticles(mockArticles);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Main fetch function - FIXED caching
  const fetchCoffeeArticles = async () => {
    try {
      setLoading(true);

      // 1. Check cache first - but only use if it has real API data
      const cached = getCachedArticles();
      if (cached && cached.length > 0) {
        // Check if cached data looks like real API data (not mock)
        const isRealAPIData = cached.some(
          (article) =>
            !article.source.includes("Coffee Geek") &&
            !article.source.includes("Home Barista") &&
            !article.source.includes("Brew Methods")
        );

        if (isRealAPIData) {
          console.log(`Using ${cached.length} cached API articles`);
          setArticles(cached);
          setLoading(false);
          return;
        } else {
          console.log("Cached data appears to be mock, refetching...");
        }
      }

      // 2. Start API fetch immediately
      console.log("Fetching from API...");

      // Show mock data immediately for instant UX
      const mockArticles = getMockArticles();
      setArticles(mockArticles);

      // 3. Fetch real API in background
      try {
        const apiArticles = await fetchFromNewsData();

        if (apiArticles.length >= 2) {
          // Lower threshold to accept more results
          console.log(`✅ Got ${apiArticles.length} real articles from API`);
          setArticles(apiArticles);
          // ONLY CACHE REAL API DATA, not mock
          cacheArticles(apiArticles);
        } else {
          console.log(
            `⚠️ Only got ${apiArticles.length} articles from API, keeping mock data`
          );
          // Don't cache mock data on API failure
        }
      } catch (err) {
        console.error("API fetch failed, keeping mock data:", err);
        // Don't cache on error
      }
    } catch (err) {
      console.error("Error in fetch:", err);
      // Show mock data as fallback
      const mockArticles = getMockArticles();
      setArticles(mockArticles);
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
//////////////////////////////////////////////////////////////// Here's the updated version that properly handles when API returns more than 3 articles:

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// interface CoffeeArticle {
//   title: string;
//   description: string;
//   url: string;
//   source: string;
//   readTime: string;
//   category: string;
//   image?: string;
// }

// // Cache configuration
// const CACHE_KEY = "coffee_news_cache_v3";
// const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

// const NewsdataArticles = () => {
//   const [articles, setArticles] = useState<CoffeeArticle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const articlesSectionRef = useRef<HTMLDivElement>(null);

//   // Scroll handling
//   const toggleShowAll = () => {
//     const wasShowingAll = showAll;
//     setShowAll(!showAll);

//     if (!wasShowingAll) {
//       setTimeout(() => {
//         if (articlesSectionRef.current) {
//           const yOffset = 200;
//           const y =
//             articlesSectionRef.current.getBoundingClientRect().top +
//             window.pageYOffset +
//             yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//         }
//       }, 150);
//     } else {
//       setTimeout(() => {
//         window.scrollBy({
//           top: -300,
//           behavior: "smooth",
//         });
//       }, 50);
//     }
//   };

//   // Coffee-related filter
//   const isCoffeeRelated = (title: string, description: string): boolean => {
//     const content = (title + " " + description).toLowerCase();

//     const coffeeKeywords = [
//       "coffee",
//       "espresso",
//       "brew",
//       "barista",
//       "roast",
//       "grinder",
//       "bean",
//       "caffeine",
//       "latte",
//       "cappuccino",
//       "mocha",
//       "arabica",
//       "robusta",
//       "specialty coffee",
//       "coffee shop",
//       "coffee industry",
//       "coffee machine",
//       "coffee maker",
//       "cold brew",
//       "pour over",
//       "french press",
//       "aeropress",
//       "drip coffee",
//       "coffee beans",
//     ];

//     return coffeeKeywords.some((keyword) => content.includes(keyword));
//   };

//   // Category determination
//   const determineCategory = (title: string, description: string): string => {
//     const content = (title + " " + description).toLowerCase();

//     if (content.includes("grinder")) return "Coffee Grinders";
//     if (content.includes("espresso machine") || content.includes("espresso"))
//       return "Espresso";
//     if (
//       content.includes("pour over") ||
//       content.includes("v60") ||
//       content.includes("chemex")
//     )
//       return "Pour Over";
//     if (content.includes("french press")) return "French Press";
//     if (content.includes("cold brew")) return "Cold Brew";
//     if (content.includes("aeropress")) return "AeroPress";
//     if (content.includes("drip coffee") || content.includes("drip machine"))
//       return "Drip Coffee";
//     if (
//       content.includes("scale") ||
//       content.includes("kettle") ||
//       content.includes("timer")
//     )
//       return "Accessories";
//     if (content.includes("bean") || content.includes("roast"))
//       return "Coffee Beans";
//     if (
//       content.includes("how to") ||
//       content.includes("guide") ||
//       content.includes("technique")
//     )
//       return "Brewing Guide";
//     if (
//       content.includes("review") ||
//       content.includes("best") ||
//       content.includes("top")
//     )
//       return "Product Review";

//     return "Coffee News";
//   };

//   // Minimal mock articles
//   const getMockArticles = (): CoffeeArticle[] => [
//     {
//       title: "Coffee Grinder Buying Guide",
//       description:
//         "Essential guide to choosing the right coffee grinder for your brewing needs.",
//       url: "https://coffeegeek.com/grinder-guide",
//       source: "Coffee Geek",
//       readTime: "5 min read",
//       category: "Coffee Grinders",
//       image:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Espresso Machine Maintenance Tips",
//       description:
//         "How to keep your espresso machine in top condition for perfect shots.",
//       url: "https://homebarista.com/maintenance",
//       source: "Home Barista",
//       readTime: "4 min read",
//       category: "Espresso Machines",
//       image:
//         "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&h=600&fit=crop&crop=center",
//     },
//     {
//       title: "Mastering Pour Over Coffee",
//       description: "Step-by-step guide to perfect pour over coffee every time.",
//       url: "https://brewmethods.com/pour-over",
//       source: "Brew Methods",
//       readTime: "6 min read",
//       category: "Pour Over Brewers",
//       image:
//         "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center",
//     },
//   ];

//   // Get cached articles
//   const getCachedArticles = (): CoffeeArticle[] | null => {
//     try {
//       const cached = localStorage.getItem(CACHE_KEY);
//       if (cached) {
//         const { articles, timestamp } = JSON.parse(cached);
//         if (Date.now() - timestamp < CACHE_DURATION) {
//           console.log(`Using ${articles.length} cached articles`);
//           return articles;
//         }
//       }
//     } catch (err) {
//       console.warn("Failed to read cache:", err);
//     }
//     return null;
//   };

//   // Save articles to cache
//   const cacheArticles = (articles: CoffeeArticle[]) => {
//     try {
//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           articles,
//           timestamp: Date.now(),
//         })
//       );
//       console.log(`Cached ${articles.length} articles`);
//     } catch (err) {
//       console.warn("Failed to cache articles:", err);
//     }
//   };

//   // Process NewsData.io articles
//   const processNewsDataArticles = (apiArticles: any[]): CoffeeArticle[] => {
//     if (!apiArticles || !Array.isArray(apiArticles)) {
//       return [];
//     }

//     // Filter for coffee-related articles
//     const coffeeArticles = apiArticles.filter((article) => {
//       const title = article.title || "";
//       const description = article.description || "";
//       return isCoffeeRelated(title, description);
//     });

//     console.log(
//       `API returned: ${apiArticles.length} total, ${coffeeArticles.length} coffee-related`
//     );

//     // Show first 6 coffee articles (can be 0-6)
//     return coffeeArticles.slice(0, 6).map((article) => ({
//       title: article.title || "Coffee News",
//       description: article.description || "Latest coffee updates",
//       url: article.link || "#",
//       source: article.source_id || "News Source",
//       readTime: `${Math.ceil((article.description?.length || 300) / 200)} min read`,
//       category: determineCategory(
//         article.title || "",
//         article.description || ""
//       ),
//       image: article.image_url,
//     }));
//   };

//   // Fetch from NewsData.io
//   const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
//     try {
//       const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

//       if (!apiKey || apiKey === "your_api_key_here") {
//         console.log("No API key found");
//         return [];
//       }

//       // Use broader coffee queries to get more results
//       const coffeeQueries = [
//         "coffee",
//         "espresso",
//         "coffee brewing",
//         "coffee equipment",
//         "specialty coffee",
//         "barista",
//       ];

//       const query =
//         coffeeQueries[Math.floor(Math.random() * coffeeQueries.length)];
//       console.log(`Fetching with query: "${query}"`);

//       // Request more articles (size=20) to increase chances of coffee articles
//       const response = await fetch(
//         `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&size=20`
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (
//         data.status === "success" &&
//         data.results &&
//         data.results.length > 0
//       ) {
//         console.log(`Raw API results: ${data.results.length} articles`);
//         return processNewsDataArticles(data.results);
//       }

//       console.log("API returned no results");
//       return [];
//     } catch (err) {
//       console.error("NewsData API failed:", err);
//       return [];
//     }
//   };

//   // Main fetch function with cache and fallback
//   const fetchCoffeeArticles = async () => {
//     try {
//       setLoading(true);

//       // 1. Check cache first
//       const cached = getCachedArticles();
//       if (cached && cached.length > 0) {
//         setArticles(cached);
//         setLoading(false);
//         return;
//       }

//       // 2. Try to fetch from API
//       console.log("Fetching fresh articles from API...");
//       const apiArticles = await fetchFromNewsData();

//       // 3. If we got API articles (any amount), use and cache them
//       if (apiArticles.length > 0) {
//         console.log(
//           `✅ Got ${apiArticles.length} real coffee articles from API`
//         );
//         setArticles(apiArticles);
//         cacheArticles(apiArticles);
//         return;
//       }

//       // 4. Fallback to mock data if API returns nothing
//       console.log("❌ API returned no articles, using mock data");
//       const mockArticles = getMockArticles();
//       setArticles(mockArticles);
//       cacheArticles(mockArticles);
//     } catch (err) {
//       console.error("Error in fetch:", err);

//       // 5. Ultimate fallback to mock data on error
//       const mockArticles = getMockArticles();
//       setArticles(mockArticles);
//       cacheArticles(mockArticles);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize
//   useEffect(() => {
//     fetchCoffeeArticles();
//   }, []);

//   // Handle article click
//   const handleOpenArticle = (url: string) => {
//     if (url && url !== "#") {
//       window.open(url, "_blank", "noopener,noreferrer");
//     }
//   };

//   // Refresh with cache clear
//   const handleRetry = () => {
//     localStorage.removeItem(CACHE_KEY);
//     fetchCoffeeArticles();
//   };

//   // Display articles
//   const displayArticles = showAll ? articles : articles.slice(0, 3);

//   return (
//     <section
//       className="w-full py-20 relative bg-cover bg-center bg-no-repeat min-h-screen contain-content flex justify-center items-center"
//       style={{ backgroundImage: "url('/back.jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mrs-saint-delafield-regular text-4xl font-bold text-gray-200 mb-4">
//             From The Brew Guide
//           </h2>
//           <p className="text-xl text-gray-200">
//             Expert tips, brewing guides, and coffee education from top sources
//           </p>
//           <div className="mt-4 flex justify-center gap-4">
//             <button
//               onClick={handleRetry}
//               className="text-sm text-gray-300 hover:text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//               title="Get fresh articles"
//             >
//               Refresh Articles
//             </button>
//             {articles.length > 0 && (
//               <div className="text-sm text-gray-300">
//                 Showing {displayArticles.length} of {articles.length} articles
//               </div>
//             )}
//           </div>
//         </div>

//         <div ref={articlesSectionRef}>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//             </div>
//           ) : (
//             <>
//               {articles.length === 0 ? (
//                 <div className="text-center text-gray-200 py-12">
//                   <p className="text-lg mb-4">No coffee articles available.</p>
//                   <button
//                     onClick={handleRetry}
//                     className="bg-transparent border-2 border-gray-200 text-gray-200 px-6 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid md:grid-cols-3 gap-8">
//                     {displayArticles.map((article, index) => (
//                       <motion.div
//                         key={`${article.title}-${index}`}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: index * 0.2 }}
//                         className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
//                         onClick={() => handleOpenArticle(article.url)}
//                       >
//                         <div
//                           className="h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative overflow-hidden"
//                           style={{
//                             backgroundImage: `url(${article.image || "/fallback-image.jpg"})`,
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                           }}
//                         >
//                           <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
//                           <div className="relative z-10 text-white text-center p-4">
//                             <span className="text-2xl font-bold drop-shadow-lg">
//                               {article.source}
//                             </span>
//                             <p className="mt-2 text-sm opacity-90 drop-shadow-md">
//                               {article.category}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="p-6">
//                           <span className="text-sm text-[#8B4513] font-semibold">
//                             {article.category}
//                           </span>
//                           <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
//                             {article.title}
//                           </h3>
//                           <p className="text-gray-600 mb-4 text-sm line-clamp-3">
//                             {article.description}
//                           </p>
//                           <div className="flex justify-between items-center text-sm text-gray-600">
//                             <div className="flex items-center gap-4">
//                               <span>{article.readTime}</span>
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[100px]">
//                                 {article.source}
//                               </span>
//                             </div>
//                             <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
//                               Read →
//                             </span>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Show "View All" button if we have more than 3 articles */}
//                   {articles.length > 3 && (
//                     <div className="text-center mt-12">
//                       <button
//                         onClick={toggleShowAll}
//                         className="bg-transparent border-2 border-gray-200 text-gray-200 px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
//                       >
//                         {showAll ? (
//                           <>
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M5 15l7-7 7 7"
//                               />
//                             </svg>
//                             Show Less (First 3)
//                           </>
//                         ) : (
//                           <>
//                             View All {articles.length} Articles
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 9l-7 7-7-7"
//                               />
//                             </svg>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsdataArticles;
