// import { sendOrderConfirmationEmail } from "~/utils/emailService";
// import { sendOrderConfirmationSMS } from "~/utils/smsService";
// import { generateInvoicePDF, uploadInvoiceToStorage } from "~/utils/pdfService";

// export async function sendOrderConfirmation(data: any) {
//   try {
//     console.log("📧 Sending order confirmation email...", data);
//     await sendOrderConfirmationEmail(data);
//     console.log("✅ Email sent successfully");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     throw new Error("Failed to send email");
//   }
// }

// export async function sendOrderSMS(data: any) {
//   try {
//     console.log("📱 Sending order confirmation SMS...", data);
//     await sendOrderConfirmationSMS(data);
//     console.log("✅ SMS sent successfully");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ SMS sending failed:", error);
//     throw new Error("Failed to send SMS");
//   }
// }

// export async function generateInvoice(data: any) {
//   try {
//     console.log("📄 Generating PDF invoice...", data);
//     const pdfBuffer = await generateInvoicePDF(data);
//     const invoiceUrl = await uploadInvoiceToStorage(pdfBuffer, data.orderId);
//     console.log("✅ PDF invoice generated:", invoiceUrl);
//     return { success: true, invoiceUrl };
//   } catch (error) {
//     console.error("❌ PDF generation failed:", error);
//     throw new Error("Failed to generate invoice");
//   }
// }
