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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedImage = localStorage.getItem("profileImage");

    // ✅ Set saved image if found
    if (savedImage) {
      setUserData((prev) => ({ ...prev, image: savedImage }));
    }

    // ✅ Fetch user name from backend
    const fetchProfile = async () => {
      if (!token) return console.warn("No token found!");

      try {
        const res = await fetch("https://ai-car-app-sandy.vercel.app/admin/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Topbar Profile API Response:", data);

        const userName =
          data?.name ||
          data?.user?.name ||
          data?.admin?.name ||
          data?.data?.name ||
          "User";

        if (res.ok) {
          setUserData((prev) => ({ ...prev, name: userName }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();

    // ✅ Listen for profile image updates from localStorage or custom event
    const updateImage = () => {
      const newImage = localStorage.getItem("profileImage");
      if (newImage) {
        setUserData((prev) => ({ ...prev, image: newImage }));
      }
    };

    // listen to both localStorage + custom event
    window.addEventListener("storage", updateImage);
    window.addEventListener("profileImageUpdated", updateImage);

    return () => {
      window.removeEventListener("storage", updateImage);
      window.removeEventListener("profileImageUpdated", updateImage);
    };
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
            src={userData.image || userPlaceholder}
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
