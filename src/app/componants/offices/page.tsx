import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Offices = () => {
  return (
    <div className=" my-12 mx-2 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
      <div className="flex justify-between ">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
          OFFICE SPACES
        </h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-none px-5 py-2">
              Sort By :
            </DropdownMenuTrigger>
            <DropdownMenuContent  className="border border-gray-300 rounded-none">
              <DropdownMenuItem>
                Distance : Nearest to Furthest
              </DropdownMenuItem>
              <DropdownMenuItem>
                Distance : Furthest to Nearest
              </DropdownMenuItem>
              <DropdownMenuItem>Price : Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price : High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
