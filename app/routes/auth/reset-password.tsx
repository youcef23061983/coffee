// import { Form, useActionData, useNavigation } from "react-router";
// import { supabase } from "~/supabase_client";
// import type { ActionFunction } from "react-router";
// import { useEffect, useState } from "react";
// import ResetPasswordClient from "~/components/reset-password-client";

// interface ActionResponse {
//   success: boolean;
//   message?: string;
//   error?: string;
// }

// // In your reset-password.tsx action
// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const password = formData.get("password") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;

//   console.log("🔄 Reset Password Action triggered");

//   // Validation
//   if (!password || !confirmPassword) {
//     return {
//       success: false,
//       error: "All fields are required",
//     };
//   }

//   if (password !== confirmPassword) {
//     return {
//       success: false,
//       error: "Passwords do not match",
//     };
//   }

//   if (password.length < 6) {
//     return {
//       success: false,
//       error: "Password must be at least 6 characters",
//     };
//   }

//   try {
//     console.log("🔍 Checking user authentication...");

//     // Get the current session first
//     const {
//       data: { session: currentSession },
//       error: sessionError,
//     } = await supabase.auth.getSession();

//     console.log("🔍 Current session:", currentSession);
//     console.log("🔍 Session error:", sessionError);

//     if (sessionError) {
//       console.error("❌ Session error:", sessionError);
//       throw new Error("Session error. Please try again.");
//     }

//     // Check if user is authenticated
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     console.log("🔍 User in action:", user ? user.email : "No user");
//     console.log("🔍 User error:", userError);

//     if (userError) {
//       console.error("❌ getUser error:", userError);

//       // If getUser fails but we have a session, try to refresh it
//       if (currentSession) {
//         console.log("🔄 Refreshing session...");
//         const {
//           data: { session: refreshedSession },
//           error: refreshError,
//         } = await supabase.auth.refreshSession();

//         if (refreshError) {
//           console.error("❌ Session refresh failed:", refreshError);
//           throw new Error(
//             "Your session has expired. Please request a new reset link."
//           );
//         }

//         console.log("✅ Session refreshed successfully");
//         // Continue with the refreshed session
//       } else {
//         throw new Error(
//           "No active session found. Please use the reset link from your email."
//         );
//       }
//     }

//     if (!user) {
//       throw new Error(
//         "No active session found. Please use the reset link from your email."
//       );
//     }

//     console.log("✅ User authenticated:", user.email);

//     // Update the user's password
//     console.log("🔄 Updating user password...");
//     const { error: updateError } = await supabase.auth.updateUser({
//       password: password,
//     });

//     if (updateError) {
//       console.error("❌ Error updating password:", updateError);

//       // If update fails due to auth, try to refresh session and retry
//       if (
//         updateError.message.includes("auth") ||
//         updateError.message.includes("session")
//       ) {
//         console.log(
//           "🔄 Auth error detected, refreshing session and retrying..."
//         );
//         const {
//           data: { session: retrySession },
//           error: retryError,
//         } = await supabase.auth.refreshSession();

//         if (retryError) {
//           throw new Error(
//             "Your session expired. Please request a new reset link."
//           );
//         }

//         // Retry the password update
//         const { error: retryUpdateError } = await supabase.auth.updateUser({
//           password: password,
//         });

//         if (retryUpdateError) throw retryUpdateError;
//       } else {
//         throw updateError;
//       }
//     }

//     console.log("✅ Password updated successfully");

//     // Sign out the user after password reset (optional)
//     await supabase.auth.signOut();
//     console.log("✅ User signed out after password reset");

