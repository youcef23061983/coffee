// // supabase/functions/send-welcome-email/index.js
// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// import { Resend } from "npm:resend@2.0.0";

// const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// serve(async (req) => {
//   try {
//     const { userEmail, userName } = await req.json();

//     if (!userEmail) {
//       throw new Error("User email is required");
//     }

//     const { data, error } = await resend.emails.send({
//       from: "Welcome <welcome@yourdomain.com>",
//       to: [userEmail],
//       subject: `Welcome to Our App, ${userName || "there"}!`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
//             .content { padding: 20px; background: #f9f9f9; }
//             .footer { padding: 20px; text-align: center; color: #666; }
//             .button { background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🎉 Welcome Aboard!</h1>
//             </div>
//             <div class="content">
//               <h2>Hello ${userName || "there"},</h2>
//               <p>We're thrilled to have you join our community! Your account has been successfully created.</p>

//               <p>Here's what you can do next:</p>
//               <ul>
//                 <li>Complete your profile</li>
//                 <li>Explore our features</li>
//                 <li>Join our community forum</li>
//               </ul>

//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="https://yourapp.com/dashboard" class="button">Get Started</a>
//               </div>

//               <p>If you have any questions, feel free to reply to this email or check out our <a href="https://yourapp.com/help">help center</a>.</p>

//               <p>Best regards,<br>The Team</p>
//             </div>
//             <div class="footer">
//               <p>&copy; 2024 Your App Name. All rights reserved.</p>
//               <p><a href="https://yourapp.com/unsubscribe">Unsubscribe</a> | <a href="https://yourapp.com/privacy">Privacy Policy</a></p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//     });

//     if (error) {
//       throw error;
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data,
//         message: "Welcome email sent successfully",
//       }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message,
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// });
