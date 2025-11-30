import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

interface GeneratedPost {
  title: string;
  readTime: string;
  category: string;
  content: string;
  summary: string;
  keywords: string[];
}

export default function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";

  // Handle form submission response
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        setGeneratedPost(fetcher.data.data);
      } else {
        // Error handling would be done here
        console.error("Generation error:", fetcher.data.error);
      }
    }
  }, [fetcher.data]);

  const generatePost = () => {
    if (!topic.trim()) return;

    const formData = new FormData();
    formData.append("topic", topic.trim());
    fetcher.submit(formData, {
      method: "post",
      action: "/api/generate-blog",
    });
  };

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
      generatePost();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI Blog Post Generator
        </h2>
        <p className="text-gray-600">
          Create engaging coffee content in seconds
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Topic *
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., cold brew techniques, espresso basics, coffee roasting..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          disabled={loading}
          maxLength={100}
        />
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">
            Enter a coffee-related topic for your blog post
          </p>
          <span className="text-sm text-gray-500">{topic.length}/100</span>
        </div>
      </div>

      {fetcher.data?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {fetcher.data.error}
        </div>
      )}

      <button
        onClick={generatePost}
        disabled={loading || !topic.trim()}
        className="w-full bg-[#8B4513] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#6B3410] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating...
          </>
        ) : (
          "Generate Blog Post"
        )}
      </button>

      {/* Results Section */}
      {generatedPost && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border animate-fade-in">
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
        </div>
      )}
    </div>
  );
}
