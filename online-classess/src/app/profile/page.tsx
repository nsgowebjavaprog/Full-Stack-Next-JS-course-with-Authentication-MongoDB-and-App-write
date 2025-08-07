"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          👤 Profile Page
        </h1>
        <p className="text-gray-600 mb-6">Welcome to your profile</p>

        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-500">User ID:</h2>
          <p className="mt-2 p-2 bg-green-100 rounded text-green-800 break-all">
            {data === "nothing" ? (
              "No user data available"
            ) : (
              <Link href={`/profile/${data}`} className="hover:underline">
                {data}
              </Link>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={getUserDetails}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-lg font-semibold"
          >
            🔍 Get User Details
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 px-4 rounded-lg font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
