////////////////////////////////////// when we use https://newsapi.org/\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

// // REMOVED "async" from function name - this was the problem!
// export default function FetchnewsApiarticles() {
//   const [articles, setArticles] = useState<CoffeeArticle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showAll, setShowAll] = useState(false);
//   const articlesSectionRef = useRef<HTMLDivElement>(null);
//   const toggleShowAll = () => {
//     const wasShowingAll = showAll;
//     setShowAll(!showAll);

//     // If we're EXPANDING (showing more articles)
//     if (!wasShowingAll) {
//       setTimeout(() => {
//         if (articlesSectionRef.current) {
//           const yOffset = 200; // Scroll down a bit to see new articles
//           const y =
//             articlesSectionRef.current.getBoundingClientRect().top +
//             window.pageYOffset +
//             yOffset;

//           window.scrollTo({
//             top: y,
//             behavior: "smooth",
//           });
//         }
//       }, 150); // Slightly longer delay to ensure DOM updates
//     }
//     // If we're COLLAPSING (showing less articles), optional scroll up
//     else {
//       setTimeout(() => {
//         // Scroll up a bit to keep the button in view
//         window.scrollBy({
//           top: -300,
//           behavior: "smooth",
//         });
//       }, 50);
//     }
//   };
//   const determineCategory = (title: string, description: string): string => {
//     const content = (title + " " + description).toLowerCase();

//     // EQUIPMENT CATEGORIES (updated for your equipment focus)
//     if (
//       content.includes("grinder") ||
//       content.includes("grind") ||
//       content.includes("burr")
//     ) {
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
//     } else if (
//       content.includes("cold brew") ||
//       content.includes("toddy") ||
//       content.includes("nitro")
//     ) {
//       return "Cold Brew Equipment";
//     } else if (
//       content.includes("aero press") ||
//       content.includes("aeropress")
//     ) {
//       return "AeroPress";
//     } else if (content.includes("moka pot") || content.includes("brikka")) {
//       return "Stovetop Brewers";
//     } else if (
//       content.includes("drip coffee") ||
//       content.includes("drip machine")
//     ) {
//       return "Drip Coffee Makers";
//     } else if (content.includes("scale") || content.includes("timer")) {
//       return "Brewing Accessories";
//     } else if (content.includes("kettle") || content.includes("gooseneck")) {
//       return "Brewing Kettles";
//     } else if (content.includes("filter") || content.includes("paper filter")) {
//       return "Brewing Filters";
//     } else if (
//       content.includes("tamper") ||
//       content.includes("portafilter") ||
//       content.includes("frother")
//     ) {
//       return "Espresso Accessories";
//     }

//     // COFFEE BEAN CATEGORIES
//     else if (
//       content.includes("bean") ||
//       content.includes("roast") ||
//       content.includes("arabica") ||
//       content.includes("robusta")
//     ) {
//       if (
//         content.includes("light roast") ||
//         content.includes("lightly roasted")
//       ) {
//         return "Light Roast Coffee";
//       } else if (
//         content.includes("medium roast") ||
//         content.includes("medium roasted")
//       ) {
//         return "Medium Roast Coffee";
//       } else if (
//         content.includes("dark roast") ||
//         content.includes("dark roasted")
//       ) {
//         return "Dark Roast Coffee";
//       } else if (
//         content.includes("espresso roast") ||
//         content.includes("espresso blend")
//       ) {
//         return "Espresso Coffee";
//       }
//       return "Coffee Beans";
//     }

//     // BREWING METHODS
//     else if (
//       content.includes("brewing method") ||
//       content.includes("how to brew")
//     ) {
//       if (content.includes("pour over") || content.includes("manual brew")) {
//         return "Pour Over Guide";
//       } else if (content.includes("espresso") || content.includes("shot")) {
//         return "Espresso Guide";
//       } else if (
//         content.includes("french press") ||
//         content.includes("immersion")
//       ) {
//         return "French Press Guide";
//       } else if (
//         content.includes("cold brew") ||
//         content.includes("iced coffee")
//       ) {
//         return "Cold Brew Guide";
//       }
//       return "Brewing Guides";
//     }

