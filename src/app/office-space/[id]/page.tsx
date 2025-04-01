"use client"

import OfficeDetails from "@/app/componants/officeDetails/page";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className=" mt-50">
      <h1 className="text-4xl">Meeting Room Details</h1>
      <p>Showing details for Room ID: {id}</p>
      <OfficeDetails />
    </div>
  );
};

export default page;
