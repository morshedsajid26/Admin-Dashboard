"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Header from "@/app/component/Header";
import { FaArrowTurnUp } from "react-icons/fa6";

// API URL
// const API_URL = "https://ai-car-app-sandy.vercel.app/user/create-ticket"; // তোমার API রুট

const PAGE_SIZE = 10;

function Badge({ children, color }) {
  const palette = {
    red: "text-[#DC2626] ring-1 ring-[#DC2626]/20",
    blue: "text-[#49A0E6] ring-1 ring-[#49A0E6]/20",
    yellow: "text-[#FFC42D] ring-1 ring-[#FFC42D]/20",
  };
  const cls = palette[color] || palette.yellow;
  return (
    <span className={`inline-flex items-center rounded-full px-6 py-[9px] text-[16px] font-inter ${cls}`}>
      {children}
    </span>
  );
}

function ActionCell({ status }) {
  if (status === "pending") return <Badge color="red">Pending</Badge>;
  if (status === "replied") return <Badge color="blue">Replied</Badge>;
  return <Badge color="yellow">{status}</Badge>;
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
  return <FaArrowTurnUp className="text-white rotate-[270deg] w-6 h-6" />;
}

export default function AgentApprovalTable() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

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

  useEffect(() => {
    let off = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setErr("");  // Clear any previous errors

        const url = `${API_URL}?page=${page}&limit=${PAGE_SIZE}`;

        const res = await fetch(url, {
          method: "GET", // Make sure to use GET or the appropriate method based on your API
          credentials: "include", // Optional, only if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If using a token for authentication
          },
        });

        // If the response is not OK, throw an error
        if (!res.ok) {
          let msg = `HTTP ${res.status}`;
          try {
            const j = await res.json();
            msg = j?.error || j?.message || msg;
          } catch {}
          throw new Error(msg);
        }

        const body = await res.json();
        const list = Array.isArray(body) ? body : body.data || body.items || [];
        const total = body.total || list.length;  // Adjust according to your API response

        const mapped = list.map((u) => ({
          sl: u.id || u._id || `#${String(u.id || u._id || "").slice(-4)}`,
          date: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : u.date,
          status: u.status || "pending",
          message: u.message || "No message",
          email: u.email || "unknown@example.com",
          mobile: u.phone || u.mobile || "-",
        }));

        if (!off) {
          setRows(mapped);
          setTotalItems(total);
        }
      } catch (e) {
        if (!off) setErr(e.message || "Failed to load");
      } finally {
        if (!off) setLoading(false);
      }
    };

    fetchData();

    return () => {
      off = true;
    };
  }, [page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      <Header />

      {/* Error/Loading State */}
      <div className="mt-2 mb-2">
        {loading && <p className="text-sm text-gray-500">Loading…</p>}
        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>

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
          {rows.map((u) => (
            <tr key={u.sl} className="align-middle">
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px] w-[200px] whitespace-nowrap">
                {u.sl}
              </td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{u.date}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{u.email}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{u.mobile}</td>
              <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{u.message}</td>
              <td className="py-4 pr-4"><ActionCell status={u.status} /></td>
              <td className="py-4 pr-2">
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label={`View details of ${u.sl}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FFC42D] hover:opacity-90 transition"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    aria-label={`Turn action for ${u.sl}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#015093] hover:opacity-90 transition"
                  >
                    <TurnIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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
