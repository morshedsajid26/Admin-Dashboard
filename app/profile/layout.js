"use client";
import React from 'react'

import { IoMdArrowBack } from 'react-icons/io'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import profile from '@/public/profile.png'


const page = ({children}) => {
      const pathname = usePathname(); 
  const pathParts = pathname.split("/").filter(Boolean)
  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      
        <div className='flex  items-center gap-[14px]'>
            <IoMdArrowBack className='w-6 h-6 text-[#015093]' />
        <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >{pathParts[0] || ""}</h3>
        </div>

        <div className=' w-[254px] flex flex-col items-center mx-auto'>
          <div className='image'>
            <Image src={profile}/>
          </div>
          <p className=' text-[30px] font-medium font-inter text-[#333333] mt-4 mb-6'>Mr. Admin</p>

          <div className='flex justify-between gap-[30px]'>
            <a  className=' text-[16px] font-medium font-inter text-[#333333]  hover:text-[#015093] underline ' href='/profile'>Edit Profile</a>
            <a  className=' text-[16px] font-medium font-inter text-[#333333] hover:text-[#015093] underline  ' href='/profile/changepass'>Change Password</a>
          </div>
        </div>
      
      
        {children}
      
    </div>
  )
}

export default page
