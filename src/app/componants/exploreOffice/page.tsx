"use client";
import { useExploreOffice } from "@/app/context/ExploreOfficeContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const ExploreOffice = () => {
  const { offices } = useExploreOffice();

  return (
    <div>
      <div className="mx-auto px-4">
        <p className="text-gray-500 font-bold text-center pt-12">
          Explore Beyond Borders With Our Locations
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-center py-2">
          Step Into Our Office Spaces
        </h1>
        <div className="border-b-4 border-[#6BB7BE] w-full sm:w-3/4 md:w-2/3 lg:w-4/7 xl:w-3/8 mt-2 mb-10 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {offices.map((office, index) => (
          <div key={index} className="relative bg-gray-200 group overflow-hidden">
            <Image
              src={office.image}
              alt={office.name}
              width={300}
              height={100}
              className="w-full h-110 transition-transform duration-300 group-hover:scale-105 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 group-hover:bg-black/70 transition-all duration-300">
              <h3 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-white">
                {office.name}
              </h3>
              <h3 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-white">
                {office.address}
              </h3>
              <Button className="text-base sm:text-md md:text-lg lg:text-lg text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-3 py-5 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none mt-4">
                Know More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreOffice;
