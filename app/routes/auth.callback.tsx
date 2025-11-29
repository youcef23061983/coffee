// app/routes/auth.callback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "~/supabase_client";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      console.log("🔍 Callback - Code received:", code);
      console.log("🔍 Full URL:", window.location.href);

      if (!code) {
        console.error("❌ No code found in URL");
        navigate("/auth/reset-password?error=no_code");
        return;
      }

      try {
        console.log("🔄 Step 1: Checking existing session...");
        const {
          data: { session: existingSession },
        } = await supabase.auth.getSession();
        console.log("🔍 Existing session:", existingSession);

        console.log("🔄 Step 2: Exchanging code for session...");
        const { data, error } =
          await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("❌ Code exchange failed:", {
            message: error.message,
            status: error.status,
            name: error.name,
          });
          navigate("/auth/reset-password?error=invalid_code");
          return;
        }

        console.log("✅ Code exchange successful!");
        console.log("🔍 Received data:", {
          user: data.user?.email,
          hasSession: !!data.session,
        });

        console.log("🔄 Step 3: Verifying session was stored...");
        const {
          data: { session: verifiedSession },
        } = await supabase.auth.getSession();
        console.log("🔍 Verified session:", verifiedSession);

        if (verifiedSession) {
          console.log("✅ Session verified! User:", verifiedSession.user.email);
          console.log("🔄 Step 4: Redirecting to reset password...");

          // Use a shorter delay
          setTimeout(() => {
            navigate("/auth/reset-password");
          }, 100);
        } else {
          console.error("❌ Session was not persisted after exchange");
          navigate("/auth/reset-password?error=session_not_persisted");
        }
      } catch (error) {
        console.error("❌ Unexpected error:", error);
        navigate("/auth/reset-password?error=unexpected_error");
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="coffee-icon">⏳</div>
          <h1>Processing Your Request</h1>
          <p>Please wait while we verify your reset link...</p>
        </div>
      </div>
    </div>
  );
}
