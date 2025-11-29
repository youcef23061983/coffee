// app/routes/auth/reset-password.tsx
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
  redirect,
} from "react-router";
import { supabase } from "~/supabase_client";
import type { ActionFunction, LoaderFunction } from "react-router";
import { useState, useEffect } from "react";

interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  console.log("🔍 Reset Password Loader - Code:", code);

  // If we have a code, exchange it for a session
  if (code) {
    try {
      console.log("🔄 Exchanging code for session...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("❌ Error exchanging code:", error);
        return { error: "invalid_code" };
      }

      console.log("✅ Code exchanged successfully, user:", data.user?.email);
      // Return the session data to maintain it
      return {
        hasValidSession: true,
        user: data.user,
      };
    } catch (error) {
      console.error("❌ Error in loader:", error);
      return { error: "exchange_failed" };
    }
  }

  // Check if we have a valid session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  console.log("🔍 Session check:", { hasSession: !!session, sessionError });

  if (session) {
    console.log("✅ Valid session found for user:", session.user.email);
    return {
      hasValidSession: true,
      user: session.user,
    };
  }

  return { hasValidSession: false };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  console.log("🔄 Reset Password Action triggered");

  // Validation
  if (!password || !confirmPassword) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters",
    };
  }

  try {
    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("🔍 User in action:", user ? user.email : "No user");
    console.log("🔍 User error in action:", userError);

    if (userError) {
      console.error("❌ getUser error:", userError);
      throw new Error("Authentication error. Please try again.");
    }

    if (!user) {
      throw new Error(
        "Your reset link has expired or is invalid. Please request a new password reset."
      );
    }

    // Update the user's password
    console.log("🔄 Updating user password...");
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error("❌ Error updating password:", updateError);
      throw updateError;
    }

    console.log("✅ Password updated successfully");

    // Sign out the user after password reset
    await supabase.auth.signOut();
    console.log("✅ User signed out after password reset");

    return {
      success: true,
      message:
        "Password reset successfully! You can now sign in with your new password.",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("❌ Action error:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default function ResetPasswordRoute() {
  const loaderData = useActionData() as
    | { hasValidSession?: boolean; error?: string }
    | undefined;
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const code = searchParams.get("code");

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Client-side session check...");

      // First, check if we have loader data with session
      if (loaderData?.hasValidSession) {
        console.log("✅ Session from loader data");
        setHasSession(true);
        setIsReady(true);
        return;
      }

      // If we have a code in URL but no session from loader, try to process it client-side
      if (code && !hasSession) {
        console.log("🔄 Processing code client-side...");
        try {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error("❌ Client-side code exchange failed:", error);
          } else {
            console.log("✅ Client-side code exchange successful");
            setHasSession(true);
            setIsReady(true);

            // Remove code from URL without reloading
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("code");
            window.history.replaceState({}, "", newUrl.toString());
            return;
          }
        } catch (error) {
          console.error("❌ Client-side code exchange error:", error);
        }
      }

      // Final session check
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("🔍 Final session check:", !!session);
      setHasSession(!!session);
      setIsReady(true);
    };

    checkAuth();
  }, [code, loaderData]);

  // Show loading while processing
  if (!isReady) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="coffee-icon">⏳</div>
            <h1>Processing Reset Link</h1>
            <p>Please wait while we verify your reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if we have loader error
  if (loaderData?.error) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="coffee-icon">❌</div>
            <h1>Reset Link Error</h1>
            <p>There was a problem with your reset link</p>
          </div>
          <div className="error-message">
            {loaderData.error === "invalid_code" &&
              "The reset link is invalid or has expired."}
            {loaderData.error === "exchange_failed" &&
              "Failed to process the reset link."}
            {!["invalid_code", "exchange_failed"].includes(loaderData.error) &&
              "An unknown error occurred."}
            <div className="mt-3 text-center">
              <a href="/auth/forgot-password" className="login-link">
                Request a new reset link
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="coffee-icon">🔄</div>
          <h1>Set New Password</h1>
          <p>Create a new password for your account</p>
        </div>

        {!hasSession ? (
          <div className="error-message">
            ❌ Invalid or expired reset link. Please request a new password
            reset.
            <div
              style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}
            >
              <p>Debug info:</p>
              <ul style={{ textAlign: "left", marginLeft: "1rem" }}>
                <li>Code in URL: {code ? "Yes" : "No"}</li>
                <li>Has Session: No</li>
                <li>Loader Error: {loaderData?.error || "None"}</li>
                <li>
                  If code exists but no session, check browser console for
                  errors
                </li>
              </ul>
            </div>
            <div className="mt-3 text-center">
              <a href="/auth/forgot-password" className="login-link">
                Request New Reset Link
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="success-message" style={{ marginBottom: "20px" }}>
              ✅ Reset link verified! You can now set your new password.
            </div>

            <Form method="post" className="signup-form">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password (min. 6 characters)"
                  required
                  disabled={isSubmitting}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  disabled={isSubmitting}
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !password || !confirmPassword}
                className="submit-button"
              >
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>
            </Form>

            {actionData?.success && (
              <div className="success-message">
                ✅ {actionData.message}
                <div className="mt-3 text-center">
                  <a href="/auth/login" className="login-link">
                    Sign in with your new password
                  </a>
                </div>
              </div>
            )}

            {actionData?.error && !actionData.success && (
              <div className="error-message">❌ {actionData.error}</div>
            )}
          </>
        )}

        <div className="signup-footer">
          <p>
            Remember your password?{" "}
            <a href="/auth/login" className="login-link">
              Back to Sign In
            </a>
          </p>
          <p className="mt-2">
            Need a new reset link?{" "}
            <a href="/auth/forgot-password" className="login-link">
              Request Password Reset
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .form-label {
          color: #5D4037;
          font-weight: 500;
          margin-bottom: 4px;
          font-size: 14px;
        }
       
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #D2691E 100%);
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .signup-card {
          background: rgba(255, 253, 250, 0.95);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.3);
          width: 100%;
          max-width: 440px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(210, 105, 30, 0.2);
        }

        .signup-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .coffee-icon {
          font-size: 48px;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #8B4513, #D2691E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
        }

        .signup-header h1 {
          color: #5D4037;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .signup-header p {
          color: #8D6E63;
          font-size: 16px;
          margin: 0;
          font-weight: 400;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-input {
          padding: 16px;
          border: 2px solid #E0D5C9;
          border-radius: 12px;
          font-size: 16px;
          background: #FFFDFA;
          transition: all 0.3s ease;
          color: #5D4037;
        }

        .form-input:focus {
          outline: none;
          border-color: #D2691E;
          box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
          background: #FFF;
        }

        .form-input::placeholder {
          color: #A1887F;
        }

        .submit-button {
          padding: 16px;
          background: linear-gradient(135deg, #8B4513, #D2691E);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
          letter-spacing: 0.5px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
          background: linear-gradient(135deg, #7A3A10, #C1581A);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .success-message {
          background: #E8F5E8;
          color: #2E7D32;
          padding: 16px;
          border-radius: 8px;
          margin-top: 20px;
          font-weight: 500;
          border-left: 4px solid #4CAF50;
          text-align: center;
        }

        .error-message {
          background: #FFEBEE;
          color: #E53935;
          padding: 12px 16px;
          border-radius: 8px;
          margin-top: 20px;
          font-weight: 500;
          border-left: 4px solid #E53935;
        }

        .signup-footer {
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #E0D5C9;
        }

        .signup-footer p {
          color: #8D6E63;
          margin: 0 0 8px 0;
        }

        .login-link {
          color: #D2691E;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #8B4513;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 30px 24px;
            margin: 10px;
          }
          
          .signup-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
