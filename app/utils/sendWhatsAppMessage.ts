import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SMSData {
  to: string;
  orderId: string;
  customerName: string;
  total: number;
  invoiceUrl?: string;
}
export async function sendWhatsAppMessage(smsData: SMSData) {
  const invoiceText = smsData.invoiceUrl
    ? `\n📄 Invoice: ${smsData.invoiceUrl}`
    : "";

  const message = `
☕ Order Confirmed!

Hi ${smsData.customerName}, your coffee order #${smsData.orderId} has been received!

Total: $${smsData.total.toFixed(2)}
${invoiceText}

We're brewing your order now! Track your order with your order ID.
  `.trim();

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${smsData.to}`, // Format: whatsapp:+1234567890
  });
}