//     // GENERAL CATEGORIES
//     else if (
//       content.includes("review") ||
//       content.includes("buyer") ||
//       content.includes("best") ||
//       content.includes("top")
//     ) {
//       if (content.includes("machine") || content.includes("equipment")) {
//         return "Equipment Reviews";
//       } else if (content.includes("coffee") || content.includes("beans")) {
//         return "Coffee Reviews";
//       }
//       return "Product Reviews";
//     } else if (
//       content.includes("technique") ||
//       content.includes("tutorial") ||
//       content.includes("how to") ||
//       content.includes("guide")
//     ) {
//       return "Brewing Techniques";
//     } else if (
//       content.includes("maintenance") ||
//       content.includes("clean") ||
//       content.includes("care")
//     ) {
//       return "Equipment Maintenance";
//     } else if (
//       content.includes("comparison") ||
//       content.includes("vs") ||
//       content.includes("versus")
//     ) {
//       return "Product Comparisons";
//     }

//     // DEFAULT
//     return "Coffee & Equipment";
//   };
//   useEffect(() => {
//     fetchCoffeeArticles();
//   }, []);

//   const fetchCoffeeArticles = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         // `https://newsapi.org/v2/everything?q=(coffee+OR+espresso)+AND+(equipment+OR+grinder+OR+machine+OR+brewer+OR+accessories)&language=en&pageSize=6&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`
//         `https://newsapi.org/v2/everything?q=(coffee+OR+espresso)+AND+(equipment+OR+grinder+OR+machine+OR+brewer+OR+accessories)&language=en&pageSize=6&apiKey=c2c97e21245c403b8613575f1e24995f`
//       );
//       const data = await response.json();

//       const articlesData = data?.articles?.map((article: any) => ({
//         title: article.title,
//         description:
//           article.description || "Coffee equipment or brewing related article",
//         url: article.url,
//         source: article.source.name,
//         readTime: `${Math.ceil(article.content?.length / 500) || 3} min read`,
//         category: determineCategory(article.title, article.description),
//         image: article.urlToImage,
//       }));
//       console.log(
//         "articles imges:",
//         articlesData.map((article: any) => article.image)
//       );

//       setArticles(articlesData);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching articles:", err);
//       setError("Failed to load articles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenArticle = (url: string) => {
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

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
//           ) : error ? (
//             <div className="text-center text-red-300">
//               <p>{error}</p>
//               <button
//                 onClick={fetchCoffeeArticles}
//                 className="mt-4 bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6B3410] transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-8">
//               {(showAll ? articles : articles?.slice(0, 3)).map(
//                 (article, index) => (
//                   <motion.div
//                     key={article.title}
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
//                       {/* Overlay for better text visibility */}
//                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

//                       {/* Content on top of image */}
//                       <div className="relative z-10 text-white text-center p-4">
//                         <span className="text-2xl font-bold drop-shadow-lg">
//                           {article.source}
//                         </span>
//                         <p className="mt-2 text-sm opacity-90 drop-shadow-md">
//                           External Article
//                         </p>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <span className="text-sm text-[#8B4513] font-semibold">
//                         {article.category}
//                       </span>
//                       <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 group-hover:text-[#8B4513] transition-colors">
//                         {article.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 text-sm">
//                         {article.description}
//                       </p>
//                       <div className="flex justify-between items-center text-sm text-gray-600">
//                         <div className="flex items-center gap-4">
//                           <span>{article.readTime}</span>
//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//                             {article.source}
//                           </span>
//                         </div>
//                         <span className="text-[#8B4513] font-semibold group-hover:translate-x-2 transition-transform">
//                           Read Article →
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )
//               )}
//             </div>
//           )}
//         </div>

//         {/* Show toggle button - changes text based on state */}
//         {articles.length > 3 && (
//           <div className="text-center mt-12">
//             <button
//               onClick={toggleShowAll}
//               className="bg-transparent border-2 border-gray-200 text-gray-200 px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
//             >
//               {showAll ? (
//                 <>
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 15l7-7 7 7"
//                     />
//                   </svg>
//                   Show Less
//                 </>
//               ) : (
//                 <>
//                   View All {articles.length} Articles
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

/////////////////////////////////////// when we use newsdata.io:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// app/components/FetchNewsAPIArticles.tsx
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

// export default function FetchNewsAPIArticles() {
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
// }
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

// export default function FetchNewsAPIArticles() {
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
//     // Only run in browser
//     if (typeof window === "undefined") return null;

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
//     // Only run in browser
//     if (typeof window === "undefined") return;

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

//   // FIXED: Handle API key safely
//   const getApiKey = (): string | null => {
//     // Check if we're in browser environment
//     if (typeof window === "undefined") return null;

//     // Check if import.meta.env is available
//     if (typeof import.meta !== "undefined" && import.meta.env) {
//       const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
//       if (
//         apiKey &&
//         apiKey !== "your_api_key_here" &&
//         !apiKey.includes("your_api_key")
//       ) {
//         return apiKey;
//       }
//     }

