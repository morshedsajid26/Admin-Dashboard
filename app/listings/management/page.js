"use client";
import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Header from "../../component/Header";
import Image from "next/image";


const baseRows = [
  { sl: "#1231", name: "Annette Black",  avatar: "user1.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "10/28/12", status: "pending",  car:"Toyota Corolla" },
  { sl: "#1232", name: "Jerome Bell",    avatar: "user2.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "01/05/12", status: "approved", car:"Honda Civic" },
  { sl: "#1233", name: "Ronald Richards",avatar: "user3.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "08/02/19", status: "pending",  car:"BMW ix3" },
  { sl: "#1234", name: "Dianne Russell", avatar: "user4.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "08/03/14", status: "pending",  car:"Ford F-150" },
  { sl: "#1235", name: "Albert Flores",  avatar: "user5.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "02/11/12", status: "pending",  car:"Toyota Corolla" },
  { sl: "#1236", name: "Eleanor Pena",   avatar: "user6.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "10/06/13", status: "pending",  car:"BMW ix3" },
  { sl: "#1237", name: "Floyd Miles",    avatar: "user7.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "05/03/14", status: "rejected", car:"Ford F-150" },
  { sl: "#1238", name: "Cody Fisher",    avatar: "user8.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "07/18/17", status: "pending",  car:"Honda Civic" },
  { sl: "#1239", name: "Ralph Edwards",  avatar: "user9.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "04/04/18", status: "pending",  car:"Ford F-150" },
  { sl: "#1240", name: "Devon Lane",     avatar: "user10.png", location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "08/21/15", status: "pending",  car:"Toyota Corolla" },
   { sl: "#1236", name: "Eleanor Pena",   avatar: "user6.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "10/06/13", status: "pending",  car:"BMW ix3" },
  { sl: "#1237", name: "Floyd Miles",    avatar: "user7.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "05/03/14", status: "rejected", car:"Ford F-150" },
  { sl: "#1238", name: "Cody Fisher",    avatar: "user8.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "07/18/17", status: "pending",  car:"Honda Civic" },
  { sl: "#1239", name: "Ralph Edwards",  avatar: "user9.png",  location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "04/04/18", status: "pending",  car:"Ford F-150" },
  { sl: "#1240", name: "Devon Lane",     avatar: "user10.png", location:"Location", price:"$10,000", margin:"$2,000", mobile:"(907) 555-0101", date: "08/21/15", status: "pending",  car:"Toyota Corolla" },
];


const PAGE_SIZE = 10;

function Badge({ children, color }) {
  const cls =
    color === "blue"
      ? "text-[#49A0E6] bg-[#49A0E6]/10 ring-1 ring-[#49A0E6]/20"
      : "text-[#DC4600] bg-[#DC4600]/10 ring-1 ring-[#DC4600]/20";
  return (
    <span className={`inline-flex items-center rounded-[5px] px-6 py-[9px] text-[16px] font-inter ${cls}`}>
      {children}
    </span>
  );
}

function OutlineBtn({ children, tone = "slate", onClick }) {
  const tones = {
    blue:  "text-[#49A0E6] ring-1 ring-inset ring-[#49A0E6]/20 hover:bg-[#49A0E6]/10",
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

function Person({ name, avatar }) {
  const src = avatar.startsWith("/") ? avatar : `/${avatar}`;
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9">
        <Image
          src={src}
          alt={name}
          fill
          sizes="36px"
          className="rounded-full object-cover ring-2 ring-white shadow"
        />
      </div>
      <span className="text-[#333333] font-inter text-[16px]">{name}</span>
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

  const totalItems = baseRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;

  
  const currentRows = useMemo(() => {
    return baseRows.slice(startIdx, startIdx + PAGE_SIZE);
  }, [startIdx, totalItems]);


  const pageList = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out = [];
    const left = Math.max(2, page - 2);
    const right = Math.min(totalPages - 1, page + 2);
    out.push(1);
    if (left > 2) out.push("…");
    for (let i = left; i <= right; i++) out.push(i);
    if (right < totalPages - 1) out.push("…");
    out.push(totalPages);
    return out;
  }, [page, totalPages]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      <Header />

      <table className="min-w-[920px] w-full text-left table-fixed mt-[18px]">
        <thead>
          <tr className="bg-white text-[18px] font-inter font-semibold text-[#333333]">
            <th className="py-3 pr-4 w-[100px]">SL No</th>
            <th className="py-3 pr-2  w-[150px]">Car Name</th>
            <th className="py-3 pr-2 w-[120px]">Location</th>
            <th className="py-3 pr-2 w-[80px]">Price</th>
            <th className="py-3 pr-4 w-[80px]">Margin</th>
            <th className="py-3 pr-4 w-[200px]">Agent Name</th>
            <th className="py-3 pr-2 w-[120px]">Date Added</th>
            <th className="py-3 pr-4 w-[70px]">Details</th>
            <th className="py-3 pr-2 w-[220px]">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {currentRows.map((r) => (
            <tr key={r.sl} className="align-middle">
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px] whitespace-nowrap">{r.sl}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.car}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.location}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.price}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.margin}</td>
              <td className="py-4 pr-4"><Person name={r.name} avatar={r.avatar} /></td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.date}</td>
              <td className="py-4 pr-2">
                <button
                  type="button"
                  aria-label={`View details of ${r.sl}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#015093] hover:opacity-90 transition"
                >
                  <EyeIcon />
                </button>
              </td>
              <td className="py-4 pr-4"><ActionCell status={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div className="mt-6 flex justify-center">
        <nav className="inline-flex items-center gap-4" aria-label="Pagination">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="text-[#333333] flex items-center gap-4 font-inter text-[16px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
            Previous
          </button>

          {pageList.map((p, i) =>
            p === "…" ? (
              <span key={`dots-${i}`} className="px-2 text-slate-500">…</span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => setPage(Number(p))}
                className={`w-[30px] h-[30px] rounded-full font-inter text-[16px] flex items-center justify-center ${
                  p === page ? "bg-[#015093] text-white" : "text-[#333333] hover:bg-slate-50"
                }`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={goNext}
            disabled={page === totalPages}
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
