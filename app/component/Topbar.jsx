"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useNotifications } from "../SimpleProvider";
import userPlaceholder from "@/public/user.png";

const Topbar = () => {
  const { unreadCount } = useNotifications();

  const [userData, setUserData] = useState({
    name: "Loading...",
    image: userPlaceholder,
  });

  // 🧠 Fetch name from backend & image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const token = localStorage.getItem("token");

    // 🔹 Set saved image (if exists)
    if (savedImage) {
      setUserData((prev) => ({ ...prev, image: savedImage }));
    }

    // 🔹 Fetch user name from API
    const fetchProfile = async () => {
      if (!token) {
        console.warn("No token found in localStorage!");
        return;
      }

      try {
        const res = await fetch("https://ai-car-app-sandy.vercel.app/admin/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Topbar Profile API Response:", data);

        // 🔹 Flexible handling based on possible API structures
        const userName =
          data?.name ||
          data?.user?.name ||
          data?.admin?.name ||
          data?.data?.name ||
          "";

        if (res.ok && userName) {
          setUserData((prev) => ({ ...prev, name: userName }));
        } else {
          console.warn("Failed to extract name from response:", data);
        }
      } catch (err) {
        console.error("Error fetching profile in Topbar:", err);
      }
    };

    fetchProfile();

    // 🔁 Listen for image change event (from profile page)
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("profileImage");
      if (updatedImage) {
        setUserData((prev) => ({ ...prev, image: updatedImage }));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-w-0 w-[calc(100vw-252px)] py-7 flex justify-end pr-[50px]">
      <div className="w-[248px] flex gap-8">
        {/* 🔔 Notification */}
        <Link href="/notifications" className="relative">
          <IoMdNotificationsOutline className="w-[42px] h-[42px] p-[9px] text-[#015093] bg-[#CCDCE9] rounded-full" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-[1px]">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* 👤 Profile Image + Name */}
        <Link href="/profile" className="flex items-center gap-3">
          <Image
            src={userData.image}
            alt="user"
            width={42}
            height={42}
            className="rounded-full object-cover"
          />
          <p className="font-inter font-medium text-[#333333] text-[16px]">
            {userData.name === "Loading..." ? "Loading..." : userData.name || "User"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
