"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";

const Offices: React.FC = () => {
  const { officeSpaces } = useOfficeSpaces();
  const [selected, setSelected] = useState<string>("");
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1];

  const cities = [
    "Mumbai", "Pune", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Kolkata",
  ];

  const categories = [
    "Office Space", "Coworking", "Virtual Space", "Meeting Rooms",
    "Private Office", "Day Office", "Hot Desks", "Dedicated Desks",
  ];

  return (
    <div className="my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
          OFFICE SPACES
        </h1>
        <div className="text-gray-700">
          <select
            className="border border-gray-300 rounded-none px-5 py-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="" disabled hidden>
              Sort By :
            </option>
            <option value="nearest">Distance : Nearest to Furthest</option>
            <option value="furthest">Distance : Furthest to Nearest</option>
            <option value="lowToHigh">Price : Low to High</option>
            <option value="highToLow">Price : High to Low</option>
          </select>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 w-full my-5"></div>
      <div className="flex flex-col lg:flex-row text-gray-700">
        <div className="w-full lg:w-1/4">
          <h5 className="text-lg font-bold my-3">Filter By Area:</h5>
          {cities.map((city, index) => (
            <div key={index} className="flex items-center space-x-2 my-2">
              <Checkbox id={city.toLowerCase()} />
              <label htmlFor={city.toLowerCase()} className="text-sm font-medium">
                {city}
              </label>
            </div>
          ))}
          <h5 className="text-lg font-bold my-3 mt-6">Filter By Category:</h5>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2 my-2">
              <Checkbox id={category.toLowerCase().replace(/\s+/g, "-")} />
              <label htmlFor={category.toLowerCase().replace(/\s+/g, "-")} className="text-sm font-medium">
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-3/4">
          {officeSpaces.length > 0 ? (
            officeSpaces.map((space) => (
              <Card
                key={space._id}
                className="flex flex-col md:flex-row w-full rounded-none p-0 items-stretch my-4"
              >
                <div className="w-full md:w-1/3 flex-shrink-0 h-full md:h-auto flex">
                  <Image
                    src={"/default-office.jpg"} 
                    alt={space.officeSpaceName}
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                  />
                </div>

                <CardContent className="w-full md:w-2/3 px-4 pt-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {space.officeSpaceName}
                      </h3>
                      {space.isNewlyOpen && (
                        <p className="text-red-500 text-sm sm:text-base flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>{" "}
                          Newly Open
                        </p>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-500">
                      {space.address}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {space.description}
                    </p>

                    <div className="flex flex-wrap gap-2 my-3">
                      {space.amenities.map((feature, idx) => (
                        <Button
                          key={idx}
                          className="text-xs sm:text-sm text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] rounded-none px-3 py-1 hover:bg-transparent hover:border-[#6BB7BE]"
                        >
                          {feature}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-1">
                      <h4 className="text-lg font-medium">₹</h4>
                      <h5 className="text-lg sm:text-xl">{space.rate} / Day</h5>
                    </div>
                    <Link
                      href={`/${pageName}/${space._id}`} 
                      className="text-sm sm:text-base text-white hover:text-[#6BB7BE] border border-[#6BB7BE] bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none py-2 px-4"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div>No office spaces available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offices;