// app/routes/api.send-whatsapp.ts
import type { ActionFunction } from "react-router";
import { sendWhatsAppMessage } from "~/utils/whatsappSMS";

interface WhatsAppRequest {
  to: string;
  orderId: string;
  customerName: string;
  total: number;
  invoiceUrl?: string;
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data: WhatsAppRequest = await request.json();

    // Validate required fields
    if (!data.to || !data.orderId || !data.customerName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await sendWhatsAppMessage(data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("WhatsApp sending failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send WhatsApp message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// WhatsApp service function
