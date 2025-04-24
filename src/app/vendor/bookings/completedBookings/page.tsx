"use client";
import { useBookSpaces } from '@/app/context/BookSpaceContext';
import { useOfficeSpaces } from '@/app/context/OfficeSpaceContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../../sidebar/page';

const CompletedBookings = () => {
    const { officeSpaces } = useOfficeSpaces();
    const { bookings } = useBookSpaces();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openSpaces, setOpenSpaces] = useState(false);
    const [openBookings, setOpenBookings] = useState(false);

    const getOfficeDetails = (id: any) => {
        return officeSpaces.find((office) => office._id === id);
    };

    // Get today's date
    const today = new Date().setHours(0, 0, 0, 0); // To compare only the date part, ignoring time

    // Filter bookings to only include past ones (before today)
    const pastBookings = bookings.filter((booking) => new Date(booking.date).getTime() < today);

    return (
        <div className="flex flex-col md:flex-row min-h-screen mt-42">
            <Sidebar
                sidebarOpen={sidebarOpen}
                openSpaces={openSpaces}
                setOpenSpaces={setOpenSpaces}
                openBookings={openBookings}
                setOpenBookings={setOpenBookings}
            />
            {/* Back Button */}
            <main className="flex-1 max-w-4xl mx-auto p-6">
                <div className="mb-2">
                    
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
                    Completed Bookings
                </h1>

                {/* Bookings Table */}
                {pastBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 text-gray-900 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 border border-gray-300">Office</th>
                                    <th className="px-4 py-3 border border-gray-300">Location</th>
                                    <th className="px-4 py-3 border border-gray-300">Date</th>
                                    <th className="px-4 py-3 border border-gray-300">Start Time</th>
                                    <th className="px-4 py-3 border border-gray-300">Duration</th>
                                    <th className="px-4 py-3 border border-gray-300">Amount Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastBookings.map((booking) => {
                                    const office = getOfficeDetails(booking.officeId);
                                    if (!office) return null;

                                    return (
                                        <tr key={booking._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border border-gray-300 font-medium">
                                                {office.officeSpaceName}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-300">
                                                {office.city}, {office.state}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-300">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-300">
                                                {booking.startTime}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-300">
                                                {booking.duration} hr
                                            </td>
                                            <td className="px-4 py-3 border border-gray-300 text-green-700 font-semibold">
                                                ₹{booking.totalPay}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10 text-base">
                        No completed bookings available at the moment.
                    </p>
                )}
            </main>
        </div>
    );
};

export default CompletedBookings;
