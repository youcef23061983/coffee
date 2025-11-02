// // app/routes/dashboard.tsx
// import { useLoaderData } from 'react-router'

// export async function loader() {
//   // Use Supabase function for complex analytics
//   const { data: analytics, error } = await supabase.functions.invoke(
//     'get-contact-analytics'
//   )

//   if (error) {
//     console.error('Analytics error:', error)
//     // Fallback to direct query
//     const { data: messages } = await supabase
//       .from('contact_messages')
//       .select('*')

//     return { messages, analytics: null }
//   }

//   return { analytics }
// }

// export default function Dashboard() {
//   const { analytics } = useLoaderData()

//   return (
//     <div>
//       <h1>Contact Analytics</h1>
//       {analytics ? (
//         <div>
//           <p>Total Messages: {analytics.total}</p>
//           <p>This Week: {analytics.thisWeek}</p>
//           <p>Response Rate: {analytics.responseRate}%</p>
//         </div>
//       ) : (
//         <p>Loading analytics...</p>
//       )}
//     </div>
//   )
// }

const Dashboard = () => {
  //   const user = useUser();
  //   console.log("dashboard user:", user);
  //   if (!user) return <div>Please log in</div>;
  //   return (
  //     <div>
  //       <h1>hi,{user?.email}</h1>
  //     </div>
  //   );
};

export default Dashboard;
