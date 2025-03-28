"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = ["/hero1.jpeg", "/hero_2.jpeg", "/hero_3.jpeg", "/hero_4.jpeg"];

const tabs = ["Office Space", "Coworking", "Virtual Office", "Meeting Room"];

const Hero = () => {
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
    <div className="relative w-full h-[70vh] flex items-center justify-center my-24 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
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
      <div className="absolute bottom-[-14vh] md:bottom-[-8vh] xl:bottom-[-10vh] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[85%] xl:w-[60%]  shadow-lg overflow-hidden z-1000">
        {/* Tabs for larger screens */}
        <div className="hidden sm:flex justify-around border-b px-4 py-6 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative pb-2 text-lg font-medium text-gray-600 transition-all",
                activeTab === tab &&
                  "text-[#6BB7BE] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-[#6BB7BE]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dropdown menu for smaller screens */}
        <div className="sm:hidden p-4 bg-white border-b relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-[70%] p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#6BB7BE] appearance-none"
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab}>
                {tab.length > 15 ? `${tab.substring(0, 12)}...` : tab}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
            ▼
          </div>
        </div>

        {/* Search Box */}
        <div className="py-4 px-6 sm:px-14 flex flex-col items-center bg-gray-200 w-full">
          <div className="flex flex-col sm:flex-row items-center w-full gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 h-12 border w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-[#6BB7BE]"
            />
            <Button
              onClick={handleSearch}
              className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
            >
              <Search size={20} /> SEARCH
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
