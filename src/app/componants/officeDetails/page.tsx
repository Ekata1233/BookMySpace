"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaWifi } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { PiOfficeChair } from "react-icons/pi";
import { RiHomeOfficeFill } from "react-icons/ri";

const OfficeDetails = () => {
  const handleSearch = () => {
    console.log("Searching for:");
    // Add your search logic here
  };
  return (
    <div className=" my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
        ABC OFFICE
      </h1>
      <div className="flex">
        <p className="text-sm sm:text-base text-gray-700  me-5">
          Kothrud , Pune
        </p>
        <p className="text-red-500 text-sm sm:text-base flex items-center ms-5">
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
            src="/tourroom1.png"
            alt="Card Image"
            className="w-full h-full object-cover"
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
                src="/tourroom2.png"
                alt="Card Image"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="">
              <Image
                src="/tourroom3.png"
                alt="Card Image"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Second Row in Second Column */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Image
                src="/tourroom4.png"
                alt="Card Image"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="">
              <Image
                src="/tourroom1.png"
                alt="Card Image"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 border-b-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
            About ABC Office
          </h1>
          <p className="text-md sm:text-base md:text-xl  font-semibold my-2 text-gray-700">
            Find a new way of working in Pune
          </p>

          <p className=" text-sm sm:text-base md:text-lg  leading-relaxed text-gray-600 my-2">
            Grow your brand at ABC Office, a flexible workspace in Pune, one of
            India’s top business and technology hubs. As a thriving center for
            IT, manufacturing, and finance, Pune offers endless opportunities
            for startups and established enterprises alike. Position your brand
            in a city known for innovation, education, and sustainable growth.
            With excellent connectivity and Pune International Airport just a
            short distance away, managing global business relationships has
            never been easier.
          </p>

          <div className="mt-5">
            <p className="text-md sm:text-base md:text-xl  font-semibold my-2 text-gray-700">
              Opening Hours
            </p>

            <p className=" text-sm sm:text-base md:text-lg  leading-relaxed text-gray-600 my-2">
              09:00 AM - 08:00 PM
            </p>
          </div>
        </div>

        {/* Second Column (1/3 Width) */}
        <div className="w-full md:w-1/3 bg-gray-100 py-5  shadow-lg">
          <h4 className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 text-center pt-1 pb-3">
            Amenities at ABC Office
          </h4>
          <div className="flex flex-wrap justify-center">
            {/* Item 1 */}
            <div className="w-[37%] flex flex-col items-center text-center my-3">
              <PiOfficeChair className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Work Desk</p>
            </div>

            {/* Item 2 */}
            <div className="w-[37%] flex flex-col items-center text-center my-3">
              <RiHomeOfficeFill className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">Private Cabins</p>
            </div>

            {/* Item 3 */}
            <div className="w-[37%] flex flex-col items-center text-center my-3">
              <LuAlarmClock className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">24 x 7 Availability</p>
            </div>

            {/* Item 4 */}
            <div className="w-[37%] flex flex-col items-center text-center my-3">
              <FaWifi className="text-6xl text-[#6BB7BE]" />
              <p className="font-semibold my-2">High Speed Internet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeDetails;
