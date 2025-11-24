import type { ActionFunction } from "react-router";
import { sendOrderConfirmationSMS } from "~/utils/smsService";
import { generateInvoicePDF, uploadInvoiceToStorage } from "~/utils/pdfService";
import { supabase } from "~/supabase_client";
import Stripe from "stripe";
import sendGridEmail from "~/utils/sendGridEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const action: ActionFunction = async ({ request }) => {
  const contentType = request.headers.get("content-type");

  // Handle Stripe webhooks (with signature verification)
  if (
    contentType?.includes("application/json") &&
    request.headers.get("stripe-signature")
  ) {
    return await handleStripeWebhook(request);
  }

  // Handle frontend webhooks (your current flow)
  if (contentType?.includes("application/json")) {
    return await handleFrontendWebhook(request);
  }

  return new Response("Method not allowed", { status: 405 });
};

// Handle Stripe webhooks
async function handleStripeWebhook(request: Request) {
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(
      JSON.stringify({ error: "Webhook signature verification failed" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  console.log(`🔔 Stripe webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        return await handlePaymentIntentSucceeded(event.data.object);

      case "checkout.session.completed":
        return await handleCheckoutSessionCompleted(event.data.object);

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
        });
    }
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Handle frontend webhooks (your current notifications)
async function handleFrontendWebhook(request: Request) {
  try {
    const { type, data } = await request.json();

    console.log(`🔔 Frontend webhook received: ${type}`);

    switch (type) {
      case "order.completed":
        await handleOrderCompleted(data);
        break;

      default:
        return new Response(JSON.stringify({ error: "Unknown webhook type" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Frontend webhook processing failed:", error);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Stripe: Handle successful payment
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  console.log("💰 Payment intent succeeded:", paymentIntent.id);

  try {
    // Extract data from metadata
    const metadata = paymentIntent.metadata;

    if (metadata.orderData && metadata.smsData) {
      const orderData = JSON.parse(metadata.orderData);
      const smsData = JSON.parse(metadata.smsData);

      await processOrderNotifications({
        orderData: { ...orderData, orderId: paymentIntent.id },
        smsData,
      });
    } else {
      console.log("No metadata found for order processing");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error handling payment intent succeeded:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process payment" }),
      { status: 500 }
    );
  }
}

// Stripe: Handle checkout session completion
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("🛒 Checkout session completed:", session.id);

  try {
    // Store order in database
    const { data, error } = await supabase
      .from("orders")
      .insert({
        stripe_payment_intent_id: session.payment_intent,
        stripe_checkout_session_id: session.id,
        total: session.amount_total ? session.amount_total / 100 : 0,
        customer_email: session.customer_email,
        customer_id: session.customer,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error storing order:", error);
      throw error;
    }

    console.log("✅ Order stored in Supabase:", data.id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error handling checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process checkout session" }),
      { status: 500 }
    );
  }
}

// Frontend: Handle order completion (your current flow)
async function handleOrderCompleted(data: any) {
  try {
    await processOrderNotifications(data);
  } catch (error) {
    console.error("Error handling order completed:", error);
    throw error;
  }
}

// Shared function to process notifications
async function processOrderNotifications(data: any) {
  const { orderData, smsData } = data;

  console.log("📧 Processing order notifications...");

  // Generate PDF
  let invoiceUrl = "";
  try {
    const pdfBuffer = await generateInvoicePDF(orderData);
    invoiceUrl = await uploadInvoiceToStorage(pdfBuffer, orderData.orderId);
    console.log("✅ PDF invoice generated:", invoiceUrl);

    // Update order with invoice URL
    await supabase
      .from("orders")
      .update({ invoice_url: invoiceUrl })
      .eq("stripe_payment_intent_id", orderData.orderId);
  } catch (pdfError) {
    console.error("❌ PDF generation failed:", pdfError);
    // Don't throw here, continue with other notifications
  }

  // Send email
  try {
    await sendGridEmail({
      ...orderData,
      invoiceUrl: invoiceUrl,
    });
    console.log("✅ Email sent successfully");
  } catch (emailError) {
    console.error("❌ Email sending failed:", emailError);
  }

  // Send SMS
  if (smsData && smsData.to) {
    try {
      await sendOrderConfirmationSMS({
        ...smsData,
        invoiceUrl: invoiceUrl,
      });
      console.log("✅ SMS sent successfully");
    } catch (smsError) {
      console.error("❌ SMS sending failed:", smsError);
    }
  }
}
