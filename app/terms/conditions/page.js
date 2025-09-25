"use client";
import React from 'react'

import { IoMdArrowBack } from 'react-icons/io'
import { usePathname } from 'next/navigation';


const page = () => {
        const pathname = usePathname();
        const pathParts = pathname.split("/").filter(Boolean);
        const headerText = pathParts.join(" & ");;
  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      
        <div className='flex  items-center gap-[14px]'>
            <IoMdArrowBack className='w-6 h-6 text-[#015093]' />
        <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >{headerText}</h3>
        </div>
      
    </div>
  )
}

export default page
