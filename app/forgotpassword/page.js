"use client";

import React from "react";


export default function ForgotPasswordPage() {
 

  return (
    <main className="min-h-screen grid place-items-center bg-[#CCDCE9]">
      <form  className="bg-white rounded-xl py-[242px] px-[90px] w-full max-w-[630px] shadow">
       <div className="text-center">
         <h1 className="text-[32px] text-[#333333] font-inter font-medium">Forget Password?</h1>
        <p className="font-inter text-[18px] text-[#333333] mt-6">Please enter your email to get verification code</p>
       </div>

        <div className="mt-[78px] mb-[48px]">
          <label className="block mb-2 font-inter text-[16px]">Email address</label>
        <input
          className="w-full border border-[#015093] outline-none rounded px-3 py-3 placeholder-[#5C5C5C]"
          
          type="email"
         
        />

        </div>

        

        <button   
          className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
