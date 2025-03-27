"use client"
import React, { useState } from "react";

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
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 bg-gray-200 p-4">Column 1</div>
        <div className="w-full lg:w-3/4 bg-gray-300 p-4">Column 2</div>
      </div>
    </div>
  );
};

export default Offices;
