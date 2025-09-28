"use client";
import { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'


const Page = () => {

  let [showPass,setShowPass]=useState(false);
  let [showPass1,setShowPass1]=useState(false);
  let [showPass2,setShowPass2]=useState(false);
  return (
    <div className='w-[481px]  flex flex-col items-center mx-auto mt-[26px]'>
      
      <p className='text-[24px] text-[#333333] font-inter '>Change Password</p>
<div>
      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='currentpass'>Current Password</label> <br />
        <div className='relative mt-2'>
         <input className=' w-[481px] border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]   placeholder-[#5C5C5C]' type={showPass? 'text':'password'} id='newapass' placeholder='' />
         <div onClick={()=>setShowPass(!showPass)} className='cursor-pointer'>
          {showPass? <IoEyeOutline className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6'  />:
        <FaRegEyeSlash className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6' />}
         </div>
        
       </div>
      </div>


      <div className='mt-6 '>
        <label className='text-[#333333] text-[16px] font-inter ' htmlFor='newapass'>New Password</label> <br />
       <div className='relative mt-2'>
         <input className=' w-[481px] border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]   placeholder-[#5C5C5C]' type={showPass1? 'text':'password'} id='newapass' placeholder='' />
         <div onClick={()=>setShowPass1(!showPass1)} className='cursor-pointer'>
          {showPass1? <IoEyeOutline className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6'  />:
        <FaRegEyeSlash className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6' />}
         </div>
        
       </div>
      </div>



      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='confirmpass'>Confirm New Password</label> <br />
        <div className='relative mt-2'>
         <input className=' w-[481px]  border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]   placeholder-[#5C5C5C]' type={showPass2? 'text':'password'} id='newapass' placeholder='' />
         <div onClick={()=>setShowPass2(!showPass2)} className='cursor-pointer'>
          {showPass2? <IoEyeOutline className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6'  />:
        <FaRegEyeSlash className='rotate- w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 mr-6' />}
         </div>
        
       </div>
      </div>



      

       <div className='flex justify-center'>
           <button className=' px-[44px] py-3 bg-[#015093] text-[#FEFEFE] font-poppins  rounded hover:opacity-90 transition text-[16px] cursor-pointer mt-6 '>Save Change</button>
         </div>



      
      </div>
    </div>
  )
}

export default Page
