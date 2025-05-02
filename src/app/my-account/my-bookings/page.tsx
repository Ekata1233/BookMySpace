"use client";
import { useAuth } from "@/app/context/authContext";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import Link from "next/link";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const MyBooking = () => {
  const { user } = useAuth();
  const { officeSpaces } = useOfficeSpaces();
  const { bookings } = useBookSpaces();

  console.log("Users : ", user)
  console.log("officeSpaces : ", officeSpaces)
  console.log("bookings : ", bookings)

  const formatTimeRange = (
    date: string,
    startTime: string,
    duration: number,
  ) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(date);
    start.setHours(hours, minutes);

    const end = new Date(start);
    end.setHours(start.getHours() + duration);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedStart = start.toLocaleTimeString([], options);
    const formattedEnd = end.toLocaleTimeString([], options);

    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="px-3">
      <div className="w-full bg-white  rounded-none  overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            My Bookings
          </h2>
        </div>

        {/* Bookings Grid */}
        <div className="p-6">
          {bookings?.filter((booking) => booking.userId === user?._id).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 bg-white text-left text-sm text-gray-700">
                <thead className="bg-[#6BB7BE] text-white">
                  <tr>
                    <th className="px-4 py-2">Office</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((booking) => booking.userId === user?._id)
                    .map((booking, index) => {
                      const matchedOffice = officeSpaces.find(
                        (office) => office._id === booking.officeId
                      );

                      return (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <FaMapMarkerAlt className="text-[#6BB7BE] mt-1" />
                              <div>
                                <p className="text-gray-500 text-xs">Office</p>
                                <p className="font-medium text-gray-800">
                                  {matchedOffice
                                    ? `${matchedOffice.officeSpaceName}, ${matchedOffice.city}`
                                    : "Office not found"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <FaCalendarAlt className="text-[#6BB7BE] mt-1" />
                              <div>
                                <p className="text-gray-500 text-xs">Date</p>
                                <p className="font-medium text-gray-800">
                                  {new Date(booking.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <FaClock className="text-[#6BB7BE] mt-1" />
                              <div>
                                <p className="text-gray-500 text-xs">Time</p>
                                <p className="font-medium text-gray-800">
                                  {formatTimeRange(
                                    booking.date,
                                    booking.startTime,
                                    booking.duration
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <FaMoneyBillWave className="text-[#6BB7BE] mt-1" />
                              <div>
                                <p className="text-gray-500 text-xs">Total</p>
                                <p className="font-medium text-gray-800">
                                  ₹ {booking.totalPay}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Link href={`/office-space/${booking.officeId}`} className="bg-[#6BB7BE] hover:bg-[#5aa5ae] text-white px-4 py-1 rounded" >
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">You have no bookings yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyBooking;
