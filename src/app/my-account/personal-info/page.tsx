"use client";
import { useAuth } from "@/app/context/authContext";
import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const PersonalInfo = () => {
  const { user } = useAuth();
  return (
    <div className="px-3 ">
      <div className="w-full border border-gray-200 rounded-none shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            Personal Information
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white text-gray-800 text-sm sm:text-base">
          {/* Name */}
          <div className="flex items-start gap-3">
            <FaUser className="text-[#6BB7BE] mt-1" />
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-semibold">{user?.name || "N/A"}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-[#6BB7BE] mt-1" />
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user?.email || "N/A"}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <FaPhone className="text-[#6BB7BE] mt-1" />
            <div>
              <p className="text-gray-500">Phone Number</p>
              <p className="font-semibold">{user?.phone || "N/A"}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-[#6BB7BE] mt-1" />
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold whitespace-pre-line">
                {user?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
