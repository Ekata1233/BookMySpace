"use client";

import OfficeDetails from "@/app/componants/officeDetails/page";
import { useParams } from "next/navigation";
import React from "react";

const IdVirtualSpace = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className=" mt-50">
      <OfficeDetails />
    </div>
  );
};

export default IdVirtualSpace;
