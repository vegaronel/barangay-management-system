import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { supabase } from "../../lib/supabase.js";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Get the access token from URL params (query parameters)
        let accessToken = searchParams.get("access_token");
        let refreshToken = searchParams.get("refresh_token");
        let type = searchParams.get("type");

        // If not found in query params, check hash fragment
        if (!accessToken) {
          const hash = window.location.hash.substring(1); // Remove the #
          const hashParams = new URLSearchParams(hash);
          accessToken = hashParams.get("access_token");
          refreshToken = hashParams.get("refresh_token");
          type = hashParams.get("type");
        }

        console.log("Verification params:", {
          accessToken,
          refreshToken,
          type,
        });

        if (type === "signup" && accessToken) {
          // Set the session with the tokens from the email
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            throw error;
          }

          if (data.user && data.user.email_confirmed_at) {
            setStatus("success");
            setMessage(
              "Your email has been successfully verified! You can now log in to your account."
            );
          } else {
            setStatus("error");
            setMessage(
              "Email verification failed. Please try again or contact support."
            );
          }
        } else {
          setStatus("error");
          setMessage(
            "Invalid verification link. Please check your email and try again."
          );
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("error");
        setMessage(
          "An error occurred during email verification. Please try again."
        );
      }
    };

    handleEmailVerification();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="text-lg font-medium">Verifying your email...</p>
            <p className="text-sm text-gray-600">
              Please wait while we confirm your email address.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-semibold text-green-800">
              Email Verified!
            </h2>
            <p className="text-center text-gray-600">{message}</p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link to="/login">Go to Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Go to Home</Link>
              </Button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold text-red-800">
              Verification Failed
            </h2>
            <p className="text-center text-gray-600">{message}</p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link to="/register">Try Registering Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Go to Home</Link>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Email Verification
          </h1>
          <p className="mt-2 text-sm text-gray-600">BRGY Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Account Verification</CardTitle>
            <CardDescription className="text-center">
              We're verifying your email address
            </CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble?{" "}
            <Link to="/contact" className="text-blue-600 hover:text-blue-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
