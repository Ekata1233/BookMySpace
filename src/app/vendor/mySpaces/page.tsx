"use client";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Sidebar from "../sidebar/page";

const OfficeSpaces = () => {
    const { officeSpaces } = useOfficeSpaces();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openSpaces, setOpenSpaces] = useState(false);
    const [openBookings, setOpenBookings] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const vendorData = localStorage.getItem("vendor");

    let vendorId = null;

    if (vendorData) {
        try {
            const parsedVendor = JSON.parse(vendorData);
            vendorId = parsedVendor._id;
            console.log("Vendor ID:", vendorId);
        } catch (error) {
            console.error("Error parsing vendor data:", error);
        }
    }

    // Filter office spaces based on the vendorId
    const filteredOfficeSpaces = officeSpaces.filter(
        (space) => space.vendorId === vendorId
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen mt-42 bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                openSpaces={openSpaces}
                setOpenSpaces={setOpenSpaces}
                openBookings={openBookings}
                setOpenBookings={setOpenBookings}
                openReport={openReport}
                setOpenReport={setOpenReport}
            />

            <main className="flex-1 max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Office Spaces</h1>
                    <Link
                        href="/vendor/addSpace"
                        className="flex items-center gap-2 bg-[#6BB7BE] text-white px-4 py-2 rounded-none hover:bg-[#5AA4A9]"
                    >
                        <FaPlus />
                        Add New Space
                    </Link>
                </div>

                {/* Grid of Spaces */}
                {filteredOfficeSpaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOfficeSpaces.map((space) => (
                            <div
                                key={space._id}
                                className="border border-gray-200 bg-white h-[460px] flex flex-col rounded-none shadow hover:shadow-lg transition-shadow"
                            >
                                {/* Fixed height image */}
                                <div className="relative w-full" style={{ height: "192px" }}>
                                    <Image
                                        src={space.thumbnailImage}
                                        alt={space.officeSpaceName}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-none"
                                    />
                                </div>

                                <div className="p-4 flex flex-col justify-between flex-1 overflow-hidden">
                                    <div className="overflow-hidden">
                                        <h2 className="text-lg font-semibold mb-1 truncate">
                                            {space.officeSpaceName}
                                        </h2>
                                        <p className="text-sm text-gray-500 truncate">
                                            {space.city}, {space.state} - {space.pincode}
                                        </p>
                                        <p className="text-sm mt-2 text-gray-700 line-clamp-3 break-words">
                                            {space.description}
                                        </p>

                                        {space.amenities?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3 overflow-hidden">
                                                {space.amenities.map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] px-2 py-1 rounded-none break-words"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-sm font-medium text-gray-800">
                                            ₹ {space.rate} <span className="text-xs font-normal">/ Hour</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/office-space/${space._id}`}
                                                className="text-sm p-2 bg-[#6BB7BE] text-white hover:bg-[#5AA4A9] rounded-none"
                                            >
                                                <FaEye />
                                            </Link>
                                            <button className="text-sm p-2 bg-yellow-400 text-white hover:bg-yellow-500 rounded-none">
                                                <FaEdit />
                                            </button>
                                            <button className="text-sm p-2 bg-red-500 text-white hover:bg-red-600 rounded-none">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No office spaces found.</p>
                )}
            </main>
        </div>
    );
};

export default OfficeSpaces;
