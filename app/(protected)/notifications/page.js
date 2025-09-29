"use client";
import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { usePathname } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';


const NOTIFICATIONS = [
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

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const pathname = usePathname();
  const pathParts = (pathname || "/").split("/").filter(Boolean);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = NOTIFICATIONS.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const startIdx = (currentPage - 1) * PAGE_SIZE;

  
  const pageItems = useMemo(() => {
    return NOTIFICATIONS.slice(startIdx, startIdx + PAGE_SIZE).map((n, i) => ({
      ...n,
      id: startIdx + i, 
    }));
  }, [startIdx]);

  
  const pageList = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out = [];
    const left = Math.max(2, currentPage - 2);
    const right = Math.min(totalPages - 1, currentPage + 2);
    out.push(1);
    if (left > 2) out.push("…");
    for (let i = left; i <= right; i++) out.push(i);
    if (right < totalPages - 1) out.push("…");
    out.push(totalPages);
    return out;
  }, [currentPage, totalPages]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

 

  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      
      <div className="flex items-center gap-[14px]">
        <IoMdArrowBack onClick={() => router.back()} className="w-6 h-6 text-[#015093]" />
        <h3 className="text-[#333333] text-[20px] font-inter font-semibold capitalize">
          {pathParts[0] || ""}
        </h3>
      </div>

      
      <div>
        <p className="text-[#333333] text-[16px] font-inter font-semibold mt-[21px]">
          Total {totalItems} Notifications
        </p>
      </div>

      
      <div className="mt-6">
        {pageItems.map((item) => (
          <div key={item.id} className="w-full hover:bg-[#CCDCE9] transition-all duration-300 py-3 px-[25px]">
            <div className="flex justify-between items-center gap-4">
              <p className="min-w-[1000px] text-[#333333] text-[16px] font-inter font-semibold">
                {item.title} <span className="font-normal">{item.details}</span>
              </p>
              <p className="text-[#5C5C5C] text-[16px] font-inter whitespace-nowrap">{item.time}</p>
              <RiDeleteBin6Line
                className="w-6 h-6 text-[#DC4600] cursor-pointer"
                onClick={() => handleDelete(item.id)}
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>

     
      <div className="mt-20 flex justify-center">
        <nav className="inline-flex items-center gap-4" aria-label="Pagination">
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="text-[#333333] flex items-center gap-4 font-inter text-[16px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
            Previous
          </button>

          {pageList.map((p, i) =>
            p === "…" ? (
              <span key={`dots-${i}`} className="px-2 text-slate-500">
                …
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => setCurrentPage(Number(p))}
                className={`w-[30px] h-[30px] rounded-full font-inter text-[16px] flex items-center justify-center ${
                  p === currentPage ? "bg-[#015093] text-white ring-[#015093]" : "text-[#333333] hover:bg-slate-50"
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="text-[#333333] flex items-center gap-4 font-inter text-[16px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <IoIosArrowForward />
          </button>
        </nav>
      </div>
    </div>
  );
}
