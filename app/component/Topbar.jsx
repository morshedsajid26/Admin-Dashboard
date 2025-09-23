import Image from 'next/image';
import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import user from '@/public/user.png'

const Topbar = () => {
  return (
    <div className='min-w-0 w-[calc(100vw-252px)] py-7 flex justify-end pr-[50px]  '>
      
      <div className='w-[248px] flex gap-8'>
        <IoMdNotificationsOutline className='w-[42px] h-[42px] p-[9px] text-[#015093] bg-[#CCDCE9] rounded-full' />



        <div className="user flex items-center gap-3">
            <Image src={user}/>
            <p className='font-inter font-medium text-[#333333] text-[16px]'>Robert Smith</p>
        </div>
      </div>
    </div>
  )
}

export default Topbar
