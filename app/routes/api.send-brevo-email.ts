import type { ActionFunction } from "react-router";
import sendEmailBrevo from "~/utils/sendEmailBrevo";

interface ActionArgs {
  request: Request;
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data = await request.json();
    await sendEmailBrevo(data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("SMS sending failed:", error);
    return new Response(JSON.stringify({ error: "Failed to send SMS" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
