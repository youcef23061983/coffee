import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Correct way to destructure
  const { answers, recommendedCoffees, recommendedEquipment } =
    location.state || {};

  console.log("results:", {
    answers,
    recommendedCoffees,
    recommendedEquipment,
  });

  // Add error handling for missing state
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Results Found
          </h1>
          <p className="text-gray-600 mb-4">
            It looks like you came directly to this page without taking the
            quiz.
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }

  // Function to get equipment category icon
  const getEquipmentIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      grinder: "⚙️",
      kettle: "♨️",
      brewer: "☕",
      espresso_machine: "🔧",
      accessory: "🛠️",
      coffee_beans: "🫘",
    };
    return icons[category] || "📦";
  };

  // Function to format category name
  const formatCategory = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url('/results.jpg')",
          }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6"
          >
            Find Your Results
          </motion.h3>
          {/* Added Quiz Results Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
          >
            Discover your personalized coffee recommendations based on your quiz
            answers.
          </motion.p>
        </div>
      </section>
      <div className="min-h-screen bg-[#fff3e9] py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl  text-gray-900 mb-4">
              Your Perfect Coffee Matches
            </h1>
            <p className="text-xl text-gray-600">
              Based on your preferences, we found{" "}
              {recommendedCoffees?.length || 0} coffees and{" "}
              {recommendedEquipment?.length || 0} equipment items for you
            </p>
          </div>

          {/* Coffee Recommendations */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl  text-gray-900">Recommended Coffees</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {recommendedCoffees?.length || 0} matches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedCoffees?.map((coffee: any) => (
                <div
                  key={coffee.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col" // Added flex flex-col here
                >
                  {/* Coffee Image/Placeholder */}
                  <div className="h-48 bg-linear-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                    {coffee.imageUrl ? (
                      <img
                        src={coffee.imageUrl}
                        alt={coffee.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-6xl">☕</span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col grow">
                    {" "}
                    {/* Added flex classes here */}
                    {/* Header with match badge */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-medium text-gray-900 pr-2">
                        {coffee.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          coffee.match >= 80
                            ? "bg-green-100 text-green-800"
                            : coffee.match >= 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {coffee.match}% match
                      </span>
                    </div>
                    {/* Roaster and Roast Level */}
                    <div className="flex items-center gap-4 mb-3">
                      {coffee.roaster && (
                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {coffee.roaster}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 capitalize">
                        {coffee.roast} Roast
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {coffee.description}
                    </p>
                    {/* Flavor Profile */}
                    {coffee.flavorProfile &&
                      coffee.flavorProfile.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Flavor Notes:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {coffee.flavorProfile.map(
                              (flavor: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {flavor}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    {/* This div will now stick to the bottom */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      {" "}
                      {/* Added mt-auto here */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${coffee.price}
                        </span>
                        <button
                          className="bg-[#b07d52] text-white px-4 py-2 rounded-lg hover:bg-[#4d341f] transition-colors"
                          onClick={() => navigate(`/products/${coffee.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Equipment Recommendations */}
          {recommendedEquipment && recommendedEquipment.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl  text-gray-900">
                  Recommended Equipment
                </h2>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Perfect for your coffee style
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendedEquipment?.map((equipment: any) => (
                  <div
                    key={equipment.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          {equipment.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {equipment.brand}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {equipment.skillLevel} level
                          </span>
                        </div>
                      </div>
                      <span className="text-3xl">
                        {getEquipmentIcon(equipment.category)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {equipment.description}
                    </p>

                    {/* Compatibility Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800 font-medium">
                        {equipment.compatibility}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${equipment.price}
                      </span>
                      <button
                        className="bg-[#b07d52] text-white px-4 py-2 rounded-lg hover:bg-[#4d341f] transition-colors"
                        onClick={() => navigate(`/products/${equipment.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* User Preferences Summary */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl  text-gray-900 mb-6">
              Your Coffee Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {answers &&
                Object.entries(answers).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {Array.isArray(value)
                        ? value
                            .map(
                              (v: string) =>
                                v.charAt(0).toUpperCase() + v.slice(1)
                            )
                            .join(", ")
                        : String(value).charAt(0).toUpperCase() +
                          String(value).slice(1)}
                    </dd>
                  </div>
                ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={() => navigate("/quiz")}
              className="bg-[#b07d52] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#4d341f] transition-colors"
            >
              Retake Quiz
            </button>
            <p className="text-gray-600 mt-4">
              Not happy with your matches? Try the quiz again with different
              preferences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
