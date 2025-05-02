"use client";
import { useAuth } from "@/app/context/authContext";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const UpcomingAppointments = () => {
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

  const getUpcomingBookings = () => {
    const now = new Date();

    return bookings
      ?.filter((booking) => booking.userId === user?._id)
      ?.filter((booking) => {
        const [hours, minutes] = booking.startTime.split(":").map(Number);
        const bookingDateTime = new Date(booking.date);
        bookingDateTime.setHours(hours, minutes, 0, 0);

        return bookingDateTime > now;
      });
  };

  const upcomingBookings = getUpcomingBookings();

  return (
    <div className="px-3">
      <div className="w-full bg-white border border-gray-200 rounded-none shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            Upcoming Bookings
          </h2>
        </div>

        {/* Bookings Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking, index) => {
              const matchedOffice = officeSpaces.find(
                (office) => office._id === booking.officeId,
              );

              return (
                <div
                  key={index}
                  className="border border-gray-100 shadow-sm p-4 bg-white rounded-none flex flex-col gap-3"
                >
                  {/* Office Info */}
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#6BB7BE] mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Office</p>
                      <p className="font-semibold text-gray-800">
                        {matchedOffice
                          ? `${matchedOffice.officeSpaceName}, ${matchedOffice.city}`
                          : "Office not found"}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-[#6BB7BE] mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Date</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div className="flex items-start gap-3">
                    <FaClock className="text-[#6BB7BE] mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Time</p>
                      <p className="font-semibold text-gray-800">
                        {formatTimeRange(
                          booking.date,
                          booking.startTime,
                          booking.duration,
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="flex items-start gap-3">
                    <FaMoneyBillWave className="text-[#6BB7BE] mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Total Payment</p>
                      <p className="font-semibold text-gray-800">
                        ₹ {booking.totalPay}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">
              You have no upcoming bookings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
