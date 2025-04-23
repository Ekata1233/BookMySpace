"use client";
import { useBookSpaces } from '@/app/context/BookSpaceContext';
import { useOfficeSpaces } from '@/app/context/OfficeSpaceContext';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Bookings = () => {
    const { officeSpaces } = useOfficeSpaces();
    const { bookings } = useBookSpaces();
    const router = useRouter();

    const getOfficeDetails = (id: any) => {
        return officeSpaces.find((office) => office._id === id);
    };

    return (
        <div className="p-6 mt-42 max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-2">
                <Link
                    href="/vendor/dashboard"
                    className="inline-flex items-center gap-2 text-[#6BB7BE] hover:text-[#5AA4A9] text-sm font-medium"
                >
                    <span className="text-xl">←</span> Back to Dashboard
                </Link>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
                My Bookings
            </h1>

            {/* Bookings Table */}
            {bookings.length > 0 ? (
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
                            {bookings.map((booking) => {
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
                    No bookings available at the moment.
                </p>
            )}
        </div>
    );
};

export default Bookings;
