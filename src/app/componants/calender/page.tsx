"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TimeCalendar = () => {
  const currentYear = new Date().getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [date, setDate] = useState<Date | undefined>(today);
  const [selectedHour, setSelectedHour] = useState("9");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedDuration, setSelectedDuration] = useState("1");

  // Generate time options from 9:00 to 17:30 in 1-hour increments
  const timeOptions = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeOptions.push(`${hour}:00`);
    if (hour !== 17) {
      // Don't add :30 for 17:00 (5:00 PM)
      timeOptions.push(`${hour}:30`);
    }
  }

  const handleSearch = () => {
    console.log("fdfdf");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Calendar Column */}
        <div className="bg-white p-4 text-center flex-[2] w-full lg:min-w-[600px]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start pb-5">
            BOOK YOUR SLOT
          </h1>

          <div className="w-full">
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
        </div>

        {/* Selected Date and Time Selection */}
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
            {/* Select Duration */}
            <div className="flex justify-center mb-4">
              <div className="w-full">
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
              </div>
            </div>

            {/* Available Slots */}
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-gray-700">
                Available Slots (9:00 - 17:30)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    className="p-2 border rounded-none hover:bg-gray-100 text-sm"
                    onClick={() => {
                      const [hour, minute] = time.split(":");
                      setSelectedHour(hour);
                      setSelectedMinute(minute);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={handleSearch}
          className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium my-4"
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};

export default TimeCalendar;
