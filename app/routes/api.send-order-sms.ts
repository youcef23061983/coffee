import type { ActionFunction } from "react-router";
import { sendOrderConfirmationSMS } from "~/utils/smsService";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const smsData = await request.json();
    await sendOrderConfirmationSMS(smsData);

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
