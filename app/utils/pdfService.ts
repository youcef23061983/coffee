import PDFDocument from "pdfkit";
import { supabase } from "~/supabase_client";
import fs from "fs";
import path from "path";

interface InvoiceData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    product_type?: string;
  }>;
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  date: string;
}

export const generateInvoicePDF = async (
  invoiceData: InvoiceData
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Logo at top center (if exists)
      let currentY = 50;
      try {
        const logoPath = path.join(process.cwd(), "public", "logo.png");
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 250, currentY, { width: 80, align: "center" });
          currentY += 100; // Space after logo
        } else {
          // If no logo, just use the header
          doc
            .fillColor("#059669")
            .fontSize(20)
            .text("Your Coffee Shop", 50, currentY)
            .fontSize(10)
            .fillColor("#666666")
            .text("Invoice", 50, currentY + 25);
          currentY += 60; // Space after header
        }
      } catch (error) {
        console.log("Logo not found, using text header only");
        doc
          .fillColor("#059669")
          .fontSize(20)
          .text("Your Coffee Shop", 50, currentY)
          .fontSize(10)
          .fillColor("#666666")
          .text("Invoice", 50, currentY + 25);
        currentY += 60;
      }

      // Order Information with proper vertical spacing
      doc
        .fontSize(12)
        .fillColor("#000000")
        .text(`Order ID: ${invoiceData.orderId}`, 350, currentY)
        .text(
          `Date: ${new Date(invoiceData.date).toLocaleDateString()}`,
          350,
          currentY + 40 // Proper spacing
        )
        .text(`Customer: ${invoiceData.customerName}`, 350, currentY + 60)
        .text(`Email: ${invoiceData.customerEmail}`, 350, currentY + 80);

      // Shipping Address with proper spacing
      currentY += 90; // Space before shipping address
      doc
        .text("Shipping Address:", 50, currentY)
        .text(invoiceData.shipping.address, 50, currentY + 15)
        .text(
          `${invoiceData.shipping.city}, ${invoiceData.shipping.postalCode}`,
          50,
          currentY + 30
        )
        .text(invoiceData.shipping.country, 50, currentY + 45)
        .text(`Phone: ${invoiceData.shipping.phone}`, 50, currentY + 60);

      // Line separator
      currentY += 80;
      doc
        .moveTo(50, currentY)
        .lineTo(550, currentY)
        .strokeColor("#cccccc")
        .stroke();

      // Items Table Header
      currentY += 20;
      doc
        .fillColor("#374151")
        .fontSize(12)
        .text("Item", 50, currentY)
        .text("Quantity", 300, currentY)
        .text("Price", 400, currentY)
        .text("Total", 500, currentY);

      // Table header line
      currentY += 15;
      doc
        .moveTo(50, currentY)
        .lineTo(550, currentY)
        .strokeColor("#cccccc")
        .stroke();

      // Items
      currentY += 15;
      invoiceData.items.forEach((item) => {
        const itemTotal = item.price * item.quantity;

        doc
          .fillColor("#000000")
          .fontSize(10)
          .text(item.name, 50, currentY)
          .text(item.quantity.toString(), 300, currentY)
          .text(`${item.price.toFixed(2)} $`, 400, currentY)
          .text(`${itemTotal.toFixed(2)} $`, 500, currentY);

        currentY += 20;
      });

      // Total line
      currentY += 10;
      doc
        .moveTo(50, currentY)
        .lineTo(550, currentY)
        .strokeColor("#cccccc")
        .stroke();

      // Total amount
      currentY += 15;
      doc
        .fontSize(12)
        .fillColor("#059669")
        .text("Total:", 400, currentY)
        .text(`${invoiceData.total.toFixed(2)} $`, 500, currentY);

      // Footer
      currentY += 40;
      doc
        .fontSize(8)
        .fillColor("#666666")
        .text(
          "Thank you for your order! We appreciate your business.",
          50,
          currentY
        )
        .text(
          "Your Coffee Shop - Brewing happiness since 2024",
          50,
          currentY + 15
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadInvoiceToStorage = async (
  pdfBuffer: Buffer,
  orderId: string
) => {
  const fileName = `invoices/${orderId}-invoice.pdf`;

  const { data, error } = await supabase.storage
    .from("orders")
    .upload(fileName, pdfBuffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("orders").getPublicUrl(fileName);

  return publicUrl;
};
