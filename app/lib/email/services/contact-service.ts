// // app/lib/email/services/contact-service.js
// import { resend } from "../client.js";
// import { ContactNotificationTemplate } from "../templates/contact-notification.js";

// export async function sendContactNotification({ name, email, message }) {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Contact Form <contact@yourdomain.com>",
//       to: ["your-email@gmail.com"], // Your admin email
//       subject: `New contact from ${name}`,
//       html: ContactNotificationTemplate({ name, email, message }),
//       reply_to: email,
//     });

//     return { data, error };
//   } catch (error) {
//     return { error };
//   }
// }
