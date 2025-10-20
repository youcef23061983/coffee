// app/lib/email/client.js
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailConfig = {
  from: "Your App <hello@yourdomain.com>",
  replyTo: "support@yourdomain.com",
};
