"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Boxes from "../componants/boxes/page";
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
    <div className="relative">
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[83vh] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
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
      </div>

      {/* Card Section - Positioned above Boxes */}
      <div className="relative z-10 mx-auto -mt-30 w-[90%] md:w-[80%] lg:w-[85%] xl:w-[60%] shadow-lg">
        {/* Tabs for larger screens */}
        <div className=" justify-around border-b px-10 py-4 bg-white">
          <div className="">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal text-center">
              Office Space
              <span className="text-[#6BB7BE] font-extrabold">.</span>
            </h1>
            <p className=" text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 py-2">
            Looking for a fully-serviced private office? Our move-in-ready spaces offer privacy, flexibility, and access to meeting rooms, kitchen facilities, and business lounges—perfect for teams of any size.
            </p>
          </div>
        </div>

        
        {/* Search Box */}
        <div className="py-4 px-6 sm:px-14 flex flex-col items-center bg-gray-100 w-full">
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

      {/* Boxes Component positioned below */}
      <div className="relative z-0 mt-20">
        <Boxes />
      </div>
    </div>
  );
};

export default Officespace;
