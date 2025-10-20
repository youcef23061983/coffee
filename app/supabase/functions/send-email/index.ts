// import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// import { Resend } from "npm:resend@2.0.0"

// const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// }

// serve(async (req) => {
//   // Handle CORS preflight requests
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   try {
//     const { to, subject, html, text, from = 'your-verified-email@your-domain.com' } = await req.json()

//     // Validate required fields
//     if (!to || !subject || !html) {
//       return new Response(
//         JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         }
//       )
//     }

//     const { data, error } = await resend.emails.send({
//       from: from,
//       to: Array.isArray(to) ? to : [to],
//       subject: subject,
//       html: html,
//       text: text || html.replace(/<[^>]*>/g, ''),
//     })

//     if (error) {
//       return new Response(
//         JSON.stringify({ error: error.message }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         }
//       )
//     }

//     return new Response(
//       JSON.stringify({ data, success: true }),
//       {
//         status: 200,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//       }
//     )
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       {
//         status: 500,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//       }
//     )
//   }
// })
