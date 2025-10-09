
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineStop } from "react-icons/ai";
import Image from "next/image";
import Header from "@/app/component/Header";
import Cookies from "js-cookie"; // যদি টোকেন কুকিতে থাকে

const API_BASE = "https://ai-car-app-sandy.vercel.app";
const LIST_URL = `${API_BASE}/admin/user-list/users`; // ← সঠিক এন্ডপয়েন্ট
const PAGE_SIZE = 10;

function StopIcon() {
  return <AiOutlineStop className="h-6 w-6 text-white" />;
}

function fmtDate(d) {
  const dt = new Date(d);
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const yy = String(dt.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
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

  // 🔹 লোডার
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const token = Cookies.get("token") || localStorage.getItem("token") || "";
        const url = `${LIST_URL}?page=${page}&limit=${PAGE_SIZE}`;

        const res = await fetch(url, {
          method: "GET",
          // credentials: "include", // কুকি-ভিত্তিক auth না হলে এটা দিবে না
          headers: {
            // GET এ Content-Type দেবে না, প্রিফ্লাইট এড়াতে
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          let msg = `HTTP ${res.status}`;
          try {
            const j = await res.json();
            msg = j?.error || j?.message || msg;
          } catch {}
          throw new Error(msg);
        }

        const body = await res.json();
        const list = Array.isArray(body) ? body : (body.data || body.items || []);
        const total =
          (typeof body.total === "number" ? body.total : undefined) ||
          Number(body?.meta?.total) ||
          list.length;

        const mapped = list.map((u) => ({
          id: u._id ?? u.id,
          sl: u.sl || `#${String(u.id || u._id || "").slice(-4)}`,
          name: u.name || [u.firstName, u.lastName].filter(Boolean).join(" ") || "Unknown",
          email: u.email || "unknown@example.com",
          mobile: u.phone || u.mobile || "",
          date: u.createdAt ? fmtDate(u.createdAt) : (u.date || ""),
          avatar: u.avatar || u.photoUrl || u.avatarUrl || "/user1.png",
        }));

        if (!off) {
          setRows(mapped);
          setTotalItems(Number.isFinite(total) ? total : mapped.length);
        }
      } catch (e) {
        if (!off) setErr(e.message || "Failed to load");
      } finally {
        if (!off) setLoading(false);
      }
    })();

    return () => {
      off = true;
    };
  }, [page]);

  // 🔹 ব্লক অ্যাকশন (এন্ডপয়েন্ট ঠিক করো)
  async function onBlock(row) {
    try {
      const token = Cookies.get("token") || localStorage.getItem("token") || "";
      const res = await fetch(`${API_BASE}/admin/user-list/users/${row.id}`, {
        method: "PATCH",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: "blocked" }),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const j = await res.json();
          msg = j?.error || j?.message || msg;
        } catch {}
        throw new Error(msg);
      }

      setRows((prev) => prev.filter((r) => r.id !== row.id));
      setTotalItems((t) => Math.max(0, t - 1));
    } catch (e) {
      alert(e.message || "Failed to block");
    }
  }

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      <Header />

      {/* status */}
      <div className="mt-2 mb-2">
        {loading && <p className="text-sm text-gray-500">Loading…</p>}
        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>

      <table className="min-w-[720px] w-full text-left table-fixed mt-[18px]">
        <thead>
          <tr className="bg-white text-[18px] font-inter font-semibold text-[#333333]">
            <th className="py-3 pr-4 w-[200px]">SL No</th>
            <th className="py-3 pr-4">Full Name</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Mobile Number</th>
            <th className="py-3 pr-2">Created Date</th>
            <th className="py-3 pr-2">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}

          {rows.map((r) => {
            const src = r.avatar?.startsWith("/") ? r.avatar : r.avatar || "/user1.png";
            return (
              <tr key={r.id || r.sl} className="align-middle">
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px] whitespace-nowrap">
                  {r.sl}
                </td>

                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9">
                      <Image
                        src={src}
                        alt={r.name}
                        fill
                        sizes="36px"
                        className="rounded-full object-cover ring-2 ring-white shadow"
                        unoptimized={!src.startsWith("/")}
                      />
                    </div>
                    <span className="text-[#333333] font-inter text-[16px]">{r.name}</span>
                  </div>
                </td>

                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.email}</td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.mobile || "-"}</td>
                <td className="py-4 pr-4 text-[#333333] font-inter text-[16px]">{r.date}</td>

                <td className="py-4 pr-2">
                  <button
                    type="button"
                    aria-label={`Block ${r.name}`}
                    onClick={() => onBlock(r)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#015093] hover:opacity-90 transition"
                  >
                    <StopIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination UI — ঠিক আগের মতো */}
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
