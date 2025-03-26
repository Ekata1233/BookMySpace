import React from "react";

const WorkBusiness = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
        <div className="relative flex justify-center items-center">
          {/* Gray Square Behind Images */}
          <div className="absolute w-30 sm:w-30 sm:h-30 md:w-50 md:h-50 lg:w-60 lg:h-60 bg-gray-400 rounded-lg transform translate-x-20 translate-y-10"></div>

          {/* Top Image */}
          <img
            src="/business_1.png"
            alt="Top Image"
            className="w-40 sm:w-40 md:w-45 lg:w-60 shadow-lg transform translate-x-40 -translate-y-6 absolute"
          />

          {/* Bottom Image */}
          <img
            src="/business_2.png"
            alt="Bottom Image"
            className="w-60 sm:w-60 md:w-70 lg:w-85 shadow-lg transform -translate-x-0 translate-y-40"
          />
        </div>

        <div className="px-6 md:px-8 lg:px-10 xl:px-28 text-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700">
            Work wherever business takes you.
          </h1>
          <p className="my-7 text-sm sm:text-base md:text-lg text-gray-600">
            With over 4000 locations globally, we have offices, coworking
            spaces, and meeting rooms in every major town, city, and transport
            hub.
          </p>
          <p className="my-7 text-sm sm:text-base md:text-lg text-gray-600">
            Whether you work alone, you’re growing a start-up, or you’re running
            the world’s most successful corporation, our network makes it
            possible to work near clients, colleagues, or family.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkBusiness;
