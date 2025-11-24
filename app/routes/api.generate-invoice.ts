import type { ActionFunction } from "react-router";
import { generateInvoicePDF, uploadInvoiceToStorage } from "~/utils/pdfService";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const orderData = await request.json();
    const pdfBuffer = await generateInvoicePDF(orderData);
    const invoiceUrl = await uploadInvoiceToStorage(
      pdfBuffer,
      orderData.orderId
    );

    return new Response(JSON.stringify({ success: true, invoiceUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate invoice" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
