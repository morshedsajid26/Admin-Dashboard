"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import Pusher from "pusher-js";

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const pathname = usePathname();
  const pathParts = (pathname || "/").split("/").filter(Boolean);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([]);

  // Helpful debug flags — no UI change
  const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
  const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "";

  // Pagination calculations
  const totalItems = notifications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const startIdx = (currentPage - 1) * PAGE_SIZE;

  // slice visible items for current page
  const pageItems = useMemo(() => {
    return notifications.slice(startIdx, startIdx + PAGE_SIZE).map((n, i) => ({
      ...n,
      __localIdx: startIdx + i,
    }));
  }, [startIdx, notifications]);

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

  // helper: normalize incoming payload so UI can read it
  function normalizePayload(data) {
    // backend may send different field names; we normalize to { id, title, details, time }
    const id = data.id || data._id || data.notificationId || data.notification_id || `notif-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const title = data.title || data.t || data.heading || "Notification";
    const details = data.details || data.body || data.message || data.desc || "";
    const time = data.time || data.createdAt || data.timestamp || new Date().toLocaleString();
    return { id, title, details, time };
  }

  // Setup Pusher subscription once (client-side)
  useEffect(() => {
    if (!PUSHER_KEY || !PUSHER_CLUSTER) {
      console.warn("Pusher key/cluster not set. Set NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER in your .env");
      return;
    }

    console.log("Pusher: connecting (key, cluster):", PUSHER_KEY, PUSHER_CLUSTER);

    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      // enable logs in the browser console (helps debug)
      // note: Pusher automatically logs some info; we also bind to connection events
    });

    pusher.connection.bind("connected", () => {
      console.log("Pusher connected. socket_id:", pusher.connection.socket_id);
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher connection error:", err);
    });

    const CHANNEL = "notifications";         // <-- must match backend
    const EVENT = "new-notification";       // <-- must match backend

    const channel = pusher.subscribe(CHANNEL);

    channel.bind(EVENT, (rawData) => {
      try {
        console.log("Pusher event received:", rawData);
        const item = normalizePayload(rawData);
        // prepend new notifications (newest first)
        setNotifications((prev) => [item, ...prev]);
        // ensure user sees newest page
        setCurrentPage(1);
      } catch (e) {
        console.error("Failed to handle notification payload:", e);
      }
    });

    // Optional: also listen to subscription_succeeded to confirm subscription
    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`Subscribed to channel: ${CHANNEL}`);
    });

    return () => {
      try {
        channel.unbind_all();
        pusher.unsubscribe(CHANNEL);
        pusher.disconnect();
      } catch (e) {
        // ignore cleanup errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // delete handler (works with normalized id or local idx)
  function handleDelete(idOrLocal) {
    setNotifications((prev) => prev.filter((n) => n.id !== idOrLocal && n.__localIdx !== idOrLocal));
  }
 console.log("notifications", notifications)
  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      {/* Header */}
      <div className="flex items-center gap-[14px]">
        <IoMdArrowBack onClick={() => router.back()} className="w-6 h-6 text-[#015093]" />
        <h3 className="text-[#333333] text-[20px] font-inter font-semibold capitalize">
          {pathParts[0] || "Notifications"}
        </h3>
      </div>

      {/* Total Notifications */}
      <div>
        <p className="text-[#333333] text-[16px] font-inter font-semibold mt-[21px]">
          Total {totalItems} Notifications
        </p>
      </div>

      {/* Notification List */}
      <div className="mt-6">
        {pageItems.map((item) => (
          <div key={item.id || item.__localIdx} className="w-full hover:bg-[#CCDCE9] transition-all duration-300 py-3 px-[25px]">
            <div className="flex justify-between items-center gap-4">
              <p className="min-w-[1000px] text-[#333333] text-[16px] font-inter font-semibold">
                {item.title} <span className="font-normal">{item.details}</span>
              </p>
              <p className="text-[#5C5C5C] text-[16px] font-inter whitespace-nowrap">{item.time}</p>
              <RiDeleteBin6Line
                className="w-6 h-6 text-[#DC4600] cursor-pointer"
                title="Delete"
                onClick={() => handleDelete(item.id || item.__localIdx)}
              />
            </div>
          </div>
        ))}
        {pageItems.length === 0 && (
          <div className="py-6 text-center text-gray-500">No notifications</div>
        )}
      </div>

      {/* Pagination */}
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
