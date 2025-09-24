"use client";
import React, { useState } from 'react'
import Container from './component/Container'
import Image from 'next/image'
import users from '@/public/users.png'
import agents from '@/public/agents.png'
import income from '@/public/income.png'
import listings from '@/public/listings.png'
import IncomeBar from './component/IncomeBar'
import GrowthBar from './component/GrowthBar'
import { IoIosArrowDown } from 'react-icons/io'

const page = () => {
  let [yearIncome,setYearIncome]=useState(false);
  let [yearGrowth,setYearGrowth]=useState(false);
  let [yearValue,setYearValue]=useState("2025");

      const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];
  return (
    <div className='' >

    <Container className= 'grid grid-cols-4 grid-rows-2 gap-[18px]  '>
      
      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Users</p>
        <Image src={users} alt="Total Users"/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 852,650</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Agents</p>
        <Image src={agents} />
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 4,782</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Income</p>
        <Image src={income}  alt="Total Income"/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> $2,500</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Active listings</p>
        <Image src={listings}  lt="Active Listings"/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 358</p>
      </div>

      
      <div className='col-span-2 bg-white rounded-[5px] py-[25px] px-5 '>
        <div className='mb-[30px] flex items-center justify-between'>
            <h3 className='font-inter font-semibold text-[18px] text-[#333333]'>Income Overview</h3>
          
          <div className='relative cursor-pointer'>
            <div onClick={()=>setYearIncome(!yearIncome)} className='  '>
            <input className='outline-none w-[75px] border border-[#767676] py-[6px] pl-2.5 pr-1 rounded-[5px] font-inter text-[14px] text-[#333333] placeholder-[#333333]' placeholder={yearValue}/>

            {yearIncome? <IoIosArrowDown className='absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 rotate-180' />:<IoIosArrowDown className='absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 ' />
               }

                <div
                value={yearIncome}
                onChange={(e) => setYearIncome(e.target.value)}
                className={` w-full text-center bg-white  font-inter text-[14px] text-[#333333] z-30  absolute ${yearIncome?"opacity-100 h-auto visible overflow-auto ":"opacity-0 h-0 invisible overflow-hidden"}`}>
                     {years.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setYearValue(item);
                        setYearIncome(false);
                      }}
                      className="py-2 hover:bg-[#015093] hover:text-white cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
          </div>
          </div>


        </div>

        <div className='h-full'>
          <IncomeBar/>
        </div>
      </div>



      <div className='col-span-2 bg-white rounded-[5px] py-[25px] px-5'>

        <div className='mb-[30px] flex items-center justify-between'>
            <h3 className='font-inter font-semibold text-[18px] text-[#333333]'>User Growth</h3>
          
          <div className='relative cursor-pointer'>
            <div onClick={()=>setYearGrowth(!yearGrowth)} className='  '>
            <input className='outline-none w-[75px] border border-[#767676] py-[6px] pl-2.5 pr-1 rounded-[5px] font-inter text-[14px] text-[#333333] placeholder-[#333333]' placeholder={yearValue}/>

            {yearIncome? <IoIosArrowDown className='absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 rotate-180' />:<IoIosArrowDown className='absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 ' />
               }

                <div
                value={yearGrowth}
                onChange={(e) => setYearGrowth(e.target.value)}
                className={` w-full text-center bg-white  font-inter text-[14px] text-[#333333] z-30  absolute ${yearGrowth?"opacity-100 h-auto visible overflow-auto ":"opacity-0 h-0 invisible overflow-hidden"}`}>
                     {years.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setYearValue(item);
                        setYearGrowth(false);
                      }}
                      className="py-2 hover:bg-[#015093] hover:text-white cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
          </div>
          </div>


        </div>

        <div>
          <GrowthBar/>
        </div>
      </div>
      <div className='col-span-4 bg-white rounded-[5px]'>1</div>
      


       
    </Container>
  
      
    </div>
  )
}

export default page
