"use client";
import React, { useMemo, useState } from 'react'

import { IoIosArrowBack, IoIosArrowForward, IoMdArrowBack } from 'react-icons/io'
import { usePathname } from 'next/navigation';
import { RiDeleteBin6Line } from "react-icons/ri";

 const notification = [
  { title:"New Agent Verification Request-", details:"Priya Hasan submitted documents for agent verification. Review now in Verification Center.", time:"Just Now"},
  { title:"Subscription Expiry Alert –", details:"Nova Developers' Enterprise subscription expires in 3 days. Send renewal reminder?", time:"5 min ago"},
  { title:"New Property Added –", details:" New property listed by Shafiq Rahman in Gulshan. Status: Pending Review.", time:"30 min ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  { title:"New Agent Verification Request-", details:"Priya Hasan submitted documents for agent verification. Review now in Verification Center.", time:"Just Now"},
  { title:"Subscription Expiry Alert –", details:"Nova Developers' Enterprise subscription expires in 3 days. Send renewal reminder?", time:"5 min ago"},
  { title:"New Property Added –", details:" New property listed by Shafiq Rahman in Gulshan. Status: Pending Review.", time:"30 min ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
    { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  { title:"New Agent Verification Request-", details:"Priya Hasan submitted documents for agent verification. Review now in Verification Center.", time:"Just Now"},
  { title:"Subscription Expiry Alert –", details:"Nova Developers' Enterprise subscription expires in 3 days. Send renewal reminder?", time:"5 min ago"},
  { title:"New Property Added –", details:" New property listed by Shafiq Rahman in Gulshan. Status: Pending Review.", time:"30 min ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  { title:"Agent Profile Rejected (Appeal) – ", details:"Nabila Khan submitted an appeal after verification rejection. Review updated documents.", time:"1 hour ago"},
  
 ];


const TOTAL_PAGES = 100;
const PAGE_SIZE = 10; 
const TOTAL_ITEMS = TOTAL_PAGES * PAGE_SIZE;

const page = () => {
      const pathname = usePathname(); 
  const pathParts = pathname.split("/").filter(Boolean)

const [page, setPage] = useState(1);

  const startIdx = (page - 1) * PAGE_SIZE;              
  const endIdx = Math.min(startIdx + PAGE_SIZE, TOTAL_ITEMS); 

  const notifications = useMemo(() => {
    const out = [];
    for (let i = 0; i < PAGE_SIZE; i++) {
      const source = notification[i % notification.length];
      out.push(source);
    }
    return out;
  }, [page]);

  
  const pageList = useMemo(() => {
    const out = [];
    const push = (v) => out.push(v);
    const left = Math.max(2, page - 2);
    const right = Math.min(TOTAL_PAGES - 1, page + 2);
    push(1);
    if (left > 2) push("…");
    for (let i = left; i <= right; i++) push(i);
    if (right < TOTAL_PAGES - 1) push("…");
    push(TOTAL_PAGES);
    return out;
  }, [page]);


  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(TOTAL_PAGES, p + 1));


  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      
        <div className='flex  items-center gap-[14px]'>
            <IoMdArrowBack className='w-6 h-6 text-[#015093]' />
        <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >{pathParts[0] || ""}</h3>
        </div>

        <div>
          <p className='text-[#333333] text-[16px] font-inter font-semibold mt-[21px] '>Total 128 Notifications</p>
        </div>

        <div className='mt-6 '>
{notification.map((item, index)=>(
  <div key={index} className='w-full hover:bg-[#CCDCE9] transition-all duration-300 py-3 px-[25px]  '>
    <div className='flex justify-between items-center '>
      <p className='min-w-[1000px]  text-[#333333] text-[16px] font-inter font-semibold '>{item.title} <span className='font-normal'>{item.details}</span></p>  
    <p className='text-[#5C5C5C] text-[16px] font-inter'>{item.time}</p>
    <RiDeleteBin6Line className='w-6 h-6 text-[#DC4600]' />
    </div>
    
    

  </div>

))}
        </div>
      


<div className="mt-20  flex justify-center">
        

        <nav className="inline-flex items-center gap-4" aria-label="Pagination">
          
          <button onClick={goPrev}  disabled={page === 1} className="text-[#333333] cursor-pointer flex items-center gap-4 font-inter text-[16px]">
            <IoIosArrowBack /> 
            Previous
            
            </button>

          {pageList.map((p, i) =>
            p === "…" ? (
              <span key={`dots-${i}`} className="px-2 text-slate-500">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-[30px] h-[30px] rounded-full font-inter text-[16px] flex items-center justify-center  ${
                  p === page ? "bg-[#015093] text-white ring-[#015093]" : "text-[#333333] hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button onClick={goNext} disabled={page === TOTAL_PAGES} className="text-[#333333] cursor-pointer flex items-center gap-4 font-inter text-[16px]">
            Next
            <IoIosArrowForward />
            
            </button>
          
        </nav>

        
      </div>

    </div>
  )
}

export default page
