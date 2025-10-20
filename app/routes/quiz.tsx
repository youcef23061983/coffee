// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

// type QuizOption = {
//   value: string;
//   label: string;
//   icon?: string;
//   description?: string;
// };

// type QuizQuestion = {
//   id: string;
//   question: string;
//   type: "single" | "multiple";
//   options: QuizOption[];
// };

// type QuizAnswers = {
//   brewMethod: string;
//   flavorPreferences: string[];
//   experienceLevel: string;
//   roastPreference: string;
//   caffeinePreference: string;
//   budget: string;
// };

// type CoffeeRecommendation = {
//   id: string;
//   name: string;
//   roaster: string;
//   description: string;
//   price: number;
//   match: number;
//   roast: string;
//   flavorProfile: string[];
//   imageUrl?: string;
// };

// export default function CoffeeQuizPage() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState<QuizAnswers>({
//     brewMethod: "",
//     flavorPreferences: [],
//     roastPreference: "",
//     experienceLevel: "",
//     caffeinePreference: "",
//     budget: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const supabase = useSupabaseClient();

//   const questions: QuizQuestion[] = [
//     {
//       id: "brewMethod",
//       question: "How do you usually brew your coffee?",
//       type: "single",
//       options: [
//         { value: "espresso", label: "Espresso Machine", icon: "☕" },
//         { value: "pourOver", label: "Pour Over", icon: "💧" },
//         { value: "frenchPress", label: "French Press", icon: "🫖" },
//         { value: "drip", label: "Drip Machine", icon: "⚡" },
//         { value: "coldBrew", label: "Cold Brew", icon: "❄️" },
//         { value: "aeropress", label: "AeroPress", icon: "🧪" },
//       ],
//     },
//     {
//       id: "flavorPreferences",
//       question: "What flavors do you enjoy in coffee?",
//       type: "multiple",
//       options: [
//         { value: "chocolate", label: "Chocolate & Nutty", icon: "🍫" },
//         { value: "fruity", label: "Fruity & Bright", icon: "🍓" },
//         { value: "caramel", label: "Caramel & Sweet", icon: "🍯" },
//         { value: "floral", label: "Floral & Tea-like", icon: "🌺" },
//         { value: "spicy", label: "Spicy & Bold", icon: "🌶️" },
//         { value: "balanced", label: "Well-Balanced", icon: "⚖️" },
//       ],
//     },
//     {
//       id: "roastPreference",
//       question: "What roast level do you prefer?",
//       type: "single",
//       options: [
//         {
//           value: "light",
//           label: "Light Roast",
//           description: "Bright, acidic, complex",
//         },
//         {
//           value: "medium",
//           label: "Medium Roast",
//           description: "Balanced, sweet, versatile",
//         },
//         {
//           value: "dark",
//           label: "Dark Roast",
//           description: "Bold, smoky, intense",
//         },
//         {
//           value: "dontKnow",
//           label: "I'm not sure",
//           description: "Help me discover",
//         },
//       ],
//     },
//     {
//       id: "experienceLevel",
//       question: "How would you describe your coffee experience?",
//       type: "single",
//       options: [
//         {
//           value: "beginner",
//           label: "Just getting started",
//           description: "New to specialty coffee",
//         },
//         {
//           value: "enthusiast",
//           label: "Coffee Enthusiast",
//           description: "I know what I like",
//         },
//         {
//           value: "expert",
//           label: "Coffee Expert",
//           description: "Very particular about my brew",
//         },
//       ],
//     },
//     {
//       id: "caffeinePreference",
//       question: "How do you feel about caffeine?",
//       type: "single",
//       options: [
//         { value: "regular", label: "Give me all the caffeine!", icon: "⚡" },
//         { value: "moderate", label: "Moderate caffeine", icon: "☕" },
//         { value: "decaf", label: "Decaf preferred", icon: "😴" },
//         { value: "mix", label: "Mix of both", icon: "🔄" },
//       ],
//     },
//     {
//       id: "budget",
//       question: "What's your coffee budget?",
//       type: "single",
//       options: [
//         {
//           value: "budget",
//           label: "Budget Friendly",
//           description: "Under $15/lb",
//         },
//         { value: "midrange", label: "Mid Range", description: "$16-$25/lb" },
//         { value: "premium", label: "Premium", description: "$26+/lb" },
//       ],
//     },
//     {
//       id: "consumptionHabits",
//       question: "How do you usually drink your coffee?",
//       type: "single",
//       options: [
//         { value: "black", label: "Black", icon: "⚫" },
//         { value: "withMilk", label: "With Milk/Cream", icon: "🥛" },
//         { value: "sweetened", label: "Sweetened", icon: "🍯" },
//         { value: "iced", label: "Iced/Cold", icon: "🧊" },
//       ],
//     },
//     {
//       id: "purchaseFrequency",
//       question: "How often do you buy coffee beans?",
//       type: "single",
//       options: [
//         { value: "weekly", label: "Weekly", description: "Fresh is best!" },
//         {
//           value: "biweekly",
//           label: "Every 2 weeks",
//           description: "Regular drinker",
//         },
//         { value: "monthly", label: "Monthly", description: "Casual enjoyer" },
//         {
//           value: "occasional",
//           label: "Occasionally",
//           description: "When I run out",
//         },
//       ],
//     },
//   ];

//   // ========== RECOMMENDATION FUNCTIONS ==========

//   const getRoastLevelsFromPreference = (preference: string): string[] => {
//     const mapping: { [key: string]: string[] } = {
//       light: ["light"],
//       medium: ["medium"],
//       dark: ["dark", "espresso"],
//       dontKnow: ["light", "medium", "dark", "espresso"],
//     };
//     return mapping[preference] || ["light", "medium"];
//   };

//   const getBudgetRange = (budget: string): { min: number; max: number } => {
//     const mapping: { [key: string]: { min: number; max: number } } = {
//       budget: { min: 0, max: 15 },
//       midrange: { min: 16, max: 25 },
//       premium: { min: 26, max: 100 },
//     };
//     return mapping[budget] || { min: 0, max: 50 };
//   };

