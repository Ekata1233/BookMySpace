"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import MapComponent from "../MapComponent/page";
import Loader from "../loader/page";
// Example location: src/types/OfficeSpace.ts

export interface OfficeSpace {
  _id: string;
  officeSpaceName: string;
  location: string;
  price: number;
  description: string;
  thumbnailImage: string;
  city: string;
  state: string;
  pincode: string;
  isAdminApprove: boolean;
  category?: string | string[];
}

const OfficeSpaces: React.FC = () => {
  const { officeSpaces,filteredOfficeSpaces, loading } = useOfficeSpaces();
  const [selected, setSelected] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1] || "";


  const normalizedPageCategory = pageName?.replace(/-/g, " ").toLowerCase();

  // If no pageName or normalizedPageCategory, show all
  const pageFilteredSpaces = !normalizedPageCategory
    ? officeSpaces
    : officeSpaces.filter((space) => {
        if (!space.category) return false;

        const spaceCategory = Array.isArray(space.category)
          ? space.category.map((cat) => cat.toLowerCase())
          : [space.category.toLowerCase()];

        return spaceCategory.includes(normalizedPageCategory);
      });

  const cities = [
    "Mumbai",
    "Pune",
    "Bangalore",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Kolkata",
  ];

  const categories = [
    "Office Space",
    "Coworking",
    "Virtual Space",
    "Meeting Room",
    "Private Office",
    "Day Office",
    "Hot Desks",
    "Dedicated Desks",
  ];

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Corrected filter logic with proper parentheses
  const filteredOfficeSpaceIds = filteredOfficeSpaces.map((space) => space._id);

  const displaySpaces = pageFilteredSpaces.filter((space) => {
    const cityMatch =
      selectedCities.length === 0 || selectedCities.includes(space.city);
  
    const categoryMatch =
      selectedCategories.length === 0 ||
      (space.category &&
        selectedCategories.some((cat) =>
          Array.isArray(space.category)
            ? space.category.includes(cat)
            : space.category === cat
        ));
  
    const isApproved = space.isAdminApprove === true;
  
    const isInFilteredOfficeSpaces = filteredOfficeSpaceIds.includes(space._id);
  
    return cityMatch && categoryMatch && isApproved && isInFilteredOfficeSpaces;
  });
  

  const visibleSpaces = showAll ? displaySpaces : displaySpaces.slice(0, 3);
  if (loading) return <Loader />;



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
          {/* ------------------------------------------MAP------------------------------------------------------------------ */}
          <div className="me-5 my-4 h-40 border border-gray-300 ">
            <MapComponent />
          </div>

          {/* -------------------------------FILTER BY AREA ------------------------------------------------------------ */}
          <div className="flex flex-row flex-nowrap overflow-x-auto gap-6 w-full lg:flex-col lg:overflow-x-visible">
            {/* Filter By Area */}
            <div className=" lg:min-w-0">
              <h5 className="text-lg font-bold my-3">Filter By Area:</h5>
              {cities.map((city, index) => (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <Checkbox
                    id={city.toLowerCase()}
                    checked={selectedCities.includes(city)}
                    onCheckedChange={() => handleCityChange(city)}
                  />
                  <label
                    htmlFor={city.toLowerCase()}
                    className="text-sm font-medium"
                  >
                    {city}
                  </label>
                </div>
              ))}
            </div>

            {/* Filter By Category */}
            {(!pageName || pageName.trim() === "") && (
              <div className=" lg:min-w-0">
                <h5 className="text-lg font-bold my-3 lg:mt-3">
                  Filter By Category:
                </h5>
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2 my-2">
                    <Checkbox
                      id={category.toLowerCase().replace(/\s+/g, "-")}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={category.toLowerCase().replace(/\s+/g, "-")}
                      className="text-sm font-medium"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          {visibleSpaces.length > 0 ? (
            <>
              {visibleSpaces.map((space) => (
                <Card
                  key={space._id}
                  className="flex flex-col md:flex-row w-full rounded-none p-0 items-stretch my-4 "
                >
                  <div className="w-full md:w-1/3 flex-shrink-0 h-50 md:h-auto flex">
                    <Image
                      src={space.thumbnailImage}
                      alt={space.officeSpaceName}
                      className="w-full lg:h-[300px] sm:h-auto  object-cover"

                      width={300}
                      height={200}
                    />
                  </div>

                  <CardContent className="w-full md:w-2/3 px-4 pt-4 flex flex-col justify-between mt-0 ">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {space.officeSpaceName}
                        </h3>
                        {space.isNewlyOpen && (
                          <p className="text-red-500 text-sm sm:text-base flex items-center mt-1 sm:mt-0 sm:ml-auto">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Newly Open
                          </p>
                        )}
                      </div>

                      <p className="text-sm sm:text-base text-gray-500">
                        {space.city} {space.state} {space.pincode}
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        {space.description}
                      </p>

                      <div className="flex flex-wrap gap-2 my-3">
                        {space.amenities && space.amenities.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {space.amenities.map((feature, idx) => (
                              <button
                                key={idx}
                                className="text-xs sm:text-sm text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] rounded-none px-3 py-1 hover:bg-transparent hover:border-[#6BB7BE]"
                              >
                                {feature}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs sm:text-sm text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] rounded-none px-3 py-1 inline-block">
                            Work Desk
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-1">
                        <h4 className="text-lg font-medium">₹</h4>
                        <h5 className="text-lg sm:text-xl">
                          {space.rate} / Hour
                        </h5>
                      </div>
                      <Link
                        // href={`/${pageName}/${space._id}`}
                        href={`/${
                          pageName ||
                          (Array.isArray(space.category)
                            ? space.category[0]
                            : space.category
                          )
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")
                        }/${space._id}`}
                        className="text-sm sm:text-base text-white hover:text-[#6BB7BE] border border-[#6BB7BE] bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none py-2 px-4"
                      >
                        View Details
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {displaySpaces.length > 3 && !showAll && (
                <div className="text-center mt-6">
                  <Button
                    onClick={() => setShowAll(true)}
                    className="rounded-none bg-[#6BB7BE] hover:bg-[#5AA4A9] text-white px-6 py-2"
                  >
                    View More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div>No office spaces available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeSpaces;
