import { Form, useActionData, useNavigation } from "react-router";
import { supabase } from "~/supabase_client";
import type { ActionFunction } from "react-router";
import { useState } from "react";

interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// In your forgot-password.tsx action
// In your forgot-password.tsx action
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      error: "Email is required",
    };
  }

  try {
    const url = new URL(request.url);
    const origin = url.origin;

    console.log("📧 Sending reset email to:", email);
    console.log("🔗 Redirect URL:", `${origin}/auth/reset-password`);

    // Redirect directly to reset-password instead of callback
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: `${origin}/auth/reset-password`,
      redirectTo: `${origin}/auth/callback`, // Use callback route
    });

    if (error) {
      console.error("❌ Supabase reset email error:", error);
      throw error;
    }

    console.log("✅ Reset email sent successfully");

    return {
      success: true,
      message: "Password reset instructions have been sent to your email!",
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

export default function ForgotPasswordRoute() {
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url('/quiz.jpg')",
          }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h3 className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6">
            Reset Your Password
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Enter your email address and we'll send you instructions to reset
            your password and get you back to enjoying your coffee.
          </p>
        </div>
      </section>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="coffee-icon">🔐</div>
            <h1>Reset Your Password</h1>
            <p>We'll help you get back into your account</p>
          </div>

          <Form method="post" className="signup-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="submit-button"
            >
              {isSubmitting
                ? "Sending Instructions..."
                : "Send Reset Instructions"}
            </button>
          </Form>

          {actionData?.success && (
            <div className="success-message">
              ✅ {actionData.message}
              <div className="mt-3 text-sm">
                Check your email and follow the instructions to reset your
                password.
              </div>
            </div>
          )}

          {actionData?.error && !actionData.success && (
            <div className="error-message">❌ {actionData.error}</div>
          )}

          <div className="signup-footer">
            <p>
              Remember your password?{" "}
              <a href="/auth/login" className="login-link">
                Back to Sign In
              </a>
            </p>
            <p className="mt-2">
              Don't have an account?{" "}
              <a href="/auth/signup" className="login-link">
                Create Account
              </a>
            </p>
          </div>
        </div>

        <style>{`
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
    </>
  );
}
