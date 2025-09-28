"use client";
import React from 'react'

const Page = () => {
  return (
    <div className='w-[481px]  flex flex-col items-center mx-auto mt-[26px]'>
      
      <p className='text-[24px] text-[#333333] font-inter '>Edit Your Profile</p>
<div>
      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='name'>User Name</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none placeholder-[#5C5C5C]' type='text' id='name' placeholder='Enter your name' />
      </div>


      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='name'>Email</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]  placeholder-[#5C5C5C]' type='text' id='name' placeholder='Enter your email' />
      </div>



      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='name'>Contact no</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]  placeholder-[#5C5C5C]' type='text' id='name' placeholder='Enter your contact no' />
      </div>



      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='name'>Address</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]  placeholder-[#5C5C5C]' type='text' id='name' placeholder='Enter your address' />
      </div>

       <div className='flex justify-center'>
           <button className=' px-[44px] py-3 bg-[#015093] text-[#FEFEFE] font-poppins  rounded hover:opacity-90 transition text-[16px] cursor-pointer mt-6 '>Save Change</button>
         </div>



      
      </div>
    </div>
  )
}

export default Page
