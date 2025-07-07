import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { auth } from "@/lib/supabase";

function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await auth.signIn(
        userInput.email,
        userInput.password
      );

      if (error) {
        setError(error.message);
        console.error("Login error:", error);
      } else {
        console.log("Login successful:", data);
        // Redirect to dashboard or handle successful login
        // You can use React Router's navigate here
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8 shadow-lg border border-border">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Sign in to your account
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Enter your email and password below to access your account.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Link to="/" className="">
            <Button
              className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200"
              disabled={loading}
            >
              Back
            </Button>
          </Link>
        </form>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-primary">
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
