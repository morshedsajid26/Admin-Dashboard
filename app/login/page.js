"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
 import { FaRegEyeSlash } from 'react-icons/fa'
  import { IoEyeOutline } from 'react-icons/io5'

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [showPass,setShowPass]=useState(false);
 

  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("redirect") || "/"; // লগইনের পর যেখানে যাবে

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);
    if (res?.ok) router.replace(callbackUrl);
    else alert(res?.error || "Invalid credentials");
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#CCDCE9]">
      <form onSubmit={onSubmit} className="bg-white rounded-xl py-[120px] px-[90px] w-full max-w-[630px] shadow">
       <div className="text-center">
         <h1 className="text-[32px] text-[#333333] font-inter font-medium">Login to Account</h1>
        <p className="font-inter text-[18px] text-[#333333] mt-6">Please enter your email and password to continue</p>
       </div>

        <div className="mt-[68px] mb-[51px]">
          <label className="block mb-2 font-inter text-[16px]">Email address</label>
        <input
          className="w-full border border-[#015093] outline-none rounded px-3 py-2 placeholder-[#5C5C5C]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label className="block mb-2 mt-10 font-inter text-[16px]">Password</label>
       


        <div className='relative '>
         <input
          className="w-full border border-[#015093] outline-none rounded px-3 py-2 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPass? 'text':'password'}
          id='newapass'
          required
        />
         <div  onClick={()=>setShowPass(!showPass)} className='cursor-pointer absolute top-1/2  right-0 -translate-y-1/2'>
          {showPass? <IoEyeOutline className=' text-[#015093] w-6 h-6  mr-6'  />:
        <FaRegEyeSlash className=' text-[#015093] w-6 h-6  mr-6' />}
         </div>

         
        
       </div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-2.5">
          <input type="checkbox" className="ml-2 accent-[#015093]" />
            <p>Remember Password</p>
          </div>
          <a href="/forgotpassword" className="text-[#333333] hover:text-[#015093] font-inter text-[16px] hover:underline">Forgot Password?</a>
        </div>

        <button
          disabled={loading}
           className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
