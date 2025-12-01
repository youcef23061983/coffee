const TestAtricles = () => {
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
};

export default TestAtricles;