//   const calculateMatchPercentage = (
//     coffee: any,
//     answers: QuizAnswers
//   ): number => {
//     let score = 0;
//     const maxScore = 100;

//     // Roast level (25 points)
//     const preferredRoasts = getRoastLevelsFromPreference(
//       answers.roastPreference
//     );
//     if (coffee.roast_level === answers.roastPreference) {
//       score += 25;
//     } else if (preferredRoasts.includes(coffee.roast_level)) {
//       score += 15;
//     }

//     // Flavor profile (35 points)
//     if (answers.flavorPreferences.length > 0) {
//       const matchingFlavors = coffee.flavor_profile.filter((flavor: string) =>
//         answers.flavorPreferences.includes(flavor)
//       );
//       score += (matchingFlavors.length / answers.flavorPreferences.length) * 35;
//     }

//     // Budget (20 points)
//     const budgetRange = getBudgetRange(answers.budget);
//     const price = Number(coffee.price);
//     if (price >= budgetRange.min && price <= budgetRange.max) {
//       score += 20;
//     } else if (price <= budgetRange.max * 1.2) {
//       // Allow slight over-budget
//       score += 10;
//     }

//     // Experience level consideration (10 points)
//     if (answers.experienceLevel === "beginner" && price <= 20) {
//       score += 10;
//     } else if (answers.experienceLevel === "expert" && price >= 22) {
//       score += 10;
//     }

//     // Brew method compatibility (10 points)
//     if (isBrewMethodCompatible(coffee, answers.brewMethod)) {
//       score += 10;
//     }

//     return Math.min(Math.round(score), 95);
//   };

//   const isBrewMethodCompatible = (coffee: any, brewMethod: string): boolean => {
//     const compatibility: { [key: string]: string[] } = {
//       espresso: ["medium", "dark", "espresso"],
//       pourOver: ["light", "medium"],
//       frenchPress: ["medium", "dark"],
//       drip: ["light", "medium", "dark"],
//       coldBrew: ["light", "medium"],
//       aeropress: ["light", "medium", "dark"],
//     };

//     return compatibility[brewMethod]?.includes(coffee.roast_level) || true;
//   };
//   // Validation function
//   // Validation function
//   const validateQuizAnswers = (answers: QuizAnswers): boolean => {
//     const requiredFields: (keyof QuizAnswers)[] = [
//       "brewMethod",
//       "roastPreference",
//       "experienceLevel",
//       "caffeinePreference",
//       "budget",
//     ];

//     return (
//       requiredFields.every(
//         (field) => answers[field] && answers[field].toString().length > 0
//       ) && answers.flavorPreferences.length > 0
//     );
//   };

//   // Enhanced submit function
//   const submitQuiz = async () => {
//     if (!validateQuizAnswers(answers)) {
//       // Highlight missing fields or show error
//       console.error("Please complete all questions");
//       return;
//     }

//     setLoading(true);
//     try {
//       const [recommendedCoffees, recommendedEquipment] = await Promise.all([
//         getCoffeeRecommendations(answers),
//         getEquipmentRecommendations(answers),
//       ]);

//       // Store in session storage as backup
//       sessionStorage.setItem(
//         "quizResults",
//         JSON.stringify({
//           answers,
//           recommendedCoffees,
//           recommendedEquipment,
//           timestamp: new Date().toISOString(),
//         })
//       );

