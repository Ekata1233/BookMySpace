"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuPhoneCall } from "react-icons/lu";

const images = ["/hero1.jpeg", "/hero_2.jpeg", "/hero_3.jpeg", "/hero_4.jpeg"];

const tabs = ["Office Space", "Coworking", "Virtual Office", "Meeting Room"];

const Officespace = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Office Space");
  const [searchTerm, setSearchTerm] = useState("");
  const totalSlides = images.length;

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" w-full h-[70vh] flex items-center justify-center my-24 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={` w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Card Section */}
      <div className=" bottom-[-21vh] md:bottom-[-11vh] lg:bottom-[-9vh] xl:bottom-[10vh] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[85%] xl:w-[60%]  shadow-lg overflow-hidden z-1000">
        {/* Tabs for larger screens */}
        <div className=" justify-around border-b px-10 py-4 bg-white">
          <div className="">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal text-center">
              Office Space
              <span className="text-[#6BB7BE] font-extrabold">.</span>
            </h1>
            <p className=" text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 py-2">
              Looking for a fully-serviced, private office space for rent? A
              place where you can work with complete focus and privacy? Our
              office spaces provide a professional, move-in-ready environment
              tailored to fit teams of any size. Designed for productivity and
              fully supported, our offices come with access to kitchen
              facilities, meeting rooms, and a network of premium business
              lounges.
            </p>
          </div>
        </div>
        

        {/* Search Box */}
        <div className="py-4 px-6 sm:px-14 flex flex-col items-center bg-gray-200 w-full">
          <div className="flex flex-col sm:flex-row justify-around items-center w-full gap-3">
            <Button
              onClick={handleSearch}
              className="h-14 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-14 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
            >
              {/* <Search size={20} /> */}
              CONTACT US
            </Button>

            <Button
              onClick={handleSearch}
              className="h-14 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-12 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
            >
              {/* <Search size={20} /> */}
              FIND WORKSPACE
            </Button>

            <div className="text-sm sm:text-base md:text-lg leading-relaxed font-bold text-gray-700 py-2 flex gap-2">
            <LuPhoneCall className="font-bold mt-1" />
              <p className=" ">
               Call us +91 9272003735
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Officespace;
