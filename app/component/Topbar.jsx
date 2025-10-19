"use client";
 
import Image from "next/image";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import user from "@/public/user.png";
import Link from "next/link";
import { useNotifications } from "../SimpleProvider";

 
const Topbar = () => {
  const { unreadCount } = useNotifications();
 
  return (
    <div className="min-w-0 w-[calc(100vw-252px)] py-7 flex justify-end pr-[50px]  ">
      <div className="w-[248px] flex gap-8">
        <Link href="/notifications" className="relative">
          <IoMdNotificationsOutline className="w-[42px] h-[42px] p-[9px] text-[#015093] bg-[#CCDCE9] rounded-full" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-[1px]">
              {unreadCount}
            </span>
          )}
        </Link>
 
        <Link href="/profile" className="flex items-center gap-3">
          <Image src={user} alt="user" />
          <p className="font-inter font-medium text-[#333333] text-[16px]">
            Robert Smith
          </p>
        </Link>
      </div>
    </div>
  );
};
 
export default Topbar;