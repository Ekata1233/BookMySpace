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

const MyBooking = () => {
  const { user } = useAuth();
  const { officeSpaces } = useOfficeSpaces();
  const { bookings } = useBookSpaces();
  console.log("Bookings : ", bookings);
  console.log("user inof : ", user);
  console.log("All office spaces  : ", officeSpaces);

  const formatTimeRange = (
    date: string,
    startTime: string,
    duration: number
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
      {" "}
      <div className="w-full bg-white border border-gray-200 rounded-none shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            My Bookings
          </h2>
        </div>

        {/* Bookings Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings?.filter((booking) => booking.userId === user?._id).length >
          0 ? (
            bookings
              .filter((booking) => booking.userId === user?._id)
              .map((booking, index) => (
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
                        {booking.officeId || "N/A"}
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

                  {/* Time & Duration */}
                  {/* Time Slot */}
                  <div className="flex items-start gap-3">
                    <FaClock className="text-[#6BB7BE] mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Time</p>
                      <p className="font-semibold text-gray-800">
                        {formatTimeRange(
                          booking.date,
                          booking.startTime,
                          booking.duration
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
              ))
          ) : (
            <p className="text-gray-500 text-sm">You have no bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
