// app/routes/auth/signup.tsx
import { Form, useActionData, redirect, useNavigation } from "react-router";
import { supabase } from "~/supabase_client";
import type { ActionFunction } from "react-router";
import { useState } from "react";

interface ActionResponse {
  success: boolean;
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Basic validation
  if (!email || !name || !password || !confirmPassword) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  // Password confirmation validation
  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    };
  }

  // Password strength validation
  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters long",
    };
  }

  try {
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) throw authError;

    // 2. Send welcome email via Supabase function (only if user was created)
    if (authData.user) {
      const { error: emailError } = await supabase.functions.invoke(
        "send-welcome-email",
        {
          body: {
            userEmail: authData.user.email,
            userName: name,
          },
        }
      );

      if (emailError) {
        console.error("Welcome email failed:", emailError);
        // Continue anyway - user is created, just log the error
      }
    }

    return redirect("/dashboard");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default function Signup() {
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: "url('/auth.jpg')",
          }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h3 className="mrs-saint-delafield-regular text-5xl md:text-7xl font-bold mb-6">
            Join Our Coffee Community
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Create your account to unlock personalized coffee recommendations,
            exclusive blends, and join thousands of coffee lovers in discovering
            their perfect brew.
          </p>
        </div>
      </section>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="coffee-icon">☕</div>
            <h1>Join Brew Haven</h1>
            <p>Create your account and start your coffee journey</p>
          </div>

          <Form method="post" className="signup-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                disabled={isSubmitting}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                disabled={isSubmitting}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                disabled={isSubmitting}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                disabled={isSubmitting}
                className={`form-input ${confirmPassword && !passwordsMatch ? "error" : ""} ${passwordsMatch ? "success" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && !passwordsMatch && (
                <div className="validation-error">Passwords do not match</div>
              )}
              {passwordsMatch && (
                <div className="validation-success">Passwords match!</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !passwordsMatch}
              className="submit-button"
            >
              {isSubmitting ? "Brewing Your Account..." : "Create Account"}
            </button>
          </Form>

          {actionData?.error && (
            <div className="error-message">❌ {actionData.error}</div>
          )}

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <a href="/auth/login" className="login-link">
                Sign In
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

        .form-input.error {
          border-color: #E53935;
          background: #FFEBEE;
        }

        .form-input.success {
          border-color: #4CAF50;
          background: #E8F5E8;
        }

        .validation-error {
          color: #E53935;
          font-size: 14px;
          font-weight: 500;
        }

        .validation-success {
          color: #4CAF50;
          font-size: 14px;
          font-weight: 500;
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
          margin: 0;
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
