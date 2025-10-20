// // app/routes/contact/route.jsx
// import { Form, useActionData } from 'react-router'
// import { sendContactNotification } from '~/lib/email/services/contact-service'

// export async function action({ request }) {
//   const formData = await request.formData()
//   const name = formData.get('name')
//   const email = formData.get('email')
//   const message = formData.get('message')

//   // Save to database first
//   const { data: dbData, error: dbError } = await supabase
//     .from('contact_messages')
//     .insert([{ name, email, message }])

//   if (dbError) {
//     return { success: false, error: 'Failed to save message' }
//   }

//   // Send email notification
//   const { error: emailError } = await sendContactNotification({
//     name, email, message
//   })

//   if (emailError) {
//     console.error('Email failed but data saved:', emailError)
//   }

//   return {
//     success: true,
//     message: 'Thank you! Your message has been sent.'
//   }
// }

// export default function ContactRoute() {
//   const actionData = useActionData()

//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <Form method="post">
//         <input type="text" name="name" placeholder="Your Name" required />
//         <input type="email" name="email" placeholder="Your Email" required />
//         <textarea name="message" placeholder="Your Message" required />
//         <button type="submit">Send Message</button>
//       </Form>

//       {actionData?.success && (
//         <div className="success">{actionData.message}</div>
//       )}
//       {actionData?.error && (
//         <div className="error">{actionData.error}</div>
//       )}
//     </div>
//   )
// }
