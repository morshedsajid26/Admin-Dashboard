"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Li = ({ href = "/", liText, icon, className, children }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`font-inter font-medium text-[16px] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 pr-[14px] transition-all duration-300 cursor-pointer pl-[31px] rounded-r-[5px] ${isActive ? "bg-[#015093] text-white hover:text-white" : ""} ${className}`}
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {liText}
      </span>
      {children}
    </Link>
  );
};

export default Li;
