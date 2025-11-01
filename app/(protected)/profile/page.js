"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("⚠️ No token found. Please log in first.");
        return;
      }

      try {
        const res = await fetch("https://ai-car-app-sandy.vercel.app/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Profile API response:", data); // 👈 দেখার জন্য

        if (res.ok) {
          const user = data.user || {};
          setFormData({
            name: user.name || "",
            email: user.email || "",
            contact: user.contact || "",
            address: user.address || "",
          });
        } else {
          setMessage("❌ Failed to load profile");
        }
      } catch {
        setMessage("⚠️ Network error while loading profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠️ No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://ai-car-app-sandy.vercel.app/admin/edit-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage(`❌ ${result.message || "Failed to update profile"}`);
      }
    } catch {
      setMessage("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[481px] flex flex-col items-center mx-auto mt-[26px]">
      <p className="text-[24px] text-[#333333] font-inter">Edit Your Profile</p>

      <form onSubmit={handleSubmit} className="w-full mt-6">
        {["name", "email", "contact", "address"].map((field) => (
          <div key={field} className="mt-4">
            <label className="text-[#333333] text-[16px] font-inter capitalize" htmlFor={field}>
              {field === "contact" ? "Contact No" : field}
            </label>
            <input
              className="w-[481px] mt-2 border border-[#015093] rounded-[5px] py-[13px] px-4 text-[16px]"
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-[44px] py-3 bg-[#015093] text-[#FEFEFE] rounded hover:opacity-90 transition text-[16px] cursor-pointer mt-6 ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Save Change"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center text-[16px] ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;
