// "use client";

// import { Calendar } from "@/components/ui/calendar";
// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";

// const TimeCalendar = () => {
//   const { officeSpaces } = useOfficeSpaces();
//   const { startTime, endTime } = officeSpaces[0] || {};

//   const localStartTime = startTime
//     ? new Date(startTime).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       })
//     : "";
//   const localEndTime = endTime
//     ? new Date(endTime).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       })
//     : "";

//   const currentYear = new Date().getFullYear();
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const [date, setDate] = useState<Date | undefined>(today);
//   const [selectedHour, setSelectedHour] = useState("9");
//   const [selectedMinute, setSelectedMinute] = useState("00");
//   const [selectedDuration, setSelectedDuration] = useState("1");

//   // Dynamically generate time options from startTime to endTime with 1-hour interval
//   const timeOptions: string[] = [];

//   if (startTime && endTime) {
//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     start.setSeconds(0, 0);
//     end.setSeconds(0, 0);

//     const current = new Date(start);
//     const adjustedEnd = new Date(end);
//     adjustedEnd.setHours(adjustedEnd.getHours() - 1);

//     while (current <= adjustedEnd) {
//       const formatted = current.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       });
//       timeOptions.push(formatted);
//       current.setHours(current.getHours() + 1);
//     }
//   }

//   const handleSearch = () => {
//     console.log("fdfdf");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col lg:flex-row w-full gap-4">
//         {/* Calendar Column */}
//         <div className="bg-white p-4 text-center flex-[2] w-full lg:min-w-[600px]">
//           <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start pb-5">
//             BOOK YOUR SLOT
//           </h1>

//           <div className="w-full">
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={setDate}
//               disabled={(day) => day < today}
//               className="rounded-none border shadow mx-auto py-10"
//               classNames={{
//                 month: "w-full",
//                 table: "w-full",
//                 head_row: "flex justify-between",
//                 head_cell:
//                   "w-10 h-10 flex items-center justify-center text-sm font-normal text-muted-foreground",
//                 row: "flex w-full justify-between",
//                 cell: "h-10 w-10 p-0 relative [&:has([aria-selected])]:bg-transparent",
//                 day: "h-9 w-9 rounded-full flex items-center justify-center p-0 font-normal aria-selected:opacity-100",
//                 day_selected: "bg-[#6BB7BE] text-white",
//                 day_today: "bg-accent text-accent-foreground",
//                 day_outside: "text-muted-foreground opacity-50",
//                 day_disabled: "text-muted-foreground opacity-50",
//                 day_range_middle: "bg-accent text-accent-foreground",
//                 day_hidden: "invisible",
//               }}
//             />
//           </div>
//         </div>

//         {/* Selected Date and Time Selection */}
//         <div className="bg-white p-4 text-center flex-1 w-full lg:min-w-[200px]">
//           <h1 className="font-medium mb-3 text-center text-gray-700 pt-5">
//             Selected Date
//           </h1>
//           <div className="mb-4 p-2 border rounded-none">
//             {date ? date.toDateString() : "No date selected"}
//           </div>

//           <div className="space-y-4">
//             <h2 className="font-medium mb-3 text-center text-gray-700">
//               Select Duration
//             </h2>
//             {/* Select Duration */}
//             <div className="flex justify-center mb-4">
//               <div className="w-full">
//                 <Select
//                   value={selectedDuration}
//                   onValueChange={setSelectedDuration}
//                 >
//                   <SelectTrigger className="h-12 w-full rounded-none">
//                     <SelectValue placeholder="Select duration" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
//                       <SelectItem
//                         key={hour}
//                         value={hour.toString()}
//                         className="text-center"
//                       >
//                         {hour} {hour === 1 ? "hour" : "hours"}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Available Slots */}
//             <div className="mt-4">
//               <h3 className="font-medium mb-2 text-gray-700">
//                 Available Slots ({localStartTime} - {localEndTime})
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
//                 {timeOptions.map((time) => (
//                   <button
//                     key={time}
//                     className="p-2 border rounded-none hover:bg-gray-100 text-sm"
//                     onClick={() => {
//                       const [hour, minute] = time.split(":");
//                       setSelectedHour(hour);
//                       setSelectedMinute(minute);
//                     }}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <Button
//           onClick={handleSearch}
//           className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium m-4"
//         >
//           BOOK NOW
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TimeCalendar;

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
import { useParams } from "next/navigation";

const TimeCalendar = () => {
  const { officeSpaces } = useOfficeSpaces();
  const { addBooking } = useBookSpaces();
  const { bookings } = useBookSpaces();
  const [userInfo, setUserInfo] = useState<any>(null);

  const params = useParams();
  const id = params.id;

  console.log("Book spaces : ", bookings);

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

  const office = officeSpaces[0]; // Assuming one office for now
  const { _id: officeId, startTime, endTime } = office || {};

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedDuration, setSelectedDuration] = useState("1");

  console.log("selected date in usestate : ", date)

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

  // BOOK NOW logic
  const handleBooking = async () => {
    if (!date || !officeId) return alert("Missing info to book slot.");

    const bookingDate = date.toISOString().split("T")[0]; // "yyyy-mm-dd"
    const startTimeFormatted = `${selectedHour.padStart(
      2,
      "0"
    )}:${selectedMinute}`;

    const bookingData = {
      userId,
      officeId: officeId,
      date: bookingDate,
      startTime: startTimeFormatted,
      duration: parseInt(selectedDuration),
    };

    try {
      await addBooking(bookingData);
      alert("Slot booked successfully!");
    } catch (err) {
      alert("Failed to book slot.");
      console.error(err);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getHourInt = (timeStr: string) => parseInt(timeStr.split(":")[0]);
  const selectedDateISO = date?.toISOString().split("T")[0];
  const bookedHours: number[] = [];

  console.log("selected date : ", selectedDateISO);
  

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Calendar Column */}
        <div className="bg-white p-4 text-center flex-[2] w-full lg:min-w-[600px]">
          <h1 className="text-3xl font-bold text-gray-700 text-start pb-5">
            BOOK YOUR SLOT
          </h1>
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

            {/* Time Slot Selection */}
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
          </div>
        </div>
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
