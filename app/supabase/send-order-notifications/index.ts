// @ts-ignore: Deno-specific imports
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno-specific imports
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore: Deno-specific imports
import nodemailer from "npm:nodemailer@6.9.7";
// @ts-ignore: Deno-specific imports
import twilio from "npm:twilio@4.19.0";
// @ts-ignore: Deno-specific imports
import PDFDocument from "npm:pdfkit@0.14.0";

// Helper to read env vars from Deno or Node (globalThis)
function getEnv(key: string): string | undefined {
  const g = globalThis as any;
  return g?.Deno?.env?.get?.(key) ?? g?.process?.env?.[key];
}

// Use Nodemailer instead of Resend
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: getEnv("EMAIL_USER"),
    pass: getEnv("EMAIL_PASSWORD"),
  },
});

const twilioClient = twilio(
  getEnv("TWILIO_ACCOUNT_SID"),
  getEnv("TWILIO_AUTH_TOKEN")
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderData, smsData } = await req.json();

    console.log("📧 Sending notifications for order:", orderData.orderId);

    // Send email with Nodemailer
    const emailHtml = generateEmailHtml(orderData);
    await transporter.sendMail({
      from: `"Your Coffee Shop" <${getEnv("EMAIL_USER")}>`,
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderId}`,
      html: emailHtml,
    });

    // Send SMS if phone number exists
    if (smsData && smsData.to) {
      const smsText = generateSmsText(smsData);
      await twilioClient.messages.create({
        body: smsText,
        from: getEnv("TWILIO_PHONE_NUMBER"),
        to: smsData.to,
      });
    }

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(orderData);
    const invoiceUrl = await uploadInvoiceToStorage(
      pdfBuffer,
      orderData.orderId
    );

    return new Response(JSON.stringify({ success: true, invoiceUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Notifications failed:", err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateEmailHtml(orderData: any) {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${orderData.orderId}</p>
        <p>Total: $${orderData.total.toFixed(2)}</p>
        <!-- Your email template -->
      </body>
    </html>
  `;
}

function generateSmsText(smsData: any) {
  return `
☕ Order Confirmed!

Hi ${smsData.customerName}, your coffee order #${smsData.orderId} has been received!

Total: $${smsData.total.toFixed(2)}

We're brewing your order now!
  `.trim();
}

async function generateInvoicePDF(orderData: any): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Uint8Array[] = [];

      doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfData = new Uint8Array(
          chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        );
        let offset = 0;
        for (const chunk of chunks) {
          pdfData.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(pdfData);
      });

      // Your PDF content
      doc.text(`Invoice for Order #${orderData.orderId}`, 100, 100);
      doc.text(`Customer: ${orderData.customerName}`, 100, 150);
      doc.text(`Total: $${orderData.total.toFixed(2)}`, 100, 200);
      // Add more content as needed

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function uploadInvoiceToStorage(pdfBuffer: Uint8Array, orderId: string) {
  const supabase = createClient(
    getEnv("SUPABASE_URL")!,
    getEnv("SUPABASE_ANON_KEY")!
  );

  const fileName = `invoices/${orderId}-invoice.pdf`;

  const { data, error } = await supabase.storage
    .from("orders")
    .upload(fileName, pdfBuffer, {
      contentType: "application/pdf",
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("orders").getPublicUrl(fileName);

  return publicUrl;
}
