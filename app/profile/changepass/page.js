import React from 'react'

const page = () => {
  return (
    <div className='w-[481px]  flex flex-col items-center mx-auto mt-[26px]'>
      
      <p className='text-[24px] text-[#333333] font-inter '>Change Password</p>
<div>
      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='currentpass'>Current Password</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px] placeholder-[#5C5C5C]' type='password' id='currentpass' placeholder='' />
      </div>


      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='newapass'>New Password</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none font-inter text-[16px]  placeholder-[#5C5C5C]' type='password' id='newapass' placeholder='' />
      </div>



      <div className='mt-6'>
        <label className='text-[#333333] text-[16px] font-inter' htmlFor='confirmpass'>Confirm New Password</label> <br />
        <input className='w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 outline-none  font-inter text-[16px]  placeholder-[#5C5C5C]' type='password' id='confirmpass' placeholder='' />
      </div>



      

       <div className='flex justify-center'>
           <button className=' px-[44px] py-3 bg-[#015093] text-[#FEFEFE] font-poppins  rounded hover:opacity-90 transition text-[16px] cursor-pointer mt-6 '>Save Change</button>
         </div>



      
      </div>
    </div>
  )
}

export default page
