// src/app/offices/page.js
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import {  setCategoryFilter, setCityFilter } from './officesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfficeSpaces } from './services';

const OfficesPage = () => {
  const dispatch = useDispatch();
  const { data: officeSpaces, status, error, filters } = useSelector((state) => state.officeSpaces);
  const [sortOption, setSortOption] = useState('');

  const cities = [
    "Mumbai",
    "Pune",
    "Bangalore",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Kolkata",
  ];

  const cardData = [
    {
      id: "1",
      title: "Meeting Room",
      location: "Kothrud, Pune",
      description:
        "This is a short description about the card content. It provides details about the item.",
      price: "2500 / Day",
      image: "/tourroom1.png",
      amenities: ["Hi-Speed WiFi", "24 x 7", "Power Backup"],
      isNewOpen: 1,
    },
    {
      id: "2",
      title: "Private Cabin",
      location: "Hinjewadi, Pune",
      description: "This is a short description about the card content.",
      price: "2500 / Day",
      image: "/tourroom2.png",
      amenities: ["Power Backup"],
      isNewOpen: 0,
    },
    {
      id: "3",
      title: "Conference Hall",
      location: "Baner, Pune",
      description: "This is a short description",
      price: "500 / Day",
      image: "/tourroom3.png",
      amenities: ["Hi-Speed WiFi", "Power Backup"],
      isNewOpen: 1,
    },
  ];

  const categories = [
    "Office Space",
    "Coworking",
    "Virtual Space",
    "Meeting Rooms",
    "Private Office",
    "Day Office",
    "Hot Desks",
    "Dedicated Desks",
  ];

   const fetchOfficeSpaces = async () => {
    try {
      const response = await axios.get("/api/officeSpaces"); // Update path if needed

      console.log("ofice spaces : ", response)
      return response.data;
    } catch (error) {
      console.error("Error fetching office spaces:", error);
      return { success: false, message: "error.message" };
    }
  };

  useEffect(()=>{
fetchOfficeSpaces()
  },[])
  return (
    <div className="my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-2">
          OFFICE SPACES
        </h1>
        <div className="text-gray-700">
          <select
            className="border border-gray-300 rounded-none px-5 py-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="" disabled hidden>Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="border-b-2 border-gray-300 w-full my-5"></div>

      <div className="flex flex-col lg:flex-row text-gray-700">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-row md:flex-row lg:flex-col space-x-4 md:space-x-4 lg:space-x-0 md:space-y-0 lg:space-y-4">
          {/* City Filter */}
          <div className="w-1/2 md:w-1/2 lg:w-full">
            <h5 className="text-lg font-bold my-3">Filter By Area:</h5>
            {cities.map((city) => (
              <div key={city} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={`city-${city}`}
                  checked={filters.city === city}
                  onCheckedChange={() => handleCityChange(filters.city === city ? '' : city)}
                  className="border-gray-800 data-[state=checked]:bg-gray-900"
                />
                <label htmlFor={`city-${city}`} className="text-sm font-medium">
                  {city}
                </label>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="w-1/2 md:w-1/2 lg:w-full">
            <h5 className="text-lg font-bold my-3">Filter By Category:</h5>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category === category}
                  onCheckedChange={() => handleCategoryChange(filters.category === category ? '' : category)}
                  className="border-gray-800 data-[state=checked]:bg-gray-900"
                />
                <label htmlFor={`category-${category}`} className="text-sm font-medium">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Office Spaces List */}
        <div className="w-full lg:w-3/4">
          {sortedSpaces.length === 0 ? (
            <div className="text-center py-8">No office spaces found matching your filters.</div>
          ) : (
            sortedSpaces.map((space) => (
              <Card key={space._id} className="flex flex-col md:flex-row w-full rounded-none p-0 items-stretch my-4">
                <div className="w-full md:w-1/3 flex-shrink-0 h-full md:h-auto flex">
                  <Image
                    src={space.image || '/default-office.jpg'}
                    alt={space.officeSpaceName}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="w-full md:w-2/3 px-4 pt-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg sm:text-xl font-semibold">{space.officeSpaceName}</h3>
                      {space.isNewlyOpen && (
                        <p className="text-red-500 text-sm sm:text-base flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Newly Open
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{space.address}</p>
                    <p className="text-gray-700 text-sm sm:text-base">{space.description}</p>

                    <div className="flex flex-wrap gap-2 my-3">
                      {space.amenities?.map((amenity, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="text-xs sm:text-sm text-[#6BB7BE] border border-[#6BB7BE] bg-[#FAFAFA] rounded-none px-3 py-1"
                        >
                          {amenity}
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
                      href={`/offices/${space._id}`}
                      className="text-sm sm:text-base text-white hover:text-[#6BB7BE] border border-[#6BB7BE] bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none py-2 px-4"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficesPage;