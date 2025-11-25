interface WhatsAppRequest {
  to: string;
  orderId: string;
  customerName: string;
  total: number;
  invoiceUrl?: string;
}
export async function sendWhatsAppMessage(data: WhatsAppRequest) {
  const message = data.invoiceUrl
    ? `Hi ${data.customerName}, your order ${data.orderId} of $${(data.total / 100).toFixed(2)} was received. 📦\n\n📎 Invoice: ${data.invoiceUrl}\n\nThank you for your order! 🎉`
    : `Hi ${data.customerName}, your order ${data.orderId} of $${(data.total / 100).toFixed(2)} was received. 📦\n\nThank you for your order! 🎉`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${
    data.to
  }&text=${encodeURIComponent(message)}&apikey=${
    process.env.CALLMEBOT_API_KEY
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WhatsApp API responded with status: ${response.status}`);
  }

  console.log("✅ WhatsApp message sent successfully");
}
