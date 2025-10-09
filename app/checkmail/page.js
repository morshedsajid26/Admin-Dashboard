"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // to fetch query params

const Page = () => {
  const inputs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");  // Store the email for verification

  const sp = useSearchParams();

  useEffect(() => {
    // try query param first, fallback to localStorage
    const qEmail = sp?.get("email");  // Fetch email from the URL params
    if (qEmail) {
      setEmail(qEmail);  // Set the email
    } else {
      const saved = localStorage.getItem("resetEmail");
      if (saved) setEmail(saved);  // If email exists in localStorage, set it
    }
  }, [sp]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6).split("");
    if (digits.length > 0) {
      e.preventDefault();
      digits.forEach((d, i) => {
        if (inputs.current[i]) inputs.current[i].value = d;
      });
      const nextIndex = Math.min(digits.length, 5);
      if (inputs.current[nextIndex]) inputs.current[nextIndex].focus();
    }
  };

  const isComplete = () =>
    inputs.current.slice(0, 6).every((el) => el && el.value && el.value.length === 1);

  const stopSubmit = (e) => e.preventDefault();

  // OTP verify API integration
  const verifyOTP = async () => {
    setLoading(true);
    setError(""); // Reset error before making the API call

    const otp = inputs.current.map((input) => input.value).join(""); // Combine all OTP digits
    if (!email) {
      setError("Email not found — please go back and enter your email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://ai-car-app-sandy.vercel.app/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email }),  // Send both email and OTP
      });

      const data = await res.json();
      console.log(data)  // Parse response to see if success or failure

      // If API returns error
      if (!res.ok) {
        console.error("verify error body:", data);
        setError(data?.message || data?.error || "User not found");
        setLoading(false);
        return;
      }

      // Handle success (e.g., redirect to the password reset page)
      localStorage.removeItem("resetEmail"); // optional cleanup
      window.location.href = "/setpassword"; // Redirect to password reset page
    } catch (err) {
      console.error("verify fetch error:", err);
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center drop-shadow-[#015093] bg-[#CCDCE9]">
      <form
        onSubmit={stopSubmit}
        className="bg-white rounded-[25px] pt-[186px] pb-[135px] px-[75px] w-full max-w-[630px] shadow-[0_0_70px_rgba(0,74,173,0.54)] text-center"
      >
        <h1 className="text-[32px] text-[#333333] font-inter font-medium">Check your email</h1>
        <p className="font-inter text-[16px] text-[#333333] mt-6">
          We sent a code to your email address @. Please check your email for the 6 digit code.
        </p>

        <div className="flex gap-4 justify-center my-[82px]" onPaste={handlePaste}>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="appearance-none w-[47px] h-[49px] border border-[#015093] rounded-[10px] text-center outline-none text-[20px] font-inter text-[#5C5C5C]"
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-[14px] mb-4 font-inter">{error}</p>
        )}

        <button
          type="button"
          onClick={verifyOTP}
          disabled={loading}
          className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="font-inter text-[16px] text-[#333333] mt-[92px]">
          You have not received the email?
          <a href="/forgotpassword" className="text-[#015093] cursor-pointer underline m-2">Resend</a>
        </p>
      </form>
    </main>
  );
};

export default Page;
