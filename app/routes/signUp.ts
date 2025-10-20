// // app/routes/auth/signup.tsx
// import { Form, useActionData, redirect } from 'react-router'

// export async function action({ request }) {
//   const formData = await request.formData()
//   const email = formData.get('email')
//   const name = formData.get('name')
//   const password = formData.get('password')

//   try {
//     // 1. Create user in Supabase Auth
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { name }
//       }
//     })

//     if (authError) throw authError

//     // 2. Send welcome email via Supabase function
//     if (authData.user) {
//       const { error: emailError } = await supabase.functions.invoke(
//         'send-welcome-email',
//         {
//           body: {
//             userEmail: authData.user.email,
//             userName: name
//           }
//         }
//       )

//       if (emailError) {
//         console.error('Welcome email failed:', emailError)
//         // Continue anyway - user is created
//       }
//     }

//     return redirect('/dashboard')

//   } catch (error) {
//     return {
//       success: false,
//       error: error.message
//     }
//   }
// }

// export default function SignupRoute() {
//   const actionData = useActionData()

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <Form method="post">
//         <input type="text" name="name" placeholder="Your Name" required />
//         <input type="email" name="email" placeholder="Email" required />
//         <input type="password" name="password" placeholder="Password" required />
//         <button type="submit">Sign Up</button>
//       </Form>

//       {actionData?.error && <div>❌ {actionData.error}</div>}
//     </div>
//   )
// }
