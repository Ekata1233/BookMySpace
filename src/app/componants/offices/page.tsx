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
    <div className="container my-12">
      <div className="flex justify-between ">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 text-start py-2">
          Office Spaces
        </h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-none px-5 py-2">
              Sort By :
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-300 rounded-none">
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
        <div className="border-b-4 border-gray-300 w-full my-5"></div>
      </div>
      <div className="flex mx-3">
        <div className="w-1/3 bg-gray-200">Column 1</div>
        <div className="w-2/3 bg-gray-300">Column 2</div>
      </div>
    </div>
  );
};

export default Offices;
