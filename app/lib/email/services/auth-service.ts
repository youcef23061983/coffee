// // lib/email/services/auth-service.js
// import { resend } from '../client.js'
// import { WelcomeTemplate } from '../templates/welcome.js'

// export class AuthEmailService {
//   static async sendWelcomeEmail(userEmail, userName) {
//     return await resend.emails.send({
//       from: 'Welcome <welcome@yourdomain.com>',
//       to: [userEmail],
//       subject: `Welcome to Our App, ${userName}!`,
//       html: WelcomeTemplate({ userName })
//     })
//   }
// }
