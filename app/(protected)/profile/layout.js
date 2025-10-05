"use client";
import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import profile from '@/public/profile.png'
import { MdOutlineCameraAlt } from 'react-icons/md';
import Link from 'next/link';

const tabs = [
  { href: "/profile", label: "Edit Profile" },
  { href: "/profile/changepass", label: "Change Password" },
];

const Page = ({children}) => {
  const pathname = usePathname(); 
  const pathParts = pathname.split("/").filter(Boolean);
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(profile); 
  const [imageInput, setImageInput] = useState(null);
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };




  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      <div className='flex items-center gap-[14px]'>
        <IoMdArrowBack onClick={() => router.back()} className='w-6 h-6 text-[#015093]' />
        <h3 className='text-[#333333] text-[20px] font-inter font-semibold capitalize' >{pathParts[0] || ""}</h3>
      </div>

      <div className=' w-[254px] flex flex-col items-center mx-auto'>
        <div className='image relative'>
          <Image src={profileImage} alt='profile' width={150} height={150} className="rounded-full" />
          <div className='w-[30px] h-[30px] flex items-center justify-center bg-[#FEFEFE] rounded-full absolute bottom-0 right-0'>
            <input 
              type="file" 
              id="fileInput" 
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <MdOutlineCameraAlt 
              className='w-6 h-6 rounded-full py-[3.5px] px-[2.5px] bg-[#015093] text-white cursor-pointer' 
              onClick={() => document.getElementById('fileInput').click()} 
            />
          </div>
        </div>
        <p className=' text-[30px] font-medium font-inter text-[#333333] mt-4 mb-6'>Mr. Admin</p>

        <div className='flex justify-between gap-[30px]'>
          {tabs.map((t) => {
            const isActive = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={
                  isActive
                    ? "pb-[2px] text-[#015093] border-b-2 border-[#015093] font-semibold font-inter text-[16px]"
                    : "pb-[2px] text-[#333333] font-inter text-[16px]"
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      
      {children}
    </div>
  )
}

export default Page;
