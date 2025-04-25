"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaLightbulb,
  FaCheckCircle,
  FaBolt,
  FaComments,
  FaClipboardList,
  FaTasks,
  FaGem,
  FaBuilding,
  FaLaptopHouse,
  FaIdCard,
  FaUsers,
} from "react-icons/fa";
import type { JSX } from "react"; // ✅ ✅ This line fixes the JSX.Element error

// Map icon names from the database to React components
const iconMap: { [key: string]: JSX.Element } = {
  FaLightbulb: <FaLightbulb className="text-4xl mb-2 text-gray-500" />,
  FaCheckCircle: <FaCheckCircle className="text-4xl mb-2 text-gray-500" />,
  FaBolt: <FaBolt className="text-4xl mb-2 text-gray-500" />,
  FaComments: <FaComments className="text-4xl mb-2 text-gray-500" />,
  FaClipboardList: <FaClipboardList className="text-4xl mb-2 text-gray-500" />,
  FaTasks: <FaTasks className="text-4xl mb-2 text-gray-500" />,
  FaGem: <FaGem className="text-4xl mb-2 text-gray-500" />,
  FaBuilding: <FaBuilding className="text-4xl mb-2 text-gray-500" />,
  FaLaptopHouse: <FaLaptopHouse className="text-4xl mb-2 text-gray-500" />,
  FaIdCard: <FaIdCard className="text-4xl mb-2 text-gray-500" />,
  FaUsers: <FaUsers className="text-4xl mb-2 text-gray-500" />,
};

interface Box {
  _id: string;
  icon: string;
  link: string;
  text: string;
  description: string;
}

const Boxes = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Box[] }>(
          "/api/boxes",
        );
        if (response.data.success) {
          setBoxes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching boxes:", error);
      }
    };

    fetchBoxes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-4 px-2 my-10">
      {boxes.map((item) => (
        <div
          key={item._id}
          className="text-dark p-6 shadow-md text-center flex flex-col items-center"
        >
          {iconMap[item.icon] || (
            <FaLightbulb className="text-4xl mb-2 text-gray-500" />
          )}
          <a
            href={item.link}
            className="text-sm sm:text-base md:text-lg blue underline my-4 "
          >
            {item.text}
          </a>
          <p className="text-md whitespace-pre-line text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Boxes;