//       navigate("/results", {
//         state: { answers, recommendedCoffees, recommendedEquipment },
//         replace: true, // Prevent going back to quiz
//       });
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//       // Try to recover from session storage
//       const storedResults = sessionStorage.getItem("quizResults");
//       if (storedResults) {
//         const results = JSON.parse(storedResults);
//         navigate("/results", { state: results });
//       } else {
//         navigate("/results", {
//           state: {
//             answers,
//             recommendedCoffees: getFallbackRecommendations(answers),
//             recommendedEquipment: [],
//             error: "Unable to generate personalized recommendations",
//           },
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFallbackRecommendations = (
//     answers: QuizAnswers
//   ): CoffeeRecommendation[] => {
//     return [
//       {
//         id: "1",
//         name: "Ethiopia Yirgacheffe",
//         roaster: "Summit Roasters",
//         description: "Bright and floral with notes of bergamot and blueberry",
//         price: 24.99,
//         match: 85,
//         roast: "Light",
//         flavorProfile: ["fruity", "floral"],
//       },
//       {
//         id: "2",
//         name: "Colombia Huila Reserve",
//         roaster: "Method Coffee",
//         description: "Balanced with chocolate notes and caramel sweetness",
//         price: 21.99,
//         match: 80,
//         roast: "Medium",
//         flavorProfile: ["chocolate", "caramel"],
//       },
//       {
//         id: "3",
//         name: "House Blend",
//         roaster: "Conscious Cup",
//         description: "Well-balanced and approachable daily drinker",
//         price: 19.99,
//         match: 75,
//         roast: "Medium",
//         flavorProfile: ["balanced", "chocolate"],
//       },
//     ];
//   };

//   const getCoffeeRecommendations = async (
//     quizAnswers: QuizAnswers
//   ): Promise<CoffeeRecommendation[]> => {
//     try {
//       const roastLevels = getRoastLevelsFromPreference(
//         quizAnswers.roastPreference
//       );
//       const flavorProfiles = quizAnswers.flavorPreferences;
//       const budgetRange = getBudgetRange(quizAnswers.budget);

//       console.log("Querying with:", {
//         roastLevels,
//         flavorProfiles,
//         budgetRange,
//       });

//       // First, try to get ALL coffees to see what's available
//       const { data: allCoffees, error: allError } = await supabase
//         .from("coffee_products")
//         .select(
//           `
//         id,
//         name,
//         description,
//         roast_level,
//         flavor_profile,
//         price,
//         image_url,
//         brands (
//           name,
//           sustainability_rating
//         )
//       `
//         )
//         .eq("in_stock", true)
//         .limit(20);

//       if (allError) {
//         console.error("Error fetching all coffees:", allError);
//         return getFallbackRecommendations(quizAnswers);
//       }

//       console.log("All available coffees:", allCoffees);

//       // Filter manually in JavaScript instead of using Postgres JSONB operators
//       const filteredCoffees = allCoffees.filter((coffee) => {
//         // Check roast level
//         const roastMatch = roastLevels.includes(coffee.roast_level);

//         // Check flavor profile (manual filtering)
//         let flavorMatch = true;
//         if (flavorProfiles.length > 0) {
//           // Check if coffee has ANY of the preferred flavors
//           flavorMatch = flavorProfiles.some(
//             (flavor) =>
//               coffee.flavor_profile && coffee.flavor_profile.includes(flavor)
//           );
//         }

//         // Check budget
//         const price = Number(coffee.price);
//         const budgetMatch =
//           price >= budgetRange.min && price <= budgetRange.max;

//         return roastMatch && flavorMatch && budgetMatch;
//       });

//       console.log("Filtered coffees:", filteredCoffees);

//       // If we have matches, use them
//       if (filteredCoffees.length > 0) {
//         const recommendations = filteredCoffees.slice(0, 6).map((coffee) => {
//           const brand =
//             coffee.brands && coffee.brands[0]
//               ? coffee.brands[0]
//               : { name: "Unknown Roaster" };

//           return {
//             id: coffee.id,
//             name: coffee.name,
//             roaster: brand.name,
//             description: coffee.description,
//             price: coffee.price,
//             match: calculateMatchPercentage(coffee, quizAnswers),
//             roast: coffee.roast_level,
//             flavorProfile: coffee.flavor_profile || [],
//             imageUrl: coffee.image_url,
//           };
//         });
//         return recommendations;
//       }

//       // If no matches, try broader search
//       console.log("No exact matches, trying broader search...");
//       const broaderResults = await getBroaderCoffeeRecommendations(
//         quizAnswers,
//         allCoffees
//       );
//       return broaderResults.length > 0
//         ? broaderResults
//         : getFallbackRecommendations(quizAnswers);
//     } catch (error) {
//       console.error("Error in getCoffeeRecommendations:", error);
//       return getFallbackRecommendations(quizAnswers);
//     }
//   };

//   // Broader search function
//   const getBroaderCoffeeRecommendations = async (
//     quizAnswers: QuizAnswers,
//     allCoffees?: any[]
//   ): Promise<CoffeeRecommendation[]> => {
//     try {
//       const roastLevels = getRoastLevelsFromPreference(
//         quizAnswers.roastPreference
//       );
//       const budgetRange = getBudgetRange(quizAnswers.budget);

//       let coffeesToSearch = allCoffees;

//       // If allCoffees not provided, fetch them
//       if (!coffeesToSearch) {
//         const { data, error } = await supabase
//           .from("coffee_products")
//           .select(
//             `
//           id,
//           name,
//           description,
//           roast_level,
//           flavor_profile,
//           price,
//           image_url,
//           brands (name, sustainability_rating)
//         `
//           )
//           .eq("in_stock", true)
//           .limit(20);

//         if (error) throw error;
//         coffeesToSearch = data;
//       }

//       // Broader filtering - relax some constraints
//       const broaderMatches = coffeesToSearch.filter((coffee) => {
//         const price = Number(coffee.price);

//         // Only check roast level and budget, ignore flavor profiles
//         const roastMatch = roastLevels.includes(coffee.roast_level);
//         const budgetMatch =
//           price >= budgetRange.min && price <= budgetRange.max * 1.5; // More flexible budget

//         return roastMatch && budgetMatch;
//       });

//       if (broaderMatches.length > 0) {
//         return broaderMatches.slice(0, 6).map((coffee) => {
//           const brand =
//             coffee.brands && coffee.brands[0]
//               ? coffee.brands[0]
//               : { name: "Unknown Roaster" };

//           return {
//             id: coffee.id,
//             name: coffee.name,
//             roaster: brand.name,
//             description: coffee.description,
//             price: coffee.price,
//             match: calculateMatchPercentage(coffee, quizAnswers),
//             roast: coffee.roast_level,
//             flavorProfile: coffee.flavor_profile || [],
//             imageUrl: coffee.image_url,
//           };
//         });
//       }

//       return [];
//     } catch (error) {
//       console.error("Error in broader search:", error);
//       return [];
//     }
//   };
//   // Temporary function to debug database contents
//   const checkDatabaseContents = async () => {
//     try {
//       // Check all coffee products
//       const { data: allCoffees, error } = await supabase
//         .from("coffee_products")
//         .select(
//           `
//         id,
//         name,
//         roast_level,
//         flavor_profile,
//         price,
//         in_stock,
//         brands (name)
//       `
//         )
//         .limit(10);

//       console.log("All coffee products in database:", allCoffees);
//       console.log("Database error:", error);

//       // Check specific filters
//       const { data: lightRoasts } = await supabase
//         .from("coffee_products")
//         .select("id, name, roast_level")
//         .eq("roast_level", "light");

//       console.log("Light roast coffees:", lightRoasts);

//       const { data: chocolateFlavors } = await supabase
//         .from("coffee_products")
//         .select("id, name, flavor_profile")
//         .contains("flavor_profile", ["chocolate"]);

//       console.log("Chocolate flavored coffees:", chocolateFlavors);
//     } catch (error) {
//       console.error("Error checking database:", error);
//     }
//   };

//   // Call this function once when component mounts to debug
//   // useEffect(() => {
//   //   checkDatabaseContents();
//   // }, []);

//   // Fallback function with broader search

//   const getEquipmentRecommendations = async (quizAnswers: QuizAnswers) => {
//     try {
//       // First, check what equipment exists
//       const { data: allEquipment, error: allError } = await supabase
//         .from("equipment_products")
//         .select(
//           `
//         id,
//         name,
//         description,
//         category,
//         specifications,
//         price,
//         image_url,
//         skill_level,
//         recommended_for,
//         brands (name)
//       `
//         )
//         .eq("in_stock", true)
//         .limit(10);

//       if (allError) {
//         console.error("Error fetching all equipment:", allError);
//         return [];
//       }

//       console.log("All equipment:", allEquipment);

//       // Manual filtering for equipment
//       const filteredEquipment = allEquipment.filter((equipment) => {
//         // Check skill level
//         const targetSkillLevel =
//           quizAnswers.experienceLevel === "expert" ? "expert" : "beginner";
//         const skillMatch = equipment.skill_level === targetSkillLevel;

//         // Check recommended_for (manual JSON parsing)
//         let brewMethodMatch = true;
//         if (equipment.recommended_for) {
//           try {
//             // Handle different JSON formats - array or single value
//             const recommendedArray = Array.isArray(equipment.recommended_for)
//               ? equipment.recommended_for
//               : JSON.parse(equipment.recommended_for);

//             brewMethodMatch = recommendedArray.includes(quizAnswers.brewMethod);
//           } catch (e) {
//             // If JSON parsing fails, check if it's a string
//             brewMethodMatch =
//               equipment.recommended_for === quizAnswers.brewMethod;
//           }
//         }

//         return skillMatch && brewMethodMatch;
//       });

//       console.log("Filtered equipment:", filteredEquipment);

//       // Sort by price based on budget preference
//       const sortedEquipment = [...filteredEquipment].sort((a, b) => {
//         const priceA = Number(a.price);
//         const priceB = Number(b.price);

//         if (quizAnswers.budget !== "premium") {
//           return priceA - priceB; // Ascending for budget/midrange
//         } else {
//           return priceB - priceA; // Descending for premium
//         }
//       });

//       return sortedEquipment.slice(0, 3).map((equipment) => {
//         const brand =
//           equipment.brands && equipment.brands[0]
//             ? equipment.brands[0]
//             : { name: "Unknown Brand" };

//         return {
//           id: equipment.id,
//           name: equipment.name,
//           category: equipment.category,
//           description: equipment.description,
//           price: equipment.price,
//           brand: brand.name,
//           imageUrl: equipment.image_url,
//           skillLevel: equipment.skill_level,
//         };
//       });
//     } catch (error) {
//       console.error("Error in getEquipmentRecommendations:", error);
//       return [];
//     }
//   };

//   // ========== QUIZ LOGIC ==========

//   const handleAnswer = (questionId: keyof QuizAnswers, value: any) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       submitQuiz();
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(0, prev - 1));
//   };

