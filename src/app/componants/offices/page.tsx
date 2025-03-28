"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Offices = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className=" my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <div className="flex justify-between ">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
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
      <div className="mx-auto">
        <div className="border-b-2 border-gray-300 w-full my-5"></div>
      </div>
      <div className="flex flex-col lg:flex-row  text-gray-700">
        <div className="w-full lg:w-1/4">
          <div>
            <h5 className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold my-3">
              Filter By Area:
            </h5>
          </div>
          {[
            "Mumbai",
            "Pune",
            "Bangalore",
            "Delhi",
            "Hyderabad",
            "Chennai",
            "Kolkata",
          ].map((city, index) => (
            <div key={index} className="flex items-center space-x-2 my-2">
              <Checkbox
                id={city.toLowerCase()}
                className="border-gray-800 data-[state=checked]:bg-gray-900"
              />
              <label
                htmlFor={city.toLowerCase()}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {city}
              </label>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-3/4 ">
          <Card className="flex flex-row w-full rounded-none p-0 items-stretch my-2">
            {/* Left Side - Image */}
            <div className="w-1/3 h-full flex-shrink-0">
              <Image
                src="/tourroom1.png"
                alt="Card Image"
                className="w-full h-full object-cover "
                width={100}
                height={200}
              />
            </div>

            {/* Right Side - Content */}
            <CardContent className="w-2/3 p-4">
              <h3 className="text-xl font-semibold">Title Here</h3>
              <p className="text-sm text-gray-500">123 Street, City, Country</p>
              <p className="mt-2 text-gray-700">
                This is a short description about the card content. It provides
                details about the item.
              </p>
              <Button className="mt-4">View More</Button>
            </CardContent>
          </Card>

          <Card className="flex flex-row w-full rounded-none p-0 items-stretch my-2">
            {/* Left Side - Image */}
            <div className="w-1/3 h-full flex-shrink-0">
              <Image
                src="/tourroom1.png"
                alt="Card Image"
                className="w-full h-full object-cover "
                width={100}
                height={200}
              />
            </div>

            {/* Right Side - Content */}
            <CardContent className="w-2/3 p-4">
              <h3 className="text-xl font-semibold">Title Here</h3>
              <p className="text-sm text-gray-500">123 Street, City, Country</p>
              <p className="mt-2 text-gray-700">
                This is a short description about the card content. It provides
                details about the item.
              </p>
              <Button className="mt-4">View More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Offices;
