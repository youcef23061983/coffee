import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "~/hooks/CartContext";
import { motion } from "framer-motion";
import { supabase } from "~/supabase_client";
import { useAuth } from "~/hooks/appProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { total, cart, clearCart, cartPayment, shipping, amount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  // Debug function
  const debugLog = (message: string, data?: any) => {
    console.log(`🔍 ${message}`, data || "");
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        debugLog("Creating payment intent for amount:", total);
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            metadata: {
              total_quantity: cart.reduce((sum, item) => sum + item.amount, 0),
              customer_name: shipping.fullName,
              shipping_address: JSON.stringify(shipping),
              shipping_city: shipping.city,
              shipping_postal_code: shipping.postalCode,
              shipping_country: shipping.country,
              shipping_phone: shipping.fullPhone,
              order_items: JSON.stringify(
                cart.map((item) => ({
                  product_id: item.id,
                  product_name: item.name,
                  product_type: item.product_type || "coffee",
                  quantity: item.amount,
                  unit_price: Math.round((item.newPrice || item.price) * 100), // to cents
                  item_total: Math.round(
                    (item.newPrice || item.price) * item.amount * 100,
                  ),
                })),
              ),
            },
          }),
        });

        const data = await response.json();
        debugLog("Payment intent response:", data);

        if (data.error) {
          throw new Error(data.error);
        }
        setClientSecret(data.clientSecret);
      } catch (err) {
        debugLog("Payment intent creation failed:", err);
        setError("Failed to initialize payment");
      }
    };

    if (total > 0) {
      createPaymentIntent();
    }
  }, [total]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    debugLog("=== PAYMENT SUBMISSION STARTED ===");

    if (!stripe || !elements) {
      debugLog("Stripe or elements not ready");
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      debugLog("Card element not found");
      setError("Card element not found");
      setIsProcessing(false);
      return;
    }

    try {
      debugLog("Confirming payment with client secret...");
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      debugLog("Stripe confirmation result:", {
        stripeError,
        paymentIntent: paymentIntent
          ? {
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              receipt_email: paymentIntent.receipt_email,
            }
          : null,
      });

      if (stripeError) {
        debugLog("Stripe error occurred:", stripeError);
        setError(stripeError.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      // In your handleSubmit function, after payment success:
      if (paymentIntent && paymentIntent.status === "succeeded") {
        debugLog("✅ PAYMENT SUCCEEDED - Starting post-payment process");

        try {
          // 1. Save payment info first
          debugLog("Saving payment info...");
          cartPayment({
            paymentId: paymentIntent.id,
            total,
            timestamp: new Date().toISOString(),
            items: cart,
            shipping: shipping,
          });

          const orderData = {
            stripe_payment_intent_id: paymentIntent.id,
            total_quantity: cart.reduce((sum, item) => sum + item.amount, 0),
            total_amount: paymentIntent.amount / 100,
            customer_email:
              paymentIntent.receipt_email || user?.email || shipping.email,
            customer_name: shipping.fullName,
            shipping_address: shipping.address,
            shipping_city: shipping.city,
            shipping_postal_code: shipping.postalCode,
            shipping_country: shipping.country,
            shipping_phone: shipping.fullPhone,
          };

          debugLog("Order data to insert:", orderData);

          const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert(orderData)
            .select()
            .single();

          if (orderError) {
            debugLog("❌ Error creating order in Supabase:", orderError);
            throw new Error(`Database error: ${orderError.message}`);
          }

          debugLog("✅ Order created in Supabase:", order);

          // Create order items
          if (order) {
            const orderItemsData = cart.map((item) => ({
              order_id: order.id,
              product_id: item.id,
              product_name: item.name,
              product_type: item.product_type,
              quantity: item.amount,
              unit_price: item.newPrice || item.price,
              item_total: (item.newPrice || item.price) * item.amount,
            }));

            const { error: itemsError } = await supabase
              .from("order_items")
              .insert(orderItemsData);

            if (itemsError) {
              debugLog("❌ Error creating order items:", itemsError);
            } else {
              debugLog("✅ Order items created successfully");
            }

            // 🎉 NEW: Send email, SMS, and generate PDF

            try {
              debugLog("Starting notification services...");

              // Prepare data for notifications
              const notificationData = {
                orderId: paymentIntent.id,
                customerName: shipping.fullName,
                customerEmail:
                  paymentIntent.receipt_email || user?.email || shipping.email,
                total: total,
                items: cart.map((item) => ({
                  name: item.name,
                  quantity: item.amount,
                  price: item.newPrice || item.price,
                  product_type: item.product_type,
                })),
                shipping: {
                  address: shipping.address,
                  city: shipping.city,
                  postalCode: shipping.postalCode,
                  country: shipping.country,
                  phone: shipping.fullPhone,
                },
                date: new Date().toISOString(),
              };

              // Generate PDF FIRST
              debugLog("Generating PDF invoice...");
              const pdfResponse = await fetch("/api/generate-invoice", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(notificationData),
              });

              let invoiceUrl = ""; // ✅ Move declaration here, after PDF generation attempt

              if (pdfResponse.ok) {
                const result = await pdfResponse.json();
                invoiceUrl = result.invoiceUrl; // ✅ Now this assignment works
                debugLog("✅ PDF invoice generated and uploaded:", invoiceUrl);

                // Update order with invoice URL
                const { error: updateError } = await supabase
                  .from("orders")
                  .update({ invoice_url: invoiceUrl })
                  .eq("stripe_payment_intent_id", paymentIntent.id);

                if (updateError) {
                  debugLog(
                    "❌ Failed to update order with invoice URL:",
                    updateError,
                  );
                } else {
                  debugLog("✅ Order updated with invoice URL");
                }
              } else {
                debugLog(
                  "❌ PDF generation failed, continuing without invoice URL",
                );
              }

              // Send email WITH invoice link
              try {
                debugLog("Sending confirmation email...");
                // await fetch("/api/send-grid-email", {
                await fetch("/api/send-brevo-email", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...notificationData,
                    invoiceUrl: invoiceUrl,
                    subject: `🧾 Order Confirmation #${paymentIntent.id}`,
                  }),
                });
                debugLog("✅ Email sent");
              } catch (emailError) {
                debugLog("⚠️ Email sending failed:", emailError);
              }

              // Send SMS WITH invoice link (only if we have invoice URL)
              if (shipping.fullPhone && invoiceUrl) {
                try {
                  debugLog("Sending confirmation SMS...");
                  await fetch("/api/send-order-sms", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      to: shipping.fullPhone,
                      orderId: paymentIntent.id,
                      customerName: shipping.fullName,
                      total: total,
                      invoiceUrl: invoiceUrl,
                    }),
                  });
                  debugLog("✅ SMS sent");
                } catch (smsError) {
                  debugLog("⚠️ SMS sending failed:", smsError);
                }
              }

              // Send WhatsApp message (works without invoice URL)
              if (shipping.fullPhone) {
                //   try {
                // sending whatsApp message WITH  callmebot

                //     debugLog("Sending WhatsApp confirmation...");
                //     await fetch("/api/send-whatsapp", {
                //       method: "POST",
                //       headers: {
                //         "Content-Type": "application/json",
                //       },
                //       body: JSON.stringify({
                // to: shipping.fullPhone,
                // orderId: paymentIntent.id,
                // customerName: shipping.fullName,
                // total: total,
                // invoiceUrl: invoiceUrl, // Optional
                //       }),
                //     });
                //     debugLog("✅ WhatsApp message sent");
                //   } catch (whatsappError) {
                //     debugLog("⚠️ WhatsApp sending failed:", whatsappError);
                //   }
                // }
                try {
                  // sending whatsApp message WITH  twilio whatsapp

                  debugLog("Sending WhatsApp confirmation...");
                  await fetch("/api/send-whatsApp-message", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      to: shipping.fullPhone,
                      orderId: paymentIntent.id,
                      customerName: shipping.fullName,
                      total: total,
                      invoiceUrl: invoiceUrl, // Optional
                    }),
                  });
                  debugLog("✅ WhatsApp message sent");
                } catch (whatsappError) {
                  debugLog("⚠️ WhatsApp sending failed:", whatsappError);
                }
              }

              debugLog("✅ All notifications sent successfully");
            } catch (notificationError) {
              debugLog(
                "⚠️ Notification services had issues:",
                notificationError,
              );
            }
          }

          // 2. Clear cart
          debugLog("Clearing cart...");
          clearCart();

          // 3. Navigate to success page
          debugLog("Navigating to order-success...");
          navigate("/order-success", {
            state: {
              orderId: paymentIntent.id,
              amount: total,
              items: amount,
              shipping: shipping,
            },
            replace: true,
          });

          debugLog("✅ NAVIGATION TRIGGERED SUCCESSFULLY");
        } catch (postPaymentError: any) {
          debugLog("❌ Error in post-payment process:", postPaymentError);
          setError(
            `Payment succeeded but: ${postPaymentError.message || "There was an issue with order processing"}`,
          );
        }
      } else {
        setError(
          `Payment status: ${paymentIntent?.status}. Please contact support.`,
        );
        setIsProcessing(false);
      }
    } catch (err) {
      debugLog("💥 Unexpected error during payment:", err);
      setError("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Card Details</h3>
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
