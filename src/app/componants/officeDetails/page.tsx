"use client";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { FaWifi } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { PiOfficeChair } from "react-icons/pi";
import { RiHomeOfficeFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { IoWomanOutline } from "react-icons/io5";
import { FaUsersViewfinder } from "react-icons/fa6";
import { LuCable } from "react-icons/lu";
import { TbToolsKitchen2 } from "react-icons/tb";
import { LiaBroomSolid } from "react-icons/lia";
import { GrShieldSecurity } from "react-icons/gr";

const amenityIcons = {
  "Work Desk": PiOfficeChair,
  "Private Cabins": RiHomeOfficeFill,
  "24x7 Availability": LuAlarmClock,
  "Power Backup": LuCable,
  HouseKeeping: LiaBroomSolid,
  "Office Assistance": IoWomanOutline,
  "High Speed Internet": FaWifi,
  "Discussion Rooms": TiMessages,
  "Conference Rooms": FiUsers,
  "Meeting Rooms": FaUsersViewfinder,
  Pantry: TbToolsKitchen2,
  Security: GrShieldSecurity,
};

const OfficeDetails = () => {
  const { officeSpaces } = useOfficeSpaces();
  const params = useParams();
  const { id } = params;
  const MatchedOfficeSpace = officeSpaces.find((space) => space._id === id);

  console.log("Matched Office Space: ", MatchedOfficeSpace);

  if (!MatchedOfficeSpace) {
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Office space not found
      </div>
    );
  }

  const {
    officeSpaceName,
    city,
    state,
    pincode,
    description,
    extraDescription,
    amenities,
    thumbnailImage,
    multiImages,
    startTime,
    endTime,
  } = MatchedOfficeSpace;

  const handleSearch = () => {
    console.log("Searching for:");
  };
  return (
    <div className=" my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
        {officeSpaceName}
      </h1>
      <div className="">
        <p className="text-sm sm:text-base text-gray-700 ">
          {city}, {state}, {pincode}
        </p>
        <p className="text-red-500 text-sm sm:text-base flex items-center ">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Newly
          Open
        </p>
      </div>
      <Button
        onClick={handleSearch}
        className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium my-4"
      >
        {/* <Search size={20} /> */}
        BOOK NOW
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
        {/* First Column */}
        <div className="">
          <Image
            src={thumbnailImage}
            alt="Card Image"
            className="w-[700px] h-[500px] object-cover"
            width={300}
            height={300}
          />
        </div>

        {/* Second Column */}
        <div className="grid grid-rows-2 gap-4">
          {/* First Row in Second Column */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Image
                src={multiImages[0]}
                alt="Card Image"
                className="w-[350px] h-[240px]  object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="">
              <Image
                src={multiImages[1]}
                alt="Card Image"
                className="w-[350px] h-[240px]  object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Second Row in Second Column */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Image
                src={multiImages[2]}
                alt="Card Image"
                className="w-[350px] h-[240px] object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="">
              <Image
                src={multiImages[3]}
                alt="Card Image"
                className="w-[350px] h-[240px] object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* First Column (1/2 Width) */}
        <div className="w-full md:w-1/2 border-b-2 p-4 overflow-hidden">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
            About {officeSpaceName}
          </h1>
          <p className="text-md sm:text-base md:text-xl font-semibold my-2 text-gray-700 break-words">
            Find a new way of working in {city}
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 my-2 break-words">
            {extraDescription}
          </p>

          <div className="mt-5">
            <p className="text-md sm:text-base md:text-xl font-semibold my-2 text-gray-700">
              Opening Hours
            </p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 my-2 break-words">
              {startTime !== "1970-01-01T00:00:00.000Z" ? startTime : "09:00 AM"} - {endTime !== "1970-01-01T00:00:00.000Z" ? endTime : "08:00 PM"}
            </p>
          </div>
        </div>

        {/* Second Column (1/2 Width) */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 shadow-lg flex flex-col overflow-hidden">
          <h4 className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 text-center pt-1 pb-3">
            Amenities at {officeSpaceName}
          </h4>

          <div className="flex flex-wrap justify-center">
            {MatchedOfficeSpace.amenities.map((amenity, index) => {
              const IconComponent = amenityIcons[amenity] || null;
              return (
                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 flex flex-col items-center text-center my-4 break-words">
                  {IconComponent && (
                    <IconComponent className="text-6xl text-[#6BB7BE]" />
                  )}
                  <p className="font-semibold my-2 break-words">{amenity}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>



    </div>
  );
};

export default OfficeDetails;
