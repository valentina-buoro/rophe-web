"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


import React from 'react'

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSignUp = async () => {
      if (password !== confirmPassword) {
        alert("Your passwords do not match.");
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:6300/api/create-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok)
          throw new Error(data.message || "Account creation failed");
  
        localStorage.setItem("userId", data.userId);
        router.push("/landing");
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="bg-[#100C08] h-screen p-8  ">
        <h2 className="text-2xl font-bold text-center text-[#F8F8FF] mt-16 mb-6">
          Hi👋🏼, Welcome to Your Rophe Account
        </h2>
        <div className=" flex items-center justify-center ">
          <div className="bg-white w-full h-3/6 flex flex-col justify-between items-center  max-w-md p-8 rounded-2xl shadow-lg ">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg text-[#100C08] focus:outline-none focus:ring-2 focus:ring-[#005AEE]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Please Enter Password"
                className="w-full mb-4 p-3 border rounded-lg text-[#100C08] focus:outline-none focus:ring-2 focus:ring-[#005AEE]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          
            </div>
            <div className="w-full">
              <button
                onClick={handleSignUp}
                disabled={loading}
                className=" cursor-pointer bg-[#005AEE] text-[#F8F8FF] w-full font-semibold py-3 rounded-xl transition duration-300"
              >
                {loading ? "loading..." : "Login"}
              </button>
            </div>
            <div className="text-center pt-4">
              <p className="text-[#100C08]">
                Don't have an account? <Link href="/signup">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage
