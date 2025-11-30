import type { Route } from "./+types/api.generate-blog";
import { generateCoffeeBlogPost } from "~/utils/generateBlogContent";

// Simple rate limiting
const rateLimit = new Map();

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const topic = formData.get("topic") as string;

    console.log("Received topic:", topic);

    if (!topic) {
      return {
        success: false,
        error: "Topic is required",
        status: 400,
      };
    }

    if (topic.length > 100) {
      return {
        success: false,
        error: "Topic must be less than 100 characters",
        status: 400,
      };
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const windowMs = 60000;
    const maxRequests = 5;

    const userRequests = rateLimit.get(ip) || [];
    const recentRequests = userRequests.filter(
      (time: number) => now - time < windowMs
    );

    if (recentRequests.length >= maxRequests) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
        status: 429,
      };
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);

    console.log("Generating blog post...");

    // Generate the blog post using AI
    const blogPost = await generateCoffeeBlogPost(topic);

    console.log("Generation result:", blogPost ? "Success" : "Failed");

    if (!blogPost) {
      return {
        success: false,
        error:
          "Failed to generate blog content. Please check your OpenAI API key and try again.",
        status: 500,
      };
    }

    return {
      success: true,
      data: blogPost,
    };
  } catch (error) {
    console.error("API route error:", error);
    return {
      success: false,
      error:
        "Internal server error: " +
        (error instanceof Error ? error.message : "Unknown error"),
      status: 500,
    };
  }
}
