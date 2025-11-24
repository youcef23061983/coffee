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
}
export const sendOrderConfirmationSMS = async (smsData: any) => {
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
    from: process.env.TWILIO_PHONE_NUMBER,
    to: smsData.to,
  });
};
