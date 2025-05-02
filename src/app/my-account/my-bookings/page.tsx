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
      <div className="w-full bg-white border border-gray-200 rounded-none shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            My Bookings
          </h2>
        </div>

        {/* Bookings Grid */}
        <div className="">
  {bookings?.filter((booking) => booking.userId === user?._id).length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 rounded-none">
          <tr className="rounded-none">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
              <FaMapMarkerAlt className="inline mr-1 text-[#6BB7BE]" />
              Office
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
              <FaCalendarAlt className="inline mr-1 text-[#6BB7BE]" />
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
              <FaClock className="inline mr-1 text-[#6BB7BE]" />
              Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
              <FaMoneyBillWave className="inline mr-1 text-[#6BB7BE]" />
              Payment
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 rounded-none">
          {bookings
            .filter((booking) => booking.userId === user?._id)
            .map((booking, index) => {
              const matchedOffice = officeSpaces.find(
                (office) => office._id === booking.officeId
              );

              return (
                <tr key={index} className="hover:bg-gray-50 rounded-none">
                  <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                    {matchedOffice
                      ? `${matchedOffice.officeSpaceName}, ${matchedOffice.city}`
                      : "Office not found"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                    {formatTimeRange(
                      booking.date,
                      booking.startTime,
                      booking.duration
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600 rounded-none">
                    ₹ {booking.totalPay}
                  </td>
                  <td className="px-6 py-4 text-sm rounded-none">
                    <Link
                      href={`/office-space/${booking.officeId}`}
                      className="text-[#6BB7BE] hover:underline"
                    >
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
    <p className="text-center text-gray-500 text-sm px-6 py-10">
      You have no bookings yet.
    </p>
  )}
</div>


      </div>
    </div>
  );
};

export default MyBooking;