//   // Removed duplicate submitQuiz function to resolve redeclaration error.

//   const currentQuestion = questions[currentStep];
//   const progress = ((currentStep + 1) / questions.length) * 100;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-8 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//               <p className="text-gray-700">
//                 Finding your perfect coffee matches...
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>
//               Question {currentStep + 1} of {questions.length}
//             </span>
//             <span>{Math.round(progress)}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <motion.div
//               className="bg-indigo-600 h-2 rounded-full"
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>

//         {/* Question */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               {currentQuestion.question}
//             </h1>

//             {/* Options */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//               {currentQuestion.options.map((option, index) => (
//                 <motion.button
//                   key={option.value}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`p-6 rounded-2xl border-2 text-left transition-all ${
//                     currentQuestion.type === "multiple"
//                       ? answers.flavorPreferences.includes(option.value)
//                         ? "border-indigo-500 bg-indigo-50"
//                         : "border-gray-300 bg-white hover:border-indigo-300"
//                       : answers[currentQuestion.id as keyof QuizAnswers] ===
//                           option.value
//                         ? "border-indigo-500 bg-indigo-50"
//                         : "border-gray-300 bg-white hover:border-indigo-300"
//                   }`}
//                   onClick={() => {
//                     if (currentQuestion.type === "multiple") {
//                       const currentAnswers = answers.flavorPreferences;
//                       const newAnswers = currentAnswers.includes(option.value)
//                         ? currentAnswers.filter((a) => a !== option.value)
//                         : [...currentAnswers, option.value];
//                       handleAnswer("flavorPreferences", newAnswers);
//                     } else {
//                       handleAnswer(
//                         currentQuestion.id as keyof QuizAnswers,
//                         option.value
//                       );
//                     }
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     {option.icon && (
//                       <span className="text-2xl">{option.icon}</span>
//                     )}
//                     <div>
//                       <div className="font-semibold text-gray-900">
//                         {option.label}
//                       </div>
//                       {option.description && (
//                         <div className="text-sm text-gray-600 mt-1">
//                           {option.description}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between">
//               <button
//                 onClick={prevStep}
//                 disabled={currentStep === 0 || loading}
//                 className="px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 ← Back
//               </button>

//               <button
//                 onClick={nextStep}
//                 disabled={
//                   loading ||
//                   (currentQuestion.type === "multiple"
//                     ? answers.flavorPreferences.length === 0
//                     : !answers[currentQuestion.id as keyof QuizAnswers])
//                 }
//                 className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
//               >
//                 {currentStep === questions.length - 1
//                   ? "Get My Matches →"
//                   : "Next →"}
//               </button>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { supabase } from "~/supabase_client";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

type QuizOption = {
  value: string;
  label: string;
  icon?: string;
  description?: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  type: "single" | "multiple";
  options: QuizOption[];
};

type QuizAnswers = {
  brewMethod: string;
  flavorPreferences: string[];
  experienceLevel: string;
  roastPreference: string;
  caffeinePreference: string;
  budget: string;
};

type CoffeeRecommendation = {
  id: string;
  name: string;
  roaster: string;
  description: string;
  price: number;
  match: number;
  roast: string;
  flavorProfile: string[];
  imageUrl?: string;
};

export default function CoffeeQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    brewMethod: "",
    flavorPreferences: [],
    roastPreference: "",
    experienceLevel: "",
    caffeinePreference: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const supabase = useSupabaseClient();

  const questions: QuizQuestion[] = [
    {
      id: "brewMethod",
      question: "How do you usually brew your coffee?",
      type: "single",
      options: [
        { value: "espresso", label: "Espresso Machine", icon: "☕" },
        { value: "pourOver", label: "Pour Over", icon: "💧" },
        { value: "frenchPress", label: "French Press", icon: "🫖" },
        { value: "drip", label: "Drip Machine", icon: "⚡" },
        { value: "coldBrew", label: "Cold Brew", icon: "❄️" },
        { value: "aeropress", label: "AeroPress", icon: "🧪" },
      ],
    },
    {
      id: "flavorPreferences",
      question: "What flavors do you enjoy in coffee?",
      type: "multiple",
      options: [
        { value: "chocolate", label: "Chocolate & Nutty", icon: "🍫" },
        { value: "fruity", label: "Fruity & Bright", icon: "🍓" },
        { value: "caramel", label: "Caramel & Sweet", icon: "🍯" },
        { value: "floral", label: "Floral & Tea-like", icon: "🌺" },
        { value: "spicy", label: "Spicy & Bold", icon: "🌶️" },
        { value: "balanced", label: "Well-Balanced", icon: "⚖️" },
      ],
    },
    {
      id: "roastPreference",
      question: "What roast level do you prefer?",
      type: "single",
      options: [
        {
          value: "light",
          label: "Light Roast",
          description: "Bright, acidic, complex",
        },
        {
          value: "medium",
          label: "Medium Roast",
          description: "Balanced, sweet, versatile",
        },
        {
          value: "dark",
          label: "Dark Roast",
          description: "Bold, smoky, intense",
        },
        {
          value: "dontKnow",
          label: "I'm not sure",
          description: "Help me discover",
        },
      ],
    },
    {
      id: "experienceLevel",
      question: "How would you describe your coffee experience?",
      type: "single",
      options: [
        {
          value: "beginner",
          label: "Just getting started",
          description: "New to specialty coffee",
        },
        {
          value: "enthusiast",
          label: "Coffee Enthusiast",
          description: "I know what I like",
        },
        {
          value: "expert",
          label: "Coffee Expert",
          description: "Very particular about my brew",
        },
      ],
    },
    {
      id: "caffeinePreference",
      question: "How do you feel about caffeine?",
      type: "single",
      options: [
        { value: "regular", label: "Give me all the caffeine!", icon: "⚡" },
        { value: "moderate", label: "Moderate caffeine", icon: "☕" },
        { value: "decaf", label: "Decaf preferred", icon: "😴" },
        { value: "mix", label: "Mix of both", icon: "🔄" },
      ],
    },
    {
      id: "budget",
      question: "What's your coffee budget?",
      type: "single",
      options: [
        {
          value: "budget",
          label: "Budget Friendly",
          description: "Under $15/lb",
        },
        { value: "midrange", label: "Mid Range", description: "$16-$25/lb" },
        { value: "premium", label: "Premium", description: "$26+/lb" },
      ],
    },
    {
      id: "consumptionHabits",
      question: "How do you usually drink your coffee?",
      type: "single",
      options: [
        { value: "black", label: "Black", icon: "⚫" },
        { value: "withMilk", label: "With Milk/Cream", icon: "🥛" },
        { value: "sweetened", label: "Sweetened", icon: "🍯" },
        { value: "iced", label: "Iced/Cold", icon: "🧊" },
      ],
    },
    {
      id: "purchaseFrequency",
      question: "How often do you buy coffee beans?",
      type: "single",
      options: [
        { value: "weekly", label: "Weekly", description: "Fresh is best!" },
        {
          value: "biweekly",
          label: "Every 2 weeks",
          description: "Regular drinker",
        },
        { value: "monthly", label: "Monthly", description: "Casual enjoyer" },
        {
          value: "occasional",
          label: "Occasionally",
          description: "When I run out",
        },
      ],
    },
  ];

  // ========== RECOMMENDATION FUNCTIONS ==========

  const getRoastLevelsFromPreference = (preference: string): string[] => {
    const mapping: { [key: string]: string[] } = {
      light: ["light"],
      medium: ["medium"],
      dark: ["dark", "espresso"],
      dontKnow: ["light", "medium", "dark", "espresso"],
    };
    return mapping[preference] || ["light", "medium"];
  };

  const getBudgetRange = (budget: string): { min: number; max: number } => {
    const mapping: { [key: string]: { min: number; max: number } } = {
      budget: { min: 0, max: 15 },
      midrange: { min: 16, max: 25 },
      premium: { min: 26, max: 100 },
    };
    return mapping[budget] || { min: 0, max: 50 };
  };

  const calculateMatchPercentage = (
    coffee: any,
    answers: QuizAnswers
  ): number => {
    let score = 0;
    const maxScore = 100;

    // Roast level (25 points)
    const preferredRoasts = getRoastLevelsFromPreference(
      answers.roastPreference
    );
    if (coffee.roast_level === answers.roastPreference) {
      score += 25;
    } else if (preferredRoasts.includes(coffee.roast_level)) {
      score += 15;
    }

    // Flavor profile (35 points)
    if (answers.flavorPreferences.length > 0) {
      const matchingFlavors = coffee.flavor_profile.filter((flavor: string) =>
        answers.flavorPreferences.includes(flavor)
      );
      score += (matchingFlavors.length / answers.flavorPreferences.length) * 35;
    }

    // Budget (20 points)
    const budgetRange = getBudgetRange(answers.budget);
    const price = Number(coffee.price);
    if (price >= budgetRange.min && price <= budgetRange.max) {
      score += 20;
    } else if (price <= budgetRange.max * 1.2) {
      // Allow slight over-budget
      score += 10;
    }

    // Experience level consideration (10 points)
    if (answers.experienceLevel === "beginner" && price <= 20) {
      score += 10;
    } else if (answers.experienceLevel === "expert" && price >= 22) {
      score += 10;
    }

    // Brew method compatibility (10 points)
    if (isBrewMethodCompatible(coffee, answers.brewMethod)) {
      score += 10;
    }

    return Math.min(Math.round(score), 95);
  };

  const isBrewMethodCompatible = (coffee: any, brewMethod: string): boolean => {
    const compatibility: { [key: string]: string[] } = {
      espresso: ["medium", "dark", "espresso"],
      pourOver: ["light", "medium"],
      frenchPress: ["medium", "dark"],
      drip: ["light", "medium", "dark"],
      coldBrew: ["light", "medium"],
      aeropress: ["light", "medium", "dark"],
    };

    return compatibility[brewMethod]?.includes(coffee.roast_level) || true;
  };
  // Validation function
  // Validation function
  const validateQuizAnswers = (answers: QuizAnswers): boolean => {
    const requiredFields: (keyof QuizAnswers)[] = [
      "brewMethod",
      "roastPreference",
      "experienceLevel",
      "caffeinePreference",
      "budget",
    ];

    return (
      requiredFields.every(
        (field) => answers[field] && answers[field].toString().length > 0
      ) && answers.flavorPreferences.length > 0
    );
  };

  const submitQuiz = async () => {
    if (!validateQuizAnswers(answers)) {
      console.error("Please complete all questions");
      return;
    }

    setLoading(true);
    try {
      // Get coffee recommendations (starts with strict search, falls back to broad search automatically)
      const recommendedCoffees = await getCoffeeRecommendations(answers);

      // Then get equipment that matches the coffees
      const recommendedEquipment = await getEquipmentRecommendations(
        answers,
        recommendedCoffees
      );

      // Store in session storage as backup
      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          answers,
          recommendedCoffees,
          recommendedEquipment,
          timestamp: new Date().toISOString(),
        })
      );

      navigate("/results", {
        state: { answers, recommendedCoffees, recommendedEquipment },
        replace: true,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      const storedResults = sessionStorage.getItem("quizResults");
      if (storedResults) {
        const results = JSON.parse(storedResults);
        navigate("/results", { state: results });
      } else {
        const fallbackCoffees = getFallbackRecommendations(answers);
        const fallbackEquipment = getFallbackEquipment(
          answers,
          fallbackCoffees
        );
        navigate("/results", {
          state: {
            answers,
            recommendedCoffees: fallbackCoffees,
            recommendedEquipment: fallbackEquipment,
            error: "Unable to generate personalized recommendations",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const getFallbackRecommendations = (
    answers: QuizAnswers
  ): CoffeeRecommendation[] => {
    return [
      {
        id: "1",
        name: "Ethiopia Yirgacheffe",
        roaster: "Summit Roasters",
        description: "Bright and floral with notes of bergamot and blueberry",
        price: 24.99,
        match: 85,
        roast: "Light",
        flavorProfile: ["fruity", "floral"],
      },
      {
        id: "2",
        name: "Colombia Huila Reserve",
        roaster: "Method Coffee",
        description: "Balanced with chocolate notes and caramel sweetness",
        price: 21.99,
        match: 80,
        roast: "Medium",
        flavorProfile: ["chocolate", "caramel"],
      },
      {
        id: "3",
        name: "House Blend",
        roaster: "Conscious Cup",
        description: "Well-balanced and approachable daily drinker",
        price: 19.99,
        match: 75,
        roast: "Medium",
        flavorProfile: ["balanced", "chocolate"],
      },
    ];
  };

  const getCoffeeRecommendations = async (
    quizAnswers: QuizAnswers,
    options: { isBroadSearch?: boolean } = {}
  ): Promise<CoffeeRecommendation[]> => {
    try {
      const roastLevels = getRoastLevelsFromPreference(
        quizAnswers.roastPreference
      );
      const flavorProfiles = quizAnswers.flavorPreferences;
      const budgetRange = getBudgetRange(quizAnswers.budget);

      console.log("Querying with:", {
        roastLevels,
        flavorProfiles,
        budgetRange,
        isBroadSearch: options.isBroadSearch,
      });

      // Get all coffees
      const { data: allCoffees, error: allError } = await supabase
        .from("coffee_products")
        .select(
          `
        id,
        name,
        description,
        roast_level,
        flavor_profile,
        price,
        image_url,
        brands (name, sustainability_rating)
      `
        )
        .eq("in_stock", true)
        .limit(20);

      if (allError) {
        console.error("Error fetching all coffees:", allError);
        return getFallbackRecommendations(quizAnswers);
      }

      console.log("All available coffees:", allCoffees);

      // Single filtering logic with configurable strictness
      const filteredCoffees = allCoffees.filter((coffee) => {
        const price = Number(coffee.price);

        // Roast level is always required
        const roastMatch = roastLevels.includes(coffee.roast_level);
        if (!roastMatch) return false;

        // Budget filtering - strict or relaxed
        const budgetMultiplier = options.isBroadSearch ? 1.5 : 1;
        const budgetMatch =
          price >= budgetRange.min &&
          price <= budgetRange.max * budgetMultiplier;
        if (!budgetMatch) return false;

        // Flavor filtering - only in strict mode
        if (!options.isBroadSearch && flavorProfiles.length > 0) {
          const flavorMatch = flavorProfiles.some(
            (flavor) =>
              coffee.flavor_profile && coffee.flavor_profile.includes(flavor)
          );
          if (!flavorMatch) return false;
        }

        return true;
      });

      console.log(
        `${options.isBroadSearch ? "Broad" : "Strict"} filtered coffees:`,
        filteredCoffees
      );

      if (filteredCoffees.length > 0) {
        const recommendations = filteredCoffees.slice(0, 6).map((coffee) => {
          // Handle brands safely with type assertion
          let brandName = "Unknown Roaster";

          if (coffee.brands) {
            const brands = coffee.brands as any;
            if (Array.isArray(brands)) {
              brandName = brands[0]?.name || "Unknown Roaster";
            } else {
              brandName = brands.name || "Unknown Roaster";
            }
          }

          return {
            id: coffee.id,
            name: coffee.name,
            roaster: brandName,
            description: coffee.description,
            price: coffee.price,
            match: calculateMatchPercentage(coffee, quizAnswers),
            roast: coffee.roast_level,
            flavorProfile: coffee.flavor_profile || [],
            imageUrl: coffee.image_url,
          };
        });
        return recommendations;
      }

      // If no matches and this isn't already a broad search, try broad search
      if (!options.isBroadSearch) {
        console.log("No exact matches, trying broader search...");
        const broaderResults = await getCoffeeRecommendations(quizAnswers, {
          isBroadSearch: true,
        });
        return broaderResults.length > 0
          ? broaderResults
          : getFallbackRecommendations(quizAnswers);
      }

      // If broad search also found nothing, return fallback
      return getFallbackRecommendations(quizAnswers);
    } catch (error) {
      console.error("Error in getCoffeeRecommendations:", error);
      return getFallbackRecommendations(quizAnswers);
    }
  };

  const getEquipmentRecommendations = async (
    quizAnswers: QuizAnswers,
    recommendedCoffees: CoffeeRecommendation[]
  ) => {
    try {
      const { data: allEquipment, error: allError } = await supabase
        .from("equipment_products")
        .select(
          `
        id,
        name,
        description,
        category,
        specifications,
        price,
        image_url,
        skill_level,
        recommended_for,
        brand_id,
        brands (
          id,
          name,
          description,
          logo_url
        )
      `
        )
        .eq("in_stock", true)
        .limit(20);

      if (allError) {
        console.error("Error fetching all equipment:", allError);
        return getFallbackEquipment(quizAnswers, recommendedCoffees);
      }

      console.log("All equipment with brands:", allEquipment);

      // Smart equipment matching based on coffee recommendations and user preferences
      const matchedEquipment = allEquipment.filter((equipment) => {
        return isEquipmentSuitable(equipment, quizAnswers, recommendedCoffees);
      });

      // Sort by priority and relevance
      const sortedEquipment = matchedEquipment.sort((a, b) => {
        const scoreA = calculateEquipmentScore(
          a,
          quizAnswers,
          recommendedCoffees
        );
        const scoreB = calculateEquipmentScore(
          b,
          quizAnswers,
          recommendedCoffees
        );
        return scoreB - scoreA;
      });

      return sortedEquipment.slice(0, 4).map((equipment) => {
        // Handle brands as either array or object
        let brandName = "Unknown Brand";

        if (equipment.brands) {
          const brands = equipment.brands as any;
          if (Array.isArray(brands)) {
            brandName = brands[0]?.name || "Unknown Brand";
          } else {
            brandName = brands.name || "Unknown Brand";
          }
        }

        return {
          id: equipment.id,
          name: equipment.name,
          category: equipment.category,
          description: equipment.description,
          price: equipment.price,
          brand: brandName,
          imageUrl: equipment.image_url,
          skillLevel: equipment.skill_level,
          compatibility: getCompatibilityDescription(
            equipment,
            quizAnswers,
            recommendedCoffees
          ),
        };
      });
    } catch (error) {
      console.error("Error in getEquipmentRecommendations:", error);
      return getFallbackEquipment(quizAnswers, recommendedCoffees);
    }
  };

  // Smart equipment matching logic
  const isEquipmentSuitable = (
    equipment: any,
    quizAnswers: QuizAnswers,
    coffees: CoffeeRecommendation[]
  ): boolean => {
    const userSkill = quizAnswers.experienceLevel;
    const brewMethod = quizAnswers.brewMethod;
    const budget = quizAnswers.budget;

    // Skill level matching
    if (userSkill === "beginner" && equipment.skill_level === "expert")
      return false;
    if (userSkill === "expert" && equipment.skill_level === "beginner")
      return false;

    // Budget consideration
    const equipmentPrice = Number(equipment.price);
    const budgetRange = getBudgetRange(budget);
    if (equipmentPrice > budgetRange.max * 3) return false; // Allow higher budget for equipment

    // Brew method compatibility
    if (!isEquipmentCompatibleWithBrewMethod(equipment, brewMethod))
      return false;

    // Coffee-specific compatibility
    return isEquipmentCompatibleWithCoffees(equipment, coffees, brewMethod);
  };

  const isEquipmentCompatibleWithBrewMethod = (
    equipment: any,
    brewMethod: string
  ): boolean => {
    const compatibility: { [key: string]: string[] } = {
      espresso: ["espresso_machine", "grinder", "kettle", "accessory"],
      pourOver: ["kettle", "brewer", "grinder", "accessory"],
      frenchPress: ["brewer", "kettle", "grinder"],
      drip: ["brewer", "grinder"],
      coldBrew: ["brewer", "accessory"],
      aeropress: ["brewer", "kettle", "grinder", "accessory"],
    };

    return compatibility[brewMethod]?.includes(equipment.category) || false;
  };

  const isEquipmentCompatibleWithCoffees = (
    equipment: any,
    coffees: CoffeeRecommendation[],
    brewMethod: string
  ): boolean => {
    if (coffees.length === 0) return true;

    // Analyze the recommended coffees
    const dominantRoast = getDominantRoast(coffees);
    const hasLightRoasts = coffees.some((coffee) => coffee.roast === "light");
    const hasEspressoRoasts = coffees.some(
      (coffee) => coffee.roast === "espresso"
    );

    // Equipment-specific logic
    switch (equipment.category) {
      case "grinder":
        // All coffee types need grinders, but espresso needs better grinders
        if (brewMethod === "espresso" && equipment.skill_level === "beginner")
          return false;
        if (hasLightRoasts && equipment.specifications?.burr_type === "blade")
          return false;
        return true;

      case "espresso_machine":
        return (
          brewMethod === "espresso" &&
          (hasEspressoRoasts ||
            dominantRoast === "medium" ||
            dominantRoast === "dark")
        );

      case "kettle":
        // Pour over and aeropress benefit from gooseneck kettles
        if (["pourOver", "aeropress"].includes(brewMethod)) {
          return equipment.specifications?.type === "gooseneck";
        }
        return true;

      case "brewer":
        return isBrewerCompatible(equipment, brewMethod, dominantRoast);

      default:
        return true;
    }
  };

  const getDominantRoast = (coffees: CoffeeRecommendation[]): string => {
    const roastCount: { [key: string]: number } = {};
    coffees.forEach((coffee) => {
      roastCount[coffee.roast] = (roastCount[coffee.roast] || 0) + 1;
    });
    return Object.keys(roastCount).reduce((a, b) =>
      roastCount[a] > roastCount[b] ? a : b
    );
  };

  const isBrewerCompatible = (
    equipment: any,
    brewMethod: string,
    dominantRoast: string
  ): boolean => {
    const brewerTypes: { [key: string]: string[] } = {
      frenchPress: ["french press", "french-press"],
      pourOver: ["v60", "chemex", "kalita", "pour over"],
      aeropress: ["aeropress"],
      drip: ["drip", "automatic"],
      coldBrew: ["cold brew", "toddy"],
    };

    const equipmentName = equipment.name.toLowerCase();
    return (
      brewerTypes[brewMethod]?.some((type) => equipmentName.includes(type)) ||
      false
    );
  };

  const calculateEquipmentScore = (
    equipment: any,
    quizAnswers: QuizAnswers,
    coffees: CoffeeRecommendation[]
  ): number => {
    let score = 0;

    // Skill level match (30 points)
    if (equipment.skill_level === quizAnswers.experienceLevel) score += 30;
    else if (
      quizAnswers.experienceLevel === "beginner" &&
      equipment.skill_level === "intermediate"
    )
      score += 20;
    else if (
      quizAnswers.experienceLevel === "expert" &&
      equipment.skill_level === "intermediate"
    )
      score += 20;

    // Budget appropriateness (25 points)
    const budgetRange = getBudgetRange(quizAnswers.budget);
    const equipmentPrice = Number(equipment.price);
    const budgetMax =
      budgetRange.max * (equipment.category === "espresso_machine" ? 5 : 3);
    if (equipmentPrice <= budgetMax) score += 25;
    else if (equipmentPrice <= budgetMax * 1.5) score += 15;

    // Coffee compatibility (25 points)
    if (
      isEquipmentCompatibleWithCoffees(
        equipment,
        coffees,
        quizAnswers.brewMethod
      )
    )
      score += 25;

    // Essential equipment bonus (20 points)
    if (isEssentialEquipment(equipment, quizAnswers.brewMethod)) score += 20;

    return score;
  };

  const isEssentialEquipment = (
    equipment: any,
    brewMethod: string
  ): boolean => {
    const essentials: { [key: string]: string[] } = {
      espresso: ["grinder", "espresso_machine"],
      pourOver: ["kettle", "brewer"],
      frenchPress: ["brewer"],
      aeropress: ["brewer"],
      drip: ["brewer"],
      coldBrew: ["brewer"],
    };

    return essentials[brewMethod]?.includes(equipment.category) || false;
  };

  const getCompatibilityDescription = (
    equipment: any,
    quizAnswers: QuizAnswers,
    coffees: CoffeeRecommendation[]
  ): string => {
    const descriptions: { [key: string]: string } = {
      grinder: "Perfect grind for your preferred brew method",
      espresso_machine: "Ideal for espresso-based drinks",
      kettle: "Precise temperature control for optimal extraction",
      brewer: `Optimized for ${quizAnswers.brewMethod.replace(/([A-Z])/g, " $1")}`,
      accessory: "Enhances your coffee experience",
    };

    return (
      descriptions[equipment.category] || "Complements your coffee selection"
    );
  };

  // Fallback equipment recommendations
  const getFallbackEquipment = (
    quizAnswers: QuizAnswers,
    coffees: CoffeeRecommendation[]
  ): any[] => {
    const fallbackEquipment = [
      {
        id: "e1",
        name: "Baratza Encore Conical Burr Grinder",
        category: "grinder",
        description:
          "Excellent entry-level grinder for consistent results across all brew methods",
        price: 169.0,
        brand: "Baratza",
        skillLevel: "beginner",
        compatibility:
          "Perfect for getting consistent grinds for your preferred brew method",
      },
      {
        id: "e2",
        name: "Fellow Stagg EKG Electric Kettle",
        category: "kettle",
        description: "Precision pour-over kettle with temperature control",
        price: 165.0,
        brand: "Fellow",
        skillLevel: "intermediate",
        compatibility: "Ideal for pour over and precision brewing",
      },
    ];

    // Filter based on brew method
    return fallbackEquipment
      .filter((equipment) =>
        isEquipmentCompatibleWithBrewMethod(equipment, quizAnswers.brewMethod)
      )
      .slice(0, 3);
  };

  // ========== QUIZ LOGIC ==========

  const handleAnswer = (questionId: keyof QuizAnswers, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // Removed duplicate submitQuiz function to resolve redeclaration error.

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-700">
                Finding your perfect coffee matches...
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {currentQuestion.question}
            </h1>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    currentQuestion.type === "multiple"
                      ? answers.flavorPreferences.includes(option.value)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 bg-white hover:border-indigo-300"
                      : answers[currentQuestion.id as keyof QuizAnswers] ===
                          option.value
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 bg-white hover:border-indigo-300"
                  }`}
                  onClick={() => {
                    if (currentQuestion.type === "multiple") {
                      const currentAnswers = answers.flavorPreferences;
                      const newAnswers = currentAnswers.includes(option.value)
                        ? currentAnswers.filter((a) => a !== option.value)
                        : [...currentAnswers, option.value];
                      handleAnswer("flavorPreferences", newAnswers);
                    } else {
                      handleAnswer(
                        currentQuestion.id as keyof QuizAnswers,
                        option.value
                      );
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {option.icon && (
                      <span className="text-2xl">{option.icon}</span>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0 || loading}
                className="px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Back
              </button>

              <button
                onClick={nextStep}
                disabled={
                  loading ||
                  (currentQuestion.type === "multiple"
                    ? answers.flavorPreferences.length === 0
                    : !answers[currentQuestion.id as keyof QuizAnswers])
                }
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
              >
                {currentStep === questions.length - 1
                  ? "Get My Matches →"
                  : "Next →"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
