"use client"

import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="p-20 bg-blue-300 mt-36">
      <h1 className="text-4xl">Meeting Room Details</h1>
      <p>Showing details for Room ID: {id}</p>
    </div>
  );
};

export default page;
