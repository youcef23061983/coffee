import { useActionState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "~/hooks/appProvider";
import { supabase } from "~/supabase_client";

interface FormState {
  email: string;
  password: string;
  error: string | null;
  success: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  const handleSubmit = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!email || !password) {
      return {
        ...prevState,
        error: "Email and password are required",
        success: false,
      };
    }

    try {
      console.log("🔐 Attempting login for:", email);

      // Sign in user with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        const errorMap: Record<string, string> = {
          "Invalid login credentials":
            "Please sign up first or check your email and password",
          "Email not confirmed":
            "Please confirm your email address before signing in",
          "Invalid email": "Please enter a valid email address",
        };

        const userMessage =
          errorMap[authError.message] || "An error occurred during sign in";

        return {
          ...prevState,
          error: userMessage,
          success: false,
        };
      }

      console.log("✅ Login successful, user:", data.user?.email); // Login successful - redirect

      return {
        email,
        password: "",
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.error("❌ Login error:", err.message);
      return {
        ...prevState,
        error: err.message || "An unexpected error occurred",
        success: false,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    email: "",
    password: "",
    error: null,
    success: false,
  });

  useEffect(() => {
    if (user) {
      // Redirect back to the original page they were trying to access
      const from = location.state?.from?.pathname || "/";
      console.log("🔄 Redirecting to:", from);

      navigate(from, { replace: true });
    }
  }, [user, location, navigate]);

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
            Welcome Back
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Sign in to your account to continue your coffee journey, access your
            personalized recommendations, and manage your orders.
          </p>
        </div>
      </section>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="coffee-icon">☕</div>
            <h1>Welcome to Brew Haven</h1>
            <p>Sign in to your coffee account</p>
          </div>

          <form action={formAction} className="signup-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                disabled={isPending}
                className="form-input"
                defaultValue={state.email}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                disabled={isPending}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="submit-button"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {state.error && <div className="error-message">❌ {state.error}</div>}
          {state.success && (
            <div className="success-message">✅ {state.email} is logged in</div>
          )}

          <div className="signup-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup" className="login-link">
                Create Account
              </Link>
            </p>
            <p className="mt-2">
              <Link to="/auth/forgot-password" className="login-link text-sm">
                Forgot your password?
              </Link>
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
          .success-message {
            background-color: #efe;
            border: 1px solid #cfc;
            color: #363;
            padding: 0.75rem;
            border-radius: 6px;
            margin-top: 1rem;
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
