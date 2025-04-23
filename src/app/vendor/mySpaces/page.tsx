"use client";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const OfficeSpaces = () => {
    const { officeSpaces } = useOfficeSpaces();

    return (
        <div className="p-6 mt-40 max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-2">
                <Link
                    href="/vendor/dashboard"
                    className="inline-flex items-center gap-2 text-[#6BB7BE] hover:text-[#5AA4A9] text-sm font-medium"
                >
                    <span className="text-xl">←</span> Back to Dashboard
                </Link>
            </div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Office Spaces</h1>
                <Link
                    href="/vendor/addSpace"
                    className="flex items-center gap-2 bg-[#6BB7BE] text-white px-4 py-2 rounded-none hover:[#5AA4A9]"
                >
                    <FaPlus />
                    Add New Space
                </Link>
            </div>

            {/* Grid of Spaces */}
            {officeSpaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {officeSpaces.map((space) => (
                        <div
                            key={space._id}
                            className="border border-gray-200 bg-white h-[420px] flex flex-col rounded-none shadow hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={space.thumbnailImage}
                                    alt={space.officeSpaceName}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-none"
                                />
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h2 className="text-lg font-semibold mb-1">{space.officeSpaceName}</h2>
                                    <p className="text-sm text-gray-500">
                                        {space.city}, {space.state} - {space.pincode}
                                    </p>
                                    <p className="text-sm mt-2 text-gray-700 line-clamp-3">{space.description}</p>

                                    {space.amenities?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {space.amenities.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] px-2 py-1 rounded-none"
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
                                        <Link href={`/office-space/${space._id}`} className="text-sm p-2 bg-[#6BB7BE] text-white hover:bg-[#5AA4A9] rounded-none">
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
        </div>
    );
};

export default OfficeSpaces;
