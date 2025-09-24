"use client";
import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import Li from './Li'
import { MdDashboard, MdLogout, MdOutlineSettings } from "react-icons/md";
import { FaListUl, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineHelpCenter } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";



const Sidebar = ({className}) => {
  return (
    <div className={`w-[252px] shrink-0 h-screen pt-[23px] pb-[50px] pr-2 flex flex-col items-cente justify-between relative z-30 ${className}`}>
        <div className="logo">
            <Image className='h-[78px] w-[56px] mx-auto mb-6' src={logo} alt='logo'/>
        </div>

        <ul className='flex flex-col gap-3'>
            <Li icon={<LuLayoutDashboard className='w-6 h-6'/>}
            liText='Dashboard'
            href='/'/>

            <Li icon={<FaRegUserCircle className='w-6 h-6'/>}
            liText='User Management'
             href='/user/management'
            />


            <Li icon={<MdDashboard className='w-6 h-6'/>}
            liText='Agent Management'
            href='/agent/management'
            />


            <Li icon={<FaListUl className='w-6 h-6'/>}
            liText='Listings Management'
            href='/listings/management'
            />

            <Li icon={<MdOutlineHelpCenter className='w-6 h-6 '/>}
            liText='Help & Reports'
            href='/s'
            />


            <Li icon={<MdOutlineSettings className='w-6 h-6'/>}
            liText='Settings'
            href='/s'
            >
               
            </Li>
            
        </ul>

        <button className='font-inter font-medium text-[16px] text-[#333333] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 transition-all duration-300 cursor-pointer pl-[34px] rounded-r-[5px] flex items-center gap-2.5 w-full mt-[356px]'>
            <MdLogout className='w-6 h-6' />
            Log out
        </button>
      
    </div>
  )
}

export default Sidebar