//     return null;
//   };

//   // FIXED: Safe API fetch
//   const fetchFromNewsData = async (): Promise<CoffeeArticle[]> => {
//     try {
//       const apiKey = getApiKey();

//       // If no API key, return mock data
//       if (!apiKey) {
//         console.log("No API key available, using mock data");
//         return getMockArticles();
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
//         data &&
//         data.status === "success" &&
//         Array.isArray(data.results) &&
//         data.results.length > 0
//       ) {
//         console.log(`Raw API results: ${data.results.length} articles`);

//         // Filter for coffee-related articles ONLY
//         const coffeeArticles = data.results.filter((article: any) => {
//           const title = article.title || "";
//           const description = article.description || "";
//           return isCoffeeRelated(title, description);
//         });

//         console.log(`After coffee filter: ${coffeeArticles.length} articles`);

//         // If we have at least 3 coffee articles, use them
//         if (coffeeArticles.length >= 3) {
//           return coffeeArticles
//             .slice(0, 6)
//             .map((article: any, index: number) => ({
//               title: article.title || "Coffee News",
//               description:
//                 article.description || "Latest in coffee equipment and brewing",
//               url: article.link || "#",
//               source: article.source_id || "Coffee News Source",
//               readTime: `${Math.ceil((article.description?.length || 500) / 200)} min read`,
//               category: determineCategory(
//                 article.title || "",
//                 article.description || ""
//               ),
//               image: article.image_url || getMockArticles()[index]?.image,
//             }));
//         }
//       }

//       // Fall back to mock data
//       return getMockArticles();
//     } catch (err) {
//       console.error("NewsData API fetch failed:", err);
//       return getMockArticles();
//     }
//   };

//   // FIXED: Main fetch function
//   const fetchCoffeeArticles = async () => {
//     try {
//       setLoading(true);

//       // 1. Check cache first (browser only)
//       if (typeof window !== "undefined") {
//         const cached = getCachedArticles();
//         if (cached && cached.length >= 3) {
//           console.log("Using cached articles");
//           setArticles(cached);
//           setLoading(false);
//           return;
//         }
//       }

//       // 2. Try to fetch from NewsData.io (only in browser)
//       if (typeof window !== "undefined") {
//         console.log("Attempting to fetch from NewsData.io...");
//         const newsDataArticles = await fetchFromNewsData();

//         if (newsDataArticles.length >= 3) {
//           console.log(
//             `Success! Got ${newsDataArticles.length} coffee articles`
//           );
//           setArticles(newsDataArticles);
//           cacheArticles(newsDataArticles);
//           setLoading(false);
//           return;
//         }
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

//   // Initialize - only in browser
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       fetchCoffeeArticles();
//     } else {
//       // During SSR/build, just set loading false
//       setLoading(false);
//     }
//   }, []);

//   // Handle article click
//   const handleOpenArticle = (url: string) => {
//     if (url && url !== "#" && typeof window !== "undefined") {
//       window.open(url, "_blank", "noopener,noreferrer");
//     }
//   };

//   // Refresh articles
//   const handleRetry = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(CACHE_KEY);
//       fetchCoffeeArticles();
//     }
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
//                         backgroundImage: `url(${article.image || "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center"})`,
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
// }

// app/components/FetchnewsAPIArticles.tsx
import { useState } from "react";

export default function FetchNewsAPIArticles() {
  const articles = [
    {
      title: "The Ultimate Guide to Choosing a Coffee Grinder",
      description:
        "Learn about burr vs blade grinders and find the perfect one.",
      source: "Coffee Gear Experts",
      readTime: "7 min read",
      category: "Coffee Grinders",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Espresso Machine Maintenance: Essential Tips",
      description: "Keep your espresso machine in perfect condition.",
      source: "Home Barista",
      readTime: "5 min read",
      category: "Espresso Machines",
      image:
        "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Mastering Pour Over Coffee",
      description: "Step-by-step guide to perfect pour over coffee.",
      source: "Brewing Champions",
      readTime: "8 min read",
      category: "Pour Over Brewers",
      image:
        "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop&crop=center",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            From The Brew Guide
          </h2>
          <p className="text-xl text-gray-600">
            Expert tips, brewing guides, and coffee education
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="p-6">
                <span className="text-sm text-[#8B4513] font-semibold">
                  {article.category}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {article.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{article.readTime}</span>
                  <span className="font-medium">{article.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
