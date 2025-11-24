import type { ActionFunction } from "react-router";
import { sendOrderConfirmationEmail } from "~/utils/emailService";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data = await request.json();
    await sendOrderConfirmationEmail(data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
export function loader() {
  return new Response("Method not allowed", { status: 405 });
}
