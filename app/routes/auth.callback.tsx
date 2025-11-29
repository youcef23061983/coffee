// app/routes/auth.callback.tsx (implicit flow version)
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "~/supabase_client";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // For implicit flow, we get access_token and refresh_token directly
      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");
      const error = searchParams.get("error");
      const error_description = searchParams.get("error_description");

      console.log("🔍 Callback - Implicit flow tokens:", {
        access_token: access_token ? "Present" : "Missing",
        refresh_token: refresh_token ? "Present" : "Missing",
        error,
        error_description,
      });

      if (error) {
        console.error("❌ Auth error:", error, error_description);
        navigate(`/auth/reset-password?error=auth_${error}`);
        return;
      }

      if (access_token && refresh_token) {
        try {
          console.log("🔄 Setting session from tokens...");
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (sessionError) {
            console.error("❌ Session setting failed:", sessionError);
            navigate("/auth/reset-password?error=session_error");
            return;
          }

          console.log("✅ Session set successfully!");
          console.log("🔍 User:", data.user?.email);

          // Clean up URL by removing tokens
          const cleanUrl = new URL(window.location.href);
          cleanUrl.search = "";
          window.history.replaceState({}, "", cleanUrl.toString());

          navigate("/auth/reset-password");
        } catch (error) {
          console.error("❌ Error setting session:", error);
          navigate("/auth/reset-password?error=unexpected_error");
        }
      } else {
        console.error("❌ No tokens found in URL");
        navigate("/auth/reset-password?error=no_tokens");
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
