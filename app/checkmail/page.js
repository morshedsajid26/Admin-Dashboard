"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const Page = () => {
  const inputs = useRef([]);
  const [error, setError] = useState("");

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

  // paste করলে অটো-ফিল
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

  // সব 6 ইনপুটে ১ ডিজিট আছে কিনা চেক
  const isComplete = () =>
    inputs.current.slice(0, 6).every((el) => el && el.value && el.value.length === 1);

  const stopSubmit = (e) => e.preventDefault();

  return (
    <main className="min-h-screen grid place-items-center drop-shadow-[#015093] bg-[#CCDCE9]">
      <form
        onSubmit={stopSubmit}
        className="bg-white rounded-[25px] pt-[186px] pb-[135px] px-[75px] w-full max-w-[630px] shadow-[0_0_70px_rgba(0,74,173,0.54)] text-center"
      >
        <h1 className="text-[32px] text-[#333333] font-inter font-medium">
          Check your email
        </h1>
        <p className="font-inter text-[16px] text-[#333333] mt-6">
          We sent a code to your email address @. Please check your email for the
          6 digit code.
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

        <Link
          href="/setpassword"
          onClick={(e) => {
            if (!isComplete()) {
              e.preventDefault();
              e.stopPropagation();
              setError("Please enter your OTP");
            } else {
              setError("");
            }
          }}
        >
          <button
            type="button"
            className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            Verify
          </button>
        </Link>

        <p className="font-inter text-[16px] text-[#333333] mt-[92px]">
          You have not received the email?
          <span className="text-[#015093] cursor-pointer underline m-2">
            Resend
          </span>
        </p>
      </form>
    </main>
  );
};

export default Page;
