'use client';

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check query parameter to toggle Sign Up mode
  useEffect(() => {
    const signupParam = searchParams.get("signup");
    setIsSignUp(signupParam === "true");
  }, [searchParams]);

  // const handleAuth = async () => {
  //   try {
  //     setErrorMessage(""); // Clear any previous error messages

  //     if (isSignUp) {
  //       // Sign Up Logic
  //       if (password !== confirmPassword) {
  //         setErrorMessage("Passwords do not match!");
  //         return;
  //       }
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       alert("User created successfully!");
  //       router.push("/auth/signin"); // Redirect to Sign In after Sign Up
  //     } else {
  //       // Sign In Logic
  //       await signInWithEmailAndPassword(auth, email, password);
  //       alert("Logged in successfully!");
  //       router.push("/dashboard"); // Redirect to the dashboard
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setErrorMessage(error.message); // Display the error message
  //     } else {
  //       setErrorMessage("An unexpected error occurred.");
  //     }
  //   }
  // };

  
  const handleAuth = async () => {
    try {
      // Skip authentication and directly redirect to the dashboard
      alert("Bypassing authentication for testing!");
      router.push("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isSignUp ? "Create an Account" : "Sign In to Your Account"}
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder={isSignUp ? "Enter your email" : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder={isSignUp ? "Create a password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm Password Input (Only for Sign Up) */}
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Auth Button */}
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          {/* Toggle Sign In / Sign Up */}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage(""); // Clear error message when toggling
            }}
            className="text-blue-600 underline text-sm text-center"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </main>
  );
}
