// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!,
//   {
//     auth: {
//       persistSession: true,
//       autoRefreshToken: true,
//       detectSessionInUrl: true,
//       flowType: "pkce", // Important for local development
//     },
//   }
// );

// ~/supabase_client.ts
// ~/supabase_client.ts

// ~/supabase_client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("🔧 Supabase Config:", {
  url: supabaseUrl ? "Set" : "Missing",
  key: supabaseAnonKey ? "Set" : "Missing",
  nodeEnv: import.meta.env.MODE,
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Use implicit flow for password reset to avoid PKCE issues
    flowType: "implicit", // Changed from 'pkce'
    storage: {
      getItem: (key) => {
        if (typeof window !== "undefined") {
          try {
            return localStorage.getItem(key);
          } catch (e) {
            console.error("Error reading from localStorage:", e);
            return null;
          }
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(key, value);
          } catch (e) {
            console.error("Error writing to localStorage:", e);
          }
        }
      },
      removeItem: (key) => {
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.error("Error removing from localStorage:", e);
          }
        }
      },
    },
  },
});