//     return {
//       success: true,
//       message:
//         "Password reset successfully! You can now sign in with your new password.",
//     };
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     console.error("❌ Action error:", errorMessage);
//     return {
//       success: false,
//       error: errorMessage,
//     };
//   }
// };
// export default function ResetPasswordRoute() {
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetStatus, setResetStatus] = useState<{
//     success?: boolean;
//     message?: string;
//     error?: string;
//   } | null>(null);

//   const handleClientSideReset = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!password || !confirmPassword) {
//       setResetStatus({
//         success: false,
//         error: "All fields are required",
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setResetStatus({
//         success: false,
//         error: "Passwords do not match",
//       });
//       return;
//     }

//     if (password.length < 6) {
//       setResetStatus({
//         success: false,
//         error: "Password must be at least 6 characters",
//       });
//       return;
//     }

//     try {
//       console.log("🔄 Starting client-side password reset...");

//       // Update the user's password directly from client
//       const { error: updateError } = await supabase.auth.updateUser({
//         password: password,
//       });

//       if (updateError) {
//         console.error("❌ Error updating password:", updateError);
//         setResetStatus({
//           success: false,
//           error: updateError.message,
//         });
//         return;
//       }

//       console.log("✅ Password updated successfully");

//       // Sign out the user after password reset
//       await supabase.auth.signOut();
//       console.log("✅ User signed out after password reset");

//       setResetStatus({
//         success: true,
//         message:
//           "Password reset successfully! You can now sign in with your new password.",
//       });
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred";
//       console.error("❌ Client-side reset error:", errorMessage);
//       setResetStatus({
//         success: false,
//         error: errorMessage,
//       });
//     }
//   };

//   return (
//     <ResetPasswordClient>
//       {({ hasSession, isReady, processingCode, errorMessage, userEmail }) => (
//         <div className="signup-container">
//           <div className="signup-card">
//             <div className="signup-header">
//               <div className="coffee-icon">🔄</div>
//               <h1>Set New Password</h1>
//               <p>Create a new password for your account</p>
//             </div>

//             {/* Show loading while processing code */}
//             {processingCode && (
//               <div className="success-message">
//                 <div className="coffee-icon">⏳</div>
//                 <h3>Verifying Reset Link</h3>
//                 <p>Please wait while we verify your reset link...</p>
//               </div>
//             )}

//             {/* Show error message */}
//             {errorMessage && !processingCode && (
//               <div className="error-message">
//                 ❌ {errorMessage}
//                 <div className="mt-3 text-center">
//                   <a href="/auth/forgot-password" className="login-link">
//                     Request a new reset link
//                   </a>
//                 </div>
//               </div>
//             )}

//             {/* Show no session error */}
//             {!hasSession && !errorMessage && !processingCode && isReady && (
//               <div className="error-message">
//                 ❌ No active session found.
//                 <div
//                   style={{
//                     marginTop: "1rem",
//                     fontSize: "0.9rem",
//                     color: "#666",
//                   }}
//                 >
//                   <p>Please click the reset link in your email to continue.</p>
//                   <ul style={{ textAlign: "left", marginLeft: "1rem" }}>
//                     <li>Make sure you're using the same browser</li>
//                     <li>Check that the link hasn't expired</li>
//                     <li>Ensure cookies are enabled</li>
//                   </ul>
//                 </div>
//                 <div className="mt-3 text-center">
//                   <a href="/auth/forgot-password" className="login-link">
//                     Request New Reset Link
//                   </a>
//                 </div>
//               </div>
//             )}

//             {/* Show password form when ready and has session */}
//             {hasSession && isReady && !processingCode && (
//               <>
//                 <div
//                   className="success-message"
//                   style={{ marginBottom: "20px" }}
//                 >
//                   ✅ Reset link verified for <strong>{userEmail}</strong>! You
//                   can now set your new password.
//                 </div>

//                 {resetStatus?.success ? (
//                   <div className="success-message">
//                     ✅ {resetStatus.message}
//                     <div className="mt-3 text-center">
//                       <a href="/auth/login" className="login-link">
//                         Sign in with your new password
//                       </a>
//                     </div>
//                   </div>
//                 ) : (
//                   <form
//                     onSubmit={handleClientSideReset}
//                     className="signup-form"
//                   >
//                     <div
//                       style={{
//                         background: "#f0f8ff",
//                         padding: "10px",
//                         borderRadius: "5px",
//                         marginBottom: "15px",
//                         fontSize: "12px",
//                         border: "1px solid #d1ecf1",
//                       }}
//                     >
//                       <strong>Session Info:</strong>
//                       <div>User: {userEmail}</div>
//                       <div>Status: Ready to reset password</div>
//                     </div>

//                     <div className="form-group">
//                       <label htmlFor="password" className="form-label">
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         placeholder="Enter new password (min. 6 characters)"
//                         required
//                         disabled={isSubmitting}
//                         className="form-input"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         minLength={6}
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label htmlFor="confirmPassword" className="form-label">
//                         Confirm New Password
//                       </label>
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         placeholder="Confirm new password"
//                         required
//                         disabled={isSubmitting}
//                         className="form-input"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         minLength={6}
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={isSubmitting || !password || !confirmPassword}
//                       className="submit-button"
//                     >
//                       {isSubmitting
//                         ? "Resetting Password..."
//                         : "Reset Password"}
//                     </button>
//                   </form>
//                 )}

//                 {resetStatus?.error && !resetStatus.success && (
//                   <div className="error-message">
//                     ❌ {resetStatus.error}
//                     <div className="mt-3 text-center">
//                       <button
//                         onClick={() => setResetStatus(null)}
//                         className="login-link"
//                         style={{
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                           fontSize: "inherit",
//                         }}
//                       >
//                         Try again
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Show loading while initializing */}
//             {!isReady && !processingCode && (
//               <div className="success-message">
//                 <div className="coffee-icon">⏳</div>
//                 <h3>Loading...</h3>
//                 <p>Please wait while we check your authentication...</p>
//               </div>
//             )}

//             <div className="signup-footer">
//               <p>
//                 Remember your password?{" "}
//                 <a href="/auth/login" className="login-link">
//                   Back to Sign In
//                 </a>
//               </p>
//               <p className="mt-2">
//                 Need a new reset link?{" "}
//                 <a href="/auth/forgot-password" className="login-link">
//                   Request Password Reset
//                 </a>
//               </p>
//             </div>
//           </div>

//           <style>{`
//             .form-label {
//               color: #5D4037;
//               font-weight: 500;
//               margin-bottom: 4px;
//               font-size: 14px;
//             }

//             .signup-container {
//               min-height: 100vh;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #D2691E 100%);
//               padding: 20px;
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//             }

//             .signup-card {
//               background: rgba(255, 253, 250, 0.95);
//               padding: 40px;
//               border-radius: 20px;
//               box-shadow: 0 20px 40px rgba(139, 69, 19, 0.3);
//               width: 100%;
//               max-width: 440px;
//               backdrop-filter: blur(10px);
//               border: 1px solid rgba(210, 105, 30, 0.2);
//             }

//             .signup-header {
//               text-align: center;
//               margin-bottom: 32px;
//             }

//             .coffee-icon {
//               font-size: 48px;
//               margin-bottom: 16px;
//               background: linear-gradient(135deg, #8B4513, #D2691E);
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//               filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
//             }

//             .signup-header h1 {
//               color: #5D4037;
//               font-size: 28px;
//               font-weight: 700;
//               margin: 0 0 8px 0;
//               letter-spacing: -0.5px;
//             }

//             .signup-header p {
//               color: #8D6E63;
//               font-size: 16px;
//               margin: 0;
//               font-weight: 400;
//             }

//             .signup-form {
//               display: flex;
//               flex-direction: column;
//               gap: 20px;
//             }

//             .form-group {
//               display: flex;
//               flex-direction: column;
//               gap: 6px;
//             }

//             .form-input {
//               padding: 16px;
//               border: 2px solid #E0D5C9;
//               border-radius: 12px;
//               font-size: 16px;
//               background: #FFFDFA;
//               transition: all 0.3s ease;
//               color: #5D4037;
//             }

//             .form-input:focus {
//               outline: none;
//               border-color: #D2691E;
//               box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
//               background: #FFF;
//             }

//             .form-input::placeholder {
//               color: #A1887F;
//             }

//             .submit-button {
//               padding: 16px;
//               background: linear-gradient(135deg, #8B4513, #D2691E);
//               color: white;
//               border: none;
//               border-radius: 12px;
//               font-size: 16px;
//               font-weight: 600;
//               cursor: pointer;
//               transition: all 0.3s ease;
//               margin-top: 8px;
//               letter-spacing: 0.5px;
//             }

//             .submit-button:hover:not(:disabled) {
//               transform: translateY(-2px);
//               box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
//               background: linear-gradient(135deg, #7A3A10, #C1581A);
//             }

//             .submit-button:disabled {
//               opacity: 0.6;
//               cursor: not-allowed;
//               transform: none;
//             }

//             .success-message {
//               background: #E8F5E8;
//               color: #2E7D32;
//               padding: 16px;
//               border-radius: 8px;
//               margin-top: 20px;
//               font-weight: 500;
//               border-left: 4px solid #4CAF50;
//               text-align: center;
//             }

//             .error-message {
//               background: #FFEBEE;
//               color: #E53935;
//               padding: 12px 16px;
//               border-radius: 8px;
//               margin-top: 20px;
//               font-weight: 500;
//               border-left: 4px solid #E53935;
//             }

//             .signup-footer {
//               text-align: center;
//               margin-top: 24px;
//               padding-top: 24px;
//               border-top: 1px solid #E0D5C9;
//             }

//             .signup-footer p {
//               color: #8D6E63;
//               margin: 0 0 8px 0;
//             }

//             .login-link {
//               color: #D2691E;
//               text-decoration: none;
//               font-weight: 600;
//               transition: color 0.3s ease;
//             }

//             .login-link:hover {
//               color: #8B4513;
//               text-decoration: underline;
//             }

//             @media (max-width: 480px) {
//               .signup-card {
//                 padding: 30px 24px;
//                 margin: 10px;
//               }

//               .signup-header h1 {
//                 font-size: 24px;
//               }
//             }
//           `}</style>
//         </div>
//       )}
//     </ResetPasswordClient>
//   );
// }

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { supabase } from "~/supabase_client";

export default function ResetPasswordRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [processingCode, setProcessingCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Password reset state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  // Handle authentication and code exchange
  useEffect(() => {
    const handleAuth = async () => {
      console.log("🔍 Starting auth process");

      const code = searchParams.get("code");
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      console.log("🔍 URL parameters:", { code, token, type });

      // Clear any existing errors
      setErrorMessage("");

      // If we have a code, process it
      if (code) {
        setProcessingCode(true);
        console.log("🔄 Processing reset code...");

        try {
          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("❌ Code exchange failed:", exchangeError);
            setErrorMessage(
              "This reset link is invalid or has expired. Please request a new one."
            );
          } else {
            console.log("✅ Code exchange successful!");

            // Verify the session was actually created
            const {
              data: { session: verifiedSession },
            } = await supabase.auth.getSession();
            console.log(
              "🔍 Verified session after exchange:",
              !!verifiedSession
            );

            if (verifiedSession) {
              console.log("🔍 User email:", verifiedSession.user.email);
              setUserEmail(verifiedSession.user.email || "");
              setHasSession(true);
            } else {
              console.error("❌ No session after code exchange");
              setErrorMessage("Failed to establish session. Please try again.");
            }
          }

          // Remove code from URL regardless of success/failure
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete("code");
          setSearchParams(newSearchParams);
        } catch (error) {
          console.error("❌ Unexpected error during code exchange:", error);
          setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
          setProcessingCode(false);
        }
      }

      // Check for existing session (either from code exchange or previous auth)
      if (!code || hasSession) {
        console.log("🔍 Checking for existing session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("🔍 Session check result:", !!session);

        if (session) {
          setHasSession(true);
          setUserEmail(session.user.email || "");
          console.log("🔍 User found:", session.user.email);
        } else {
          setHasSession(false);
          console.log("🔍 No session found");
        }
      }

      setIsReady(true);
    };

    handleAuth();
  }, [searchParams, setSearchParams]);

  // Handle password reset
  const handleClientSideReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setResetStatus({
        success: false,
        error: "All fields are required",
      });
      return;
    }

    if (password !== confirmPassword) {
      setResetStatus({
        success: false,
        error: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      setResetStatus({
        success: false,
        error: "Password must be at least 6 characters",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔄 Starting client-side password reset...");

      // Update the user's password directly from client
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.error("❌ Error updating password:", updateError);
        setResetStatus({
          success: false,
          error: updateError.message,
        });
        return;
      }

      console.log("✅ Password updated successfully");

      // Sign out the user after password reset
      await supabase.auth.signOut();
      console.log("✅ User signed out after password reset");

      setResetStatus({
        success: true,
        message:
          "Password reset successfully! You can now sign in with your new password.",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("❌ Client-side reset error:", errorMessage);
      setResetStatus({
        success: false,
        error: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="coffee-icon">🔄</div>
          <h1>Set New Password</h1>
          <p>Create a new password for your account</p>
        </div>

        {/* Show loading while processing code */}
        {processingCode && (
          <div className="success-message">
            <div className="coffee-icon">⏳</div>
            <h3>Verifying Reset Link</h3>
            <p>Please wait while we verify your reset link...</p>
          </div>
        )}

        {/* Show error message */}
        {errorMessage && !processingCode && (
          <div className="error-message">
            ❌ {errorMessage}
            <div className="mt-3 text-center">
              <a href="/auth/forgot-password" className="login-link">
                Request a new reset link
              </a>
            </div>
          </div>
        )}

        {/* Show no session error */}
        {!hasSession && !errorMessage && !processingCode && isReady && (
          <div className="error-message">
            ❌ No active session found.
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              <p>Please click the reset link in your email to continue.</p>
              <ul style={{ textAlign: "left", marginLeft: "1rem" }}>
                <li>Make sure you're using the same browser</li>
                <li>Check that the link hasn't expired</li>
                <li>Ensure cookies are enabled</li>
              </ul>
            </div>
            <div className="mt-3 text-center">
              <a href="/auth/forgot-password" className="login-link">
                Request New Reset Link
              </a>
            </div>
          </div>
        )}

        {/* Show password form when ready and has session */}
        {hasSession && isReady && !processingCode && (
          <>
            <div className="success-message" style={{ marginBottom: "20px" }}>
              ✅ Reset link verified for <strong>{userEmail}</strong>! You can
              now set your new password.
            </div>

            {resetStatus?.success ? (
              <div className="success-message">
                ✅ {resetStatus.message}
                <div className="mt-3 text-center">
                  <a href="/auth/login" className="login-link">
                    Sign in with your new password
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClientSideReset} className="signup-form">
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
              </form>
            )}

            {resetStatus?.error && !resetStatus.success && (
              <div className="error-message">
                ❌ {resetStatus.error}
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setResetStatus(null)}
                    className="login-link"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "inherit",
                    }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Show loading while initializing */}
        {!isReady && !processingCode && (
          <div className="success-message">
            <div className="coffee-icon">⏳</div>
            <h3>Loading...</h3>
            <p>Please wait while we check your authentication...</p>
          </div>
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
