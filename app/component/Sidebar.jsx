"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/public/logo.png'
import Li from './Li'
import { MdDashboard, MdLogout, MdOutlineSettings } from "react-icons/md";
import { FaListUl, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineHelpCenter } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDown } from 'react-icons/io';



const Sidebar = ({className}) => {
  let [help,setHelp]=useState(false);
  let [settings,setSettings]=useState(false);


  return (
    <div className={`w-[252px]  shrink-0 h-screen pt-[23px] pb-[50px] pr-2 flex flex-col items-cente justify-between relative z-30 ${className}`}>
        <div className="logo ">
            <Image className='h-[78px] w-[56px] mx-auto mb-6' src={logo} alt='logo'/>
        </div>

        <ul className='sidebar flex h-[680px] flex-col gap-3'>
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

            

            <li        
           onClick={() => { 
              setHelp(!help); 
              
            }}
            className='relative font-inter font-medium text-[16px] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 pr-[14px] transition-all duration-300 cursor-pointer pl-[31px] rounded-r-[5px]'
            
            >
              <div className='flex items-center gap-2.5'>
                 <MdOutlineHelpCenter className='w-6 h-6 '/>
                Help & Reports
              </div>
             <IoIosArrowDown 
               
  className={`absolute  right-0 -translate-y-1/2 w-6 h-6 transition-transform duration-300 ${help ? "rotate-180 top-6" : "top-1/2"}`} />

                             
              <ul className={`submenu mt-3 
  
                
                
                 list-none ${help?"opacity-100 h-auto visible  ":"opacity-0 h-0 invisible "}`} >
                <Li  liText='Help Center'
                href='/help/center'
              variant='child'
                
                />
                <Li liText='Reports'
                href='/reports'
                variant='child'
                />
               
              </ul>
             
            </li>


            <li        
           onClick={() => { 
              
              setSettings(!settings); 
            }} 
            className='relative font-inter font-medium text-[16px] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 pr-[14px] transition-all duration-300 cursor-pointer pl-[31px] rounded-r-[5px]'
            
            
            >
              <div className='flex items-center gap-2.5'>
                 <MdOutlineSettings className='w-6 h-6 '/>
                Settings
              </div>
             <IoIosArrowDown   className={`absolute  right-0 -translate-y-1/2 w-6 h-6 transition-transform duration-300 ${settings ? "rotate-180 top-6" : "top-1/2"}`} />

                             
              <ul className={`submenu mt-3  ${settings?"opacity-100 h-auto visible  ":"opacity-0 h-0 invisible "}`} >
              
                <Li  liText='Profile'
                href='/profile'
                variant='child'
                />
                <Li liText='About Us'
                href='/about/us'
                variant='child'
                />
                 <Li liText='Terms & Conditions'
                href='/terms/conditions'
               variant='child'

                />
                <Li liText='Privacy Policy'
                href='/privacy/policy'
                variant='child'
                />
              </ul>
             
            </li>
            
        </ul>

        <button className=' font-inter font-medium text-[16px] text-[#333333] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 transition-all duration-300 cursor-pointer pl-[34px] rounded-r-[5px] flex items-center gap-2.5 w-full '>
            <MdLogout className='w-6 h-6' />
            Log out
        </button>
      
    </div>
  )
}

export default Sidebar
