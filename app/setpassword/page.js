"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { IoEyeOutline } from 'react-icons/io5';

const page = () => {

      const [showNewPass,setShowNewPass]=useState(false);
      const [showConPass,setShowConPass]=useState(false);
  return (
    <div>
      <main className="min-h-screen grid place-items-center bg-[#CCDCE9]">
            <form  className="bg-white rounded-xl py-[120px] px-[90px] w-full max-w-[630px] shadow">
             <div className="text-center">
               <h1 className="text-[32px] text-[#333333] font-inter font-medium">Login to Account</h1>
              <p className="font-inter text-[18px] text-[#333333] mt-6">Please enter your email and password to continue</p>
             </div>
      
              <div className="mt-[68px] mb-[51px]">
                <div>
                <label className="block mb-2 mt-10 font-inter text-[16px]">New Password</label>
             
      
      
              <div className='relative '>
               <input
                className="w-full font-inter text-[16px] text-[#333333] border border-[#015093] outline-none rounded px-3 py-2 "
                
                
                type={showNewPass? 'text':'password'}
                id='newapass'
                required
              />
               <div  onClick={()=>setShowNewPass(!showNewPass)} className='cursor-pointer absolute top-1/2  right-0 -translate-y-1/2'>
                {showNewPass? <IoEyeOutline className=' text-[#015093] w-6 h-6  mr-6'  />:
              <FaRegEyeSlash className=' text-[#015093] w-6 h-6  mr-6' />}
               </div>
      
               
              
             </div>
              </div>          
      
              <div>
                <label className="block mb-2 mt-10 font-inter text-[16px]">Confirm Password</label>
             
      
      
              <div className='relative '>
               <input
                className="w-full font-inter text-[16px] text-[#333333] border border-[#015093] outline-none rounded px-3 py-2 "
                
                
                type={showConPass? 'text':'password'}
                id='newapass'
                required
              />
               <div  onClick={()=>setShowConPass(!showConPass)} className='cursor-pointer absolute top-1/2  right-0 -translate-y-1/2'>
                {showConPass? <IoEyeOutline className=' text-[#015093] w-6 h-6  mr-6'  />:
              <FaRegEyeSlash className=' text-[#015093] w-6 h-6  mr-6' />}
               </div>
      
               
              
             </div>
              </div>
              </div>
      
              
      <Link href="/">
              <button   
          className="w-full font-poppins text-[16px] bg-[#015093] text-[#FEFEFE] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
         Reset Password
        </button>
      </Link>
            </form>
          </main>
    </div>
  )
}

export default page
