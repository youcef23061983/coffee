// // app/lib/email/services/contact-service.js
// import { resend } from "../client.js";

// export async function sendContactNotification({ name, email, message }) {
//   const { data, error } = await resend.emails.send({
//     from: "Contact Form <contact@yourdomain.com>",
//     to: ["your-email@gmail.com"], // Your email
//     subject: `New contact from ${name}`,
//     html: `
//       <h2>New Contact Form Submission</h2>
//       <p><strong>From:</strong> ${name} (${email})</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `,
//     reply_to: email,
//   });

//   return { data, error };
// }
