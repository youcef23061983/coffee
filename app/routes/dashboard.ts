// // app/routes/dashboard/route.jsx
// import { useLoaderData } from 'react-router'

// export async function loader() {
//   const { data: messages } = await supabase
//     .from('contact_messages')
//     .select('*')
//     .order('created_at', { ascending: false })

//   const analytics = {
//     total: messages.length,
//     today: messages.filter(msg =>
//       new Date(msg.created_at).toDateString() === new Date().toDateString()
//     ).length,
//     thisWeek: messages.filter(msg =>
//       new Date(msg.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//     ).length
//   }

//   return { messages, analytics }
// }

// export default function DashboardRoute() {
//   const { messages, analytics } = useLoaderData()

//   return (
//     <div>
//       <h1>Contact Form Analytics</h1>

//       <div className="stats">
//         <div className="stat">
//           <h3>Total Messages</h3>
//           <p>{analytics.total}</p>
//         </div>
//         <div className="stat">
//           <h3>Today</h3>
//           <p>{analytics.today}</p>
//         </div>
//         <div className="stat">
//           <h3>This Week</h3>
//           <p>{analytics.thisWeek}</p>
//         </div>
//       </div>

//       <div className="recent-messages">
//         <h2>Recent Messages</h2>
//         {messages.slice(0, 10).map(message => (
//           <div key={message.id} className="message-card">
//             <h4>{message.name} ({message.email})</h4>
//             <p>{message.message}</p>
//             <small>{new Date(message.created_at).toLocaleString()}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
