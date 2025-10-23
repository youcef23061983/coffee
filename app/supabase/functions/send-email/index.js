// Change from: send-email/index.ts
// Change to: send-email/index.js

// supabase/functions/send-contact-email/index.js
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

serve(async (req) => {
  const { messageId, name, email, message } = await req.json();

  try {
    // Send email
    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@yourdomain.com>",
      to: ["youcef.belcourtois@gmail.com"], // ← CHANGE TO YOUR ACTUAL EMAIL
      subject: `New contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-top: none; }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .button { background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #4F46E5; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>☕ New Coffee Inquiry</h1>
          </div>
          <div class="content">
            <h2>You have a new contact form submission!</h2>
            
            <div class="message-box">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>💬 Message:</strong></p>
              <p>${message}</p>
            </div>
            
            <p><strong>🆔 Message ID:</strong> ${messageId}</p>
            <p><strong>⏰ Received:</strong> ${new Date().toLocaleString()}</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="mailto:${email}" class="button">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your coffee company contact form.</p>
            <p><a href="${Deno.env.get("SUPABASE_URL")}">View in Dashboard</a></p>
          </div>
        </body>
        </html>
      `,
      reply_to: email,
    });

    if (error) throw error;

    // Optional: Update message status in database
    await supabase
      .from("contact_messages")
      .update({
        email_sent: true,
        sent_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    return new Response(
      JSON.stringify({
        success: true,
        data,
        message: "Email sent successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Log error but don't crash
    console.error("Email sending failed:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
