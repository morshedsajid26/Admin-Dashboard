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


const baseRows = [
  { sl: "#1231", name: "Annette Black",  avatar: "user1.png",  date: "10/28/12", status: "pending"  },
  { sl: "#1232", name: "Jerome Bell",    avatar: "user2.png",  date: "01/05/12", status: "pending" },
  { sl: "#1233", name: "Ronald Richards",avatar: "user3.png",  date: "08/02/19", status: "pending"  },
  { sl: "#1234", name: "Dianne Russell", avatar: "user4.png",  date: "08/03/14", status: "pending"  },
  { sl: "#1235", name: "Albert Flores",  avatar: "user5.png",  date: "02/11/12", status: "pending"  },
,
];

function Badge({ children, color }) {
  const cls =
    color === "green"
      ? "text-[#0DBF69] bg-[#0DBF69]/10 ring-1 ring-[#0DBF69]/20"
      : "text-[#DC4600] ring-1 ring-[#DC4600]/20 bg-[#DC4600]/10";
  return (
    <span className={`inline-flex items-center rounded-[5px] px-6 py-[9px] text-[16px] font-inter ${cls}`}>
      {children}
    </span>
  );
}

function OutlineBtn({ children, tone = "slate", onClick }) {
  const tones = {
    green: "text-[#0DBF69] ring-1 ring-inset ring-[#0DBF69]/20 hover:bg-[#0DBF69]/10",
    red:   "text-[#DC4600] ring-1 ring-inset ring-[#DC4600]/20 hover:bg-[#DC4600]/10",
    slate: "text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-md px-6 py-[9px] text-[16px] font-inter cursor-pointer ${tones[tone]} transition`}
    >
      {children}
    </button>
  );
}

function ActionCell({ status }) {
  if (status === "approved") return <Badge color="green">Approved</Badge>;
  if (status === "rejected") return <Badge color="red">Rejected</Badge>;
  return (
    <div className="flex items-center gap-3 text-[16px] font-inter">
      <OutlineBtn tone="green">Approve</OutlineBtn>
      <OutlineBtn tone="red">Reject</OutlineBtn>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
    </svg>
  );
}
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


      <div className='col-span-4 bg-white rounded-[5px] py-[25px] px-[22px]'>

        <div className='mb-[29px] flex items-center justify-between'>
          <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >verification center</h3>
          <a
          className='text-[#015093] text-[14px] font-inter font-medium'
           href='/verification/center'>View all</a>
        </div>

        <table className="min-w-[720px] w-full text-left table-fixed">
        <thead>
          <tr className="bg-white text-[18px] font-inter font-semibold text-[#333333]">
            <th className="py-3 pr-4 w-[200px]">SL No</th>
            <th className="py-3 pr-4">Agent Name</th>
            <th className="py-3 pr-4">Submission Date</th>
            <th className="py-3 pr-4">Action</th>
            <th className="py-3 pr-2">Details</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {baseRows.map((r, i) => {
            
           
            
            const avatar = r.avatar.startsWith("/") ? r.avatar : `/${r.avatar}`;
            return (
              <tr  className="align-middle">
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px] w-[200px] whitespace-nowrap">
                  {r.sl}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={r.name}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow"
                    />
                    <span className="text-[#333333] font-inter text-[16px]">{r.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.date}</td>
                <td className="py-4 pr-4"><ActionCell status={r.status} /></td>
                <td className="py-4 pr-2">
                  <button
                    type="button"
                    aria-label={`View details of ${r.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#015093] hover:opacity-90 transition"
                  >
                    <EyeIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        
      </div>
      


       
    </Container>
  
      
    </div>
  )
}

export default page
