// app/components/AuthProvider.jsx
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function AuthProvider({ children }) {
  const supabase = useSupabaseClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        // Send welcome email to new users
        try {
          await supabase.functions.invoke("send-welcome-email", {
            body: {
              userEmail: session.user.email,
              userName: session.user.user_metadata?.name || "there",
            },
          });
        } catch (error) {
          console.error("Failed to send welcome email:", error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return children;
}
