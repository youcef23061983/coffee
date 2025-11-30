// app/api/generate-blog/route.ts
import { type ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        {
          success: false,
          message: "OPENROUTER_API_KEY is not configured",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const topic = formData.get("topic") as string;

    if (!topic?.trim()) {
      return Response.json(
        {
          success: false,
          message: "Topic is required",
        },
        { status: 400 }
      );
    }

    // System message specialized for coffee blog content
    const systemMessage = {
      role: "system",
      content: `You are a coffee expert and professional blog writer. Create engaging, well-structured coffee-related blog posts.
      Return your response as a valid JSON object with this exact structure:
      {
        "title": "engaging blog post title",
        "readTime": "estimated read time (e.g., '5 min read')",
        "category": "blog category",
        "summary": "brief summary of the post",
        "keywords": ["array", "of", "relevant", "keywords"],
        "content": "full blog post content in markdown format with headings, paragraphs, and engaging writing"
      }
      
      Make the content educational, engaging, and valuable for coffee enthusiasts. Use proper markdown formatting.`,
    };

    const prompt = `Create a comprehensive coffee-related blog post about "${topic}". 
    Make it informative, engaging, and well-structured with clear sections.
    Return ONLY valid JSON, no additional text or code formatting.`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Coffee Blog App",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            systemMessage,
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: `API error: ${result.error?.message || "Unknown error"}`,
          error: result.error,
        },
        { status: response.status }
      );
    }

    // Parse the JSON response from the AI
    let blogData;
    try {
      const content = result.choices[0].message.content;
      // Clean any potential markdown code blocks
      const cleanedContent = content.replace(/```json|```/g, "").trim();
      blogData = JSON.parse(cleanedContent);
    } catch (parseError) {
      // If JSON parsing fails, return error
      return Response.json(
        {
          success: false,
          message: `Failed to parse blog content: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
          rawContent: result.choices[0].message.content,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      blog: blogData,
      usage: result.usage,
    });
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
};
