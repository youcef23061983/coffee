// // supabase/functions/send-contact-email/index.js
// import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// import { Resend } from "npm:resend@2.0.0"
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
// const supabase = createClient(
//   Deno.env.get('SUPABASE_URL'),
//   Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
// )

// serve(async (req) => {
//   const { messageId, name, email, message } = await req.json()

//   try {
//     // Send email
//     const { data, error } = await resend.emails.send({
//       from: 'Contact Form <contact@yourdomain.com>',
//       to: ['your-email@gmail.com'], // Your admin email
//       subject: `New contact from ${name}`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>From:</strong> ${name} (${email})</p>
//         <p><strong>Message:</strong> ${message}</p>
//         <p><strong>Message ID:</strong> ${messageId}</p>
//         <hr>
//         <p><a href="${Deno.env.get('SUPABASE_URL')}/dashboard">View in Dashboard</a></p>
//       `,
//       reply_to: email
//     })

//     if (error) throw error

//     // Optional: Update message status in database
//     await supabase
//       .from('contact_messages')
//       .update({ email_sent: true, sent_at: new Date().toISOString() })
//       .eq('id', messageId)

//     return new Response(JSON.stringify({
//       success: true,
//       data,
//       message: 'Email sent successfully'
//     }), {
//       headers: { 'Content-Type': 'application/json' }
//     })

//   } catch (error) {
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     })
//   }
// })
