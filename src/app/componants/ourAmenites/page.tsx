import React from "react";
import { LuAlarmClock } from "react-icons/lu";
import { FaWifi } from "react-icons/fa6";
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

const OurAmenites = () => {
  return (
    <div>
      <div className="mx-auto px-4">
        <h5 className="text-gray-500 text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-center pt-12">
          Comfort, Convenience, Innovation – Work Redefined.
        </h5>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-center py-2">
          Our Office Amenites
        </h1>
        <div className="border-b-4 border-[#6BB7BE] w-full sm:w-3/4 md:w-3/7 lg:w-3/7 xl:w-2/8 mt-2 mb-10 mx-auto"></div>
      </div>
      <div className="px-8 sm:px-12 md:px-22 lg:px-32 xl:px-60">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            

            <div className="flex flex-col items-center text-center my-3">
              <PiOfficeChair  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Work Desk</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <RiHomeOfficeFill  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Private Cabins</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <LuAlarmClock className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">24 x 7 Availability</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <FaWifi  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">High Speed Internet</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <FiUsers  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Conference Rooms</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <TiMessages  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Discussion Rooms</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <IoWomanOutline  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Office Assistance</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <FaUsersViewfinder  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Meeting Rooms</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <LuCable  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Power Backup</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <GrShieldSecurity  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Security</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <LiaBroomSolid   className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Housekeeping</p>
            </div>

            <div className="flex flex-col items-center text-center my-3">
              <TbToolsKitchen2  className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Pantry</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAmenites;
