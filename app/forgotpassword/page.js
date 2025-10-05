"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const stopNativeSubmit = (e) => e.preventDefault();

  const canGoNext = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email.");
      return false;
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!ok) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <main className="min-h-screen grid place-items-center drop-shadow-[#015093] bg-[#CCDCE9]">
      <form
        onSubmit={stopNativeSubmit}
        className="bg-white rounded-[25px] shadow-[0_0_70px_rgba(0,74,173,0.54)] py-[242px] px-[75px] w-full max-w-[630px] "
      >
        <div className="text-center">
          <h1 className="text-[32px] text-[#333333] font-inter font-medium">
            Forget Password?
          </h1>
          <p className="font-inter text-[18px] text-[#333333] mt-6">
            Please enter your email to get verification code
          </p>
        </div>

        <div className="mt-[78px] mb-[48px]">
          <label className="block mb-2 font-inter text-[16px]">Email address</label>
          <input
            className="w-full font-inter text-[16px] text-[#333333] border border-[#015093] outline-none rounded px-3 py-3 placeholder-[#5C5C5C]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {error && (
            <p className="text-red-600 text-[14px] mt-2 font-inter">{error}</p>
          )}
        </div>

        
        <Link
          href="/checkmail"
          onClick={(e) => {
            if (!canGoNext()) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <button
            type="button" 
            className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            Continue
          </button>
        </Link>
      </form>
    </main>
  );
}
