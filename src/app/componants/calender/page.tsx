

"use client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export interface OfficeSpace {
  _id: string;
  vendorId: string;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
}
const TimeCalendar = () => {
  const { officeSpaces } = useOfficeSpaces();
  const { addBooking } = useBookSpaces();
  const { bookings } = useBookSpaces();
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();



  const params = useParams();
  const id = params.id;


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage.");
      }
    }
  }, []);

  interface OfficeSpace {
    _id: string;
    vendorId: string;
    startTime: string;
    endTime: string;
    rate: number;
  }

  const office = officeSpaces.find((item) => item._id === id) as
    | OfficeSpace
    | undefined;

  const fallback: OfficeSpace = {
    _id: "",
    vendorId: "",
    startTime: "",
    endTime: "",
    rate: 0,
  };

  const { _id: officeId, vendorId, startTime, endTime, rate } = office ?? fallback;


  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedDuration, setSelectedDuration] = useState("1");

  const totalPay = rate * Number(selectedDuration);

  // Generate time slots
  const timeOptions: string[] = [];

  if (startTime && endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    start.setSeconds(0, 0);
    end.setSeconds(0, 0);
    const current = new Date(start);
    const adjustedEnd = new Date(end);
    adjustedEnd.setHours(adjustedEnd.getHours() - 1);

    while (current <= adjustedEnd) {
      const formatted = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      timeOptions.push(formatted);
      current.setHours(current.getHours() + 1);
    }
  }

  const userId = userInfo?.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getHourInt = (timeStr: string) => parseInt(timeStr.split(":")[0]);
  const selectedDateISO = date?.toLocaleDateString("en-CA");
  const bookedHours: number[] = [];

  bookings.forEach((booking) => {
    if (
      booking.officeId === id &&
      booking.date.split("T")[0] === selectedDateISO
    ) {
      const startHour = getHourInt(booking.startTime);
      const duration = booking.duration;

      for (let i = 0; i < duration; i++) {
        bookedHours.push(startHour + i);
      }
    }
  });

  // BOOK NOW logic
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    if (!date || !officeId) return alert("Missing info to book slot.");

    const bookingDate = date?.toLocaleDateString("en-CA");
    const startTimeFormatted = `${selectedHour.padStart(
      2,
      "0",
    )}:${selectedMinute}`;

    const bookingData = {
      userId,
      officeId,
      vendorId,
      date: bookingDate,
      startTime: startTimeFormatted,
      duration: parseInt(selectedDuration),
      totalPay,
    };

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    try {
      const { data } = await axios.post("/api/razorpay", bookingData);
      console.log("data : ", data)
      const { razorpayOrderId: orderId } = data;

      const options = {
        key: "rzp_test_4IVVmy5cqABEUR",
        amount: totalPay * 100,
        currency: "INR",
        name: "Office Booking",
        description: "Booking Office Slot",
        order_id: orderId,
        vendorId: vendorId,
        handler: async function (response: any) {

          // Save Booking to DB
          try {
            await addBooking(bookingData);
            router.push("/booking-confirmed");
          } catch (err) {
            toast.error("Payment done but failed to save booking.");
            console.error(err);
          }
        },
        prefill: {
          name: userInfo?.name || "Guest",
          email: userInfo?.email || "",
        },
        theme: {
          color: "#6BB7BE",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initiate Razorpay payment.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Calendar Column */}
        <div className="bg-white p-4 text-center flex-[2] w-full lg:min-w-[600px]">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-700 text-start pb-5">
              BOOK YOUR SLOT
            </h1>
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-medium text-gray-700 text-start pb-5">
              Rate : <span className="text-gray-500">{rate} / Hour</span>
            </h1>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(day) => day < today}
            className="rounded-none border shadow mx-auto py-10"
            classNames={{
              month: "w-full",
              table: "w-full",
              head_row: "flex justify-between",
              head_cell:
                "w-10 h-10 flex items-center justify-center text-sm font-normal text-muted-foreground",
              row: "flex w-full justify-between",
              cell: "h-10 w-10 p-0 relative [&:has([aria-selected])]:bg-transparent",
              day: "h-9 w-9 rounded-full flex items-center justify-center p-0 font-normal aria-selected:opacity-100",
              day_selected: "bg-[#6BB7BE] text-white",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "bg-accent text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </div>

        {/* Time & Duration Selector */}
        <div className="bg-white p-4 text-center flex-1 w-full lg:min-w-[200px]">
          <h1 className="font-medium mb-3 text-center text-gray-700 pt-5">
            Selected Date
          </h1>
          <div className="mb-4 p-2 border rounded-none">
            {date ? date.toDateString() : "No date selected"}
          </div>

          {/* <div className="space-y-4">
            <h2 className="font-medium mb-3 text-center text-gray-700">
              Select Duration
            </h2>
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="h-12 w-full rounded-none">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <SelectItem
                    key={hour}
                    value={hour.toString()}
                    className="text-center"
                  >
                    {hour} {hour === 1 ? "hour" : "hours"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4">
              <h3 className="font-medium mb-2 text-gray-700">
                Available Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {timeOptions.map((time) => {
                  const [hourStr, minuteStr] = time.split(":");
                  const hour = parseInt(hourStr);
                  const isBooked = bookedHours.includes(hour);

                  return (
                    <button
                      key={time}
                      disabled={isBooked}
                      className={`p-2 border rounded-none text-sm ${
                        isBooked
                          ? "bg-red-400 text-white cursor-not-allowed"
                          : time.startsWith(selectedHour)
                            ? "bg-[#6BB7BE] text-white cursor-pointer"
                            : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        if (!isBooked) {
                          setSelectedHour(hourStr);
                          setSelectedMinute(minuteStr);
                        }
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div> */}

          <div className="space-y-4">
            <h2 className="font-medium mb-3 text-center text-gray-700">
              Select Duration
            </h2>

            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="h-12 w-full rounded-none">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <SelectItem
                    key={hour}
                    value={hour.toString()}
                    className="text-center"
                  >
                    {hour} {hour === 1 ? "hour" : "hours"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4">
              <h3 className="font-medium mb-2 text-gray-700">
                Available Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {timeOptions.map((time, index) => {
                  const [hourStr, minuteStr] = time.split(":");
                  const hour = parseInt(hourStr);
                  const minute = parseInt(minuteStr);
                  const duration = parseInt(selectedDuration);

                  // Check if the full block (e.g., 2 hours) starting at this index is available
                  let isRangeAvailable = true;
                  for (let i = 0; i < duration; i++) {
                    const nextTime = timeOptions[index + i];
                    if (!nextTime) {
                      isRangeAvailable = false;
                      break;
                    }
                    const [h] = nextTime.split(":");
                    if (bookedHours.includes(parseInt(h))) {
                      isRangeAvailable = false;
                      break;
                    }
                  }

                  // Check if this time is part of the selected group
                  const selectedStartIndex = timeOptions.findIndex(
                    (t) => t === `${selectedHour}:${selectedMinute}`
                  );
                  const isSelected =
                    selectedStartIndex !== -1 &&
                    index >= selectedStartIndex &&
                    index < selectedStartIndex + duration;

                  return (
                    <button
                      key={time}
                      disabled={!isRangeAvailable}
                      className={`p-2 border rounded-none text-sm ${!isRangeAvailable
                        ? "bg-red-400 text-white cursor-not-allowed"
                        : isSelected
                          ? "bg-[#6BB7BE] text-white cursor-pointer"
                          : "hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        if (isRangeAvailable) {
                          setSelectedHour(hourStr);
                          setSelectedMinute(minuteStr);
                        }
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* CALCULATION */}

      <div>
        <h4 className="p-4 text-lg sm:text-xl md:text-xl lg:text-2xl font-medium text-gray-700 text-start pb-5">
          Total Pay : {totalPay} Rs
        </h4>
      </div>
      {/* BOOK NOW BUTTON */}
      <div>
        <Button
          onClick={handleBooking}
          className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium m-4"
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};

export default TimeCalendar;
