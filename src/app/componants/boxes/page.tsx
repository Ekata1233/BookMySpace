import React from 'react';
import { FaLightbulb, FaComments, FaBuilding, FaLaptopHouse, FaIdCard, FaUsers } from 'react-icons/fa';

const Boxes = () => {
  const data = [
    { icon: <FaLightbulb className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Our Solution", description: "Discover innovative solutions.\nExplore more here." },
    { icon: <FaComments className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Talk to Us", description: "Get in touch with our team.\nCustomer support available." },
    { icon: <FaBuilding className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Book Workspace", description: "Reserve your ideal workspace.\nFlexible booking options." },
    { icon: <FaLaptopHouse className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Set Up Virtual Office", description: "Create your digital workspace.\nWork remotely with ease." },
    { icon: <FaIdCard className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Buy a Membership", description: "Get exclusive member benefits.\nJoin us today!" },
    { icon: <FaUsers className="text-4xl mb-2 text-gray-500" />, link: "#", text: "Join Our Community", description: "Connect with like-minded individuals.\nGrow together!" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 my-10">
    {data.map((item, index) => (
      <div key={index} className="text-dark p-6 shadow-md text-center flex flex-col items-center">
        {item.icon}
        <a href={item.link} className="text-sm sm:text-base md:text-lg blue underline my-4">
          {item.text}
        </a>
        <p className="text-md whitespace-pre-line text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
  
  );
};

export default Boxes;
