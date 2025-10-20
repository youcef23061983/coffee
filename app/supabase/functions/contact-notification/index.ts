// // supabase/functions/contact-notification/index.ts
// import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// import { Resend } from "npm:resend@2.0.0"

// const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

// serve(async (req) => {
//   const { name, email, message } = await req.json()

//   const { data, error } = await resend.emails.send({
//     from: 'Contact Form <contact@yourdomain.com>',
//     to: ['your-email@gmail.com'],
//     subject: `New contact from ${name}`,
//     html: `
//       <h2>New Contact Form Submission</h2>
//       <p><strong>From:</strong> ${name} (${email})</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `
//   })

//   return new Response(JSON.stringify({ data, error }))
// })
