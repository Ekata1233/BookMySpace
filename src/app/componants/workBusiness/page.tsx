import Image from "next/image";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";

const WorkBusiness = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Text Section */}
        <div className="block max-[425px]:block sm:hidden md:hidden lg:hidden xl:hidden px-0 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-start  sm:mt-0 md:mt-0 lg:mt-0 ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal">
            Your office is wherever you make it
            <span className="text-[#6BB7BE] font-extrabold">.</span>
          </h1>

          <div className="flex text-4xl md:text-7xl lg:text-4xl mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 text-gray-600">
            <IoCalendarOutline className="my-2 me-3" />
            <p className=" text-sm sm:text-base md:text-lg  leading-relaxed">
              Your perfect workspace is never far away—over 12 locations
              worldwide in cities, towns, and transport hubs
            </p>
          </div>

          <div className="flex text-4xl md:text-7xl lg:text-4xl mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 text-gray-600">
            <LuLaptopMinimalCheck className="my-2 me-3" />
            <p className=" text-sm sm:text-base md:text-lg   leading-relaxed">
              Work solo or scale big—our powerful network keeps you seamlessly
              connected and thriving.
            </p>
          </div>

          <div className="flex my-4 sm:my-6 text-sm sm:text-base md:text-lg text-[#6BB7BE]">
            <p className="border-b-2 border-[#6BB7BE] leading-relaxed">
              Contact Us
            </p>
            <FaArrowRight className="m-2" />{" "}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
          {/* Gray Square Behind Images */}
          <div className="absolute w-50 h-50 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gray-300 rounded-lg transform translate-x-8 sm:translate-x-12 md:translate-x-10 lg:translate-x-10 translate-y-6 sm:translate-y-6 md:-translate-y-10 lg:translate-y-0"></div>

          {/* Top Image */}
          <Image
            width={100}
            height={100}
            src="/business_1.png"
            alt="Top Image"
            className="w-50 sm:w-40 md:w-55 lg:w-60 xl:w-64 shadow-lg transform translate-x-21 sm:translate-x-20 md:translate-x-24 lg:translate-x-32 xl:translate-x-40 -translate-y-4 sm:-translate-y-6 md:-translate-y-35 lg:-translate-y-27 absolute z-0"
          />

          {/* Bottom Image */}
          <Image
            width={100}
            height={100}
            src="/business_2.png"
            alt="Bottom Image"
            className="w-70 sm:w-56 md:w-75 lg:w-80 xl:w-80 shadow-lg transform -translate-x-11 sm:translate-x-4 md:-translate-x-7 lg:-translate-x-20 xl:-translate-x-10 translate-y-30 sm:translate-y-20 md:translate-y-20 lg:translate-y-28 xl:translate-y-28 z-10"
          />
        </div>

        {/* Text Section */}
        <div className="hidden max-[425px]:hidden sm:block px-0 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-start mt-32 sm:mt-0 md:mt-0 lg:mt-0 ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal">
            Your office is wherever you make it
            <span className="text-[#6BB7BE] font-extrabold">.</span>
          </h1>

          <div className="flex text-4xl md:text-7xl lg:text-4xl mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 text-gray-600">
            <IoCalendarOutline className="my-2 me-3" />
            <p className=" text-sm sm:text-base md:text-lg  leading-relaxed">
              Your perfect workspace is never far away—over 12 locations
              worldwide in cities, towns, and transport hubs
            </p>
          </div>

          <div className="flex text-4xl md:text-7xl lg:text-4xl mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 text-gray-600">
            <LuLaptopMinimalCheck className="my-2 me-3" />
            <p className=" text-sm sm:text-base md:text-lg  leading-relaxed">
              Work solo or scale big—our powerful network keeps you seamlessly
              connected and thriving.
            </p>
          </div>

          <div className="flex my-4 sm:my-6 text-sm sm:text-base md:text-lg text-[#6BB7BE]">
            <p className="border-b-2 border-[#6BB7BE] leading-relaxed">
              Contact Us
            </p>
            <FaArrowRight className="m-2" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkBusiness;
