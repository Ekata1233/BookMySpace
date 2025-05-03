"use client";
import { useAuth } from "@/app/context/authContext";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { toast } from "sonner";

const PersonalInfo = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(user?._id, formData);
      toast.success("User information updated!");
      setIsEditing(false);
      user();
    } catch (error) {
      toast.error("Failed to update user information.");
    }
  };


  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };


  return (
    <div className="px-3 ">
      <div className="w-full border border-gray-200 rounded-none shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3 flex justify-between items-center">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-white hover:text-gray-100 flex items-center gap-1 text-sm"
            >
              <FaEdit />
              Edit
            </button>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white text-gray-800 text-sm sm:text-base">
          {/* Full Name */}
          <div className="flex items-start gap-3">
            <FaUser className="text-[#6BB7BE] mt-1" />
            <div className="w-full">
              <p className="text-gray-500">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p className="font-semibold">{user?.name || "N/A"}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-[#6BB7BE] mt-1" />
            <div className="w-full">
              <p className="text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p className="font-semibold">{user?.email || "N/A"}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <FaPhone className="text-[#6BB7BE] mt-1" />
            <div className="w-full">
              <p className="text-gray-500">Phone Number</p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p className="font-semibold">{user?.phone || "N/A"}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-[#6BB7BE] mt-1" />
            <div className="w-full">
              <p className="text-gray-500">Address</p>
              {isEditing ? (
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1 resize-none"
                />
              ) : (
                <p className="font-semibold whitespace-pre-line">
                  {user?.address || "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-4 px-6 pb-6">
            <button
              onClick={handleCancel}
              className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1 bg-[#6BB7BE] text-white rounded hover:bg-[#58a6ac]"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
