// app/components/reset-password-client.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { supabase } from "~/supabase_client";

interface ResetPasswordClientProps {
  children: (props: {
    hasSession: boolean;
    isReady: boolean;
    processingCode: boolean;
    errorMessage: string;
    userEmail: string;
  }) => React.ReactNode;
}

export default function ResetPasswordClient({
  children,
}: ResetPasswordClientProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [processingCode, setProcessingCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const handleAuth = async () => {
      console.log("🔍 Client - Starting auth process");

      const code = searchParams.get("code");
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      console.log("🔍 Client - URL parameters:", { code, token, type });

      // Clear any existing errors
      setErrorMessage("");

      // If we have a code, process it
      if (code) {
        setProcessingCode(true);
        console.log("🔄 Client - Processing reset code...");

        try {
          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("❌ Client - Code exchange failed:", exchangeError);
            setErrorMessage(
              "This reset link is invalid or has expired. Please request a new one."
            );
          } else {
            console.log("✅ Client - Code exchange successful!");

            // Verify the session was actually created
            const {
              data: { session: verifiedSession },
            } = await supabase.auth.getSession();
            console.log(
              "🔍 Client - Verified session after exchange:",
              !!verifiedSession
            );

            if (verifiedSession) {
              console.log(
                "🔍 Client - User email:",
                verifiedSession.user.email
              );
              setUserEmail(verifiedSession.user.email || "");
              setHasSession(true);
            } else {
              console.error("❌ Client - No session after code exchange");
              setErrorMessage("Failed to establish session. Please try again.");
            }
          }

          // Remove code from URL regardless of success/failure
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete("code");
          setSearchParams(newSearchParams);
        } catch (error) {
          console.error(
            "❌ Client - Unexpected error during code exchange:",
            error
          );
          setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
          setProcessingCode(false);
        }
      }

      // Check for existing session (either from code exchange or previous auth)
      if (!code || hasSession) {
        console.log("🔍 Client - Checking for existing session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("🔍 Client - Session check result:", !!session);

        if (session) {
          setHasSession(true);
          setUserEmail(session.user.email || "");
          console.log("🔍 Client - User found:", session.user.email);
        } else {
          setHasSession(false);
          console.log("🔍 Client - No session found");
        }
      }

      setIsReady(true);
    };

    handleAuth();
  }, [searchParams, setSearchParams]);

  return (
    <>
      {children({
        hasSession,
        isReady,
        processingCode,
        errorMessage,
        userEmail,
      })}
    </>
  );
}
