"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { useWorkBusiness } from "@/app/context/WorkBusinessContext"; // ✅ Correct import

const WorkBusiness = () => {
  const { workBusinessData, fetchWorkBusiness } = useWorkBusiness(); // ✅ Using custom hook

  useEffect(() => {
    fetchWorkBusiness();
  }, []);

  return (
    <div>
      {workBusinessData.map((item, index) => (
        <div
          key={item._id}
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${index === 1 ? " sm:my-0" : ""
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {index % 2 === 0 ? (
              <>
                {/* Mobile Order: Image First */}
                <div className="order-1 md:order-1 relative flex justify-center items-center h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
                  <div className="absolute w-50 h-50 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gray-300 transform translate-x-8 sm:translate-x-12 md:translate-x-10 lg:translate-x-10 translate-y-6 md:-translate-y-10"></div>
                  <Image
                    width={100}
                    height={100}
                    src={item.imageTop}
                    alt="Top Image"
                    className="w-50 h-50 sm:w-40 sm:h-40 md:w-55 md:h-55 lg:w-60 lg:h-60 xl:w-64 xl:h-64 shadow-lg transform translate-x-21 sm:translate-x-20 md:translate-x-24 lg:translate-x-32 xl:translate-x-40 -translate-y-4 md:-translate-y-35 absolute z-0"
                  />
                  <Image
                    width={100}
                    height={100}
                    src={item.imageBottom}
                    alt="Bottom Image"
                    className="w-[280px] h-[280px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] shadow-lg transform -translate-x-11 sm:translate-x-4 md:-translate-x-7 lg:-translate-x-20 xl:-translate-x-10 translate-y-30 md:translate-y-20 z-10"

                  />
                </div>

                <div className="order-2 md:order-2 px-0 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-start mt-32 ">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    {item.title}
                    <span className="text-[#6BB7BE] font-extrabold">.</span>
                  </h1>
                  <div className="flex text-4xl mt-4 mb-4 text-gray-600">
                    <IoCalendarOutline className="my-2 me-3" />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      {item.description1}
                    </p>
                  </div>
                  <div className="flex text-4xl mt-4 mb-4 text-gray-600">
                    <LuLaptopMinimalCheck className="my-2 me-3" />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      {item.description2}
                    </p>
                  </div>
                  <div className="flex my-4 text-sm text-[#6BB7BE]">
                    <p className="border-b-2 border-[#6BB7BE] leading-relaxed">Contact Us</p>
                    <FaArrowRight className="m-2" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Mobile Order: Image First, then text */}
                <div className="order-1 md:order-2  md:mt-0 relative flex justify-center items-center h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
                  <div className="absolute w-50 h-50 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gray-300 transform translate-x-8 md:translate-x-10 translate-y-6 md:-translate-y-10"></div>
                  <Image
                    width={100}
                    height={100}
                    src={item.imageTop}
                    alt="Top Image"
                    className="w-50 h-50 sm:w-40 sm:h-40 md:w-55 md:h-55 lg:w-60 lg:h-60 xl:w-64 xl:h-64 shadow-lg transform translate-x-21 sm:translate-x-20 md:translate-x-24 lg:translate-x-32 xl:translate-x-40 -translate-y-4 md:-translate-y-35 absolute z-0"
                  />
                  <Image
                    width={100}
                    height={100}
                    src={item.imageBottom}
                    alt="Bottom Image"
                    className="w-[280px] h-[280px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] shadow-lg transform -translate-x-11 sm:translate-x-4 md:-translate-x-7 lg:-translate-x-20 xl:-translate-x-10 translate-y-30 md:translate-y-20 z-10"

                  />
                </div>

                <div className="order-2 md:order-1 px-0 sm:px-4 md:px-0 lg:px-8 xl:pe-0 xl:ps-38 text-start mt-32 xl:mt-12">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    {item.title}
                    <span className="text-[#6BB7BE] font-extrabold">.</span>
                  </h1>
                  <div className="flex text-4xl mt-4 mb-4 text-gray-600">
                    <IoCalendarOutline className="my-2 me-3" />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      {item.description1}
                    </p>
                  </div>
                  <div className="flex text-4xl mt-4 mb-4 text-gray-600">
                    <LuLaptopMinimalCheck className="my-2 me-3" />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      {item.description2}
                    </p>
                  </div>
                  <div className="flex my-4 text-sm text-[#6BB7BE]">
                    <p className="border-b-2 border-[#6BB7BE] leading-relaxed">Contact Us</p>
                    <FaArrowRight className="m-2" />
                  </div>
                </div>
              </>
            )}
          </div>


        </div>
      ))}
    </div>
  );
};

export default WorkBusiness;
