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
      console.log("🔍 Callback - Code:", code);

      if (code) {
        try {
          console.log("🔄 Exchanging code for session...");
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error("❌ Error exchanging code:", error);
            navigate("/auth/reset-password?error=invalid_code");
          } else {
            console.log(
              "✅ Code exchanged successfully, user:",
              data.user?.email
            );

            // Wait a moment to ensure session is persisted
            setTimeout(() => {
              navigate("/auth/reset-password");
            }, 1000);
          }
        } catch (error) {
          console.error("❌ Error in callback:", error);
          navigate("/auth/reset-password?error=exchange_failed");
        }
      } else {
        console.error("❌ No code found in URL");
        navigate("/auth/reset-password?error=no_code");
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
