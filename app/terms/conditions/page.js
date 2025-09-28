"use client";
import React from 'react'

import { IoMdArrowBack } from 'react-icons/io'
import { usePathname } from 'next/navigation';
import TextToolbar from '@/app/component/TextToolbar';


const Page = () => {
        const pathname = usePathname();
        const pathParts = pathname.split("/").filter(Boolean);
        const headerText = pathParts.join(" & ");;
  return (
   <div className="w-full p-7 pb-[46px] bg-white overflow-x-auto rounded-[10px]">
      
        <div className='w-full flex items-center justify-between'>
          <div className='flex  items-center gap-[14px]'>
            <IoMdArrowBack className='w-6 h-6 text-[#015093]' />
        <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >{headerText}</h3>
        </div>

        <TextToolbar/>
        </div>

        <div className='mt-8 pl-1'>

       <div>
          <h3 className='text-[#333333] text-[20px] font-inter font-semibold' >1. Terms</h3> 
          <p className='text-[#333333] text-[16px] font-inter mt-[26px] text-balance'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
       </div>


          <div className='mt-8'>
             <h3 className='text-[#333333] text-[20px] font-inter font-semibold' >2. Conditions</h3> 
          <p className='text-[#333333] text-[16px] font-inter mt-[26px] text-balance'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
          </div>

         <div className='flex justify-center'>
           <button className=' px-[44px] py-3 bg-[#015093] text-[#FEFEFE] font-poppins  rounded hover:opacity-90 transition text-[16px] cursor-pointer mt-[182px] '>Save Change</button>
         </div>
        </div>
      
    </div>
  )
}

export default Page
