// app/lib/email/templates/contact-notification.js
export function ContactNotificationTemplate({ name, email, message }) {
  return `
    <div>
      <h1>New Contact Form Submission</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
    </div>
  `;
}
