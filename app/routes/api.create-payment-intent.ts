import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

interface ActionArgs {
  request: Request;
}

export async function action({ request }: ActionArgs) {
  try {
    const { amount, currency = "usd" } = await request.json();

    // Validate required fields
    if (!amount || typeof amount !== "number") {
      return new Response(
        JSON.stringify({ error: "Valid amount is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return plain object - React Router will handle serialization
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);

    // You can also throw a Response for errors in React Router
    throw new Response(
      JSON.stringify({ error: "Failed to create payment intent" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
