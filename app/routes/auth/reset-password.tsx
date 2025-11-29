// app/routes/auth/reset-password.tsx
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router";
import { supabase } from "~/supabase_client";
import type { ActionFunction } from "react-router";
import { useState, useEffect } from "react";

interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

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
    // Supabase will automatically handle the session from the URL token
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) throw error;

    return {
      success: true,
      message:
        "Password reset successfully! You can now sign in with your new password.",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default function ResetPasswordRoute() {
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if we have a valid reset token in the URL
  const hasToken =
    searchParams.get("token") || searchParams.get("type") === "recovery";

  useEffect(() => {
    if (!hasToken) {
      console.warn("No reset token found in URL");
    }
  }, [hasToken]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="coffee-icon">🔄</div>
          <h1>Set New Password</h1>
          <p>Create a new password for your account</p>
        </div>

        {!hasToken ? (
          <div className="error-message">
            ❌ Invalid or expired reset link. Please request a new password
            reset.
          </div>
        ) : (
          <>
            <Form method="post" className="signup-form">
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  disabled={isSubmitting}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
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
                <div className="mt-3">
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
        /* Copy the same CSS styles from your forgot-password.tsx */
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
