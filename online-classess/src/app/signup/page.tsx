"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !(
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0
      )
    );
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 to-yellow-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6 animate-pulse">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-600"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full py-2 rounded-lg font-semibold transition-all ${
            buttonDisabled || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700 shadow-md"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
