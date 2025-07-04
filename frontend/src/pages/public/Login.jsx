import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
    const submitData = async() => {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
      })
      const data = await response.json();
      console.log(data);
    }
    submitData();
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
              onChange={(e) => setUserInput({...userInput, email: e.target.value})}
              required
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
              onChange={(e) => setUserInput({...userInput, password: e.target.value})}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Sign In
          </Button>
          <Link to="/" className="">
            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200">Back</Button>
          </Link>
        </form>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <a href="#" className="underline hover:text-primary">
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}

export default Login;
