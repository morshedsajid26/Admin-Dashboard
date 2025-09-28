"use client";
import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Header from "../../component/Header";
import {  FaArrowTurnUp } from "react-icons/fa6";

const baseRows = [
 { sl: "#1231",   date: "10/28/12", status: "pending" , message:"I Didn't Receive My Referral...",  email:"bockely@att.com", mobile:"(907) 555-0101",   },
  { sl: "#1232",   date: "01/05/12", status: "replied" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",   },
  { sl: "#1233",   date: "08/02/19", status: "pending" , message:"I Didn't Receive My Referral...",  email:"bockely@att.com", mobile:"(907) 555-0101", status: "pending" , message:"I Didn't Receive My Referral...",  email:"bockely@att.com", mobile:"(907) 555-0101",   },
  { sl: "#1235",  date: "02/11/12", status: "replied" , message:"I Didn't Receive My Referral...",  email:"bockely@att.com", mobile:"(907) 555-0101",   },
  { sl: "#1236",   date: "10/06/13", status: "pending" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",    },
  { sl: "#1237",   date: "05/03/14", status: "replied" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",   },
  { sl: "#1238",   date: "07/18/17", status: "pending" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",    },
  { sl: "#1239",   date: "04/04/18", status: "replied" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",     },
  { sl: "#1240",  date: "08/21/15",  status: "pending" , message:"I Didn't Receive My Referral...", email:"bockely@att.com", mobile:"(907) 555-0101",    },
];


const TOTAL_PAGES = 100;
const PAGE_SIZE = 10; 
const TOTAL_ITEMS = TOTAL_PAGES * PAGE_SIZE;

function Badge({ children, color }) {
  const cls =
    color === "blue"
      ? "text-[#49A0E6]  ring-1 ring-[#0DBF69]/20"
      : "text-[#FFC42D] ring-1 ring-[#DC4600]/20 ";
  return (
    <span className={`inline-flex items-center rounded-full px-6 py-[9px] text-[16px] font-inter ${cls}`}>
      {children}
    </span>
  );
}



function ActionCell({ status }) {
  if (status === "pending") return <Badge color="red">Pending</Badge>;
  if (status === "replied") return <Badge color="blue">Replied</Badge>;
  return (
    <div>

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
function TurnIcon() {
  return (
   <FaArrowTurnUp className="text-white rotate-270 w-6 h-6" />
  );
}

export default function AgentApprovalTable() {
  const [page, setPage] = useState(1);

  const startIdx = (page - 1) * PAGE_SIZE;              
  const endIdx = Math.min(startIdx + PAGE_SIZE, TOTAL_ITEMS); 

  const currentRows = useMemo(() => {
    const out = [];
    for (let i = 0; i < PAGE_SIZE; i++) {
      const source = baseRows[i % baseRows.length];
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
        <Header/>
      <table className="min-w-[720px] w-full text-left table-fixed mt-[18px]">
        <thead>
          <tr className="bg-white text-[18px] font-inter font-semibold text-[#333333]">
            <th className="py-3 pr-4 w-[200px]">Ticket ID</th>
            <th className="py-3 pr-4">Date</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Mobile Number</th>
            <th className="py-3 pr-2">Message</th>
            <th className="py-3 pr-2">Status</th>
            <th className="py-3 pr-2">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {currentRows.map((r, i) => {
            
           
            
           
            return (
              <tr  className="align-middle">
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px] w-[200px] whitespace-nowrap">
                  {r.sl}
                </td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.date}</td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.email}</td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.mobile}</td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.message}</td>
                
                <td className="py-4 pr-4"><ActionCell status={r.status} /></td>
                <td className="py-4 pr-2 flex gap-3">
                  <button
                    type="button"
                    aria-label={`View details of ${r.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FFC42D] hover:opacity-90 transition"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#015093] hover:opacity-90 transition"
                  >
                    <TurnIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      
      <div className="mt-6  flex justify-center">
        

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
  );
}
