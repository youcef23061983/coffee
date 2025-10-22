// // app/routes/contact.tsx
// import { Form, useActionData } from "react-router";

// export async function action({ request }) {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const message = formData.get("message");

//   try {
//     // 1. Save to database
//     const { data: dbData, error: dbError } = await supabase
//       .from("contact_messages")
//       .insert([{ name, email, message }])
//       .select();

//     if (dbError) throw new Error(`Database error: ${dbError.message}`);

//     // 2. Send email via Supabase function
//     const { data: emailData, error: emailError } =
//       await supabase.functions.invoke("send-contact-email", {
//         body: {
//           messageId: dbData[0].id,
//           name,
//           email,
//           message,
//         },
//       });

//     if (emailError) {
//       console.error("Email failed but data saved:", emailError);
//       // Continue anyway - data is safe
//     }

//     return {
//       success: true,
//       message: "Thank you! Your message has been sent.",
//       messageId: dbData[0].id,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export default function ContactRoute() {
//   const actionData = useActionData();

//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <Form method="post">
//         <input type="text" name="name" required />
//         <input type="email" name="email" required />
//         <textarea name="message" required />
//         <button type="submit">Send Message</button>
//       </Form>

//       {actionData?.success && <div>✅ {actionData.message}</div>}
//       {actionData?.error && <div>❌ {actionData.error}</div>}
//     </div>
//   );
// }
