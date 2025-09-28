"use client";
import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Header from "../../component/Header";

const baseRows = [
  { sl: "#1231", name: "Annette Black",  avatar: "user1.png",  date: "10/28/12", status: "pending"  },
  { sl: "#1232", name: "Jerome Bell",    avatar: "user2.png",  date: "01/05/12", status: "approved" },
  { sl: "#1233", name: "Ronald Richards",avatar: "user3.png",  date: "08/02/19", status: "pending"  },
  { sl: "#1234", name: "Dianne Russell", avatar: "user4.png",  date: "08/03/14", status: "pending"  },
  { sl: "#1235", name: "Albert Flores",  avatar: "user5.png",  date: "02/11/12", status: "pending"  },
  { sl: "#1236", name: "Eleanor Pena",   avatar: "user6.png",  date: "10/06/13", status: "pending"  },
  { sl: "#1237", name: "Floyd Miles",    avatar: "user7.png",  date: "05/03/14", status: "rejected" },
  { sl: "#1238", name: "Cody Fisher",    avatar: "user8.png",  date: "07/18/17", status: "pending"  },
  { sl: "#1239", name: "Ralph Edwards",  avatar: "user9.png",  date: "04/04/18", status: "pending"  },
  { sl: "#1240", name: "Devon Lane",     avatar: "user10.png", date: "08/21/15", status: "pending"  },
];


const TOTAL_PAGES = 100;
const PAGE_SIZE = 10; 
const TOTAL_ITEMS = TOTAL_PAGES * PAGE_SIZE;

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
    blue: "text-[#49A0E6] ring-1 ring-inset ring-[#0DBF69]/20 hover:bg-[#49A0E6]/10",
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
  if (status === "approved") return <Badge color="blue">Approved</Badge>;
  if (status === "rejected") return <Badge color="red">Rejected</Badge>;
  return (
    <div className="flex items-center gap-3 text-[16px] font-inter">
      <OutlineBtn tone="blue">Approve</OutlineBtn>
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
            <th className="py-3 pr-4 w-[200px]">SL No</th>
            <th className="py-3 pr-4">Agent Name</th>
            <th className="py-3 pr-4">Submission Date</th>
            <th className="py-3 pr-4">Action</th>
            <th className="py-3 pr-2">Details</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {currentRows.map((r, i) => {
            
           
            
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
